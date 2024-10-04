from pydantic import BaseModel

class UserValidationRequest(BaseModel):
    usuario: str
    clave: str
    llave: str

class ApiRequestModel(BaseModel):
    usuario_api: str
    clave_api: str
    endpoint: str
    data: dict = None  # Para las solicitudes POST
