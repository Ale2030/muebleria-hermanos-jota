# Mueblería Hermanos Jota - E-commerce

## Descripción del Proyecto

Sitio web de e-commerce para "Mueblería Hermanos Jota", un taller familiar con más de 30 años de tradición en el diseño y fabricación de muebles de madera artesanales. El proyecto combina la robustez de lo artesanal con líneas de diseño moderno en una experiencia digital completa.

## Características Implementadas

### Funcionalidades Principales
- **Página de Inicio**: Hero banner con productos destacados cargados dinámicamente
- **Catálogo de Productos**: Grilla responsiva con todos los productos disponibles
- **Detalle de Producto**: Información completa con especificaciones técnicas
- **Formulario de Contacto**: Validación completa del lado del cliente
- **Carrito de Compras**: Sistema simulado con contador dinámico
- **Búsqueda de Productos**: Funcionalidad de búsqueda en tiempo real
- **Diseño Responsivo**: Optimizado para móvil, tablet y desktop

### Características Técnicas
- **Carga Asíncrona**: Simulación de peticiones al servidor con Promises
- **Manipulación del DOM**: Renderizado dinámico de contenido
- **Gestión de Estado**: LocalStorage para persistencia del carrito
- **Validación de Formularios**: Validación en tiempo real con feedback visual
- **Navegación SPA**: Experiencia fluida entre páginas
- **Animaciones CSS**: Micro-interacciones y transiciones suaves

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica con etiquetas apropiadas
- **CSS3**: 
  - Sistema de variables CSS para consistencia
  - Flexbox y CSS Grid para layout responsivo
  - Animaciones y transiciones CSS
  - Mobile-First design
- **JavaScript Vanilla**:
  - ES6+ con async/await
  - Módulos separados por funcionalidad
  - Event listeners y manipulación del DOM
  - LocalStorage para persistencia de datos
- **Diseño**:
  - Google Fonts (Playfair Display e Inter)
  - Imágenes de Pexels
  - Sistema de colores inspirado en madera

## Estructura del Proyecto

```
/
├── index.html              # Página principal
├── productos.html          # Catálogo de productos
├── producto.html           # Detalle de producto
├── contacto.html           # Formulario de contacto
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   ├── products.js         # Datos y lógica de productos
│   ├── cart.js            # Funcionalidad del carrito
│   ├── main.js            # Funcionalidad general
│   ├── catalog.js         # Lógica del catálogo
│   ├── product-detail.js  # Detalle de productos
│   └── contact.js         # Formulario de contacto
└── README.md              # Este archivo
```

## Instalación y Uso

1. Clona el repositorio:
```bash
git clone https://github.com/Ale2030/muebleria-hermanos-jota.git
```

2. Abre `index.html` en tu navegador web



## Navegación del Sitio

- **Inicio**: Presentación de la marca y productos destacados
- **Productos**: Catálogo completo con búsqueda
- **[Producto Individual]**: Información detallada y especificaciones
- **Contacto**: Formulario para consultas y comunicación

## Funcionalidades Destacadas

### Sistema de Carrito
- Agregar productos desde cualquier página
- Contador dinámico en la navegación
- Persistencia entre sesiones
- Notificaciones visuales

### Búsqueda de Productos
- Búsqueda en tiempo real
- Filtrado por nombre, descripción y categoría
- Resultados destacados
- Sugerencias cuando no hay resultados

### Validación de Formularios
- Validación en tiempo real
- Mensajes de error específicos
- Confirmación visual de campos correctos
- Simulación de envío al servidor

### Design System
- Variables CSS para consistencia
- Spacing system basado en 8px
- Colores temáticos inspirados en madera
- Tipografía jerarquizada
- Animaciones y micro-interacciones

## Responsividad

El sitio está optimizado para tres breakpoints principales:
- **Móvil**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## Integrantes del Proyecto

[Ignacio Javier Guridi]
[Alexis Cuevas]

## Próximas Mejoras

- Integración con backend real
- Sistema de usuarios y autenticación
- Procesamiento de pagos
- Panel de administración
- Optimización de rendimiento
- Accesibilidad mejorada

---

© 2025 Mueblería Hermanos Jota. Proyecto desarrollado como parte del Sprint 1.
