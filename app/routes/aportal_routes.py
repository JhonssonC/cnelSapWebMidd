import os
import time
import json
from datetime import datetime, timedelta
import requests
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse, JSONResponse, PlainTextResponse

from app.crud_aportal import *
from app import models
from ..schemas import ApiRequestModelInput, AportalLogout, AportalUser, ImputUser, ResumenDeGestion, AportalCookiesOut
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
    
    
@router.post("/texto/")
def descargar_texto(api_request: str, db: Session = Depends(get_db)):
    """
    Endpoint GET para enviar el contenido de un archivo de texto.
    """
    
    try:
        
        usuario_id = validate_key(api_request, db)
        
        if not usuario_id:
            raise HTTPException(status_code=401, detail="Invalid key")
        
        # Crear una sesión para mantener cookies
    
        # Crea un archivo de texto de ejemplo si no existe
        if not os.path.exists("texto.txt"):
            with open("texto.txt", "w") as f:
                f.write("No Encontrado.\n")
                
        # 2. Leer el contenido del archivo de forma asíncrona
        try:
            with open("texto.txt", 'r', encoding='utf-8') as f:
                contenido = f.read()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error al leer el archivo: {e}")

        # 3. Devolver el contenido como PlainTextResponse
        return PlainTextResponse(content=contenido)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/getAflowCookies/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/contratoSet
