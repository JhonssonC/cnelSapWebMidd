from sqlalchemy import func
from sqlalchemy.orm import Session
from . import models

# Operaciones CRUD para la tabla de secuencias
def create_sequence(db: Session, sequence: models.Sequence):
    db.add(sequence)
    db.commit()
    db.refresh(sequence)
    return sequence

# Calcular la distancia cuadrada y ordenar por la más cercana
def get_nearest_sequence(db: Session, x: float, y: float):
    
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
def create_tramitacion(db: Session, tramite: models.Tramitacion):
    db.add(tramite)
    db.commit()
    db.refresh(tramite)
    return tramite

def get_tramitaciones(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Tramitacion).offset(skip).limit(limit).all()

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
