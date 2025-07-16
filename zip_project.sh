#!/bin/bash

# Script para comprimir el proyecto Tambo Monitor excluyendo node_modules, .next y archivos temporales
# Autor: Tambo Monitor Team
# Versión: 1.0

ZIP_NAME="tambo-monitor.zip"
EXCLUDE_LIST=(
  "node_modules/*"
  ".next/*"
  "*.log"
  "*.tmp"
  "*.DS_Store"
  "coverage/*"
  "start.sh~"
  "start.ps1~"
)

# Construir el comando de exclusión
EXCLUDE_ARGS=()
for pattern in "${EXCLUDE_LIST[@]}"; do
  EXCLUDE_ARGS+=("-x" "$pattern")
done

# Ir a la carpeta padre si es necesario
dirname=$(basename "$PWD")
if [ "$dirname" == "tambo-monitor" ]; then
  cd ..
fi

# Comprimir la carpeta
echo "📦 Comprimiendo el proyecto en $ZIP_NAME ..."
zip -r "$ZIP_NAME" tambo-monitor/ "${EXCLUDE_ARGS[@]}"

if [ $? -eq 0 ]; then
  echo "✅ Proyecto comprimido exitosamente: $ZIP_NAME"
else
  echo "❌ Error al comprimir el proyecto"
fi 