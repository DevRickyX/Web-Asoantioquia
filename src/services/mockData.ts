import newsData from './news.json';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  date: string;
  featuredImage: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  content: string[];
  gallery: string[];
  published?: boolean;
}

export interface Recycler {
  id: string;
  name: string;
  role?: string;
  story: string;
  image: string;
  location: string;
  yearsWorking: number;
  published?: boolean;
}

export interface Location {
  id: string;
  slug: string;
  name: string;
  city: string;
  region: string;
  type: string;
  summary: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  coordinates: { lat: number; lng: number };
  heroImage: string;
  gallery: string[];
  description: string[];
  stats: Array<{
    value: string;
    label: string;
    detail: string;
  }>;
  highlights: string[];
  serviceAreas: string[];
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: string;
  website?: string;
  description?: string;
  published?: boolean;
}

export interface HeroSlide {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  statValue: string;
  statLabel: string;
}

export const services: Service[] = [
  {
    id: '1',
    title: 'Recolección Especializada',
    description: 'Servicio de recolección puerta a puerta de materiales reciclables con rutas optimizadas y personal capacitado.',
    icon: 'Truck',
    image: 'https://images.pexels.com/photos/3181031/pexels-photo-3181031.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    id: '2',
    title: 'Clasificación y Procesamiento',
    description: 'Clasificación técnica de materiales con tecnología avanzada para maximizar el aprovechamiento.',
    icon: 'Recycle',
    image: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    id: '3',
    title: 'Educación y Sensibilización Ambiental',
    description: 'Espacios de conversación y orientación para promover la separación adecuada de residuos y el cuidado del entorno.',
    icon: 'GraduationCap',
    image: '/images/noticias/reconocimiento-recicladores-2026/reconocimiento-recicladores-2026-03.jpeg'
  },
  {
    id: '4',
    title: 'Consultoría Sostenible',
    description: 'Asesoría especializada en gestión integral de residuos y implementación de programas sostenibles.',
    icon: 'FileText',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=900'
  }
];

export const news = [...(newsData as NewsItem[])].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export const recyclers: Recycler[] = [
  {
    id: '1',
    name: 'María Rodríguez',
    story: 'Llevo 15 años dedicada al reciclaje. Gracias a Asoantioquia he podido mejorar mis ingresos y dar una mejor educación a mis hijos.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Montería',
    yearsWorking: 15
  },
  {
    id: '2',
    name: 'Carlos Martínez',
    story: 'El programa de capacitación me ayudó a especializar mi trabajo. Ahora lidero un grupo de 8 recicladores en mi sector.',
    image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Turbo',
    yearsWorking: 8
  },
  {
    id: '3',
    name: 'Ana Gómez',
    story: 'Gracias al apoyo de Asoantioquia, logré formalizar mi microempresa de reciclaje y ahora empleo a 3 personas más.',
    image: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Montería',
    yearsWorking: 12
  }
];

export const locations: Location[] = [
  {
    id: '1',
    slug: 'monteria',
    name: 'Sede Principal - Montería',
    city: 'Montería',
    region: 'Córdoba',
    type: 'Sede principal',
    summary: 'Centro operativo para coordinación de rutas, clasificación, educación ambiental y atención a aliados empresariales.',
    address: 'Carrera 5 #12-34, Barrio La Granja, Montería, Córdoba',
    phone: '+57 (4) 789-1234',
    email: 'contactenos@asoantioquiaturbo.com',
    hours: 'Lunes a Viernes: 7:00 AM - 5:00 PM',
    coordinates: { lat: 8.7479, lng: -75.8814 },
    heroImage: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery: [
      'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/8471831/pexels-photo-8471831.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/8348740/pexels-photo-8348740.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1000',
    ],
    description: [
      'La sede de Montería articula la operación principal de Asoantioquia: recepción de material aprovechable, acompañamiento a empresas, formación comunitaria y coordinación de rutas con recicladores de oficio.',
      'Desde este punto se impulsan procesos de clasificación y trazabilidad que ayudan a conectar residuos recuperables con nuevas cadenas productivas, manteniendo un enfoque social y ambiental.',
      'También funciona como espacio de atención para aliados, instituciones educativas y comunidades interesadas en implementar programas de separación en la fuente.',
    ],
    stats: [
      { value: '7.8K', label: 'Toneladas gestionadas', detail: 'Material aprovechable recuperado desde la operación local.' },
      { value: '280+', label: 'Recicladores vinculados', detail: 'Personas acompañadas en rutas, formación y formalización.' },
      { value: '48', label: 'Aliados activos', detail: 'Empresas e instituciones con programas de reciclaje.' },
      { value: '14', label: 'Comunidades atendidas', detail: 'Barrios y sectores con jornadas ambientales.' },
    ],
    highlights: [
      'Recepción y clasificación de material aprovechable',
      'Coordinación de rutas urbanas y empresariales',
      'Talleres de educación ambiental',
      'Atención a aliados y comunidades',
    ],
    serviceAreas: ['Montería', 'Cereté', 'Planeta Rica', 'Sahagún'],
  },
  {
    id: '2',
    slug: 'turbo',
    name: 'Sede Secundaria - Turbo',
    city: 'Turbo',
    region: 'Antioquia',
    type: 'Sede regional',
    summary: 'Punto regional para acompañamiento comunitario, rutas de recuperación y fortalecimiento de recicladores en el Urabá.',
    address: 'Calle 102 #10-61/71, barrio Buenos Aires, Turbo, Antioquia',
    phone: '+57 302 311 9180',
    email: 'contactenos@asoantioquiaturbo.com',
    hours: 'Lunes a Viernes: 8:00 AM - 4:00 PM',
    coordinates: { lat: 8.0936, lng: -76.7350 },
    heroImage: 'https://images.pexels.com/photos/8471985/pexels-photo-8471985.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery: [
      'https://images.pexels.com/photos/8471985/pexels-photo-8471985.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/8471831/pexels-photo-8471831.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1000',
    ],
    description: [
      'La sede de Turbo acerca los servicios de Asoantioquia a comunidades, recicladores y aliados del Urabá antioqueño, con énfasis en recuperación de materiales y sensibilización ambiental.',
      'Su operación facilita jornadas barriales, puntos de acopio y acompañamiento técnico para que más organizaciones separen mejor sus residuos desde el origen.',
      'El equipo regional trabaja de la mano con líderes comunitarios para fortalecer procesos sostenibles y dignificar el oficio reciclador en el territorio.',
    ],
    stats: [
      { value: '4.7K', label: 'Toneladas recuperadas', detail: 'Material gestionado desde rutas y jornadas regionales.' },
      { value: '170+', label: 'Recicladores acompañados', detail: 'Recicladores vinculados a procesos de formación y apoyo.' },
      { value: '37', label: 'Aliados territoriales', detail: 'Organizaciones, comercios e instituciones participantes.' },
      { value: '11', label: 'Comunidades activas', detail: 'Sectores con presencia periódica de programas ambientales.' },
    ],
    highlights: [
      'Jornadas comunitarias de recuperación',
      'Acompañamiento a recicladores del Urabá',
      'Puntos de acopio y sensibilización',
      'Gestión con instituciones y comercios',
    ],
    serviceAreas: ['Turbo', 'Apartadó', 'Carepa', 'Chigorodó'],
  },
].filter((location) => location.slug === 'turbo');

