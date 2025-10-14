# 🌱 Asoantioquia - Sitio Web Corporativo

![Asoantioquia Logo](./public/LOGO%20ASOANTIOQUIA-02.png)

## 📋 Descripción del Proyecto

Sitio web corporativo moderno para **Asoantioquia**, una empresa líder en gestión integral de residuos y economía circular en Colombia. El sitio está diseñado para comunicar efectivamente el propósito, servicios e impacto social de la organización.

### 🎯 Objetivos Principales

- Presentar los servicios de gestión de residuos de manera atractiva
- Mostrar el impacto social y ambiental de la empresa
- Facilitar el contacto con potenciales clientes y aliados
- Educar sobre la importancia del reciclaje y la economía circular

## 🚀 Tecnologías Utilizadas

### Frontend

- **React 18** - Biblioteca principal para la interfaz de usuario
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS** - Framework de CSS utilitario para diseño moderno
- **Framer Motion** - Animaciones fluidas y micro-interacciones
- **TanStack Router** - Enrutamiento moderno y tipado

### Mapas y Geolocalización

- **Leaflet** - Mapas interactivos para mostrar ubicaciones
- **React Leaflet** - Integración de Leaflet con React

### Formularios y Validación

- **React Hook Form** - Manejo eficiente de formularios
- **Validación integrada** - Validación en tiempo real

### Herramientas de Desarrollo

- **Vite** - Bundler rápido y moderno
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **Autoprefixer** - Compatibilidad cross-browser

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── ContactForm.tsx   # Formulario de contacto
│   ├── Footer.tsx        # Pie de página
│   ├── Header.tsx        # Navegación principal
│   ├── HeroSection.tsx   # Sección hero con slider
│   ├── LocationsSection.tsx # Mapa y ubicaciones
│   ├── NewsSection.tsx   # Sección de noticias
│   ├── PartnersSection.tsx # Aliados estratégicos
│   ├── RecyclersSection.tsx # Historias de recicladores
│   ├── Root.tsx          # Layout principal
│   └── ServicesSection.tsx # Servicios ofrecidos
├── pages/                # Páginas principales
│   ├── Contact.tsx       # Página de contacto
│   ├── Home.tsx          # Página de inicio
│   ├── Impact.tsx        # Página de impacto
│   ├── Mission.tsx       # Misión y visión
│   ├── Services.tsx      # Servicios detallados
│   ├── SocialResponsibility.tsx # Responsabilidad social
│   └── Values.tsx        # Valores corporativos
├── services/             # Servicios y datos
│   └── mockData.ts       # Datos de ejemplo
├── App.tsx               # Componente principal
├── main.tsx              # Punto de entrada
├── router.tsx            # Configuración de rutas
└── index.css             # Estilos globales
```

## 🎨 Características de Diseño

### Diseño Moderno y Responsivo

- **Mobile-first** - Optimizado para dispositivos móviles
- **Diseño adaptativo** - Se ajusta a todas las pantallas
- **Animaciones sutiles** - Mejoran la experiencia del usuario
- **Micro-interacciones** - Feedback visual en hover y click

### Elementos Visuales Destacados

- **Partículas flotantes** - Elementos decorativos animados
- **Gradientes dinámicos** - Colores que reflejan la marca
- **Efectos de profundidad** - Sombras y elevaciones modernas
- **Tipografía jerárquica** - Lectura clara y organizada

### Paleta de Colores

- **Verde principal**: `#10b981` (Sostenibilidad)
- **Verde secundario**: `#059669` (Naturaleza)
- **Azul**: `#3b82f6` (Confianza)
- **Rojo**: `#ef4444` (Responsabilidad social)
- **Púrpura**: `#8b5cf6` (Innovación)

## 🗺️ Navegación del Sitio

### Menú Principal

- **Inicio** - Landing page con hero y secciones principales
- **¿Quiénes somos?** (Dropdown)
  - Misión y Visión
  - Responsabilidad Social
  - Valores
