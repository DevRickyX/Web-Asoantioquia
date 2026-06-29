import { useEffect, useState } from 'react';
import type { NewsItem, Recycler } from './mockData';

export interface ActivityGalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  featured?: boolean;
  description?: string;
}

export const fallbackGalleryItems: ActivityGalleryItem[] = [
  {
    id: 'gallery-001',
    title: 'Jornadas con recicladores',
    category: 'Inclusión social',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1100',
    featured: true,
  },
  {
    id: 'gallery-002',
    title: 'Clasificación de material',
    category: 'Operación',
    image: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'gallery-003',
    title: 'Talleres ambientales',
    category: 'Educación',
    image: 'https://images.pexels.com/photos/8348740/pexels-photo-8348740.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'gallery-004',
    title: 'Trabajo comunitario',
    category: 'Territorio',
    image: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: 'gallery-005',
    title: 'Alianzas y formación',
    category: 'Acompañamiento',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
];

type BackendCollection = NewsItem[] | Recycler[] | ActivityGalleryItem[];

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}/api${path}`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function useBackendCollection<T extends BackendCollection>(
  path: string,
  fallback: T,
) {
  const [items, setItems] = useState<T>(fallback);

  useEffect(() => {
    let active = true;

    getJson<T>(path)
      .then((data) => {
        if (active && Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch(() => {
        if (active) setItems(fallback);
      });

    return () => {
      active = false;
    };
  }, [fallback, path]);

  return items;
}

export function useBackendItem<T>(
  path: string | null,
  fallback: T | undefined,
) {
  const [item, setItem] = useState<T | undefined>(fallback);

  useEffect(() => {
    let active = true;

    if (!path) {
      setItem(fallback);
      return () => {
        active = false;
      };
    }

    getJson<T>(path)
      .then((data) => {
        if (active) setItem(data);
      })
      .catch(() => {
        if (active) setItem(fallback);
      });

    return () => {
      active = false;
    };
  }, [fallback, path]);

  return item;
}
