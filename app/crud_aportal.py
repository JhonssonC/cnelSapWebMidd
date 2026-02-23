import json
import time
import requests


headers = {
        'Host': 'amobile.altura.systems',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'es-ES,es;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
        'dnt': '1',
        'pragma': 'no-cache',
        'priority': 'u=0, i',
        'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
}

def obtener_cookies(sessionDic, keys):
    """
    Extrae cookies específicas desde los headers de una respuesta HTTP.

    :param sessionDic: Diccionario de cookies de sesion.
    :param keys: Lista de nombres de cookies a buscar.
    :return: Diccionario con las cookies encontradas.
    """
    cookies = {}
    for key in keys:
        if key in sessionDic:
            cookies[key] = sessionDic[key]

    return cookies

def cerrarSesion(session):

    # Obtener el timestamp actual en milisegundos
    timestamp_actual = int(time.time() * 1000)
    url = "https://amobile.altura.systems/aportal/l/es/u/0/cerrarSesion?"

    payload = f"&${{fecha}}={timestamp_actual}"
    
    headers = {
    'accept': '*/*',
    'accept-language': 'es-ES,es;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'dnt': '1',
    'origin': 'https://amobile.altura.systems',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://amobile.altura.systems/aportal/l/es/u/0/aportal.jsp',
    'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    }

    response = session.post(url, headers=headers, data=payload)

    print(response.text)
    
def dataSearch(session, dataSearch):
    url = "http://sar.cnel.gob.ec:9090/aflow/l/es/aflow4/funcion?"
    #payload = "id_reporte=915&id=915&PAR_UNI=07&PAR_PRO=&PAR_CAN=&PAR_SEC=&PAR_DEP=&PAR_GES=&PAR_CONTRA=17312&PAR_CUA=&FEC_INI=01/05/2025&FEC_FIN=15/5/2025&fecha=1747346666824&f=1747346666824"

    timestamp_actual = int(time.time() * 1000)
    
    payload = """ID_FUNCION=FUN_BUS_CLI2&ID_TRAMITE=0&VERSION=1&ID_TAREA=FRM_CON_INF&ID_PROCESO=PRO_BUS_C3.6&ID_TAREA_TRAMITE=0&G{FECHA}="""+timestamp_actual+"""&^$EMPRESA=CNEL&TXT_AUX_CON="""+dataSearch+"""&TXT_CON_ALT=&^$fecha="""+timestamp_actual+"""&KEYREQUEST=id"""+timestamp_actual

    headers = {
    'Accept': '*/*',
    'Accept-Language': 'es-419,es;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Origin': 'http://sar.cnel.gob.ec:9090',
    'Pragma': 'no-cache',
    'Referer': 'http://sar.cnel.gob.ec:9090/aflow/l/es/aflow4/main.jsp?build=543&acceso=true',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
    'Cookie': 'JSESSIONID=4cd697e7fd6ffd83161d0cdb1b16; SSID=KEqoU7jEp9q1dLwxkCQhlQxantrnd1WqucMS2iiYSjRQS5GdeREV3amdjJpq56R/gdyvlOyJAUdhUKm/pN/+L5p7AWW9vX2hmgzFwX3bMvwb/MNbqM/zulMb+0Zh0c9L; AJSESSIONID=TAhocKy2NmkiCModZfBJ/oIxdipIIaSqKfU1v+tSbhfmd9C+RhLcnQ==; AJSESSIONID24=P/q0tsc78QQrB5qN3jHoOblbSD8eQ8kUmn9OPctetcaMY4BlCg+uwle2arm+U+s+; JSESSIONID=4f48ee217aadaa7db8bc4ecc9cfb'
    }
    
    response = session.post(url, headers=headers, data=payload)
    
    print("Response dataSearch:", session.cookies.get_dict())
    print("Response dataSearch:", response.text)

    if response:
        # Llamar a la función para obtener cookies específicas
        keys_to_extract = ['JSESSIONID', 'AJSESSIONID24', 'SSID']
        cookies = obtener_cookies(session.cookies.get_dict(), keys_to_extract)
        if cookies:
            #print("Cookies encontradas:", cookies)
            return {
                'session': session,
                'response': json.loads(response.text)
            }
        else:
            print("No se encontraron las cookies especificadas.")
    return session

def jsGenerate(session, id_reporte=915, id=915, PAR_UNI='07', PAR_PRO='', PAR_CAN='', PAR_SEC='', PAR_DEP='', PAR_GES='', PAR_CONTRA='17312', PAR_CUA='', FEC_INI='01/05/2025', FEC_FIN='15/5/2025'):
    url = "https://amobile.altura.systems/areports/l/es/jsGenerate"
    #payload = "id_reporte=915&id=915&PAR_UNI=07&PAR_PRO=&PAR_CAN=&PAR_SEC=&PAR_DEP=&PAR_GES=&PAR_CONTRA=17312&PAR_CUA=&FEC_INI=01/05/2025&FEC_FIN=15/5/2025&fecha=1747346666824&f=1747346666824"

    timestamp_actual = int(time.time() * 1000)
    payload = f"id_reporte={id_reporte}&id={id}&PAR_UNI={PAR_UNI}&PAR_PRO={PAR_PRO}&PAR_CAN={PAR_CAN}&PAR_SEC={PAR_SEC}&PAR_DEP={PAR_DEP}&PAR_GES={PAR_GES}&PAR_CONTRA={PAR_CONTRA}&PAR_CUA={PAR_CUA}&FEC_INI={FEC_INI}&FEC_FIN={FEC_FIN}&fecha={timestamp_actual}&f={timestamp_actual}"

    headers = {
    'accept': '*/*',
    'accept-language': 'es-ES,es;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'dnt': '1',
    'origin': 'https://amobile.altura.systems',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://amobile.altura.systems/areports/l/es/Main.jsp',
    'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
    }

    response = session.post(url, headers=headers, data=payload)
    
    print("Response jsGenerate:", session.cookies.get_dict())
    print("Response jsGenerate:", response.text)

    if response:
        # Llamar a la función para obtener cookies específicas
        keys_to_extract = ['JSESSIONID', 'AJSESSIONID24', 'SSID']
        cookies = obtener_cookies(session.cookies.get_dict(), keys_to_extract)
        if cookies:
            #print("Cookies encontradas:", cookies)
            return {
                'session': session,
                'response': json.loads(response.text)
            }
        else:
            print("No se encontraron las cookies especificadas.")
    return session

def getKey(session, key, url=""):
    if url == "":
        url = f"https://amobile.altura.systems/areports/l/es/accesoKey?key={key}&acceso=true"
    
    headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'es-ES,es;q=0.9',
    'cache-control': 'no-cache',
    'dnt': '1',
    'pragma': 'no-cache',
    'priority': 'u=0, i',
    'referer': 'https://amobile.altura.systems/aportal/l/es/u/0/aportal.jsp',
    'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'iframe',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    }

    response = session.get(url, headers=headers)
    
    print("\nHeaders getKey", session.cookies.get_dict())
    
    #print("Response getKeyHeaders:", response.headers)
    print("\nResponse getKeyContent:", response.text)
    
    if response:
        return session
    
def loginAflowGetKey(session, key, url=""):
    payload = {}
    if url == "":
        url = f"http://sar.cnel.gob.ec:9090/aflow/l/es/u/0/login?version=aflow4&key={key}&acceso=true"

        headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'es-419,es;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Referer': 'http://sar.cnel.gob.ec:9090/aportal/l/es/u/0/aportal.jsp',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
        }
        
    elif url=="aciis":
        url=f"https://amobile.altura.systems/aflow4112/u/0/l/es/aflow4/main.jsp?ACORE.LANG=es&acceso=true&key={key}&key={key}&acceso=true"
        headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'es-419,es;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'DNT': '1',
            'Pragma': 'no-cache',
            'Referer': 'https://amobile.altura.systems/aportal/l/es/u/0/aportal.jsp',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
        }
    print (url)
    response = session.get(url, headers=headers, data=payload)
    
    print (response)
    
    print("\nHeaders getKey", session.cookies.get_dict())
    
    #print("Response getKeyHeaders:", response.headers)
    #print("\nResponse getKeyContent:", response.text)

    if len(session.cookies.get_dict()) > 0:
        return session
        
