import os
from fastapi import APIRouter, HTTPException
from ..models import ApiRequestModel
from ..utils import validar_llave, registrar_peticion
import requests
import ssl
from urllib3 import PoolManager
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

def middleware_get(api_request: ApiRequestModel, llave: str):
    try:
        usuario_id = validar_llave(llave)
        response = session.request("GET", api_request.endpoint, headers=HEADERS)
        status_api = "Success" if response.status_code == 200 else "Failed"
        
        # Registrar la petición
        registrar_peticion(usuario_id, api_request.usuario_api, api_request.clave_api, api_request.endpoint, status_api)
        
        
        return {"status": response.status_code, "data": response.json()}

    except Exception as e:
        #registrar_peticion(usuario_id, api_request.usuario_api, api_request.clave_api, api_request.endpoint, "Error")
        raise HTTPException(status_code=500, detail=str(e))
    
    
@router.post("/login/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/loginSet
def login(api_request: ApiRequestModel, llave: str):
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}(Usuario='{api_request.usuario_api}',Password='{api_request.clave_api}')"
        return middleware_get(api_request, llave)
    except Exception as e:
        #registrar_peticion(usuario_id, api_request.usuario_api, api_request.clave_api, api_request.endpoint, "Error")
        raise HTTPException(status_code=500, detail=str(e))
    
    
    

# Endpoint para realizar peticiones POST a la otra API (middleware)
@router.post("/post/")
def middleware_post(api_request: ApiRequestModel, llave: str):
    try:
        usuario_id = validar_llave(llave)
        response = requests.post(api_request.endpoint, json=api_request.data, auth=(api_request.usuario_api, api_request.clave_api))
        status_api = "Success" if response.status_code == 200 else "Failed"
        
        # Registrar la petición
        registrar_peticion(usuario_id, api_request.usuario_api, api_request.clave_api, api_request.endpoint, status_api)
        
        return {"status": response.status_code, "data": response.json()}
    
    except Exception as e:
        registrar_peticion(usuario_id, api_request.usuario_api, api_request.clave_api, api_request.endpoint, "Error")
        raise HTTPException(status_code=500, detail=str(e))
