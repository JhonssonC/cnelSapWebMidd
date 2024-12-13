import json
import os
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Cierre, Grupo
from ..schemas import ApiRequestModelInput
from ..utils import validate_key, register_request, encode
import requests
import urllib3
from urllib3.util import create_urllib3_context
from dotenv import load_dotenv
from dataclasses import asdict

load_dotenv()

BASEURL = os.getenv("BASEURL")


ctx = create_urllib3_context()
ctx.load_default_certs()
ctx.set_ciphers("AES256-GCM-SHA384")

TIPO_ORDENES={
    '34': 'DCDE', 
    '119': 'EMER', 
    '105': 'EMER', 
    '106': 'EMER', 
    '141': 'EMER', 
    '109': 'EMER', 
    '110': 'EMER', 
    '111': 'EMER', 
    '112': 'EMER', 
    '113': 'EMER', 
    '114': 'EMER', 
    '115': 'EMER', 
    '116': 'EMER', 
    '117': 'EMER', 
    '118': 'EMER', 
    '21': 'INSP', 
    '22': 'INSP', 
    '23': 'INSP', 
    '24': 'INSP', 
    '25': 'INSP', 
    '26': 'INSP', 
    '27': 'INSP', 
    '32': 'INSP', 
    '13': 'INST', 
    '14': 'INST', 
    '15': 'INST', 
    '76': 'INTE', 
    '77': 'INTE', 
    '78': 'INTE', 
    '79': 'INTE', 
    '80': 'INTE', 
    '81': 'INTE', 
    '82': 'INTE', 
    '83': 'INTE', 
    '84': 'INTE', 
    '85': 'INTE', 
    '86': 'INTE', 
    '87': 'INTE', 
    '140': 'INTE', 
    '88': 'INTE', 
    '89': 'INTE', 
    '143': 'INTE', 
    '144': 'INTE', 
    '145': 'INTE', 
    '90': 'INTE', 
    '146': 'INTE', 
    '147': 'INTE', 
    '92': 'NLEC', 
    '93': 'NLEC', 
    '94': 'NLEC', 
    '96': 'NLEC', 
    '37': 'SOLI', 
    '38': 'SOLI', 
    '39': 'SOLI', 
    '40': 'SOLI', 
    '41': 'SOLI', 
    '42': 'SOLI', 
    '100': 'CADE', 
    '136': 'CAPR', 
    '99': 'CARE', 
    '70': 'DC01', 
    '132': 'DENU', 
    '133': 'DENU', 
    '101': 'DTER', 
    '102': 'DTER', 
    '107': 'EMER', 
    '108': 'EMER', 
    '129': 'FVOL', 
    '130': 'FVOL', 
    '131': 'FVOL', 
    '17': 'INSE', 
    '28': 'INSP', 
    '29': 'INSP', 
    '30': 'INSP', 
    '31': 'INSP', 
    '16': 'INST', 
    '95': 'NLEC', 
    '97': 'NLEC', 
    '148': 'NLEC', 
    '120': 'OPEC', 
    '121': 'OPEC', 
    '122': 'OPEC', 
    '56': 'PERC', 
    '57': 'PERC', 
    '58': 'PERC', 
    '59': 'PERC', 
    '60': 'PERC', 
    '61': 'PERC', 
    '62': 'PERC', 
    '63': 'PERC', 
    '64': 'PERC', 
    '65': 'PERC', 
    '66': 'PERC', 
    '67': 'PERC', 
    '68': 'PERC', 
    '69': 'PERC', 
    '74': 'RC01', 
    '43': 'RECL', 
    '44': 'RECL', 
    '45': 'RECL', 
    '46': 'RECL', 
    '47': 'RECL', 
    '48': 'RECL', 
    '49': 'RECL', 
    '50': 'RECL', 
    '51': 'RECL', 
    '52': 'RECL', 
    '53': 'RECL', 
    '54': 'RECL', 
    '55': 'RECL', 
    '142': 'RECL', 
    '152': 'RECL'
}

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
        usuario_id = validate_key(api_request.llave, db)
        response = session.request("GET", api_request.endpoint, params=query_params, headers=HEADERS)
        status_api = response.status_code
        
        # Registrar la petición
        register_request(usuario_id.id, api_request, status_api, db)
        
        
        
        return {"status": response.status_code, "data": json.loads(response.text)}

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

