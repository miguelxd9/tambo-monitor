# 🏪 Tambo Monitor

Dashboard web para monitoreo y gestión de equipos en tiendas de conveniencia. Permite supervisar el estado de equipos de refrigeración, climatización, iluminación y generar reportes de consumo energético.

## ✨ Características

- 📊 **Dashboard en tiempo real** - Monitoreo de equipos y consumo energético
- 🏪 **Gestión de tiendas** - Vista general de todas las tiendas
- ⚡ **Control de energía** - Seguimiento de consumo diario, semanal y mensual
- 📈 **Reportes personalizados** - Generación de reportes con filtros avanzados
- 🔧 **Historial de mantenimiento** - Registro de mantenimientos preventivos y correctivos
- 📱 **Diseño responsive** - Funciona perfectamente en desktop, tablet y móvil
- 🔐 **Sistema de autenticación** - Login con diferentes roles de usuario

## 🛠️ Tecnologías

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **Iconos:** Heroicons, Lucide React
- **Gráficos:** Recharts
- **Exportación:** jsPDF, XLSX
- **Contenedorización:** Docker

## 🚀 Instalación y Ejecución (Recomendada: Docker)

### Opción 1: Ejecución Automática con Docker (Recomendada)

#### Linux/macOS:
```bash
# Dar permisos de ejecución
chmod +x start.sh

# Ejecutar el script (construye y levanta el contenedor Docker)
./start.sh
```

#### Windows (PowerShell):
```powershell
# Ejecutar el script (construye y levanta el contenedor Docker)
.\start.ps1
```

- La aplicación estará disponible en: [http://localhost:3000](http://localhost:3000)
- Para detener el contenedor:
  - Linux/macOS/Windows:
    ```bash
    docker stop tambo-monitor-app && docker rm tambo-monitor-app
    ```

### Opción 2: Instalación Manual (Modo desarrollo local)

#### Prerrequisitos:
- Node.js 18+ 
- npm 9+

#### Pasos:
```bash
# 1. Clonar el repositorio
git clone https://github.com/tuusuario/tambo-monitor.git
cd tambo-monitor

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:3000
```

## 🐳 Ejecución manual con Docker

### Construir y ejecutar:
```bash
# Construir la imagen
docker build -t tambo-monitor .

# Ejecutar el contenedor
docker run -d --name tambo-monitor-app -p 3000:3000 tambo-monitor
```

### Con Docker Compose:
```bash
# Crear docker-compose.yml
version: '3.8'
services:
  tambo-monitor:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production

# Ejecutar
docker-compose up
```

## 📦 Compartir el proyecto como archivo ZIP

Si deseas compartir el proyecto para que se pruebe en otra máquina (sin usar Git), puedes comprimirlo fácilmente excluyendo dependencias y archivos temporales.

### Linux/macOS:
```bash
chmod +x zip_project.sh
./zip_project.sh
```
Esto generará un archivo `tambo-monitor.zip` listo para enviar.

### Windows (PowerShell):
```powershell
.\zip_project.ps1
```
Esto generará un archivo `tambo-monitor.zip` listo para enviar.

**Instrucciones para quien recibe el ZIP:**
1. Extraer el archivo ZIP
2. Entrar a la carpeta `tambo-monitor`
3. Ejecutar el proyecto usando Docker:
   - Linux/macOS: `./start.sh`
   - Windows: `./start.ps1`

## 👤 Credenciales de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Administrador | admin@tambo.com | admin123 |
| Supervisor | supervisor@tambo.com | super123 |
| Técnico | tecnico@tambo.com | tec123 |

## 📱 Funcionalidades por Página

### 🏠 **Login** (`/`)
- Autenticación de usuarios
- Recuperación de contraseña
- Redirección automática según rol

### 🏪 **Tiendas** (`/stores`)
- Lista de todas las tiendas
- Estado de conexión
- Consumo energético por tienda
- Búsqueda y filtrado

### ⚡ **Energía** (`/energy`)
- Consumo energético diario/semanal/mensual
- Gráficos de tendencias
- Actividad de equipos
- Tabla detallada de consumo

### 🔧 **Estado de Equipos** (`/equipment/[storeId]`)
- Equipos por tipo (Refrigeración, Climatización, Iluminación)
- Estado en tiempo real
- Temperatura y consumo por equipo
- Navegación a detalles

### 📊 **Detalle del Equipo** (`/equipment-detail/[equipmentId]`)
- Información completa del equipo
- Historial de operaciones
- Alertas activas
- Control de encendido/apagado

### 🔧 **Historial de Mantenimiento** (`/maintenance-history/[equipmentId]`)
- Registro de mantenimientos
- Tipos de mantenimiento (Preventivo/Correctivo)
- Técnicos asignados
- Observaciones detalladas

### 📈 **Reportes** (`/reports`)
- Generación de reportes personalizados
- Filtros por tienda, tipo, período y equipo
- Exportación a Excel y PDF
- Vista previa de datos

## 🎨 Personalización

### Colores del Tema:
- **Header:** `#a81b8d` (Morado)
- **Logo:** `#FFD600` (Amarillo)
- **Fondo:** `#f3f4f6` (Gris claro)

### Variables CSS (en `globals.css`):
```css
:root {
  --background: #a81b8d;
  --foreground: #171717;
  --tambo-logo: #FFD600;
}
```

## 📁 Estructura del Proyecto

```
tambo-monitor/
├── src/
│   └── app/                    # Páginas de la aplicación
│       ├── energy/            # Página de energía
│       ├── equipment/         # Estado de equipos
│       ├── equipment-detail/  # Detalle de equipos
│       ├── maintenance-history/ # Historial de mantenimiento
│       ├── reports/           # Reportes
│       ├── stores/            # Tiendas
│       ├── forgot-password/   # Recuperación de contraseña
│       ├── globals.css        # Estilos globales
│       ├── layout.tsx         # Layout principal
│       └── page.tsx           # Página de login
├── public/                    # Archivos estáticos
├── utils/                     # Utilidades y helpers
├── Dockerfile                 # Configuración Docker
├── .dockerignore             # Archivos ignorados por Docker
├── start.sh                  # Script de inicio (Linux/macOS)
├── start.ps1                 # Script de inicio (Windows)
└── package.json              # Dependencias y scripts
```

## 🚀 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run start    # Servidor de producción
npm run lint     # Verificar código
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte


---

**Desarrollado con ❤️ por el equipo de Tambo Monitor**
