#!/usr/bin/env bash
set -e

# Ubicarse en el directorio del proyecto
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Número de instancias del contenedor middleware (por defecto 3, o primer argumento: ./run.sh 5)
REPLICAS="${1:-3}"

echo "=================================================="
echo "  Desplegando Clúster Middleware + PostgreSQL + Nginx"
echo "  Instancias de Middleware a levantar: ${REPLICAS}"
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
    echo "❌ Error: Se requiere Docker Compose para orquestar PostgreSQL, las ${REPLICAS} instancias y Nginx."
    exit 1
fi

# Detener contenedor legacy individual si existía de despliegues previos
docker rm -f cnel-sap-web-midd-container 2>/dev/null || true

echo "🚀 Ejecutando: $COMPOSE_CMD up --build -d --scale middleware=${REPLICAS}"
$COMPOSE_CMD up --build -d --scale middleware="${REPLICAS}"

# Recargar Nginx para asegurar que resuelva todas las IPs de las N réplicas activas
echo "🔄 Sincronizando balanceador de carga Nginx con las ${REPLICAS} instancias..."
$COMPOSE_CMD exec -T nginx nginx -s reload 2>/dev/null || $COMPOSE_CMD restart nginx

echo ""
echo "✅ Clúster desplegado y balanceado en el puerto ${NGINX_PORT:-8080}."
echo "📊 Estado de contenedores:"
$COMPOSE_CMD ps
echo ""
echo "📋 Puedes revisar los logs ejecutando: $COMPOSE_CMD logs -f"
echo "📈 Para escalar en caliente a N instancias (ej. 5): ./run.sh 5"
