# ⚡ ERED - Sistema Móvil de Gestión de Redes Eléctricas

Aplicación móvil diseñada para la visualización, gestión y mantenimiento de redes de media tensión en terreno. Desarrollada con un enfoque **Offline-First**, permite a los operarios acceder a la topología completa de la red (miles de nodos y tramos) en zonas rurales o de baja conectividad, garantizando un rendimiento fluido a 60 FPS.

## ✨ Características Principales

* 🗺️ **Renderizado Masivo de Alta Eficiencia:** Capacidad para dibujar más de 12.000 nodos (cámaras, cuchillas, plataformas) y 13.000 tramos de cable simultáneamente usando renderizado por GPU (Vector Tiles).
* 📡 **Arquitectura Offline-First:** Toda la red topológica se carga desde una base de datos local embebida, permitiendo búsquedas de alimentadores y visualización espacial sin depender de la señal celular (3G/4G).
* 🎨 **Estilos Dinámicos y UX:** * Diferenciación visual automática entre líneas aéreas (punteadas) y subterráneas (sólidas).
  * Renderizado de iconografía técnica mediante caracteres Unicode optimizados geométricamente para no saturar la memoria del dispositivo.
* 🔍 **Interacción en Terreno:** Trazado de recorridos por alimentador y consultas de estado de cada elemento de maniobra.

## 🛠️ Stack Tecnológico

* **Frontend:** React Native + Expo (Expo Router)
* **Motor Geográfico:** Mapbox (`@rnmapbox/maps`)
* **Interfaz y UI:** React Native Paper (Material Design 3)
* **Procesamiento de Datos (Backend Offline):** Scripts en Python (Pandas, NetworkX, SciPy) para conversión de AutoCAD (.dxf) a grafos lógicos y exportación a estándar `GeoJSON/JSON`.

## 🏗️ Arquitectura de Datos
El flujo de información de ERED consta de un pipeline automatizado que transforma planos vectoriales en bases de datos navegables:

Extracción: Lectura de coordenadas y entidades desde archivos .dxf (AutoCAD).

Ruteo Inteligente: Un algoritmo en Python (utilizando NetworkX y árboles KDTree) analiza las distancias y genera los vínculos lógicos, determinando divisiones de red y la dependencia de cada elemento a su alimentador principal.

Conversión: Los datos se compilan en un formato JSON ultraligero que React Native consume de forma nativa para alimentar las capas (ShapeSource) de Mapbox.

## 🚀 Instalación y Despliegue Local

Para correr este proyecto en tu máquina local, necesitarás tener instalado [Node.js](https://nodejs.org/) y un Emulador de Android (vía Android Studio) o un dispositivo físico.

### 1. Clonar el repositorio y preparar dependencias
```bash
git clone [https://github.com/TU_USUARIO/ered-app.git](https://github.com/TU_USUARIO/ered-app.git)
cd ered-app
npm install
```

### 2. Variables de Entorno
Crea un archivo .env en la raíz del proyecto y agrega tus tokens de Mapbox (necesarios para el renderizado del mapa):
EXPO_PUBLIC_MAPBOX_TOKEN=pk.tu_token_publico_aqui
RNMAPBOX_MAPS_DOWNLOAD_TOKEN=sk.tu_token_secreto_aqui

### 3. Compilación Nativa (Android)
Debido a que el motor de Mapbox requiere código nativo, no es posible usar "Expo Go". Se debe realizar un build de desarrollo la primera vez:
```bash
npx expo run:android
```

### 4. Iniciar el servidor de desarrollo
Para los siguientes inicios (una vez compilada la app nativa), simplemente ejecuta:
```bash
npx expo start -c
```

## Convenciones de ramas (Branch Naming)

Para mantener un orden claro en el repositorio, seguimos estas convenciones para nombrar las ramas, usando guion bajo `_` (**snake_case**) para separar palabras dentro del nombre, y slash `/` para separar el prefijo del nombre de la rama:

| Prefijo    | Uso principal                                                                                 | Ejemplo                     |
|------------|-----------------------------------------------------------------------------------------------|-----------------------------|
| `feature/` | Nuevas funcionalidades o mejoras                                                              | `feature/agregar_login`     |
| `fix/`     | Corrección de errores o bugs                                                                  | `fix/arreglar_error_login`  |
| `infra/`   | Cambios en infraestructura y configuraciones técnicas                                        | `infra/configurar_dockerfile` |
| `refactor/`| Cambios en código para mejorar estructura o legibilidad sin agregar ni arreglar funcionalidad | `refactor/limpieza_codigo`  |
| `docs/`    | Cambios o mejoras en la documentación                                                         | `docs/actualizar_readme`    |
