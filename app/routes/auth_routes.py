from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse

from app.models import UserValidation
from ..schemas import ImputUser
from ..utils import hash_password, validate_user, update_key, generate_user


router = APIRouter()

# Endpoint para registrar un nuevo usuario
@router.post("/registrar/")
def registrar_usuario(data: ImputUser):
    usr = generate_user(data)
    if not usr:
        return JSONResponse(status_code=404, content={'message': 'No se pudo generar el Usuario'})
    return JSONResponse(status_code=201, content={"message": "Se ha regitrado Usuario", "data":usr})
    
    
# Endpoint para regenerar la llave
@router.post("/regenerar/")
def regenerar_llave(data: ImputUser):

    n_key = generate_user(data)
    if not n_key:
        return JSONResponse(status_code=404, content={'message': 'Usuario o clave incorrecta'})
    return JSONResponse(status_code=200, content={'key': n_key})
    