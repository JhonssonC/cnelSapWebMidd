
from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager

from app.routes import prec_routes, auth_routes, api_routes, aportal_routes
from .database import create_db_and_tables, init_db

# Crear la aplicación de FastAPI
app = FastAPI(title="Middleware API", version="1.0.0", description="API para el middleware de integración", docs_url=None, redoc_url=None, openapi_url=None)

@app.on_event("startup")
def startup_event():
    create_db_and_tables()
    init_db()
    


    


# Incluir las rutas de autenticación y API
app.include_router(auth_routes.router, prefix="/auth")
app.include_router(api_routes.router, prefix="/middleware")
app.include_router(prec_routes.router, prefix="/precoactiva")
app.include_router(aportal_routes.router, prefix="/aportal")