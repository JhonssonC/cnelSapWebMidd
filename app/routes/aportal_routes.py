import time
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse

from app.crud_aportal import *
from ..schemas import ApiRequestModelInput, AportalLogout, AportalUser, ImputUser, ResumenDeGestion
from ..utils import exists_user, validate_key, validate_user, generate_user, regenerate_key
from sqlalchemy.orm import Session
from app.database import get_db

router = APIRouter()

    
@router.post("/getKeys/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/contratoSet
def getKeys(api_request: AportalUser, db: Session = Depends(get_db)):
    try:
        
        usuario_id = validate_key(api_request.llave, db)
        
        if not usuario_id:
            raise HTTPException(status_code=401, detail="Invalid key")
        
        # Crear una sesión para mantener cookies
        session = requests.Session()
        

        session = index(session)
        if session.cookies.get_dict():
            while 'awsSesion' not in session.cookies.get_dict():
                print("Esperando a que se obtenga la cookie 'awsSesion'...")
                time.sleep(1)
                session = acceso(session, api_request.usuario, api_request.clave)
                print("\nCookies Acceso:", session.cookies.get_dict())
                
                if session.cookies.get_dict():
                    
                    dictionaryAportal = aPortal(session)
                    session = dictionaryAportal['session']
                    print("\nCookies aPortal:", session.cookies.get_dict())
                    
                    if session.cookies.get_dict():
                        session = getKey(session, dictionaryAportal['key'])
                            
                        print("\nCookies getKey:", session.cookies.get_dict())
                        
                    else:
                        print("No se pudo obtener la cookie getKey.") 
                        
            return JSONResponse(
                status_code=200,
                content={
                    "message": "Proceso completado con éxito.",
                    "cookies": session.cookies.get_dict()
                }
            )

                    
        else:
            print("No se pudo obtener JSESSIONID.")
            return JSONResponse(
                status_code=500,
                content={
                    "message": "No se pudo establecer la sesión correctamente.",
                    "cookies": session.cookies.get_dict()
                }
            )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
@router.post("/getResumenDeGestion/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/contratoSet
def getKeys(api_request: ResumenDeGestion, db: Session = Depends(get_db)):
    try:
        
        usuario_id = validate_key(api_request.llave, db)
        
        if not usuario_id:
            raise HTTPException(status_code=401, detail="Invalid key")
        
        # Crear una sesión para mantener cookies
        session = requests.Session()
        

        session = index(session)
        if session.cookies.get_dict():
            while 'awsSesion' not in session.cookies.get_dict():
                print("Esperando a que se obtenga la cookie 'awsSesion'...")
                time.sleep(1)
                session = acceso(session, api_request.usuario, api_request.clave)
                print("\nCookies Acceso:", session.cookies.get_dict())
                
                if session.cookies.get_dict():
                    
                    dictionaryAportal = aPortal(session)
                    session = dictionaryAportal['session']
                    print("\nCookies aPortal:", session.cookies.get_dict())
                    
                    if session.cookies.get_dict():
                        session = getKey(session, dictionaryAportal['key'])
                        print("\nCookies getKey:", session.cookies.get_dict())
                        
                    else:
                        print("No se pudo obtener la cookie getKey.") 
                        
                        
            if 'awsSesion' in session.cookies.get_dict():
                data = jsGenerate(session, api_request.id_reporte, api_request.id, api_request.par_uni, api_request.par_pro,
                                  api_request.par_can, api_request.par_sec, api_request.par_dep, api_request.par_ges,
                                  api_request.par_contra, api_request.par_cua, api_request.fec_ini, api_request.fec_fin)
                
                print("\nData jsGenerate:", (data['response']))
                print("\nCookies jsGenerate:", data['session'].cookies.get_dict())
                
                return JSONResponse(
                    status_code=200,
                    content={
                        "message": "Proceso completado con éxito.",
                        "cookies": {
                            'cookies': data['session'].cookies.get_dict(),
                            'dictResponse': data['response']
                        }
                    }
                )
                    
        else:
            return JSONResponse(
                status_code=500,
                content={
                    "message": "No se pudo establecer la sesión correctamente.",
                    "cookies": session.cookies.get_dict()
                }
            )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
@router.post("/logout/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/contratoSet
def getKeys(api_request: AportalLogout, db: Session = Depends(get_db)):
    try:
        
        usuario_id = validate_key(api_request.llave, db)
        
        if not usuario_id:
            raise HTTPException(status_code=401, detail="Invalid key")
        
        # Crear una sesión para mantener cookies
        session = requests.Session()
        # Cargar las cookies al objeto Session
        session.cookies.update(api_request.sessionDict)

        session = index(session)
        
        cerrarSesion()
        
        print("Sesión cerrada correctamente.")
    
        return JSONResponse(
            status_code=200,
            content={
                "message": "Sesión cerrada correctamente.",
                "cookies": session.cookies.get_dict()
            }
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

