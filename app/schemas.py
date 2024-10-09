from typing import Optional
from pydantic import BaseModel

    
class ImputUser(BaseModel):
    usuario: str
    clave: str
    
class UserValidationRequest(ImputUser):
    llave: str


class ApiRequestModel(BaseModel):
    usuario_api: str
    clave_api: str
    endpoint: str
    data: dict = None  # Para las solicitudes POST

# Esquema de Pydantic para la tabla de secuencias
class SequenceBase(BaseModel):
    x: float
    y: float
    sequence: str
    descripcion: str
    mru: str

class SequenceCreate(SequenceBase):
    pass

class Sequence(SequenceBase):
    id: str

    class Config:
        orm_mode = True

# Esquema de Pydantic para la tabla de tramitaciones
class TramitacionBase(BaseModel):
    tramiteSar: str
    tramiteBpm: str
    novedad: str
    observacion: Optional[str] = None
    ejecucionPosterior: Optional[bool] = False

class TramitacionCreate(TramitacionBase):
    pass

class Tramitacion(TramitacionBase):
    id: int

    class Config:
        orm_mode = True
        
        
        
class Coordinate(BaseModel):
    x: float
    y: float