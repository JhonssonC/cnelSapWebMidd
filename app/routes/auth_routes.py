from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse

from app.models import UserValidation
from ..schemas import ImputUser
from ..utils import generate_key, hash_password
from ..database import SessionLocal, engine, base

router = APIRouter()

# Endpoint para registrar un nuevo usuario
@router.post("/registrar/")
def registrar_usuario(data: ImputUser):
     # creo una session para conectarme a la BD
    db = SessionLocal()
    new_usr = UserValidation(**ImputUser.model())
    new_usr.llave=hash_password(data.clave)
    db.add(new_usr)
    db.commit()
    return JSONResponse(status_code=201, content={"message": "Se ha regitrado Usuario"})
    

# Endpoint para regenerar la llave
@router.post("/regenerar/")
def regenerar_llave(data: UserValidationRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    hashed_password = hash_password(data.clave)
    cursor.execute('SELECT * FROM usuarios WHERE usuario = ? AND clave = ?', 
                   (data.usuario, hashed_password))
    user = cursor.fetchone()
    
    if user:
        nueva_llave = generate_key()
        cursor.execute('UPDATE usuarios SET llave = ? WHERE usuario = ? AND clave = ?', 
                       (nueva_llave, data.usuario, hashed_password))
        conn.commit()
        conn.close()
        return {"message": "Llave regenerada con éxito", "nueva_llave": nueva_llave}
    else:
        conn.close()
        raise HTTPException(status_code=401, detail="Usuario o clave incorrecta")
