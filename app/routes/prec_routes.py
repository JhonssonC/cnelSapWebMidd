import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud_precoactiva import get_nearest_sequence
from ..schemas import Coordinate
from ..database import SessionLocal


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/route/")
def get_route(coordinate: Coordinate, db: Session = Depends(get_db)):
    result = get_nearest_sequence(db, coordinate.x, coordinate.y)
    if not result:
        raise HTTPException(status_code=404, detail="Sequence not found")
    return result
    
    