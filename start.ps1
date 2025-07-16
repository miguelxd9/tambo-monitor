# Script para ejecutar Tambo Monitor con Docker en Windows
# Autor: Tambo Monitor Team
# Versión: 2.0

$IMAGE_NAME = "tambo-monitor"
$CONTAINER_NAME = "tambo-monitor-app"
$PORT = 3000

# Eliminar contenedor previo si existe
$prevContainer = docker ps -aq -f name=$CONTAINER_NAME
if ($prevContainer) {
    Write-Host "🗑️ Eliminando contenedor previo..." -ForegroundColor Yellow
    docker rm -f $CONTAINER_NAME | Out-Null
}

Write-Host "🐳 Construyendo imagen Docker..." -ForegroundColor Cyan
docker build -t $IMAGE_NAME .
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al construir la imagen Docker" -ForegroundColor Red
    exit 1
}

Write-Host "🚀 Iniciando contenedor Docker..." -ForegroundColor Green
docker run -d --name $CONTAINER_NAME -p $PORT:3000 $IMAGE_NAME
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al iniciar el contenedor Docker" -ForegroundColor Red
    exit 1
}

Write-Host "🌐 Tambo Monitor está corriendo en http://localhost:$PORT" -ForegroundColor Green
Write-Host "🛑 Para detenerlo: docker stop $CONTAINER_NAME && docker rm $CONTAINER_NAME" -ForegroundColor Yellow 