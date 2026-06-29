import { apiBaseUrl, type ActivityGalleryItem, type ImpactStat, type SiteSetting } from './contentApi';
import type { HeroSlide, NewsItem, Partner, Recycler } from './mockData';

export const adminTokenStorageKey = 'asoantioquia-admin-token';

export interface AdminSession {
  ok: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface MediaAsset {
  id: string;
  url: string;
  filename?: string;
  mimetype?: string;
  size?: number;
  alt?: string;
  category?: string;
  provider?: string;
  publicId?: string;
}

export interface NewsPayload {
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
  published: boolean;
}

export interface GalleryPayload {
  title: string;
  category: string;
  image: string;
  description?: string;
  featured: boolean;
  published: boolean;
}

export interface TestimonialPayload {
  name: string;
  role: string;
  story: string;
  image: string;
  location: string;
  yearsWorking: number;
  published: boolean;
}

export interface PartnerPayload {
  name: string;
  logo: string;
  category: string;
  website?: string;
  description?: string;
  published: boolean;
}

async function adminRequest<T>(
  path: string,
  token: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${apiBaseUrl}/api${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function adminLogin(email: string, password: string) {
  return adminRequest<AdminSession>('/auth/login', '', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function uploadMedia(
  file: File,
  token: string,
  metadata: { alt: string; category: string },
) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('alt', metadata.alt);
  formData.append('category', metadata.category);

  return adminRequest<MediaAsset>('/media/upload', token, {
    method: 'POST',
    body: formData,
  });
}

export function createNews(payload: NewsPayload, token: string) {
  return adminRequest<NewsItem>('/news', token, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateNews(id: string, payload: NewsPayload, token: string) {
  return adminRequest<NewsItem>(`/news/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteNews(id: string, token: string) {
  return adminRequest<{ ok: boolean }>(`/news/${id}`, token, {
    method: 'DELETE',
  });
}

export function getAdminNews(token: string) {
  return adminRequest<NewsItem[]>('/news/admin/all', token);
}

export function createGalleryItem(payload: GalleryPayload, token: string) {
  return adminRequest<ActivityGalleryItem>('/gallery', token, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateGalleryItem(id: string, payload: GalleryPayload, token: string) {
  return adminRequest<ActivityGalleryItem>(`/gallery/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteGalleryItem(id: string, token: string) {
  return adminRequest<{ ok: boolean }>(`/gallery/${id}`, token, {
    method: 'DELETE',
  });
}

export function getAdminGallery(token: string) {
  return adminRequest<ActivityGalleryItem[]>('/gallery/admin/all', token);
}

export function getAdminTestimonials(token: string) {
  return adminRequest<Recycler[]>('/testimonials/admin/all', token);
}

export function createTestimonial(payload: TestimonialPayload, token: string) {
  return adminRequest<Recycler>('/testimonials', token, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateTestimonial(id: string, payload: TestimonialPayload, token: string) {
  return adminRequest<Recycler>(`/testimonials/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteTestimonial(id: string, token: string) {
  return adminRequest<{ ok: boolean }>(`/testimonials/${id}`, token, {
    method: 'DELETE',
  });
}

export function getAdminPartners(token: string) {
  return adminRequest<Partner[]>('/partners/admin/all', token);
}

export function createPartner(payload: PartnerPayload, token: string) {
  return adminRequest<Partner>('/partners', token, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updatePartner(id: string, payload: PartnerPayload, token: string) {
  return adminRequest<Partner>(`/partners/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deletePartner(id: string, token: string) {
  return adminRequest<{ ok: boolean }>(`/partners/${id}`, token, {
    method: 'DELETE',
  });
}

export function getHeroSlidesSetting() {
  return fetch(`${apiBaseUrl}/api/settings/hero-slides`).then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json() as Promise<SiteSetting<HeroSlide[]>>;
  });
}

export function saveHeroSlides(slides: HeroSlide[], token: string) {
  return adminRequest<SiteSetting<HeroSlide[]>>('/settings/hero-slides', token, {
    method: 'PUT',
    body: JSON.stringify({ value: slides }),
  });
}

export function getImpactStatsSetting() {
  return fetch(`${apiBaseUrl}/api/settings/impact-stats`).then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json() as Promise<SiteSetting<ImpactStat[]>>;
  });
}

export function saveImpactStats(stats: ImpactStat[], token: string) {
  return adminRequest<SiteSetting<ImpactStat[]>>('/settings/impact-stats', token, {
    method: 'PUT',
    body: JSON.stringify({ value: stats }),
  });
}
