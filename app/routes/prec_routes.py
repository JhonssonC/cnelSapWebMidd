from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.crud_precoactiva import create_update_tramitacion, get_nearest_sequence, get_tramitaciones
from app.database import get_db
from app.schemas import Coordinate, TramitacionCreate


router = APIRouter()

@router.post("/route/")
def get_route(coordinate: Coordinate):
    result = get_nearest_sequence(coordinate.x, coordinate.y)
    if not result:
        raise HTTPException(status_code=404, detail="Sequence not found")
    return result
    
# Endpoint para crear o actualizar una tramitación
@router.post("/tramitacion/")
def create_or_update_tramitacion(tramitacion: TramitacionCreate, db: Session = Depends(get_db) ):
    print(tramitacion)
    return create_update_tramitacion(tramitacion, db)

    
# Endpoint para listar tramitaciones con criterios acumulativos
@router.get("/tramitaciones/")
def list_tramitaciones(
    cuadrilla: Optional[str] = Query(None),
    ccontrato: Optional[str] = Query(None),
    orden: Optional[str] = Query(None),
    tipo: Optional[str] = Query(None),
    tramiteSar: Optional[str] = Query(None),
    tramiteBPM: Optional[str] = Query(None),
    novedad: Optional[str] = Query(None),
    resultado: Optional[str] = Query(None),
    llave: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    return get_tramitaciones(db, llave, cuadrilla, ccontrato, orden, tipo, tramiteSar, tramiteBPM, novedad, resultado)