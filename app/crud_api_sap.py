from typing import Optional
from fastapi import Depends, HTTPException
from fastapi.params import Query
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.utils import validate_key
from . import models
from app.models import Cierre, Grupo, Tramitacion, UsuarioSap
from .schemas import Coordinate, TramitacionCreate


# Operaciones CRUD 
def getGrupos(clase: str, db: Session):
    return db.query(Grupo).filter(Grupo.clase == clase).all()

def saveGroups(groups, db:Session):
    db.bulk_save_objects(groups)
    db.commit()
    
def getCierres(clase:str, grupo:str, db:Session):
    return db.query(Cierre).filter(Cierre.clase == clase, Cierre.codigo_grupo == grupo).all()

def saveCierres(cierres, db:Session):
    db.bulk_save_objects(cierres)
    db.commit()

def create_usuariosap(dataSap:dict, db: Session):

    us = getUsuariosap(dataSap['Usuario'], db)
    if not us:
        us = UsuarioSap(
            usuario = dataSap['Usuario'],
            nombre = dataSap['Nombre'],
            searchhelp = "OUTLL",
            werks = dataSap['Werks'],
            tipo = dataSap['Tipo'],
            tipotxt = dataSap['Tipotxt'],
            clase = dataSap['Clase'],
            clasetxt = dataSap['Clasetxt'],
            bukrs = dataSap['Bukrs'],
            butxt = dataSap['Butxt'],
            gsber = dataSap['Gsber'],
            gtext = dataSap['Gtext'],
            name1 = dataSap['Name1'],
            arbpl = dataSap['Arbpl'],
            activo = dataSap['Activo']
        )
        db.add(us)
        db.commit()
        db.refresh(us)
    return us

def getUsuariosap(usuarioStr:str, db: Session):
    return db.query(models.UsuarioSap).filter(
        models.UsuarioSap.usuario == usuarioStr
    ).first()


def create_proyectoap(dataSap:dict, db: Session):
    print(dataSap)
    us = getUsuariosap(dataSap['Usuario'], db)
    if not us:
        us = UsuarioSap(
            usuario = dataSap['Usuario'],
            nombre = dataSap['Nombre'],
            searchhelp = "OUTLL",
            werks = dataSap['Werks'],
            tipo = dataSap['Tipo'],
            tipotxt = dataSap['Tipotxt'],
            clase = dataSap['Clase'],
            clasetxt = dataSap['Clasetxt'],
            bukrs = dataSap['Bukrs'],
            butxt = dataSap['Butxt'],
            gsber = dataSap['Gsber'],
            gtext = dataSap['Gtext'],
            name1 = dataSap['Name1'],
            arbpl = dataSap['Arbpl'],
            activo = dataSap['Activo']
        )
        db.add(us)
        db.commit()
        db.refresh(us)
    return us

def getUProyectosap(usuarioStr:str, proyectoStr:str, db: Session):
    return db.query(models.ProyectoSap).filter(
        models.ProyectoSap.usuario == usuarioStr, 
        models.ProyectoSap.usuario == proyectoStr
    ).first()
    

# Calcular la distancia cuadrada y ordenar por la más cercana
def get_nearest_sequence(x: float, y: float, db: Session):
    
    nearest = db.query(
        models.Sequence,
        func.sqrt(func.pow(models.Sequence.x - x, 2) + func.pow(models.Sequence.y - y, 2)).label('distance')
    ).order_by('distance').first()
    
    if nearest:
        return {
            "sequence": nearest.Sequence.sequence,
            "distance": nearest.distance,
            "descripcion": nearest.Sequence.descripcion,
            "mru": nearest.Sequence.mru
        }
    else:
        return None

# Operaciones CRUD para la tabla de tramitaciones
def create_update_tramitacion(tramitacion: TramitacionCreate, db: Session):
    
    #try:
    usuario_id = validate_key(tramitacion.llave, db)

    if usuario_id:
        # Intentamos obtener un registro existente con el tramiteBPM
        db_tramitacion = db.query(Tramitacion).filter(Tramitacion.tramiteBpm == tramitacion.tramiteBpm).first()
        dicTramitacion = tramitacion.model_dump()
        del dicTramitacion['llave']
        if db_tramitacion:
            # Actualizar el registro si ya existe
            for key, value in dicTramitacion.items():
                setattr(db_tramitacion, key, value)
            db.commit()
            db.refresh(db_tramitacion)
            return {"message": "Tramitacion actualizada", "tramitacion": db_tramitacion}
        else:
            # Crear un nuevo registro si no existe
            new_tramitacion = Tramitacion(**dicTramitacion)
            db.add(new_tramitacion)
            db.commit()
            db.refresh(new_tramitacion)
            return {"message": "Tramitacion creada", "tramitacion": new_tramitacion}

    #except Exception as e:

    #    raise HTTPException(status_code=500, detail=str(e))
    


def get_tramitaciones(db: Session, llave:str,
    cuadrilla: Optional[str] = Query(None),
    ccontrato: Optional[str] = Query(None),
    orden: Optional[str] = Query(None),
    tipo: Optional[str] = Query(None),
    tramiteSar: Optional[str] = Query(None),
    tramiteBPM: Optional[str] = Query(None),
    novedad: Optional[str] = Query(None),
    resultado: Optional[str] = Query(None)
    ):

    try:
        usuario_id = validate_key(llave, db)
        
        if usuario_id:
            
            query = db.query(Tramitacion)

            if cuadrilla:
                query = query.filter(Tramitacion.cuadrilla == cuadrilla)
            if ccontrato:
                query = query.filter(Tramitacion.ccontrato == ccontrato)
            if orden:
                query = query.filter(Tramitacion.orden == orden)
            if tipo:
                query = query.filter(Tramitacion.tipo == tipo)
            if tramiteSar:
                query = query.filter(Tramitacion.tramiteSar == tramiteSar)
            if tramiteBPM:
                query = query.filter(Tramitacion.tramiteBpm == tramiteBPM)
            if novedad:
                query = query.filter(Tramitacion.novedad == novedad)
            if resultado is not None:
                query = query.filter(Tramitacion.resultado == resultado)

            tramitaciones = query.all()
            return tramitaciones

    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))



def get_tramitacion_by_id(db: Session, tramitacion_id: int):
    return db.query(models.Tramitacion).filter(models.Tramitacion.id == tramitacion_id).first()

def update_tramitacion(db: Session, tramitacion: models.Tramitacion, update_data: dict):
    for key, value in update_data.items():
        setattr(tramitacion, key, value)
    db.commit()
    db.refresh(tramitacion)
    return tramitacion

def delete_tramitacion(db: Session, tramitacion: models.Tramitacion):
    db.delete(tramitacion)
    db.commit()
    return tramitacion
