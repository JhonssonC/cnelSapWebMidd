import hashlib
import os
import uuid

from sqlalchemy import func
from sqlalchemy.orm import Session

from app import models
from app.schemas import ImputUser, UserValidationRequest
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
        new_usr = models.UserValidation(**data.model())
        new_usr.clave=hash_password(data.clave)
        new_usr.llave=generate_key()
        db.add(new_usr)
        db.commit()
        usr = UserValidationRequest(usuario=data.usuario, clave=data.clave, llave=new_usr.clave)
        return usr
    
# Helper para validar la llave
def validate_user(usuario: str, clave: str):
    db = SessionLocal()
    user = db.query(models.UserValidation).filter(models.UserValidation.usuario == usuario, models.UserValidation.clave == hash_password(clave)).first()
    if user:
        return user
    

# Registrar la petición en la tabla de peticiones
def registrar_peticion(usuario_id: int, usuario_api: str, clave_api: str, request_api: str, status_api: str):

    db = SessionLocal()
    new_usr = models.ApiRequest(usuario_api=usuario_api, clave_api=clave_api, endpoint)
    new_usr.clave=hash_password(data.clave)
    new_usr.llave=generate_key()
    db.add(new_usr)
    db.commit()
    usr = UserValidationRequest(usuario=data.usuario, clave=data.clave, llave=new_usr.clave)
    return usr

    db = SessionLocal()
    
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''INSERT INTO peticiones (usuario_id, usuario_api, clave_api, request_api, status_api)
                      VALUES (?, ?, ?, ?, ?)''', (usuario_id, usuario_api, clave_api, request_api, status_api))
    conn.commit()
    conn.close()