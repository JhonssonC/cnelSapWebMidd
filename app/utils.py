import base64
import hashlib
import json
import os
import uuid
from app import models
from app.schemas import ApiRequestModelInput, ImputUser, UserValidationRequest
from sqlalchemy.orm import Session
from datetime import datetime

#Helper de codificacion de contraseña - Sap
def encode(p):
    
    def do_modifica_char(str):
        if '=' in str:
            str = str.replace('=', '¬')
        if '+' in str:
            str = str.replace('+', '¥')
        if '/' in str:
            str = str.replace('/', '†')
        return str
    
    dataBytes = p.encode("utf-8")
    strb64 = str(base64.b64encode(dataBytes))
    toenconded = strb64[2:len(strb64)-1]
    encoded = do_modifica_char(toenconded)
    print('Contraseña codificada:', encoded)
    return encoded

# Helper para crear la llave (usando UUID)
def generate_key():
    return str(uuid.uuid4())

# Helper para obtener un hash de la clave
def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

# Helper para validar la llave
def validate_key(llave: str, db: Session):
    
    user = db.query(models.UserValidation).filter(models.UserValidation.llave == llave).first()
    print(user.usuario)
    if user:
        return user

# Helper para guardar un Cliente Nuevo
def generate_user(data: ImputUser, db: Session):
    if len(data.usuario)>=6 and len(data.clave)>=6:
        
        new_usr = models.UserValidation(
            usuario=data.usuario,
            clave=hash_password(data.clave),
            llave=generate_key()
        )
        db.add(new_usr)
        db.commit()
        usr = UserValidationRequest(usuario=data.usuario, clave=data.clave, llave=new_usr.llave)
        return usr
    
# Helper para validar la llave
def validate_user(usuario: str, clave: str, db: Session):
    
    user = db.query(models.UserValidation).filter(models.UserValidation.usuario == usuario, models.UserValidation.clave == hash_password(clave)).first()
    if user:
        return user
    
# Helper para validar si existe el usuario
def exists_user(usuario: str, db: Session):
    
    user = db.query(models.UserValidation).filter(models.UserValidation.usuario == usuario).first()
    if user:
        return True
    return False

# Helper para regenerar llave
def regenerate_key(data: ImputUser, db: Session):
    
    user = db.query(models.UserValidation).filter(models.UserValidation.usuario == data.usuario, models.UserValidation.clave == hash_password(data.clave)).first()
    if user:
        nueva_llave= generate_key()
        user.llave = nueva_llave
        return {"usuario": data.usuario, "llave": nueva_llave}
    
    

# Registrar la petición en la tabla de peticiones
def register_request(usuario_id: int, api_request: ApiRequestModelInput, status_api: int, db: Session):
    
    new_req = models.ApiRequest(
        usuario_id = usuario_id,
        usuario_api = api_request.usuario_api,
        clave_api = api_request.clave_api,
        endpoint = api_request.endpoint,
        data = json.dumps(api_request.data),# Usamos JSON para almacenar el dict
        status = status_api
    )
    db.add(new_req)
    db.commit()

    return api_request


#Validadores

