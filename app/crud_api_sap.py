from typing import Optional
from fastapi import Depends, HTTPException
from fastapi.params import Query
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.utils import validate_key
from . import models
from app.models import Cierre, ContratoSap, Grupo, Tramitacion, UsuarioSap
from .schemas import Contratosap, Coordinate, TramitacionCreate


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
    
def saveContrato(contrato: Contratosap, db: Session):
    dictContrato = contrato.model_dump()
    coincidencias = db.query(ContratoSap).filter(
        ContratoSap.usuario == contrato.usuario,
        ContratoSap.usuario_web_orden == contrato.usuario_web_orden, 
        ContratoSap.acreedor == contrato.acreedor,
        ContratoSap.contrato == contrato.contrato,
        ContratoSap.posicion_cont == contrato.posicion_cont
        ).all()
    if not (coincidencias):
        new_contrato = ContratoSap(**dictContrato)
        db.add(new_contrato)
        db.commit()
        db.refresh(new_contrato)
        print("Contrato Agregado")
    else:
        print("Contrato Existente")

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
        print('Usuario Creado!')
    else:
        print('Usuario Existente!')
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
    