def aPortal(session, url=""):
    if url == "":
        url = "https://amobile.altura.systems/aportal/l/es/u/0/aportal.jsp"
        headers = {
        'Host': 'amobile.altura.systems',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'es-ES,es;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
        'dnt': '1',
        'pragma': 'no-cache',
        'priority': 'u=0, i',
        'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
        }
    else:
        headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'es-ES,es;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'DNT': '1',
        'Pragma': 'no-cache',
        'Referer': 'http://sar.cnel.gob.ec:9090/aportal/l/es/u/0/index.jsp',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
        }

    response = session.get(url, headers=headers, data={})
    
    print("\nHeaders aPortal", session.cookies.get_dict(), response.status_code)
    #print(response.text)

    tmpkey = response.text.split('".alencode();')[0]
    tmpkey = tmpkey.split('var key = "')[1]

    if response:
        # Llamar a la función para obtener cookies específicas
        keys_to_extract = ['JSESSIONID', 'AJSESSIONID', 'AJSESSIONID24', 'SSID']
        cookies = obtener_cookies(session.cookies.get_dict(), keys_to_extract)

        if cookies:
            cookies['key'] = tmpkey
            return {
                'key': tmpkey,
                'session': session
            }
        else:
            print("No se encontraron las cookies especificadas.")
    


