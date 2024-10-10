from sqlalchemy import Column, Float, Integer, String, Boolean
from .database import Base

class Sequence(Base):
    __tablename__ = "sequences"
    
    id = Column(String, primary_key=True, index=True)
    x = Column(Float, nullable=False)
    y = Column(Float, nullable=False)
    sequence = Column(String, nullable=False)
    descripcion = Column(String, nullable=False)
    mru = Column(String, nullable=False)

# Nueva tabla para CRUD
class Tramitacion(Base):
    __tablename__ = "tramitaciones"
    
    id = Column(Integer, primary_key=True, index=True)
    tramiteSar = Column(String, nullable=False)
    tramiteBpm = Column(String, nullable=False)
    novedad = Column(String, nullable=False)
    observacion = Column(String, nullable=True)
    ejecucionPosterior = Column(Boolean, default=False)

class UserValidation(Base):
    __tablename__ = "Usuario"
    
    id = Column(Integer, primary_key=True, index=True)
    usuario= Column(String, nullable=False)
    clave= Column(String, nullable=False)
    llave= Column(String, nullable=False)
    superuser= Column(Boolean, nullable=False, default=False)

class ApiRequest(Base):
    __tablename__ = "PeticionesApiSapWeb"
    
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, nullable=False)
    usuario_api = Column(String, nullable=False)
    clave_api = Column(String, nullable=False)
    endpoint = Column(String, nullable=False)
    data = Column(String)# Usamos JSON para almacenar el dict
    status = Column(Integer, nullable=False)