def getAflowCookies(api_request: ResumenDeGestion, db: Session = Depends(get_db)):
    try:
        usuario_id = validate_key(api_request.llave, db)
        if not usuario_id:
            raise HTTPException(status_code=401, detail="Invalid key")

        # --- revisar cache en BD usando el modelo ---
        now = datetime.utcnow()
        cookie_entry = db.query(models.AportalCookies).filter_by(llave=api_request.llave, app="SAR").first()
        if cookie_entry and cookie_entry.last_used:
            if (now - cookie_entry.last_used) <= timedelta(minutes=30):
                # actualizar last_used
                cookie_entry.last_used = now
                db.add(cookie_entry)
                db.commit()
                return JSONResponse(
                    status_code=200,
                    content={
                        "message": "Cookies devueltas desde cache.",
                        "cookies": {
                            "cookies": json.loads(cookie_entry.cookies_json) if cookie_entry.cookies_json else {}
                        }
                    }
                )

        # --- no hay cache válida: obtener nuevas cookies ---
        session = requests.Session()
        session = index(session, url="http://sar.cnel.gob.ec:9090/aportal/l/es/u/0/index.jsp")
        if session.cookies.get_dict():
            while 'AJSESSIONID' not in session.cookies.get_dict():
                #print("Esperando a que se obtenga la cookie 'awsSesion'...")
                time.sleep(1)
                session = acceso(session, api_request.usuario, api_request.clave, url="http://sar.cnel.gob.ec:9090/aportal/l/es/u/0/accesoUsuario")
                #print("\nCookies Acceso:", session.cookies.get_dict())
                
                if session.cookies.get_dict():
                    
                    dictionaryAportal = aPortal(session, url="http://sar.cnel.gob.ec:9090/aportal/l/es/u/0/aportal.jsp")
                    ky = dictionaryAportal['key']
                    session = dictionaryAportal['session']
                    print("\nKey aPortal:", ky)
                    #print("\nCookies aPortal:", session.cookies.get_dict())
                    
                    if session.cookies.get_dict():
                        session = loginAflowGetKey(session, ky)
                        #print("Session después de loginAflowGetKey:", session)
                        print("\nCookies getKey:", session.cookies.get_dict())
                        
                    else:
                        print("No se pudo obtener la cookie getKey.") 


            if 'AJSESSIONID' in session.cookies.get_dict():
                cookies_json_new = json.dumps(session.cookies.get_dict())
                if not cookie_entry:
                    cookie_entry = models.AportalCookies(
                        llave=api_request.llave,
                        app="SAR",
                        cookies_json=cookies_json_new,
                        last_saved=now,
                        last_used=now
                    )
                else:
                    cookie_entry.cookies_json = cookies_json_new
                    cookie_entry.last_saved = now
                    cookie_entry.last_used = now

                db.add(cookie_entry)
                db.commit()

                return JSONResponse(
                    status_code=200,
                    content={
                        "message": "Proceso completado con éxito.",
                        "cookies": {
                            'cookies': session.cookies.get_dict(),
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


@router.post("/getASearchAflow/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/contratoSet
def getSearch(api_request: ResumenDeGestion, db: Session = Depends(get_db)):
    try:
        
        usuario_id = validate_key(api_request.llave, db)
        
        if not usuario_id:
            raise HTTPException(status_code=401, detail="Invalid key")
        
        # Crear una sesión para mantener cookies
        session = requests.Session()
        

        session = index(session)
        if session.cookies.get_dict():
            while 'SSID' not in session.cookies.get_dict():
                #print("Esperando a que se obtenga la cookie 'awsSesion'...")
                time.sleep(1)
                session = acceso(session, api_request.usuario, api_request.clave)
                #print("\nCookies Acceso:", session.cookies.get_dict())
                
                if session.cookies.get_dict():
                    
                    dictionaryAportal = aPortal(session)
                    session = dictionaryAportal['session']
                    #print("\nCookies aPortal:", session.cookies.get_dict())
                    
                    if session.cookies.get_dict():
                        session = loginAflowGetKey(session, dictionaryAportal['key'])
                        print("\nCookies getKey:", session.cookies.get_dict())
                        
                    else:
                        print("No se pudo obtener la cookie getKey.") 
                        
                        
            if 'SSID' in session.cookies.get_dict():
                data = dataSearch(session, api_request.data_search)
                
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






@router.post("/getKeyAflowAciss/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/contratoSet
def getKeyAflowAciss(api_request: ResumenDeGestion, db: Session = Depends(get_db)):

#try:

    usuario_id = validate_key(api_request.llave, db)
    if not usuario_id:
        raise HTTPException(status_code=401, detail="Invalid key")
    
    # no hay cache válida: obtener nuevas cookies desde el aplicativo correspondiente
    session = requests.Session()

    app_name = "ACIIS-AMOBILE"

    # revisar cache en BD usando el modelo (llave + app)
    now = datetime.utcnow()
    cookie_entry = db.query(models.AportalCookies).filter_by(llave=api_request.llave, app=app_name).first()
    if cookie_entry and cookie_entry.last_used:
        if (now - cookie_entry.last_used) <= timedelta(minutes=30):
            # actualizar last_used y devolver cache
            cookie_entry.last_used = now
            db.add(cookie_entry)
            db.commit()
            session.cookies.update(json.loads(cookie_entry.cookies_json) if cookie_entry.cookies_json else {})


    if not 'AJSESSIONID' in session.cookies.get_dict():
        # Si app == 'SAR' puede requerir URL distintas; adaptar si es necesario
        # por defecto se usa el flujo existente (awsSesion)
        session = index(session)
        if session.cookies.get_dict():
            # esperar cookie AJSESSIONID (o ajustar según app)
            while 'AJSESSIONID' not in session.cookies.get_dict():
                print("Esperando a que se obtenga la cookie 'AJSESSIONID'...")
                time.sleep(1)
                session = acceso(session, api_request.usuario, api_request.clave)
                print("\nCookies Acceso:", session.cookies.get_dict())
                
                
                if session.cookies.get_dict():
                    dictionaryAportal = aPortal(session)
                    ky = dictionaryAportal['key']
                    session = dictionaryAportal['session']
                    print("\nKey aPortal:", ky)
                    #print("\nCookies aPortal:", session.cookies.get_dict())
                    
                    if session.cookies.get_dict():
                        session = loginAflowGetKey(session, ky, url="aciis")
                        #print("Session después de loginAflowGetKey:", session)
                        print("\nCookies getKey:", session.cookies.get_dict())
                        
                    else:
                        print("No se pudo obtener la cookie getKey.") 
                    
                    

    if 'AJSESSIONID' in session.cookies.get_dict():

        # serializar cookies y persistir (crear o actualizar)
        cookies_json_new = json.dumps(session.cookies.get_dict())
        if not cookie_entry:
            cookie_entry = models.AportalCookies(
                llave=api_request.llave,
                app=app_name,
                cookies_json=cookies_json_new,
                last_saved=now,
                last_used=now
            )
        else:
            cookie_entry.cookies_json = cookies_json_new
            cookie_entry.last_saved = now
            cookie_entry.last_used = now

        db.add(cookie_entry)
        db.commit()

        #print("\nData jsGenerate:", (data['response']))
        print("\nCookies jsGenerate:", session.cookies.get_dict())

        return JSONResponse(
            status_code=200,
            content={
                "message": "Proceso completado con éxito.",
                "cookies": {
                    'cookies': session.cookies.get_dict(),
                }
            }
        )

    # fallo al inicializar sesión
    return JSONResponse(
        status_code=500,
        content={
            "message": "No se pudo establecer la sesión correctamente.",
            "cookies": session.cookies.get_dict() if 'session' in locals() else {}
        }
    )

#    except Exception as e:
#        raise HTTPException(status_code=500, detail=str(e))    



@router.post("/getResumenDeGestion/")#endpoint: sap/opu/odata/SAP/ZWMGS_ORDER_GEST_SRV/contratoSet
def getKeysResumenGestion(api_request: ResumenDeGestion, db: Session = Depends(get_db)):

#try:

    usuario_id = validate_key(api_request.llave, db)
    if not usuario_id:
        raise HTTPException(status_code=401, detail="Invalid key")
    
    # no hay cache válida: obtener nuevas cookies desde el aplicativo correspondiente
    session = requests.Session()

    app_name = "ACIIS"

    # revisar cache en BD usando el modelo (llave + app)
    now = datetime.utcnow()
    cookie_entry = db.query(models.AportalCookies).filter_by(llave=api_request.llave, app=app_name).first()
    if cookie_entry and cookie_entry.last_used:
        if (now - cookie_entry.last_used) <= timedelta(minutes=30):
            # actualizar last_used y devolver cache
            cookie_entry.last_used = now
            db.add(cookie_entry)
            db.commit()
            session.cookies.update(json.loads(cookie_entry.cookies_json) if cookie_entry.cookies_json else {})


    if not 'awsSesion' in session.cookies.get_dict():
        # Si app == 'SAR' puede requerir URL distintas; adaptar si es necesario
        # por defecto se usa el flujo existente (awsSesion)
        session = index(session)
        if session.cookies.get_dict():
            # esperar cookie awsSesion (o ajustar según app)
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


    # al tener awsSesion, llamar jsGenerate y guardar session en BD
    if 'awsSesion' in session.cookies.get_dict():
        data = jsGenerate(session, api_request.id_reporte, api_request.id, api_request.par_uni, api_request.par_pro,
                            api_request.par_can, api_request.par_sec, api_request.par_dep, api_request.par_ges,
                            api_request.par_contra, api_request.par_cua, api_request.fec_ini, api_request.fec_fin)

        # serializar cookies y persistir (crear o actualizar)
        cookies_json_new = json.dumps(session.cookies.get_dict())
        if not cookie_entry:
            cookie_entry = models.AportalCookies(
                llave=api_request.llave,
                app=app_name,
                cookies_json=cookies_json_new,
                last_saved=now,
                last_used=now
            )
        else:
            cookie_entry.cookies_json = cookies_json_new
            cookie_entry.last_saved = now
            cookie_entry.last_used = now

        db.add(cookie_entry)
        db.commit()

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

    # fallo al inicializar sesión
    return JSONResponse(
        status_code=500,
        content={
            "message": "No se pudo establecer la sesión correctamente.",
            "cookies": session.cookies.get_dict() if 'session' in locals() else {}
        }
    )

#    except Exception as e:
#        raise HTTPException(status_code=500, detail=str(e))

    
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

