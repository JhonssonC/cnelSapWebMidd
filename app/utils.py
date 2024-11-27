import base64
import hashlib
import json
import os
import uuid
from app import models
from app.schemas import ApiRequestModelInput, ImputUser, UserValidationRequest
from sqlalchemy.orm import Session


#Helper de codificacion de contraseña - Sap
def encode(p):
    
    def do_modifica_char(str):
        if '=' in str:
            str = str.replace('=', '¬')
        if '+' in str:
            str = str.replace('+', '¥')
        if '/' in str:
            str = str.replace('/', '†')
        return str
    
    dataBytes = p.encode("utf-8")
    strb64 = str(base64.b64encode(dataBytes))
    toenconded = strb64[2:len(strb64)-1]
    encoded = do_modifica_char(toenconded)
    print('Contraseña codificada:', encoded)
    return encoded

# Helper para crear la llave (usando UUID)
def generate_key():
    return str(uuid.uuid4())

# Helper para obtener un hash de la clave
def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

# Helper para validar la llave
def validate_key(llave: str, db: Session):
    
    user = db.query(models.UserValidation).filter(models.UserValidation.llave == llave).first()
    print(user.usuario)
    if user:
        return user

# Helper para guardar un Cliente Nuevo
def generate_user(data: ImputUser, db: Session):
    if len(data.usuario)>=6 and len(data.clave)>=6:
        
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
def validate_user(usuario: str, clave: str, db: Session):
    
    user = db.query(models.UserValidation).filter(models.UserValidation.usuario == usuario, models.UserValidation.clave == hash_password(clave)).first()
    if user:
        return user
    
# Helper para validar si existe el usuario
def exists_user(usuario: str, db: Session):
    
    user = db.query(models.UserValidation).filter(models.UserValidation.usuario == usuario).first()
    if user:
        return True
    return False

# Helper para regenerar llave
def regenerate_key(data: ImputUser, db: Session):
    
    user = db.query(models.UserValidation).filter(models.UserValidation.usuario == data.usuario, models.UserValidation.clave == hash_password(data.clave)).first()
    if user:
        nueva_llave= generate_key()
        user.llave = nueva_llave
        return {"usuario": data.usuario, "llave": nueva_llave}
    
    

# Registrar la petición en la tabla de peticiones
def register_request(usuario_id: int, api_request: ApiRequestModelInput, status_api: int, db: Session):
    
    new_req = models.ApiRequest(
        usuario_id = usuario_id,
        usuario_api = api_request.usuario_api,
        clave_api = api_request.clave_api,
        endpoint = api_request.endpoint,
        data = json.dumps(api_request.data),# Usamos JSON para almacenar el dict
        status = status_api
    )
    db.add(new_req)
    db.commit()

    return api_request