- **Servicios** - Servicios detallados de la empresa
- **Impacto** - Métricas y resultados
- **Contacto** - Formularios y información de contacto

### Secciones de la Página Principal

1. **Hero Section** - Slider con mensajes principales
2. **Servicios** - Tarjetas de servicios principales
3. **Aliados Estratégicos** - Empresas partner
4. **Noticias** - Últimas actualizaciones
5. **Historias de Recicladores** - Testimonios e impacto social
6. **Formulario de Contacto** - Contacto directo
7. **Ubicaciones** - Mapa interactivo con sedes

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- npm, yarn o pnpm

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone [url-del-repositorio]
cd asoantioquia-website
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Ejecutar en modo desarrollo**

```bash
npm run dev
```

4. **Construir para producción**

```bash
npm run build
```

5. **Previsualizar build de producción**

```bash
npm run preview
```

## 📊 Datos y Contenido

### Servicios Principales

- **Recolección Especializada** - Servicio puerta a puerta
- **Clasificación y Procesamiento** - Tecnología avanzada
- **Capacitación Ambiental** - Programas educativos
- **Consultoría Sostenible** - Asesoría especializada

### Métricas de Impacto

- **12,500+** toneladas recicladas
- **450+** empleos creados
- **85+** empresas aliadas
- **25** comunidades beneficiadas

### Ubicaciones

- **Sede Principal**: Montería, Córdoba
- **Sede Secundaria**: Turbo, Antioquia

## 🎯 Funcionalidades Principales

### Formularios Inteligentes

- **Validación en tiempo real** - Feedback inmediato
- **Formularios específicos** - General y para empresas
- **Campos condicionales** - Se adaptan al tipo de usuario

### Mapas Interactivos

- **Leaflet integration** - Mapas reales y funcionales
- **Marcadores personalizados** - Información de cada sede
- **Controles intuitivos** - Zoom y navegación fácil

### Animaciones y Efectos

- **Framer Motion** - Animaciones fluidas
- **Scroll animations** - Elementos aparecen al hacer scroll
- **Hover effects** - Feedback visual en interacciones
- **Loading states** - Estados de carga elegantes

## 🔧 Personalización

### Modificar Colores

Los colores principales se definen en `tailwind.config.js` y se pueden personalizar fácilmente.

### Agregar Contenido

- **Servicios**: Modificar `src/services/mockData.ts`
- **Noticias**: Actualizar array de noticias en mockData
- **Ubicaciones**: Agregar nuevas coordenadas y datos

### Cambiar Imágenes

- **Logo**: Reemplazar en `public/LOGO ASOANTIOQUIA-02.png`
- **Hero images**: URLs en `heroSlides` array
- **Sección images**: URLs de Pexels en mockData

## 📱 Responsividad

El sitio está optimizado para:

- **Móviles**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Desktop**: 1024px+
- **Large screens**: 1440px+

## 🚀 Optimizaciones

### Performance

- **Lazy loading** - Imágenes se cargan según necesidad
- **Code splitting** - Carga optimizada de componentes
- **Optimized images** - Compresión automática

### SEO

- **Meta tags** - Títulos y descripciones optimizadas
- **Semantic HTML** - Estructura semántica correcta
- **Alt texts** - Descripciones de imágenes

## 🤝 Contribución

### Guías de Estilo

- Usar TypeScript para tipado
- Seguir convenciones de naming de React
- Mantener componentes pequeños y reutilizables
- Documentar funciones complejas

### Proceso de Desarrollo

1. Crear branch para nueva feature
2. Desarrollar y probar localmente
3. Hacer commit con mensajes descriptivos
4. Crear pull request para revisión

## 📞 Soporte y Contacto

Para soporte técnico o consultas sobre el proyecto:

- **Email**: sricardodev@gmail.com
- **Teléfono**: +57 310 665 1486
- **Ubicación**: Montería, Córdoba, Colombia

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para Asoantioquia**

_Transformando residuos en oportunidades desde 2024_
