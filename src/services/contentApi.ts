import { companyInfo, type HeroSlide, type NewsItem, type Partner, type Recycler } from './mockData';

export interface ActivityGalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  featured?: boolean;
  description?: string;
  published?: boolean;
}

export const fallbackGalleryItems: ActivityGalleryItem[] = [
  {
    id: 'gallery-001',
    title: 'Reconocimiento a recicladores de oficio',
    category: 'Reconocimiento',
    image: '/images/noticias/reconocimiento-recicladores-2026/reconocimiento-recicladores-2026-03.jpeg',
    featured: true,
  },
  {
    id: 'gallery-002',
    title: 'Almuerzo comunitario',
    category: 'Encuentro',
    image: '/images/noticias/almuerzo-sensibilizacion-recicladores-2026/actividad-almuerzo-sensibilizacion-13.jpeg',
  },
  {
    id: 'gallery-003',
    title: 'Espacio de sensibilización',
    category: 'Educación ambiental',
    image: '/images/noticias/almuerzo-sensibilizacion-recicladores-2026/actividad-almuerzo-sensibilizacion-03.jpeg',
  },
  {
    id: 'gallery-004',
    title: 'Compartir con la comunidad recicladora',
    category: 'Comunidad',
    image: '/images/noticias/almuerzo-sensibilizacion-recicladores-2026/actividad-almuerzo-sensibilizacion-07.jpeg',
  },
  {
    id: 'gallery-005',
    title: 'Participación de recicladoras de oficio',
    category: 'Oficio reciclador',
    image: '/images/noticias/almuerzo-sensibilizacion-recicladores-2026/actividad-almuerzo-sensibilizacion-01.jpeg',
  },
];

export interface SiteSetting<T> {
  key: string;
  value: T;
  createdAt?: string;
  updatedAt?: string;
}

export interface ImpactStat {
  icon: 'Recycle' | 'Users' | 'Building2' | 'Leaf';
  value: string;
  label: string;
  detail: string;
}

export const defaultImpactStats: ImpactStat[] = [
  {
    icon: 'Recycle',
    value: companyInfo.impact.tonnagesRecycled.toLocaleString('es-CO'),
    label: 'Toneladas recicladas',
    detail: 'Material recuperado y reintegrado a cadenas productivas.',
  },
  {
    icon: 'Users',
    value: `${companyInfo.impact.jobsCreated}+`,
    label: 'Empleos generados',
    detail: 'Oportunidades de trabajo digno para recicladores de oficio.',
  },
  {
    icon: 'Building2',
    value: `${companyInfo.impact.companiesPartnered}+`,
    label: 'Empresas aliadas',
    detail: 'Organizaciones vinculadas a programas de economia circular.',
  },
  {
    icon: 'Leaf',
    value: `${companyInfo.impact.communitiesBenefited}`,
    label: 'Comunidades beneficiadas',
    detail: 'Sectores acompanados con formacion, rutas y procesos sostenibles.',
  },
];

// El contenido del sitio es estatico y vive en el frontend. Estas interfaces y
// colecciones se mantienen centralizadas para facilitar futuras actualizaciones.
export type ContentCollection = NewsItem[] | Recycler[] | Partner[] | ActivityGalleryItem[] | HeroSlide[];