########################################################################################################
    
    
@router.post("/login/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/loginSet
def login(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        #print(api_request)
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}(Usuario='{api_request.usuario_api}',Password='{encode(api_request.clave_api)}')"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
@router.post("/order_in_bandeja/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/bandejaSet
def order_in_bandeja(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        print (api_request)
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$skip=0&$top=10&$filter=Usrcons eq '{api_request.usuario_api}' and Password eq '{encode(api_request.clave_api)}' and endswith(Orden,'{api_request.data['orden']}')"
        print (api_request.endpoint)
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
@router.post("/order/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/orderSet
def order(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    print(api_request)
    try:
        clase = int(api_request.data['clase'])
        if clase>0:
            clase = TIPO_ORDENES[str(clase)]
    except Exception as e:
        print (f"Clase: {api_request.data['clase']}")
        clase = api_request.data['clase']
    
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}(Aufnr='{api_request.data['orden']}',Clase='{clase}',Usuario='{api_request.usuario_api}',Password='{encode(api_request.clave_api)}')"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
@router.post("/order_expandida/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/orderSet
def order_expandida(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    print(api_request)
    try:
        clase = int(api_request.data['clase'])
        if clase>0:
            clase = TIPO_ORDENES[str(clase)]
    except Exception as e:
        print (f"Clase: {api_request.data['clase']}")
        clase = api_request.data['clase']
    
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$filter= Aufnr eq '{api_request.data['orden']}' and Clase eq '{clase}' and Usuario eq '{api_request.usuario_api}' and Password eq '{encode(api_request.clave_api)}'&$expand=NavMatRet,NavDanEqu,NavCenso,NavSellos,NavCompo,NavOpera,NavServi"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    

    
@router.post("/material_retirado/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/ordermrSet
def material_retirado(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$skip=0&$top=110&$filter=Usuario eq '{api_request.usuario_api}' and Password eq '{encode(api_request.clave_api)}' and Aufnr eq '{api_request.data['orden']}'"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    

@router.post("/sellos/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/orderseSet
def sellos(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$skip=0&$top=110&$filter=Usuario eq '{api_request.usuario_api}' and Password eq '{encode(api_request.clave_api)}' and Aufnr eq '{api_request.data['orden']}'"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    



@router.post("/servicio/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/orderserSet
def servicio(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$skip=0&$top=110&$filter=Usuario eq '{api_request.usuario_api}' and Password eq '{encode(api_request.clave_api)}' and Aufnr eq '{api_request.data['orden']}'"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    
    
    
    
@router.post("/componentes/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/ordercoSet
def componentes(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$skip=0&$top=110&$filter=Usuario eq '{api_request.usuario_api}' and Password eq '{encode(api_request.clave_api)}' and Aufnr eq '{api_request.data['orden']}'"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    

@router.post("/operaciones/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/orderopSet
def operaciones(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$skip=0&$top=110&$filter=Usuario eq '{api_request.usuario_api}' and Password eq '{encode(api_request.clave_api)}' and Aufnr eq '{api_request.data['orden']}'"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
@router.post("/codigo_grupo/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/qmgrpSet
def codigo_grupo(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    print(api_request)
    
    try:
        # Obtener y procesar el tipo de clase
        try:
            clase = int(api_request.data['clase'])
            clase = TIPO_ORDENES.get(str(clase), api_request.data['clase'])
        except ValueError:
            clase = api_request.data['clase']

        # Construcción de la URL para la consulta externa
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$filter=IAuart eq '{clase}'"

        # Consulta a la API externa
        external_response = middleware_request(api_request, db)
        external_data = external_response.get('data', {})

        grupos = [
            {
                "clase": str(g['IAuart']),
                "codigo_grupo": str(g['Codegruppe']),
                "desc_cod_grup": str(g['Kurztext'])
            } for g in external_data.get('d', {}).get('results', [])
        ]

        # Consulta local a la base de datos
        grupos_local = db.query(Grupo).filter(Grupo.clase == clase).all()
        grupos_local_dict = [
            {
                "clase": gl.clase,
                "codigo_grupo": gl.codigo_grupo,
                "desc_cod_grup": gl.desc_cod_grup
            } for gl in grupos_local
        ]

        # Identificar grupos faltantes
        grupos_local_keys = {gl["codigo_grupo"] for gl in grupos_local_dict}
        grupos_faltantes = [g for g in grupos if g["codigo_grupo"] not in grupos_local_keys]

        # Agregar grupos faltantes a la base de datos
        if grupos_faltantes:
            nuevos_grupos = [
                Grupo(
                    clase=gf['clase'],
                    codigo_grupo=gf['codigo_grupo'],
                    desc_cod_grup=gf['desc_cod_grup']
                ) for gf in grupos_faltantes
            ]
            db.bulk_save_objects(nuevos_grupos)
            db.commit()

            # Actualizar grupos locales
            grupos_local_dict.extend(grupos_faltantes)

        # Respuesta consolidada
        return {"status": 200, "data": grupos_local_dict}

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error al consultar la API externa: {str(e)}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")
    
@router.post("/codigo_cierre/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/qmcodSet
def codigo_cierre(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    print(api_request)
    try:
        # Obtener y procesar el tipo de clase
        try:
            clase = int(api_request.data['clase'])
            clase = TIPO_ORDENES.get(str(clase), api_request.data['clase'])
        except ValueError:
            clase = api_request.data['clase']

        # Construcción de la URL para la consulta externa
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$filter=IAuart eq '{clase}' and Codegruppe eq '{api_request.data['codigo_grupo']}'"

        # Consulta a la API externa
        external_response = middleware_request(api_request, db)
        external_data = external_response.get('data', {})

        cierres = [
            {
                "clase": str(c['IAuart']),
                "codigo_cierre": str(c['Code']),
                "desc_cod_cierr": str(c['Kurztext']),
                "codigo_grupo": str(c['Codegruppe'])
            } for c in external_data.get('d', {}).get('results', [])
        ]

        # Consulta local a la base de datos
        cierres_local = db.query(Cierre).filter(Cierre.clase == clase).all()
        cierres_local_dict = [
            {
                "clase": cl.clase,
                "codigo_cierre": cl.codigo_cierre,
                "desc_cod_cierr": cl.desc_cod_cierr,
                "codigo_grupo": cl.codigo_grupo
            } for cl in cierres_local
        ]

        # Identificar cierres faltantes
        cierres_local_keys = {cl["codigo_cierre"] for cl in cierres_local_dict}
        cierres_faltantes = [c for c in cierres if c["codigo_cierre"] not in cierres_local_keys]

        # Agregar cierres faltantes a la base de datos
        if cierres_faltantes:
            nuevos_cierres = [
                Cierre(
                    clase=cf['clase'],
                    codigo_cierre=cf['codigo_cierre'],
                    desc_cod_cierr=cf['desc_cod_cierr'],
                    codigo_grupo=cf['codigo_grupo']
                ) for cf in cierres_faltantes
            ]
            db.bulk_save_objects(nuevos_cierres)
            db.commit()

            # Actualizar cierres locales
            cierres_local_dict.extend(cierres_faltantes)

        # Respuesta consolidada
        return {"status": 200, "data": cierres_local_dict}

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error al consultar la API externa: {str(e)}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")
    
#RETORNO DE TABLAS TOTALES
@router.post("/tipos_admitidos/")#endpoint: "Tipos Admitidos"
def tipos_admitidos(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    
    try:
        usuario_id = validate_key(api_request.llave, db)
        
        # Registrar la petición
        register_request(usuario_id.id, api_request, 200, db)

        return {"status": 200, "data": TIPO_ORDENES}

    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))

@router.post("/clases_admitidas/")#endpoint: "Clases Admitidas"
def clases_admitidas(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    
    try:
        usuario_id = validate_key(api_request.llave, db)
        
        # Registrar la petición
        register_request(usuario_id.id, api_request, 200, db)
        clases=[]
        for clase in TIPO_ORDENES.values():
            if not clase in clases:    
                clases.append(clase)
        return {"status": 200, "data": clases}

    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))