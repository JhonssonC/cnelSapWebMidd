from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.concurrency import asynccontextmanager

from app.routes import prec_routes, auth_routes, api_routes, aportal_routes
from .database import create_db_and_tables, init_db
from app.logger import logger, log_request, get_user_from_request

# Crear la aplicación de FastAPI
app = FastAPI(title="Middleware API", version="1.0.0", description="API para el middleware de integración", 
              docs_url=None, redoc_url=None, openapi_url=None)

@app.on_event("startup")
def startup_event():
    create_db_and_tables()
    init_db()

@app.middleware("http")
async def log_requests_middleware(request: Request, call_next):
    endpoint = f"{request.method} {request.url.path}"
    usuario = await get_user_from_request(request)
    request.state.endpoint = endpoint
    request.state.user = usuario
    request.state.logged = False

    try:
        response = await call_next(request)
        if not getattr(request.state, "logged", False):
            detail = None
            if response.status_code >= 400:
                try:
                    if hasattr(response, "body") and response.body:
                        import json
                        body_json = json.loads(response.body)
                        if isinstance(body_json, dict):
                            detail = body_json.get("detail") or body_json.get("message") or str(body_json)
                except Exception:
                    pass
                if not detail:
                    detail = f"HTTP {response.status_code}"
            log_request(endpoint=endpoint, usuario=usuario, status_code=response.status_code, detail=detail)
        return response
    except Exception as exc:
        if not getattr(request.state, "logged", False):
            log_request(endpoint=endpoint, usuario=usuario, status_code=500, detail=str(exc))
        raise exc

@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    endpoint = getattr(request.state, "endpoint", f"{request.method} {request.url.path}")
    usuario = getattr(request.state, "user", "N/A")
    log_request(endpoint=endpoint, usuario=usuario, status_code=exc.status_code, detail=exc.detail)
    request.state.logged = True
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})

# Incluir las rutas de autenticación y API
app.include_router(auth_routes.router, prefix="/auth")
app.include_router(api_routes.router, prefix="/middleware")
app.include_router(prec_routes.router, prefix="/precoactiva")
app.include_router(aportal_routes.router, prefix="/aportal")