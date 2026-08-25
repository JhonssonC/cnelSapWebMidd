from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from ..schemas import ImputUser
from ..utils import exists_user, validate_user, generate_user, regenerate_key
from sqlalchemy.orm import Session
from app.database import get_db

router = APIRouter()

# Endpoint para registrar un nuevo usuario
@router.post("/registrar/")
def registrar_usuario(data: ImputUser , db: Session = Depends(get_db)):
    if not exists_user(data.usuario, db):
        usr = generate_user(data, db)
        if not usr:
            raise HTTPException(status_code=404, detail="No se pudo generar el Usuario")
        return JSONResponse(status_code=201, content={"message": "Se ha registrado Usuario", "data": usr.model_dump()})
    else:
        raise HTTPException(status_code=400, detail="Usuario ya Existe")
    
    
# Endpoint para regenerar la llave
@router.post("/regenerar/")
def regenerar_llave(data: ImputUser , db: Session = Depends(get_db)):

    usr_valid = validate_user(data.usuario, data.clave, db)
    if not usr_valid:
        raise HTTPException(status_code=404, detail="Usuario o clave incorrecta")
    reg_key = regenerate_key(data, db)
    if not reg_key:
        raise HTTPException(status_code=400, detail="No se pudo generar llave")
    return JSONResponse(status_code=200, content={'new key': reg_key})
    