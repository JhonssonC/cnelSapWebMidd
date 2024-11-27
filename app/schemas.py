import datetime
from typing import Optional
from pydantic import BaseModel

    
class ImputUser(BaseModel):
    usuario: str
    clave: str
    
class UserValidationRequest(ImputUser):
    llave: str
    superuser: Optional[bool] = False
    habilitado: Optional[bool] = False
    
    class Config:
        from_attributes = True

# Esquema de Pydantic para la tabla de ApiRequestModel
class ApiRequestModelBase(BaseModel):
    usuario_api: str
    clave_api: str
    endpoint: str
    
class ApiRequestModelInput(ApiRequestModelBase):
    llave: str
    data: dict = None

class ApiRequestModel(ApiRequestModelBase):
    usuario_id: int
    data: str
    status: int
    
    class Config:
        from_attributes = True
    
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
        from_attributes = True

# Esquema de Pydantic para la tabla de tramitaciones
class TramitacionBase(BaseModel):

    fechahora: datetime.datetime
    cuadrilla: str
    ccontrato: str 
    orden: str
    tipo: str
    tramiteSar: str
    tramiteBpm: str
    nombe_cliente: str
    novedad: str
    observacion: str
    resultado: str
    se_desconecto: str
    se_corto: str
    fabrica: str
    marca: str
    lectura: str

class TramitacionCreate(TramitacionBase):
    llave: str
    pass

class Tramitacion(TramitacionBase):
    id: int

    class Config:
        from_attributes = True
        
        
        
class Coordinate(BaseModel):
    x: float
    y: float