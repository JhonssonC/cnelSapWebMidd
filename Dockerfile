# Usa una imagen base de Python
FROM python:3.11-slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de tu proyecto
COPY . /app

# Copia explícita de la base de datos y archivos SQL necesarios
COPY database.db /app/database.db
COPY sequences.sql /app/sequences.sql

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto (Ajustado a 8080 según ejecución actual)
EXPOSE 8080

ENV DD_SERVICE="SapWebMidd"
ENV DD_ENV="dev"
ENV DD_VERSION="0.1.0"

LABEL com.datadoghq.tags.service="SapWebMidd"
LABEL com.datadoghq.tags.env="dev"
LABEL com.datadoghq.tags.version="0.1.0"

# Comando para ejecutar la aplicación con 3 workers
CMD ["ddtrace-run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080", "--workers", "3"]