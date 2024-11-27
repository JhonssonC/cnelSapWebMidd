import os
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.database import get_db
from ..schemas import ApiRequestModelInput
from ..utils import validate_key, register_request, encode
import requests
import urllib3
from urllib3.util import create_urllib3_context
from dotenv import load_dotenv

load_dotenv()

BASEURL = os.getenv("BASEURL")


ctx = create_urllib3_context()
ctx.load_default_certs()
ctx.set_ciphers("AES256-GCM-SHA384")


class CustomSSLContextHTTPAdapter(requests.adapters.HTTPAdapter):
    def __init__(self, ssl_context=None, **kwargs):
        self.ssl_context = ssl_context
        super().__init__(**kwargs)

    def init_poolmanager(self, connections, maxsize, block=False):
        self.poolmanager = urllib3.poolmanager.PoolManager(
            num_pools=connections, maxsize=maxsize,
            block=block, ssl_context=self.ssl_context)
        
session = requests.session()
session.adapters.pop("https://", None)
session.mount("https://", CustomSSLContextHTTPAdapter(ctx))

router = APIRouter()


HEADERS = {
'Accept': 'application/json',
'Accept-Language': 'es-MX',
'MaxDataServiceVersion': '2.0',
'Authorization': 'Basic V01XRUJDT046UTFwMHcybzk=',
'Connection': 'keep-alive',
}

# Endpoint para realizar peticiones GET a la otra API (middleware)

def middleware_request(api_request: ApiRequestModelInput, db: Session, request: Request = None):
    query_params={}
    if request:
        query_params = dict(request.query_params)
    try:
        usuario_id = validate_key(api_request.llave)
        response = session.request("GET", api_request.endpoint, params=query_params, headers=HEADERS)
        status_api = response.status_code
        
        # Registrar la petición
        register_request(usuario_id.id, api_request, status_api, db)
        
        
        return {"status": response.status_code, "data": response.json()}

    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))
    
    
@router.post("/login/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/loginSet
def login(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}(Usuario='{api_request.usuario_api}',Password='{encode(api_request.clave_api)}')"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/order/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/orderSet
def order(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}(Aufnr='{api_request.data.orden}',Clase='{api_request.data.clase}',Usuario='{api_request.usuario_api}',Password='{encode(api_request.clave_api)}')"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# Endpoint para realizar peticiones POST a la otra API (middleware)
@router.post("/post/")
def middleware_post(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        usuario_id = validate_key(api_request.llave, db)
        response = session.request("POST", api_request.endpoint, headers=HEADERS)
        status_api = response.status_code
        
        # Registrar la petición
        register_request(usuario_id.id, api_request, status_api, db)
        
        return {"status": response.status_code, "data": response.json()}
    
    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))
