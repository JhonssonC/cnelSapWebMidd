# Usa una imagen base de Python
FROM python:3.11-slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Instala dependencias de sistema ligeras (para psycopg2 y healthchecks)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copia e instala primero requirements.txt para aprovechar la caché de capas de Docker
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copia los archivos del proyecto
COPY . /app

# Expone el puerto interno de la aplicación
EXPOSE 8080

ENV DD_SERVICE="SapWebMidd"
ENV DD_ENV="dev"
ENV DD_VERSION="0.1.0"
ENV UVICORN_WORKERS="3"

LABEL com.datadoghq.tags.service="SapWebMidd"
LABEL com.datadoghq.tags.env="dev"
LABEL com.datadoghq.tags.version="0.1.0"

# Comando para ejecutar la aplicación con workers configurables y keep-alive optimizado
CMD ["sh", "-c", "ddtrace-run uvicorn app.main:app --host 0.0.0.0 --port 8080 --workers ${UVICORN_WORKERS:-3} --timeout-keep-alive 30 --backlog 2048"]
