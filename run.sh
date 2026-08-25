#!/usr/bin/env bash
set -e

# Ubicarse en el directorio del proyecto
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=================================================="
echo "  Construyendo y lanzando contenedor Docker"
echo "=================================================="

# Verificar el archivo .env
if [ ! -f ".env" ]; then
    echo "⚠️ Advertencia: No se encontró el archivo .env. Asegúrate de crearlo si el proyecto requiere variables de entorno."
fi

# Determinar si usar docker compose o docker-compose
if command -v docker &> /dev/null && docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
elif command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
else
    echo "ℹ️ Docker Compose no se detectó. Usando comandos 'docker build' y 'docker run'..."
    docker build -t cnel-sap-web-midd-container .
    docker stop cnel-sap-web-midd-container 2>/dev/null || true
    docker rm cnel-sap-web-midd-container 2>/dev/null || true
    
    ENV_FLAG=""
    if [ -f ".env" ]; then
        ENV_FLAG="--env-file .env"
    fi

    docker run -d \
      --name cnel-sap-web-midd-container \
      -p 8080:8080 \
      $ENV_FLAG \
      cnel-sap-web-midd-container

    echo "✅ Contenedor desplegado exitosamente en el puerto 8080."
    exit 0
fi

echo "🚀 Ejecutando: $COMPOSE_CMD up --build -d"
$COMPOSE_CMD up --build -d

echo ""
echo "✅ Contenedor construido y ejecutándose correctamente."
echo "📊 Puedes revisar los logs ejecutando: $COMPOSE_CMD logs -f"
