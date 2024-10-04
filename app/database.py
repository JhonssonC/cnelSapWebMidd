import sqlite3

# Inicializar la base de datos
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # Crear tabla de usuarios
    cursor.execute('''CREATE TABLE IF NOT EXISTS usuarios (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        usuario TEXT NOT NULL,
                        clave TEXT NOT NULL,
                        llave TEXT NOT NULL)''')
    
    # Crear tabla para registro de peticiones
    cursor.execute('''CREATE TABLE IF NOT EXISTS peticiones (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        usuario_id INTEGER,
                        usuario_api TEXT,
                        clave_api TEXT,
                        request_api TEXT,
                        status_api TEXT,
                        FOREIGN KEY(usuario_id) REFERENCES usuarios(id))''')
    
    conn.commit()
    conn.close()

# Conexión a la base de datos
def get_db_connection():
    conn = sqlite3.connect('database.db')
    return conn