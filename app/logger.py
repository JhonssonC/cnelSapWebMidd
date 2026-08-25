import os
import json
import logging
from logging.handlers import TimedRotatingFileHandler
from datetime import datetime
from fastapi import Request

# Directorio de logs en la raíz del proyecto
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGS_DIR = os.path.join(BASE_DIR, "logs")
os.makedirs(LOGS_DIR, exist_ok=True)

from datetime import datetime
try:
    from zoneinfo import ZoneInfo
    LOCAL_TZ = ZoneInfo("America/Guayaquil")
except ImportError:
    import pytz
    LOCAL_TZ = pytz.timezone("America/Guayaquil")

# Formateador personalizado
class DailyLogFormatter(logging.Formatter):
    def format(self, record):
        dt = datetime.fromtimestamp(record.created, tz=LOCAL_TZ)
        timestamp = dt.strftime('%Y-%m-%d %H:%M:%S')
        level = record.levelname
        msg = record.getMessage()
        return f"{timestamp} | {level:<7} | {msg}"

# Crear el logger principal
logger = logging.getLogger("cnel_app")
logger.setLevel(logging.INFO)
logger.propagate = False

# Evitar duplicar handlers
if not logger.handlers:
    # Handlers para consola y archivo
    formatter = DailyLogFormatter()

    # Consola Handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

    # File Handler con rotación diaria
    log_file_path = os.path.join(LOGS_DIR, "app.log")
    file_handler = TimedRotatingFileHandler(
        filename=log_file_path,
        when="midnight",
        interval=1,
        backupCount=30,
        encoding="utf-8"
    )
    file_handler.suffix = "%Y-%m-%d"
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

def log_request(endpoint: str, usuario: str, status_code: int, detail: str = None):
    """
    Función utilitaria para registrar peticiones respetando el formato:
    - Exitoso: Endpoint consultado, usuario y estatus.
    - Error: Endpoint consultado, usuario, estatus y detalle.
    """
    usr = usuario if usuario else "N/A"
    if status_code < 400:
        logger.info(f"Endpoint: {endpoint} | Usuario: {usr} | Estatus: {status_code}")
    else:
        det_str = f" | Detalle: {detail}" if detail else ""
        logger.error(f"Endpoint: {endpoint} | Usuario: {usr} | Estatus: {status_code}{det_str}")

async def get_user_from_request(request: Request) -> str:
    """
    Extrae el usuario de la petición buscando de manera segura campos conocidos
    como 'usuario', 'usuario_api', 'usrcons', 'user' sin exponer contraseñas ni llaves.
    """
    user = None

    # 1. Buscar en Query Params
    for param in ["usuario", "usuario_api", "usrcons", "user"]:
        if param in request.query_params:
            user = request.query_params[param]
            if user:
                return user

    # 2. Buscar en el Body JSON si es aplicable
    try:
        if request.headers.get("content-type", "").startswith("application/json"):
            body_bytes = await request.body()
            # Preservar el stream para que FastAPI/Starlette continúe leyéndolo
            async def receive():
                return {"type": "http.request", "body": body_bytes}
            request._receive = receive

            if body_bytes:
                data = json.loads(body_bytes)
                if isinstance(data, dict):
                    for field in ["usuario", "usuario_api", "usuario_web_orden", "usrcons", "user"]:
                        if field in data and data[field]:
                            user = str(data[field])
                            break
    except Exception:
        pass

    return user if user else "N/A"

