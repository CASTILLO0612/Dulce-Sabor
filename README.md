# Dulce Sabor - Plataforma Web Comercial

Este repositorio contiene la plataforma web comercial para la empresa Dulce Sabor, dedicada a la comercialización de repostería artesanal en el municipio de Nagarote, departamento de León, Nicaragua. El diseño y desarrollo de la plataforma han sido optimizados y estructurados siguiendo estrictamente la Guía de Diseño, Evaluación y Desarrollo de Sitios Web Comerciales en el marco del programa de Mercadotecnia de la Universidad Nacional de Ingeniería.

## Propósito del Proyecto

El propósito fundamental del sitio es establecer un canal de comunicación y venta digital que inspire confianza, consolide la identidad de marca de Dulce Sabor y simplifique el flujo de adquisición de pasteles y Bento Cakes. La plataforma permite a los clientes explorar el catálogo interactivo de productos, revisar especificaciones técnicas, conocer la historia y valores de la empresa, consultar la política de retiro presencial en taller (no-delivery) y contactar de manera directa y rápida al taller de producción vía WhatsApp Business.

## Arquitectura y Tecnologías

La aplicación implementa una arquitectura fullstack desacoplada y moderna que garantiza alto rendimiento, escalabilidad y un SEO óptimo mediante la estructuración semántica de HTML5:

* **Frontend**: React 19, configurado con Vite y TypeScript. Se ha empleado un sistema de diseño minimalista basado en CSS Vanilla con tipografía editorial (Inter y Cormorant Garamond) para garantizar una carga rápida y una experiencia visual de alta gama libre de elementos distractores (cards innecesarias, sombras artificiales o badges recargados).
* **Backend**: Servidor API REST desarrollado en Node.js utilizando Express y TypeScript para la gestión dinámica de productos y opiniones.
* **Base de Datos**: Persistencia de datos en MongoDB Atlas (gestionada con Mongoose) para el catálogo de productos y el registro de opiniones y valoraciones en tiempo real.
* **Asistente de Inteligencia Artificial**: Integración de un ChatBot conversacional de atención al cliente impulsado por el SDK oficial de Google Gemini (`@google/genai`) que asesora a los usuarios sobre los productos, ingredientes y políticas de la tienda en lenguaje natural.

## Estructura y Secciones del Sitio

La estructura de la página de inicio única (Single Page Application) está organizada semánticamente de la siguiente forma:

1. **Navegación (Navbar)**: Cabecera fija con efecto de desenfoque de fondo y enlaces directos a las 7 secciones clave de la guía de evaluación comercial, incluyendo un botón directo de WhatsApp.
2. **Inicio (Hero)**: Título con tipografía Cormorant Garamond, eslogan comercial enfocado en Nagarote, llamado a la acción destacado, métricas de confianza del taller y una imagen de producto real optimizada en tamaño y compresión.
3. **Quiénes Somos (About)**: Sección de carácter institucional que incluye una breve historia del taller familiar, la misión y visión corporativas organizadas en columnas alineadas, y un desglose de los cuatro valores de la empresa (Ingredientes Naturales, Amor Artesanal, Calidad Garantizada e Innovación Constante).
4. **Catálogo de Creaciones (Catalog)**: Sistema de filtrado interactivo por categorías (Bento Cakes, Combos, Pasteles) y cuadrícula de productos sin tarjetas contenedoras. Al hacer clic en un producto se despliega un modal con la descripción detallada, especificaciones físicas (diámetro, porciones), sabores disponibles y su estado de reserva.
5. **Galería y Reseñas (Gallery)**: Mosaico fotográfico de creaciones reales del taller Nagarote y carrusel interactivo de testimonios calificados de 1 a 5 estrellas con formulario integrado para que los usuarios publiquen opiniones que persisten en la base de datos.
6. **Cómo Comprar (How To Buy)**: Explicación transparente en tres pasos del proceso de pedido (Coordinación por WhatsApp, anticipo del 50% y retiro presencial), desglose sutil de los métodos de pago (Efectivo, Transferencia, Pago Móvil) y condiciones legales de compra y cancelación.
7. **Contacto y Dirección (Location)**: Formulario de contacto integrado que redirige los datos estructurados a WhatsApp Business, mapa interactivo de Google Maps enfocado en el Parque Central de Nagarote y referencias precisas de ubicación física.
8. **Preguntas Frecuentes (FAQ)**: Acordeón minimalista categorizado para resolver dudas recurrentes sobre Pedidos, Métodos de Pago, Proceso de Retiro y Garantía.
9. **Pie de Página (Footer)**: Sección institucional en contraste oscuro que consolida los datos de contacto y horarios de atención, accesos rápidos de navegación y un modal interactivo con las cuatro políticas de la empresa (Privacidad, Términos del Servicio, Políticas de Cambios y Garantía de Diseño).

## Configuración del Entorno

Para ejecutar la aplicación localmente, se deben configurar las variables de entorno necesarias para establecer la conexión con MongoDB Atlas y la API de Inteligencia Artificial de Google.

Cree un archivo `.env` en la raíz del proyecto con la siguiente estructura:

```env
# Puerto del servidor backend (opcional, por defecto es 5000)
PORT=5000

# URI de conexión de MongoDB Atlas
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/dulcesabor

# Clave de API de Google Gemini para el asistente conversacional
GEMINI_API_KEY=tu_clave_api_de_gemini
```

## Instrucciones de Ejecución

### 1. Instalación de Dependencias

Ejecute el siguiente comando en la raíz del proyecto para instalar las dependencias tanto del cliente como del servidor:

```bash
npm install
```

### 2. Ejecución en Entorno de Desarrollo (Fullstack)

Para iniciar simultáneamente el cliente de desarrollo (Vite en puerto 5173) y el servidor backend (Express en puerto 5000), ejecute:

```bash
npm run dev:fullstack
```

*Nota: El backend requiere de unos segundos para autenticar y establecer la conexión con MongoDB Atlas antes de que las peticiones de productos y reseñas respondan. Si el frontend inicia antes, usará los datos de respaldo locales estáticos de forma automática.*

### 3. Comandos Individuales

* **Iniciar únicamente el servidor de desarrollo de Vite (Frontend)**:
  ```bash
  npm run dev
  ```
* **Iniciar únicamente el servidor de la API REST (Backend)**:
  ```bash
  npm run server
  ```
* **Compilar el frontend para producción**:
  ```bash
  npm run build
  ```
  El resultado optimizado y minificado se guardará en el directorio `/dist` listo para su despliegue en un servidor de archivos estáticos.