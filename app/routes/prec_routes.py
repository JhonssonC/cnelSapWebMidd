import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud_precoactiva import get_nearest_sequence
from ..schemas import ApiRequestModel, Coordinate
from ..utils import validar_llave, registrar_peticion
import requests


router = APIRouter()


@router.post("/route/")
def get_route(coordinate: Coordinate, db: Session = Depends(get_db)):
    result = get_nearest_sequence(db, coordinate.x, coordinate.y)
    if not result:
        raise HTTPException(status_code=404, detail="Sequence not found")
    return result
    
    