export const partners: Partner[] = [
  {
    id: '1',
    name: 'Coca-Cola',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Coca-Cola-Logo.png',
    category: 'Bebidas'
  },
  {
    id: '2',
    name: 'Unilever',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Unilever-Logo.png',
    category: 'Consumo'
  },
  {
    id: '3',
    name: 'Nestlé',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Nestle-Logo.png',
    category: 'Alimentos'
  },
  {
    id: '4',
    name: 'P&G',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Procter-and-Gamble-Logo.png',
    category: 'Cuidado Personal'
  },
  {
    id: '5',
    name: 'Grupo Éxito',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Logo_Grupo_%C3%89xito.svg/1200px-Logo_Grupo_%C3%89xito.svg.png',
    category: 'Retail'
  },
  {
    id: '6',
    name: 'Bavaria',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Bavaria-Logo.png',
    category: 'Bebidas'
  }
];

export const heroSlides: HeroSlide[] = [
  {
    image: '/images/noticias/reconocimiento-recicladores-2026/reconocimiento-recicladores-2026-03.jpeg',
    eyebrow: 'Acciones con la comunidad recicladora',
    title: 'Asoantioquia',
    subtitle: 'reconoce a quienes cuidan el territorio',
    description: 'Acompañamos a los recicladores de oficio con acciones de reconocimiento, escucha y sensibilización ambiental en Turbo.',
    statValue: '',
    statLabel: ''
  },
  {
    image: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=1600',
    eyebrow: 'Separar para volver a aprovechar',
    title: 'Reciclar importa',
    subtitle: 'porque los residuos pueden convertirse en recursos',
    description: 'La separación en la fuente ayuda a conservar materiales, cuidar el entorno y facilitar el trabajo de quienes los recuperan cada día.',
    statValue: '',
    statLabel: ''
  },
  {
    image: '/images/noticias/almuerzo-sensibilizacion-recicladores-2026/actividad-almuerzo-sensibilizacion-13.jpeg',
    eyebrow: 'Encuentros que construyen comunidad',
    title: 'Compartir y aprender',
    subtitle: 'también fortalece el oficio reciclador',
    description: 'Creamos espacios cercanos para conversar sobre el ambiente, compartir experiencias y reconocer el trabajo de la comunidad recicladora.',
    statValue: '',
    statLabel: ''
  }
];

export const companyInfo = {
  mission: 'Promover la cultura del reciclaje y la economía circular en Colombia, generando oportunidades de empleo digno para los recicladores de oficio y contribuyendo a la sostenibilidad ambiental.',
  vision: 'Ser la organización líder en gestión integral de residuos en Colombia, reconocida por su impacto social y ambiental positivo.',
  values: [
    { name: 'Sostenibilidad', description: 'Compromiso con el cuidado del medio ambiente y el desarrollo de prácticas que preserven los recursos naturales para las futuras generaciones.' },
    { name: 'Inclusión Social', description: 'Apoyo integral a las comunidades de recicladores, promoviendo la equidad, el respeto y la dignificación de su labor.' },
    { name: 'Innovación', description: 'Implementación de tecnologías limpias y metodologías avanzadas que optimicen los procesos de reciclaje y gestión de residuos.' },
    { name: 'Transparencia', description: 'Gestión clara, ética y responsable de recursos, manteniendo comunicación abierta con todos nuestros grupos de interés.' }
  ],
  impact: {
    tonnagesRecycled: 12500,
    jobsCreated: 450,
    companiesPartnered: 85,
    communitiesBenefited: 25
  }
};