def validar_fechas(datos):
    mensaje = ""
    error = {"value": "", "mensaje": ""}  # Se incluye el mensaje de error en el retorno
    
    def mostrar_mensaje(mensaje):
        print(mensaje)  # Puedes reemplazar esto por un logger o cualquier otro mecanismo.

    # Validar FecEjecTrab
    if not datos.get("FecEjecTrab"):
        mensaje = "Debe completar Fecha Ejecución Trabajo"
        mostrar_mensaje(mensaje)
        error["value"] = "X"
        error["mensaje"] = mensaje
        return error

    # Validar formato de FechaIngreso
    if not datos.get("FechaIngreso"):
        mensaje = "Debe completar Fecha de ingreso"
        mostrar_mensaje(mensaje)
        error["value"] = "X"
        error["mensaje"] = mensaje
        return error
    else:
        fecha_ingreso = datos["FechaIngreso"]
        if fecha_ingreso[2:3] != "-" or fecha_ingreso[5:6] != "-":
            mensaje = "Formato de fecha de ingreso inválido"
            mostrar_mensaje(mensaje)
            error["value"] = "X"
            error["mensaje"] = mensaje
            return error

    # Validar HoraFinTrab
    if not datos.get("HoraFinTrab"):
        mensaje = "Debe completar Hora fin de Trabajo"
        mostrar_mensaje(mensaje)
        error["value"] = "X"
        error["mensaje"] = mensaje
        return error

    # Validar fechas (FechaIngreso, FecEjecTrab, FecImpre)
    try:
        fecha_ingreso_dt = datetime.strptime(datos["FechaIngreso"], "%d-%m-%Y")
        fec_impre_dt = datetime.strptime(datos["FecImpre"], "%d-%m-%Y")
        fec_ejec_trab_dt = datetime.strptime(datos["FecEjecTrab"], "%d-%m-%Y")
    except ValueError:
        mensaje = "Formato de fecha inválido"
        mostrar_mensaje(mensaje)
        error["value"] = "X"
        error["mensaje"] = mensaje
        return error

    if fecha_ingreso_dt < fec_impre_dt:
        mensaje = "Fecha de Ingreso no puede ser menor a Fecha Impresión"
        mostrar_mensaje(mensaje)
        error["value"] = "X"
        error["mensaje"] = mensaje
        return error

    if fecha_ingreso_dt < fec_ejec_trab_dt:
        mensaje = "Fecha de Ingreso no puede ser menor a Fecha Ejecución Trabajo"
        mostrar_mensaje(mensaje)
        error["value"] = "X"
        error["mensaje"] = mensaje
        return error

    # Validar horas (HoraIniTrab, HoraFinTrab, HoraIngreso)
    try:
        hora_ini_trab = datetime.strptime(datos["HoraIniTrab"], "%H:%M")
        hora_fin_trab = datetime.strptime(datos["HoraFinTrab"], "%H:%M")
        hora_ingreso = datetime.strptime(datos["HoraIngreso"], "%H:%M")
    except ValueError:
        mensaje = "Formato de hora inválido"
        mostrar_mensaje(mensaje)
        error["value"] = "X"
        error["mensaje"] = mensaje
        return error

    if hora_ini_trab > hora_fin_trab:
        mensaje = "Hora Inicio de trabajo no puede ser mayor a Hora Fin de trabajo"
        mostrar_mensaje(mensaje)
        error["value"] = "X"
        error["mensaje"] = mensaje
        return error

    if fecha_ingreso_dt == fec_ejec_trab_dt and hora_ingreso <= hora_fin_trab:
        mensaje = "Hora de ingreso debe ser mayor a Hora fin de Trabajo"
        mostrar_mensaje(mensaje)
        error["value"] = "X"
        error["mensaje"] = mensaje
        return error

    return error


#Validacion de sellos
def do_valida_sellos(sellos):
    mensaje = ""
    if not sellos or not isinstance(sellos, list) or len(sellos) == 0:
        return {"error": False, "mensaje": ""}  # No hay sellos para validar

    # Extraer la información de la primera fila
    nro_sello = sellos[0].get("NroSello")
    tipo_sello = sellos[0].get("Tipo")

    # Iterar a partir del segundo elemento
    for i in range(1, len(sellos)):
        row = sellos[i]
        if row.get("NroSello"):
            if row.get("NroSello") == nro_sello and row.get("Tipo") == tipo_sello:
                mensaje = "No se puede ingresar nro. de sellos y tipos duplicados"
                print(mensaje)  # Simula mostrar el mensaje (puedes usar un logger aquí)
                return {"error": True, "mensaje": mensaje}

    return {"error": False, "mensaje": ""}  # No hay errores
