from contextlib import contextmanager
import os
import sqlite3
from dotenv import load_dotenv
from sqlalchemy import create_engine, event, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.logger import logger

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///database.db")

DB_POOL_SIZE = int(os.getenv("DB_POOL_SIZE", "10"))
DB_MAX_OVERFLOW = int(os.getenv("DB_MAX_OVERFLOW", "15"))
DB_POOL_TIMEOUT = int(os.getenv("DB_POOL_TIMEOUT", "30"))
DB_POOL_RECYCLE = int(os.getenv("DB_POOL_RECYCLE", "1800"))

is_sqlite = DATABASE_URL.startswith("sqlite")

if is_sqlite:
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False, "timeout": 30},
        pool_size=DB_POOL_SIZE,
        max_overflow=DB_MAX_OVERFLOW,
        pool_timeout=DB_POOL_TIMEOUT,
        pool_recycle=DB_POOL_RECYCLE,
        pool_pre_ping=True,
    )

    @event.listens_for(engine, "connect")
    def _set_sqlite_pragma(dbapi_connection, connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA journal_mode=WAL;")
        cursor.execute("PRAGMA synchronous=NORMAL;")
        cursor.execute("PRAGMA busy_timeout=30000;")
        cursor.close()
else:
    engine = create_engine(
        DATABASE_URL,
        pool_size=DB_POOL_SIZE,
        max_overflow=DB_MAX_OVERFLOW,
        pool_timeout=DB_POOL_TIMEOUT,
        pool_recycle=DB_POOL_RECYCLE,
        pool_pre_ping=True,
    )

# Fábrica de sesiones sincrónicas
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

SQL_FILE_PATH = "sequences.sql"
SQLITE_SEED_PATH = os.getenv("SQLITE_SEED_PATH", "database.db")
ADVISORY_LOCK_ID = 74839201


def create_db_and_tables():
    """
    Crea las tablas de forma segura cuando múltiples contenedores/workers inician simultáneamente.
    """
    if not is_sqlite:
        with engine.connect() as conn:
            conn.execute(text(f"SELECT pg_advisory_lock({ADVISORY_LOCK_ID})"))
            try:
                Base.metadata.create_all(bind=conn)
                conn.commit()
            finally:
                conn.execute(text(f"SELECT pg_advisory_unlock({ADVISORY_LOCK_ID})"))
                conn.commit()
    else:
        Base.metadata.create_all(bind=engine)


def _migrate_from_sqlite_if_needed(pg_conn):
    """
    Migra automáticamente los datos iniciales desde database.db hacia PostgreSQL
    si las tablas en PostgreSQL están vacías.
    """
    if not os.path.exists(SQLITE_SEED_PATH):
        return

    tables_config = [
        {
            "name": "users",
            "columns": ["id", "usuario", "clave", "llave", "habilitado", "superuser"],
            "bool_cols": {"habilitado", "superuser"},
            "has_serial": True,
        },
        {
            "name": "sequences",
            "columns": ["id", "x", "y", "sequence", "descripcion", "mru"],
            "bool_cols": set(),
            "has_serial": False,
        },
        {
            "name": "tramitationsPrec",
            "columns": [
                "id", "fechahora", "cuadrilla", "ccontrato", "orden", "tipo",
                "tramiteSar", "tramiteBpm", "nombe_cliente", "novedad",
                "observacion", "resultado", "se_desconecto", "se_corto",
                "fabrica", "marca", "lectura",
            ],
            "bool_cols": set(),
            "has_serial": True,
        },
        {
            "name": "grupo",
            "columns": ["id", "clase", "codigo_grupo", "desc_cod_grup"],
            "bool_cols": set(),
            "has_serial": True,
        },
        {
            "name": "cierre",
            "columns": ["id", "clase", "codigo_cierre", "desc_cod_cierr", "codigo_grupo"],
            "bool_cols": set(),
            "has_serial": True,
        },
        {
            "name": "usuariosap",
            "columns": [
                "id", "usuario", "nombre", "searchhelp", "werks", "tipo",
                "tipotxt", "clase", "clasetxt", "bukrs", "butxt", "gsber",
                "gtext", "name1", "arbpl", "activo",
            ],
            "bool_cols": set(),
            "has_serial": True,
        },
        {
            "name": "serviciosap",
            "columns": ["id", "ebeln", "ebelp", "srvpos", "tbtwr", "waers", "meins", "descripcion"],
            "bool_cols": set(),
            "has_serial": True,
        },
        {
            "name": "contratosap",
            "columns": [
                "id", "usuario", "searchhelp", "usuario_web_orden",
                "usuario_web_orden_desc", "lote", "acreedor", "acreedor_desc",
                "contrato", "contrato_desc", "posicion_cont", "posicion_cont_desc",
            ],
            "bool_cols": set(),
            "has_serial": True,
        },
        {
            "name": "aportal_cookies",
            "columns": ["id", "llave", "app", "cookies_json", "last_saved", "last_used"],
            "bool_cols": set(),
            "has_serial": True,
        },
    ]

    if os.getenv("MIGRATE_REQUEST_LOGS", "false").lower() == "true":
        tables_config.append({
            "name": "requestsApiSapWeb",
            "columns": ["id", "usuario_id", "usuario_api", "clave_api", "endpoint", "data", "status"],
            "bool_cols": set(),
            "has_serial": True,
        })

    sqlite_conn = sqlite3.connect(SQLITE_SEED_PATH)
    sqlite_cur = sqlite_conn.cursor()

    try:
        existing_sqlite_tables = {
            r[0]
            for r in sqlite_cur.execute(
                "SELECT name FROM sqlite_master WHERE type='table'"
            ).fetchall()
        }

        for tbl in tables_config:
            tname = tbl["name"]
            if tname not in existing_sqlite_tables:
                continue

            count_pg = pg_conn.execute(text(f'SELECT COUNT(*) FROM "{tname}"')).scalar()
            if count_pg and count_pg > 0:
                continue

            cols = tbl["columns"]
            quoted_cols = ", ".join(f'"{c}"' for c in cols)
            placeholders = ", ".join(f":{c}" for c in cols)
            insert_stmt = text(f'INSERT INTO "{tname}" ({quoted_cols}) VALUES ({placeholders})')

            sqlite_cur.execute(f'SELECT {quoted_cols} FROM "{tname}"')
            total_migrated = 0
            while True:
                rows = sqlite_cur.fetchmany(5000)
                if not rows:
                    break
                batch = []
                datetime_cols = {"fechahora", "last_saved", "last_used"}
                for row in rows:
                    record = {}
                    for idx, col_name in enumerate(cols):
                        val = row[idx]
                        if col_name in tbl["bool_cols"] and val is not None:
                            val = bool(val)
                        elif col_name in datetime_cols and val == "":
                            val = None
                        record[col_name] = val
                    batch.append(record)
                pg_conn.execute(insert_stmt, batch)
                total_migrated += len(batch)

            if total_migrated > 0:
                logger.info(f"Migrados {total_migrated} registros desde SQLite a PostgreSQL en tabla '{tname}'.")

            if tbl["has_serial"] and total_migrated > 0:
                pg_conn.execute(
                    text(
                        f"""
                        SELECT setval(
                            pg_get_serial_sequence('"{tname}"', 'id'),
                            COALESCE((SELECT MAX(id) FROM "{tname}"), 1),
                            true
                        )
                        """
                    )
                )

        pg_conn.commit()
    except Exception as exc:
        pg_conn.rollback()
        logger.error(f"Error durante la migración inicial desde SQLite: {exc}")
    finally:
        sqlite_conn.close()


def init_db():
    """
    Inicializa los datos semilla asegurando exclusión mutua entre contenedores/workers.
    """
    with engine.connect() as conn:
        if not is_sqlite:
            conn.execute(text(f"SELECT pg_advisory_lock({ADVISORY_LOCK_ID})"))
        try:
            if not is_sqlite:
                _migrate_from_sqlite_if_needed(conn)

            # Fallback a sequences.sql si la tabla sequences sigue vacía
            result = conn.execute(text('SELECT COUNT(*) FROM "sequences"'))
            count = result.scalar()
            if count == 0 and os.path.exists(SQL_FILE_PATH):
                logger.info("Cargando secuencias desde sequences.sql...")
                with open(SQL_FILE_PATH, "r", encoding="utf-8") as sql_file:
                    for line in sql_file:
                        stmt = line.strip()
                        if stmt:
                            conn.execute(text(stmt))
                conn.commit()
        finally:
            if not is_sqlite:
                conn.execute(text(f"SELECT pg_advisory_unlock({ADVISORY_LOCK_ID})"))
                conn.commit()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@contextmanager
def get_db_context():
    """
    Context manager para operaciones puntuales de base de datos, evitando retener
    conexiones del pool durante llamadas HTTP externas lentas.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
