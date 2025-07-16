#!/bin/bash

# Script para ejecutar Tambo Monitor con Docker en Linux/macOS
# Autor: Tambo Monitor Team
# Versión: 2.0

IMAGE_NAME="tambo-monitor"
CONTAINER_NAME="tambo-monitor-app"
PORT=3000

# Eliminar contenedor previo si existe
if [ $(docker ps -aq -f name=$CONTAINER_NAME) ]; then
    echo "🗑️ Eliminando contenedor previo..."
    docker rm -f $CONTAINER_NAME
fi

echo "🐳 Construyendo imagen Docker..."
docker build -t $IMAGE_NAME .
if [ $? -ne 0 ]; then
    echo "❌ Error al construir la imagen Docker"
    exit 1
fi

echo "🚀 Iniciando contenedor Docker..."
docker run -d --name $CONTAINER_NAME -p $PORT:3000 $IMAGE_NAME
if [ $? -ne 0 ]; then
    echo "❌ Error al iniciar el contenedor Docker"
    exit 1
fi

echo "🌐 Tambo Monitor está corriendo en http://localhost:$PORT"
echo "🛑 Para detenerlo: docker stop $CONTAINER_NAME && docker rm $CONTAINER_NAME" 