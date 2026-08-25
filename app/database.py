from contextlib import contextmanager
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()
#TURSO_DATABASE_URL = os.getenv("TURSO_DATABASE_URL")
#TURSO_AUTH_TOKEN = os.getenv("TURSO_AUTH_TOKEN")
#engine = create_engine(f"sqlite+{TURSO_DATABASE_URL}?secure=true",connect_args={"auth_token": TURSO_AUTH_TOKEN,})

dbUrl = 'sqlite:///database.db'
engine = create_engine(dbUrl, connect_args={"check_same_thread": False}, pool_pre_ping=True)



# Crea una fábrica de sesiones sincrónicas
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base = declarative_base()


def create_db_and_tables():
    Base.metadata.create_all(bind=engine)
    
# Ruta al archivo SQL
SQL_FILE_PATH = "sequences.sql"

def init_db():
    # Ejecutar el archivo SQL al iniciar la aplicación
    if os.path.exists(SQL_FILE_PATH):
        with engine.connect() as conn:
            
            # Verificar si la tabla users está vacía
            result = conn.execute(text("SELECT COUNT(*) FROM sequences"))
            count = result.scalar()

            # Si la tabla está vacía, insertar los datos iniciales
            if count == 0:
                # subir registros si no existen
                with open(SQL_FILE_PATH, "r") as sql_file:
                    for line in sql_file:
                        query = text(line)
                        conn.execute(query)
                conn.commit()
    else:
        pass
        

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()