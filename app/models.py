from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship
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
    __tablename__ = "tramitationsPrec"
    
    id = Column(Integer, primary_key=True, index=True)
    fechahora = Column(DateTime, nullable=False)
    cuadrilla = Column(String, nullable=False)
    ccontrato = Column(String)
    orden = Column(String)
    tipo = Column(String, nullable=False)
    tramiteSar = Column(String, nullable=False)
    tramiteBpm = Column(String, nullable=False)
    nombe_cliente = Column(String)
    novedad = Column(String)
    observacion = Column(String)
    resultado = Column(String, nullable=False)
    se_desconecto = Column(String)
    se_corto = Column(String)
    fabrica = Column(String)
    marca = Column(String)
    lectura = Column(String)
    

class UserValidation(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    usuario= Column(String, nullable=False)
    clave= Column(String, nullable=False)
    llave= Column(String, nullable=False)
    habilitado = Column(Boolean, nullable=False, default=False)
    superuser= Column(Boolean, nullable=False, default=False)

class ApiRequest(Base):
    __tablename__ = "requestsApiSapWeb"
    
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, nullable=False)
    usuario_api = Column(String, nullable=False)
    clave_api = Column(String, nullable=False)
    endpoint = Column(String, nullable=False)
    data = Column(String)# Usamos JSON para almacenar el dict
    status = Column(Integer, nullable=False)
    
    
    
#Codigos

class Grupo(Base):
    __tablename__ = "grupo"
    
    id = Column(Integer, primary_key=True, index=True)
    clase = Column(String, nullable=False)
    codigo_grupo = Column(String)  
    desc_cod_grup = Column(String, nullable=False)
    

class Cierre(Base):
    __tablename__ = "cierre"
    
    id = Column(Integer, primary_key=True, index=True)
    clase = Column(String, nullable=False)
    codigo_cierre = Column(String)  
    desc_cod_cierr = Column(String, nullable=False)
    codigo_grupo = Column(String, ForeignKey("grupo.codigo_grupo"), nullable=False)  # Clave foránea
