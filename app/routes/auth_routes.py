from fastapi import APIRouter, HTTPException
from ..models import UserValidationRequest
from ..utils import generate_key, hash_password
from ..database import get_db_connection

router = APIRouter()

# Endpoint para registrar un nuevo usuario
@router.post("/registrar/")
def registrar_usuario(data: UserValidationRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    hashed_password = hash_password(data.clave)
    llave_inicial = generate_key()
    
    cursor.execute('INSERT INTO usuarios (usuario, clave, llave) VALUES (?, ?, ?)', 
                   (data.usuario, hashed_password, llave_inicial))
    conn.commit()
    conn.close()
    
    return {"message": "Usuario registrado con éxito", "usuario": data.usuario, "llave": llave_inicial}

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
