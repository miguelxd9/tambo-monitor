# Script para comprimir el proyecto Tambo Monitor excluyendo node_modules, .next y archivos temporales (Windows)
# Autor: Tambo Monitor Team
# Versión: 1.0

$zipName = "tambo-monitor.zip"
$sourceDir = "tambo-monitor"
$excludePatterns = @("node_modules", ".next", "coverage", "*.log", "*.tmp", ".DS_Store", "start.sh~", "start.ps1~")

# Ir a la carpeta padre si es necesario
$currDir = Split-Path -Leaf (Get-Location)
if ($currDir -eq $sourceDir) {
    Set-Location ..
}

# Eliminar ZIP previo si existe
if (Test-Path $zipName) {
    Remove-Item $zipName
}

Write-Host "📦 Comprimiendo el proyecto en $zipName ..." -ForegroundColor Cyan

# Obtener todos los archivos y carpetas a incluir
$items = Get-ChildItem -Path $sourceDir -Recurse -Force | Where-Object {
    $exclude = $false
    foreach ($pattern in $excludePatterns) {
        if ($_.FullName -like "*$pattern*") { $exclude = $true; break }
    }
    -not $exclude
}

# Comprimir
try {
    $items | Compress-Archive -DestinationPath $zipName -Update
    Write-Host "✅ Proyecto comprimido exitosamente: $zipName" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al comprimir el proyecto" -ForegroundColor Red
} 