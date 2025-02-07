import json
import os
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.crud_api_sap import create_usuariosap, getCierres, getGrupos, saveCierres, saveContrato, saveGroups
from app.database import get_db
from app.models import Cierre, ContratoSap, Grupo
from ..schemas import ApiRequestModelInput, Contratosap
from ..utils import validar_campos_editables, validate_key, register_request, encode, validar_fechas, do_valida_sellos
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
'x-csrf-token': 'fetch',
}

# Endpoint para realizar peticiones GET a la otra API (middleware)
def middleware_request(api_request: ApiRequestModelInput, db: Session, request: Request = None, max_retries=3):
    
    query_params={}
    if request:
        query_params = dict(request.query_params)
    try:
        
        retry_count = 0
        error_strings = ["connection reset", "connection abort"]  # Cadenas a buscar en el texto de respuesta
        
        usuario_id = validate_key(api_request.llave, db)

        while retry_count < max_retries:
            
            try:
                response = session.request("GET", api_request.endpoint, params=query_params, headers=HEADERS) # Realiza la solicitud
                #print (response.headers)
                if not any(error in response.text.lower() for error in error_strings):
                    
                    status_api = response.status_code 
                    # Registrar la petición
                    register_request(usuario_id.id, api_request, status_api, db)
                    
                    return {"status": status_api, "data": json.loads(response.text), 'tkn':response.headers['x-csrf-token']}  # Devuelve la respuesta si no se encuentran las cadenas
                
                else:
                    print(f"Intento {retry_count + 1}: Encontró cadenas prohibidas en la respuesta. Reintentando...")
                    
            except requests.RequestException as e:
                print(f"Intento {retry_count + 1}: Error durante la solicitud - {e}. Reintentando...")
            
            retry_count += 1

        raise Exception(f"No se pudo completar la solicitud después de {max_retries} intentos.")

    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))
    
# Endpoint para realizar peticiones POST a la otra API (middleware)
def middleware_post(api_request: ApiRequestModelInput, payload:dict, db: Session = Depends(get_db), token=None, max_retries=3):

    try:
        
        retry_count = 0
        error_strings = ["connection reset", "connection abort"]  # Cadenas a buscar en el texto de respuesta
        
        usuario_id = validate_key(api_request.llave, db)

        while retry_count < max_retries:
            
            try:
                currentHeaders = HEADERS.copy()
                if token != None:
                    currentHeaders['x-csrf-token']=token
                    print(token)
                response = session.request("POST", api_request.endpoint, json=payload, headers=currentHeaders)# Realiza la solicitud
                #print (response.text)
                if not any(error in response.text.lower() for error in error_strings):
                    
                    status_api = response.status_code 
                    # Registrar la petición
                    register_request(usuario_id.id, api_request, status_api, db)
                    return {"status": status_api, "data": json.loads(response.text)}  # Devuelve la respuesta si no se encuentran las cadenas
                
                else:
                    print(f"Intento {retry_count + 1}: Encontró cadenas prohibidas en la respuesta. Reintentando...")
                    
            except requests.RequestException as e:
                print(f"Intento {retry_count + 1}: Error durante la solicitud - {e}. Reintentando...")
            
            retry_count += 1

        raise Exception(f"No se pudo completar la solicitud después de {max_retries} intentos.")

    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))
    