def acceso(session, u, c, url=""):
    if url == "":
        url = "https://amobile.altura.systems/aportal/l/es/u/0/accesoUsuario"
        headers = {
        'Host': 'amobile.altura.systems',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'es-ES,es;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
        'dnt': '1',
        'pragma': 'no-cache',
        'priority': 'u=0, i',
        'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
    }
    else:
        headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'es-ES,es;q=0.9',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'DNT': '1',
        'Origin': 'http://sar.cnel.gob.ec:9090',
        'Referer': 'http://sar.cnel.gob.ec:9090/aportal/l/es/u/0/index.jsp',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
        }

    payload = f'accion=login&v=-1&u={u}&c={c}&action='

    response = session.post(url, headers=headers, data=payload)
    
    print("\nHeaders Acceso",session.cookies.get_dict(), response.status_code)
    
    if response:
        # Llamar a la función para obtener cookies específicas
        keys_to_extract = ['JSESSIONID', 'AJSESSIONID', 'AJSESSIONID24', 'SSID']
        cookies = obtener_cookies(session.cookies.get_dict(), keys_to_extract)

        if cookies:
            return session
        else:
            print("No se encontraron las cookies especificadas.")


def index(session, url=""):
    if url == "":
        url = "https://amobile.altura.systems/aportal/"
        headers = {
            'Host': 'amobile.altura.systems',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'es-ES,es;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
            'dnt': '1',
            'pragma': 'no-cache',
            'priority': 'u=0, i',
            'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
        }
    else:
        headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'es-ES,es;q=0.9,und;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'DNT': '1',
        'Pragma': 'no-cache',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
        }

    response = session.get(url, headers=headers)
    
    print("\nHeaders Main",session.cookies.get_dict(), response.status_code)

    if response:
        # Llamar a la función para obtener cookies específicas
        keys_to_extract = ['JSESSIONID', 'AJSESSIONID', 'AJSESSIONID24', 'SSID']
        cookies = obtener_cookies(session.cookies.get_dict(), keys_to_extract)

        if cookies:
            print("Cookies encontradas:", cookies)
            return session
        else:
            print("No se encontraron las cookies especificadas.")
