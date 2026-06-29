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
    title: 'Capacitación Ambiental',
    description: 'Programas de educación ambiental para comunidades, empresas e instituciones educativas.',
    icon: 'GraduationCap',
    image: 'https://images.pexels.com/photos/8348740/pexels-photo-8348740.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    id: '4',
    title: 'Consultoría Sostenible',
    description: 'Asesoría especializada en gestión integral de residuos y implementación de programas sostenibles.',
    icon: 'FileText',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=900'
  }
];

export const news: NewsItem[] = [
  {
    id: '1',
    slug: 'nueva-planta-clasificacion-monteria',
    title: 'Nueva planta de clasificación fortalece la economía circular',
    excerpt: 'Un espacio operativo preparado para procesar más material aprovechable, crear empleo formal y mejorar la trazabilidad de los residuos.',
    description: 'Inauguramos una planta con capacidad para procesar 50 toneladas diarias de material reciclable, generando nuevas oportunidades laborales para recicladores de oficio.',
    date: '2024-01-15',
    featuredImage: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=1400',
    image: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=900',
    category: 'Infraestructura',
    author: 'Equipo Asoantioquia',
    readTime: '4 min',
    content: [
      'La nueva planta de clasificación fue diseñada para ordenar, pesar y preparar materiales reciclables con mayor eficiencia. Este avance permite que empresas y comunidades tengan una ruta más clara para entregar sus residuos aprovechables.',
      'El proyecto también fortalece el trabajo de los recicladores de oficio, quienes contarán con mejores condiciones operativas, herramientas de trazabilidad y procesos más seguros para la separación del material.',
      'Durante los próximos meses se integrarán nuevas rutas de recolección y jornadas de formación para que más barrios, instituciones y aliados empresariales participen activamente en el modelo de economía circular.'
    ],
    gallery: [
      'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/8471831/pexels-photo-8471831.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=900'
    ]
  },
  {
    id: '2',
    slug: 'programa-educacion-ambiental-escolar',
    title: 'Programa de educación ambiental llega a instituciones educativas',
    excerpt: 'Talleres prácticos, material pedagógico y jornadas de separación en la fuente para estudiantes y docentes.',
    description: 'Lanzamos un programa educativo que beneficiará a más de 10.000 estudiantes con talleres interactivos sobre reciclaje, consumo responsable y cuidado del entorno.',
    date: '2024-01-10',
    featuredImage: 'https://images.pexels.com/photos/8348740/pexels-photo-8348740.jpeg?auto=compress&cs=tinysrgb&w=1400',
    image: 'https://images.pexels.com/photos/8348740/pexels-photo-8348740.jpeg?auto=compress&cs=tinysrgb&w=900',
    category: 'Educación',
    author: 'Área Social',
    readTime: '3 min',
    content: [
      'La educación ambiental es una herramienta clave para transformar hábitos desde la escuela. Por eso, el programa combina actividades lúdicas, retos de clasificación y acompañamiento a docentes.',
      'Cada institución participante recibe una ruta de trabajo ajustada a su contexto, con guías para separar en la fuente, medir avances y vincular a las familias en prácticas sostenibles.',
      'El objetivo es que los estudiantes comprendan el valor social y ambiental del reciclaje, y que puedan replicar esos aprendizajes en sus hogares y comunidades.'
    ],
    gallery: [
      'https://images.pexels.com/photos/8471831/pexels-photo-8471831.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/8471985/pexels-photo-8471985.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/8348740/pexels-photo-8348740.jpeg?auto=compress&cs=tinysrgb&w=900'
    ]
  },
  {
    id: '3',
    slug: 'alianza-estrategica-empresas-locales',
    title: 'Alianzas empresariales impulsan programas de reciclaje corporativo',
    excerpt: 'Nuevos convenios conectan a empresas locales con rutas de aprovechamiento, medición de impacto y formación para equipos internos.',
    description: 'Firmamos convenios con 15 empresas locales para implementar programas de reciclaje corporativo y economía circular con indicadores de impacto.',
    date: '2024-01-05',
    featuredImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1400',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=900',
    category: 'Alianzas',
    author: 'Dirección de Proyectos',
    readTime: '5 min',
    content: [
      'Las alianzas con empresas son una oportunidad para cerrar ciclos de materiales y convertir las metas ambientales en acciones medibles. Cada convenio incluye diagnóstico, capacitación y seguimiento.',
      'Asoantioquia acompaña a los equipos internos para mejorar la separación en la fuente, definir puntos de acopio y generar reportes periódicos sobre material recuperado.',
      'Este modelo permite que las organizaciones reduzcan residuos enviados a disposición final mientras apoyan la formalización y dignificación del trabajo reciclador.'
    ],
    gallery: [
      'https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=900'
    ]
  }
];

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
    email: 'monteria@asoantioquia.org',
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
    address: 'Calle 8 #15-20, Centro, Turbo, Antioquia',
    phone: '+57 (4) 789-5678',
    email: 'turbo@asoantioquia.org',
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
];

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
    image: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=1600',
    eyebrow: 'Economía circular con impacto social',
    title: 'Asoantioquia',
    subtitle: 'transforma residuos en oportunidades',
    description: 'Conectamos empresas, comunidades y recicladores de oficio para recuperar materiales, dignificar el trabajo ambiental y cuidar el territorio.',
    statValue: '12.5K',
    statLabel: 'toneladas recuperadas'
  },
  {
    image: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=1600',
    eyebrow: 'Operación técnica y trazable',
    title: 'Reciclaje organizado',
    subtitle: 'para empresas y comunidades',
    description: 'Diseñamos rutas, capacitaciones y procesos de clasificación para que cada material aprovechable vuelva a la cadena productiva.',
    statValue: '85',
    statLabel: 'empresas aliadas'
  },
  {
    image: 'https://images.pexels.com/photos/8471985/pexels-photo-8471985.jpeg?auto=compress&cs=tinysrgb&w=1600',
    eyebrow: 'Cultura ambiental en acción',
    title: 'Educación ambiental',
    subtitle: 'que cambia hábitos',
    description: 'Acompañamos instituciones, hogares y organizaciones con programas prácticos de separación en la fuente y consumo responsable.',
    statValue: '25',
    statLabel: 'comunidades beneficiadas'
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