########################################################################################################
    
    
@router.post("/login/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/loginSet
def login(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        #print(api_request)
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}(Usuario='{api_request.usuario_api}',Password='{encode(api_request.clave_api)}')"
        usuarioSap = middleware_request(api_request, db)
        
        try:
          create_usuariosap(usuarioSap['data']['d'], db)
        except:
          pass  
        
        return usuarioSap
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
    


@router.post("/firsts_in_bandeja/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/bandejaSet
def firsts_in_bandeja(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        print (api_request)
        
        if api_request.data['top']:
            top = api_request.data['top']
        else:
            top = 10
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$skip=0&$top={top}&$filter=Usrcons eq '{api_request.usuario_api}' and Password eq '{encode(api_request.clave_api)}' and endswith(Orden,'')"
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
    #print(api_request)
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
    
    
    
@router.post("/acreedor/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/acreedorSet
def acreedor_sap(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        all_acreedores={}
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$filter=Bukrs eq '{api_request.data['instancia']}'"
        if api_request.data['acreedor']:
            all_acreedores = middleware_request(api_request, db)['data']['d']['results']
            for acreedor in all_acreedores:
                #print(acreedor['Lifnr'], api_request.data['acreedor'])
                if str(acreedor['Lifnr']) == api_request.data['acreedor']:
                    return {"status": 200, "data": acreedor}
            
        return all_acreedores
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/contrato/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/contratoSet
def contrato_sap(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$filter=Searchhelp eq '{api_request.data['searchhelp']}' and Werks eq '{api_request.data['usuario_web_orden']}' and Lifnr eq '{api_request.data['acreedor']}'"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/posicion_cont/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/posContSet
def posicion_cont(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$filter=Searchhelp eq '{api_request.data['searchhelp']}' and Werks eq '{api_request.data['usuario_web_orden']}' and Lifnr eq '{api_request.data['acreedor']}' and Ebeln eq '{api_request.data['contrato']}'"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
@router.post("/codigo_grupo/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/qmgrpSet
def codigo_grupo(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    
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
        grupos_local = getGrupos(clase, db)
        
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
            
            saveGroups(nuevos_grupos, db)

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

    try:
        # Obtener y procesar el tipo de clase
        try:
            clase = int(api_request.data['clase'])
            clase = TIPO_ORDENES.get(str(clase), api_request.data['clase'])
        except ValueError:
            clase = api_request.data['clase']

        grupo_cod=api_request.data['codigo_grupo']
        
        # Construcción de la URL para la consulta externa
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$filter=IAuart eq '{clase}' and Codegruppe eq '{grupo_cod}'"

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
        cierres_local = getCierres(clase, grupo_cod, db)
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
            saveCierres(nuevos_cierres, db)

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
    


@router.post("/contrato_data/")#endpoint: "Contrato Data"
def obtener_datos_de_contrato(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    list_contratos=[]
    contrato = Contratosap(**{'usuario':api_request.usuario_api})
    try:
        print(api_request)
        #Obtener Usuaio
        if api_request.endpoint:
            api_request.endpoint='sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/loginSet'
            
        usuario = login(api_request, db)['data']['d']
        contrato.usuario=usuario['Usuario']
        contrato.searchhelp='OUTLL'
        contrato.usuario_web_orden=usuario['Werks']
        contrato.usuario_web_orden_desc=usuario['Name1']
        contrato.lote=usuario['Arbpl']
        
        #Obtener 1 registro de usuario
        #sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/bandejaSet
        if not (api_request.data.get('ordenRef', False)) and not (api_request.data.get('claseRef', False)):
            api_request.endpoint='sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/bandejaSet'
            api_request.data['top']=1
            first_order = firsts_in_bandeja(api_request, db)
            first_order=first_order['data']['d']['results']
        else:
            first_order = [
                {
                    'Auart': api_request.data['claseRef'],
                    'Orden': api_request.data['ordenRef']
                }
            ]
        if len(first_order)==1:
            first_order=first_order[0]
            clase=first_order['Auart']
            first_order=first_order['Orden']
            
            #Obtener Orden Expandida
            #sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/orderSet
            api_request.endpoint='sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/orderSet'
            api_request.data['orden']=first_order
            api_request.data['clase']=clase
            order_expand = order_expandida(api_request, db)
            order_expand = order_expand['data']['d']['results'][0]
            contrato.acreedor=order_expand['NavOpera']['results'][0]['Lifnr']
            
            #acreedor Lifnr
            #sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/acreedorSet
            api_request.data['instancia']=usuario['Bukrs']
            api_request.data['acreedor']=contrato.acreedor
            api_request.endpoint='sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/acreedorSet'
            acreedor = acreedor_sap(api_request, db)
            acreedor = acreedor['data']
            contrato.acreedor_desc=acreedor['Name1']
            
            #contrato Ebeln
            api_request.data['searchhelp']=contrato.searchhelp
            api_request.data['usuario_web_orden']=contrato.usuario_web_orden
            api_request.endpoint='sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/contratoSet'
            contratos = contrato_sap(api_request, db)
            contratos = contratos['data']['d']['results']
            print (contratos)
            
            for dictContrato in contratos:
                contrato.contrato=dictContrato['Ebeln']
                contrato.contrato_desc=dictContrato['Txz01']
                
                #posicion Contable  Ebelp
                api_request.data['contrato']=contrato.contrato
                api_request.endpoint='sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/posContSet'
                posiciones = posicion_cont(api_request, db)
                posiciones = posiciones['data']['d']['results']
                print (posiciones)
                for dictPocision in posiciones:
                    contrato.posicion_cont = dictPocision['Ebelp']
                    contrato.posicion_cont_desc = dictPocision['Txz01']
                
                    saveContrato(contrato, db)
                    list_contratos.append(contrato.model_copy())

        
        return {"status": 200, "data": list_contratos}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
@router.post("/rubros/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/numserviceSet
def rubros(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$filter=Ebeln eq '{api_request.data['contrato']}' and Ebelp eq '{api_request.data['pos_contable']}'"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    
    

@router.post("/materiales/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/matnrSet
def materiales(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$filter=Werks eq '{api_request.data['usuario_web_orden']}' and Arbpl eq '{api_request.data['lote']}' and Beber eq '{api_request.data['agencia']}'"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
@router.post("/agencias/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/beberSet
def agencias(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$filter=Werks eq '{api_request.data['usuario_web_orden']}'"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/search_med/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/beberSet
def search_med(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}?$filter=Sernr eq '{api_request.data['serie']}' and Mtart eq 'ZMED' and Werks eq '{api_request.data['user_web']}'"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    

    
    
"""
tipoTarifaSet
usrstcclaSet

tipo_acomSet?$filter=NameChar eq 'ZTIPACO'--TIPOACOMETIDA
tipo_acomSet?$filter=NameChar eq 'ZCALACO'--CALIBREACOMETIDA -- RETIRADA TAMBIEN
tipo_acomSet?$filter=NameChar eq 'ZFASESACO'--FASESACOMETIDA
tipo_acomSet?$filter=NameChar eq 'ZMAT'--MATERIALACOMETIDA
tipo_acomSet?$filter=NameChar eq 'ZTIPACORETI'--TIPOACOMETIDARETIRADA
tipo_acomSet?$filter=NameChar eq 'ZCLARED'--CLASERED
tipo_acomSet?$filter=NameChar eq 'ZTIPRED'--TIPORED
tipo_acomSet?$filter=NameChar eq 'ZORIGFINA'--ORIGENFINANCIAMIENTO
tipo_acomSet?$filter=NameChar eq 'ZSECUFASEACO'--SECUENCIAFASESDEACOMETIDA
tipo_acomSet?$filter=NameChar eq 'ZUBICATAB'--UBICACIONTABLERO
tipo_acomSet?$filter=NameChar eq 'ZCONSTAB'--CONSTRUCTOR DE TABLERO
tipo_acomSet?$filter=NameChar eq 'ZPROTABL'--PROTECCION PRINCIPAL DEL TABLERO -- PROTECCION INDIVIDUAL
tipo_acomSet?$filter=NameChar eq 'ZTIPROTAB'--TIPO DE PROTECCION DE TABLERO
tipo_acomSet?$filter=NameChar eq 'ZTIPROT'--TIPO DE PROTECCION INDIVIDUAL
tipo_acomSet?$filter=NameChar eq 'ZFASESMED'--FASES DE MEDIDOR
tipo_acomSet?$filter=NameChar eq 'ZSECUFASEMED'--SECUENCIA FASES MEDIDOR

accionmedSet?&$filter=ZcodCred eq '' and Metodo eq '00'--ACCION SOBRE MEDIDOR
tipo_acomSet?$filter=NameChar eq 'ZUBICATAB'--UBICACION DE MEDIDOR
--ANTERIOR
--POSTERIOR
dominioSet?$filter=Domname eq 'ZD_TAB_CENTR'--MEDIDOR CENTRALIZADO
--MEDIDOR INSTALADO

tipoSelloSet --TIPO DE SELLO (VIEJO)
tipoSelloSet?$filter=substringof('11-543380948',Scode)--QUE TIPO DE SELLO HAY PARA EL SELLO DIGITADO (VIEJO)
ubicaSelloSet--UBICACIONES DE SELLO
tipoSelloSet?$filter=substringof('',Scode)
removeSelloSet
"""
@router.post("/opciones_varias/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/*
def opciones_varias(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        api_request.endpoint = f"{BASEURL}/sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/{api_request.endpoint}"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
#sap/opu/odata/SAP/ZWMGS_ORDEN_MOD_SRV_02/ordenCabSet
@router.post("/guardar_noejecutada/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDEN_MOD_SRV_02/ordenCabSet
def guardar_noejecutada(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    
    def actualizar_json(base_json, cambios, noConsiderar=[]):
        for clave, valor in cambios.items():
            if clave in base_json and valor != None and not(clave in noConsiderar):
                base_json[clave] = valor
            #else:
            #    print(f"Advertencia: La llave '{clave}' no existe en el JSON base.")
        return base_json
    
    try:
        #print (api_request.data['pyload'])

        data_to_save = None
        #data_to_save1=None
        #data_to_save2=None
        json_base=None
        tkn=None
        valid_fields=None
        es_valido_payload=True
        errores=None
        es_valido_fechas={"value": "" }
        es_valido_sellos={"error": False }
        
        # Leer el archivo JSON base
        with open("app/template_json/payload_save_order.json", 'r', encoding='utf-8') as archivo:
            json_base = json.load(archivo)
            
        with open("app/template_json/valid_fields_oEntry.json", 'r', encoding='utf-8') as archivo:
            valid_fields = json.load(archivo)
            
        #Obtener Orden Expandida
        #sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/orderSet
        if  "sap/opu/odata/SAP/ZWMGS_ORDEN_MOD_SRV_02/ordenCabSet" == api_request.endpoint:
            api_request.endpoint='sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/orderSet'
            #api_request.data['orden']=first_order
            #api_request.data['clase']=clase
            order_expand = order_expandida(api_request, db)
            tkn = order_expand['tkn']
            order_expand = order_expand['data']['d']['results'][0]
            
            order_expand['Usrcons'] = order_expand['Usuario']
            order_expand['Pascons'] = order_expand['Password']
            order_expand['Tarverif'] = order_expand['TarifVerif']
            order_expand['Zzlon'] = order_expand['Zutmy']
            order_expand['Zzlat'] = order_expand['Zutmx']
            
            order_expand['Zposte'] = order_expand['Zzposte']
            order_expand['Region'] = order_expand['PaRegion']
            order_expand['City1'] = order_expand['PaCity1']
            order_expand['City2'] = order_expand['PaCity2']
            order_expand['Street'] = order_expand['PaStreet']
            order_expand['HouseNum1'] = order_expand['PaHouseNum1']
            order_expand['StrSuppl3'] = order_expand['PaStrSuppl3']
            order_expand['Location'] = order_expand['PaLocation']
            order_expand['StrSuppl1'] = order_expand['PaStrSuppl1']
            order_expand['Building'] = order_expand['PaBuilding']
            order_expand['StrSuppl2'] = order_expand['PaStrSuppl2']
            order_expand['Floor'] = order_expand['PaFloor']
            order_expand['Roomnumber'] = order_expand['PaRoomnumber']
            order_expand['HomeCity'] = order_expand['PaHomeCity']
            order_expand['HouseNum2'] = order_expand['PaHouseNum2']
            order_expand['Remark'] = order_expand['PaRemark']
            order_expand['TipoConductorCe'] = order_expand['TipoConductor']
            order_expand['TomacorienteCe'] = order_expand['Tomacoriente']
            order_expand['ProteccionCe'] = order_expand['Proteccion']
            order_expand['LongitudCe'] = order_expand['Longitud']
            order_expand['CredMesplazoCe'] = order_expand['CredMesplazoCi']
            order_expand['MontoCe'] = order_expand['MontoCi']
            order_expand['FecRestSrv'] = order_expand['FecRestServ']
            order_expand['HorRestSrv'] = order_expand['HorRestServ']
            
            tipoOrden = int(order_expand['Ilart'])
            clase = api_request.data['clase']
            if (tipoOrden == 32 and (clase == "INSP" or clase == "insp")):
                clase = "INSP32"
            
            es_valido_payload, errores = validar_campos_editables(clase, api_request.data['pyload'], valid_fields)
            if not es_valido_payload:
                objToRtrn['Message'] = {"Error": errores}
                return objToRtrn
            
            es_valido_fechas = validar_fechas(api_request.data['pyload'])
            if es_valido_fechas["value"] == "X":
                objToRtrn['Message'] = {"Error": es_valido_fechas["mensaje"]}
                return objToRtrn
            
            if api_request.data['pyload']['ORDENSELLOS']:
                es_valido_sellos = do_valida_sellos(api_request.data['pyload']['ORDENSELLOS'])
                if es_valido_sellos["error"]:
                    objToRtrn['Message'] = {"Error": es_valido_sellos["mensaje"]}
                    return objToRtrn
            
            
            if json_base:
                json_base = actualizar_json(json_base, order_expand)
                data_to_save = actualizar_json(json_base, api_request.data['pyload'])


                api_request.endpoint = f"{BASEURL}/sap/opu/odata/SAP/ZWMGS_ORDEN_MOD_SRV_02/ordenCabSet"
            
        objToRtrn = {}
        
        data_to_save['Aufnr'] = str(data_to_save['Aufnr']).zfill(12)
        
        objToRtrn['Payload'] = data_to_save
        objToRtrn['Saved'] = middleware_post(api_request, data_to_save, db, token=tkn)
    
        api_request.endpoint = "sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/messageSet"
        
        objToRtrn['Message'] = mensaje(api_request, db)
        
        return objToRtrn
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
@router.post("/mensaje/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/messageSet
def mensaje(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    try:
        api_request.endpoint = f"{BASEURL}/{api_request.endpoint}(Zaufnr='{str(api_request.data['orden']).zfill(12)}',Zusuario='{api_request.usuario_api}')"
        return middleware_request(api_request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    


#sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/cierreOrdenSet
@router.post("/cierre_tecnico/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/cierreOrdenSet
def cierre_tecnico(api_request: ApiRequestModelInput, db: Session = Depends(get_db)):
    tkn=None
    data_to_save=None
    try:
        
        if  "sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/cierreOrdenSet" == api_request.endpoint:
            api_request.endpoint='sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/orderSet'
            #api_request.data['orden']=first_order
            #api_request.data['clase']=clase
            order_expand = order_expandida(api_request, db)
            tkn = order_expand['tkn']
        
            api_request.endpoint = f"{BASEURL}/sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/cierreOrdenSet"
            
            data_to_save = {
                "IAufnr":str(api_request.data['orden']).zfill(12),
                "Pascons":encode(api_request.clave_api),
                "Usrcons":api_request.usuario_api
            }
            
        #return data_to_save
        return middleware_post(api_request, data_to_save, db, token=tkn)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))