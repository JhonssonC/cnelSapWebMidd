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
        'origin': 'https://amobile.altura.systems',
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

def getKey(session, key):
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
        
def aPortal(session):
    url = "https://amobile.altura.systems/aportal/l/es/u/0/index.jsp"

    payload = {}

    response = session.get(url, headers=headers, data=payload)
    
    print("\nHeaders aPortal", session.cookies.get_dict(), response.status_code)
    
    tmpkey = response.text.split('".alencode();')[0]
    tmpkey = tmpkey.split('var key = "')[1]
    
    
    if response:
        # Llamar a la función para obtener cookies específicas
        keys_to_extract = ['JSESSIONID', 'AJSESSIONID24', 'SSID']
        cookies = obtener_cookies(session.cookies.get_dict(), keys_to_extract)

        if cookies:
            cookies['key'] = tmpkey
            return {
                'key': tmpkey,
                'session': session
            }
        else:
            print("No se encontraron las cookies especificadas.")
    


def acceso(session, u, c):
    url = "https://amobile.altura.systems/aportal/l/es/u/0/accesoUsuario"

    #payload = f'accion=login&v=-1&u=0705343275&c=Gt0705343275&action='
    payload = f'accion=login&v=-1&u={u}&c={c}&action='

    response = session.post(url, headers=headers, data=payload)
    
    print("\nHeaders Acceso",session.cookies.get_dict(), response.status_code)
    
    if response:
        # Llamar a la función para obtener cookies específicas
        keys_to_extract = ['JSESSIONID', 'AJSESSIONID24', 'SSID']
        cookies = obtener_cookies(session.cookies.get_dict(), keys_to_extract)

        if cookies:
            #print("Cookies encontradas:", cookies)
            return session
        else:
            print("No se encontraron las cookies especificadas.")


def index(session):
    url = "https://amobile.altura.systems/aportal/"

    response = session.get(url, headers=headers)
    
    print("\nHeaders Main",session.cookies.get_dict(), response.status_code)

    if response:
        # Llamar a la función para obtener cookies específicas
        keys_to_extract = ['JSESSIONID', 'AJSESSIONID24', 'SSID']
        cookies = obtener_cookies(session.cookies.get_dict(), keys_to_extract)

        if cookies:
            return session
        else:
            print("No se encontraron las cookies especificadas.")
