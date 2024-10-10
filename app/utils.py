import hashlib
import json
import os
import uuid

from sqlalchemy import func
from sqlalchemy.orm import Session

from app import models
from app.schemas import ApiRequestModelInput, ImputUser, UserValidationRequest
from .database import SessionLocal

# Helper para crear la llave (usando UUID)
def generate_key():
    return str(uuid.uuid4())

# Helper para obtener un hash de la clave
def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

# Helper para validar la llave
def validate_key(llave: str):
    db = SessionLocal()
    user = db.query(models.UserValidation).filter(models.UserValidation.llave == llave).first()
    if user:
        return user

# Helper para guardar un Cliente Nuevo
def generate_user(data: ImputUser):
    if len(data.usuario)>=6 and len(data.clave)>=6:
        db = SessionLocal()
        new_usr = models.UserValidation(
            usuario=data.usuario,
            clave=hash_password(data.clave),
            llave=generate_key()
        )
        db.add(new_usr)
        db.commit()
        usr = UserValidationRequest(usuario=data.usuario, clave=data.clave, llave=new_usr.llave)
        return usr
    
# Helper para validar la llave
def validate_user(usuario: str, clave: str):
    db = SessionLocal()
    user = db.query(models.UserValidation).filter(models.UserValidation.usuario == usuario, models.UserValidation.clave == hash_password(clave)).first()
    if user:
        return user
    
# Helper para validar si existe el usuario
def exists_user(usuario: str):
    db = SessionLocal()
    user = db.query(models.UserValidation).filter(models.UserValidation.usuario == usuario).first()
    if user:
        return user

# Helper para regenerar llave
def regenerate_key(usuario: str, clave: str):
    db = SessionLocal()
    user = db.query(models.UserValidation).filter(models.UserValidation.usuario == usuario, models.UserValidation.clave == hash_password(clave)).first()
    if user:
        nueva_llave= generate_key()
        user.llave = nueva_llave
        return {"usuario": usuario, "llave": nueva_llave}
    
    

# Registrar la petición en la tabla de peticiones
def register_request(usuario_id: int, api_request: ApiRequestModelInput, status_api: int):

    db = SessionLocal()
    
    new_req = models.ApiRequest(
        usuario_id = usuario_id,
        usuario_api = api_request.usuario_api,
        clave_api = api_request.clave_api,
        endpoint = api_request.endpoint,
        data = json.dumps(api_request.data),# Usamos JSON para almacenar el dict
        status = api_request.status
    )
    db.add(new_req)
    db.commit()

    return api_request