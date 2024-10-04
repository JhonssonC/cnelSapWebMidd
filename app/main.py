from fastapi import FastAPI
from .database import init_db
from .routes import auth_routes, api_routes

# Crear la aplicación de FastAPI
app = FastAPI()

# Inicializar la base de datos
init_db()

# Incluir las rutas de autenticación y API
app.include_router(auth_routes.router, prefix="/auth")
app.include_router(api_routes.router, prefix="/middleware")