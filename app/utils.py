import hashlib
import os
import uuid
from .database import get_db_connection

# Helper para crear la llave (usando UUID)
def generate_key():
    return str(uuid.uuid4())

# Helper para obtener un hash de la clave
def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

# Helper para validar la llave
def validar_llave(llave: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f'SELECT id FROM usuarios WHERE llave = {llave}', ())
    user = cursor.fetchone()
    conn.close()
    
    if user:
        return user[0]
    else:
        raise ValueError("Llave no válida")

# Registrar la petición en la tabla de peticiones
def registrar_peticion(usuario_id: int, usuario_api: str, clave_api: str, request_api: str, status_api: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''INSERT INTO peticiones (usuario_id, usuario_api, clave_api, request_api, status_api)
                      VALUES (?, ?, ?, ?, ?)''', (usuario_id, usuario_api, clave_api, request_api, status_api))
    conn.commit()
    conn.close()
