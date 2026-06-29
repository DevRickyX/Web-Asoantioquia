import { type ChangeEvent, type FormEvent, useCallback, useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  FileText,
  Handshake,
  Heading2,
  ImagePlus,
  Images,
  LayoutDashboard,
  List,
  Loader2,
  LogOut,
  Newspaper,
  Plus,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  Users,
  type LucideIcon,
} from 'lucide-react';
import {
  adminLogin,
  adminTokenStorageKey,
  createGalleryItem,
  createNews,
  createPartner,
  createTestimonial,
  deleteGalleryItem,
  deleteNews,
  deletePartner,
  deleteTestimonial,
  getAdminGallery,
  getAdminNews,
  getAdminPartners,
  getAdminTestimonials,
  getHeroSlidesSetting,
  saveHeroSlides,
  updateGalleryItem,
  updateNews,
  updatePartner,
  updateTestimonial,
  uploadMedia,
  type GalleryPayload,
  type NewsPayload,
  type PartnerPayload,
  type TestimonialPayload,
} from '../services/adminApi';
import type { ActivityGalleryItem } from '../services/contentApi';
import { heroSlides, type HeroSlide, type NewsItem, type Partner, type Recycler } from '../services/mockData';

type AdminTab = 'overview' | 'news' | 'gallery' | 'headers' | 'testimonials' | 'partners';
type Notice = { type: 'success' | 'error'; text: string } | null;

interface NewsFormState {
  title: string;
  excerpt: string;
  description: string;
  date: string;
  featuredImage: string;
  category: string;
  author: string;
  readTime: string;
  contentText: string;
  galleryText: string;
  published: boolean;
}

interface GalleryFormState {
  title: string;
  category: string;
  description: string;
  image: string;
  featured: boolean;
  published: boolean;
}

interface TestimonialFormState {
  name: string;
  role: string;
  story: string;
  image: string;
  location: string;
  yearsWorking: string;
  published: boolean;
}

interface PartnerFormState {
  name: string;
  logo: string;
  category: string;
  website: string;
  description: string;
  published: boolean;
}

const today = new Date().toISOString().slice(0, 10);

const defaultNewsForm: NewsFormState = {
  title: '',
  excerpt: '',
  description: '',
  date: today,
  featuredImage: '',
  category: 'Actualidad',
  author: 'Equipo Asoantioquia',
  readTime: '3 min',
  contentText: '',
  galleryText: '',
  published: true,
};

const defaultGalleryForm: GalleryFormState = {
  title: '',
  category: 'Actividades',
  description: '',
  image: '',
  featured: false,
  published: true,
};

const defaultTestimonialForm: TestimonialFormState = {
  name: '',
  role: 'Reciclador de oficio',
  story: '',
  image: '',
  location: 'Antioquia',
  yearsWorking: '1',
  published: true,
};

const defaultPartnerForm: PartnerFormState = {
  name: '',
  logo: '',
  category: 'Aliado estrategico',
  website: '',
  description: '',
  published: true,
};

const defaultHeroSlide: HeroSlide = { ...heroSlides[0] };

const tabs: Array<{ id: AdminTab; label: string; icon: LucideIcon }> = [
  { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
  { id: 'news', label: 'Noticias', icon: Newspaper },
  { id: 'gallery', label: 'Galeria', icon: ImagePlus },
  { id: 'headers', label: 'Headers', icon: Upload },
  { id: 'testimonials', label: 'Testimonios', icon: Users },
  { id: 'partners', label: 'Aliados', icon: Handshake },
];

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100';
const labelClass = 'text-sm font-semibold text-slate-700';

function splitParagraphs(value: string) {
  return value
    .split(/\n{2,}|\n/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitUrls(value: string) {
  return value
    .split(/[\n,]/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinBlocks(value?: string[]) {
  return Array.isArray(value) ? value.join('\n\n') : '';
}

export function AdminDashboard() {
  const [token, setToken] = useState('');
  const [loginEmail, setLoginEmail] = useState('admin@asoantioquia.org');
  const [loginPassword, setLoginPassword] = useState('');
  const [sessionEmail, setSessionEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [notice, setNotice] = useState<Notice>(null);
  const [isBusy, setIsBusy] = useState(false);

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<ActivityGalleryItem[]>([]);
  const [testimonialItems, setTestimonialItems] = useState<Recycler[]>([]);
  const [partnerItems, setPartnerItems] = useState<Partner[]>([]);
  const [heroSlidesForm, setHeroSlidesForm] = useState<HeroSlide[]>([defaultHeroSlide]);
  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0);

  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  const [selectedTestimonialId, setSelectedTestimonialId] = useState<string | null>(null);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);

  const [newsForm, setNewsForm] = useState<NewsFormState>(defaultNewsForm);
  const [galleryForm, setGalleryForm] = useState<GalleryFormState>(defaultGalleryForm);
  const [testimonialForm, setTestimonialForm] = useState<TestimonialFormState>(defaultTestimonialForm);
  const [partnerForm, setPartnerForm] = useState<PartnerFormState>(defaultPartnerForm);

  const [newsFile, setNewsFile] = useState<File | null>(null);
  const [newsGalleryFiles, setNewsGalleryFiles] = useState<File[]>([]);
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [testimonialFile, setTestimonialFile] = useState<File | null>(null);
  const [partnerFile, setPartnerFile] = useState<File | null>(null);

  const newsImagePreview = useObjectUrl(newsFile) || newsForm.featuredImage;
  const galleryImagePreview = useObjectUrl(galleryFile) || galleryForm.image;
  const heroImagePreview = useObjectUrl(heroFile) || heroSlidesForm[selectedHeroIndex]?.image || '';
  const testimonialImagePreview = useObjectUrl(testimonialFile) || testimonialForm.image;
  const partnerLogoPreview = useObjectUrl(partnerFile) || partnerForm.logo;

  const loadHeroSetting = useCallback(async () => {
    try {
      const setting = await getHeroSlidesSetting();
      const slides = Array.isArray(setting.value) && setting.value.length > 0
        ? setting.value
        : [defaultHeroSlide];

      setHeroSlidesForm(slides);
      setSelectedHeroIndex(0);
    } catch {
      setHeroSlidesForm([defaultHeroSlide]);
      setSelectedHeroIndex(0);
    }
  }, []);

  const refreshContent = useCallback(async (activeToken: string) => {
    const [adminNews, adminGallery, adminTestimonials, adminPartners] = await Promise.all([
      getAdminNews(activeToken),
      getAdminGallery(activeToken),
      getAdminTestimonials(activeToken),
      getAdminPartners(activeToken),
    ]);

    setNewsItems(adminNews);
    setGalleryItems(adminGallery);
    setTestimonialItems(adminTestimonials);
    setPartnerItems(adminPartners);
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem(adminTokenStorageKey);

    if (!savedToken) return;

    refreshContent(savedToken)
      .then(() => {
        setToken(savedToken);
        setIsAuthenticated(true);
        void loadHeroSetting();
      })
      .catch(() => {
        localStorage.removeItem(adminTokenStorageKey);
      });
  }, [loadHeroSetting, refreshContent]);

  const showNotice = (nextNotice: Notice) => {
    setNotice(nextNotice);
    if (nextNotice) {
      window.setTimeout(() => setNotice(null), 5000);
    }
  };

  const uploadImage = async (file: File | null, fallbackUrl: string, alt: string, category: string) => {
    if (!file) return fallbackUrl.trim();

    const media = await uploadMedia(file, token, { alt, category });
    return media.url;
  };

  const uploadManyImages = async (files: File[], alt: string, category: string) => {
    if (!files.length) return [];

    const uploaded = await Promise.all(
      files.map((file, index) =>
        uploadMedia(file, token, { alt: `${alt} ${index + 1}`, category }),
      ),
    );

    return uploaded.map((item) => item.url);
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBusy(true);

    try {
      const session = await adminLogin(loginEmail, loginPassword);
      localStorage.setItem(adminTokenStorageKey, session.token);
      setToken(session.token);
      setSessionEmail(session.user.email);
      setIsAuthenticated(true);
      await refreshContent(session.token);
      await loadHeroSetting();
      showNotice({ type: 'success', text: 'Sesion iniciada.' });
    } catch {
      showNotice({ type: 'error', text: 'Correo o contrasena invalidos.' });
    } finally {
      setIsBusy(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(adminTokenStorageKey);
    setToken('');
    setLoginPassword('');
    setSessionEmail('');
    setIsAuthenticated(false);
    setActiveTab('overview');
  };

  const resetNewsForm = () => {
    setSelectedNewsId(null);
    setNewsForm(defaultNewsForm);
    setNewsFile(null);
    setNewsGalleryFiles([]);
  };

  const editNews = (item: NewsItem) => {
    setSelectedNewsId(item.id);
    setNewsForm({
      title: item.title || '',
      excerpt: item.excerpt || '',
      description: item.description || '',
      date: item.date || today,
      featuredImage: item.featuredImage || item.image || '',
      category: item.category || 'Actualidad',
      author: item.author || 'Equipo Asoantioquia',
      readTime: item.readTime || '3 min',
      contentText: joinBlocks(item.content),
      galleryText: Array.isArray(item.gallery) ? item.gallery.join('\n') : '',
      published: item.published ?? true,
    });
    setNewsFile(null);
    setNewsGalleryFiles([]);
    setActiveTab('news');
  };

  const handleNewsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBusy(true);

    try {
      const imageUrl = await uploadImage(
        newsFile,
        newsForm.featuredImage,
        newsForm.title || 'Portada de noticia',
        'noticias',
      );
      const uploadedGallery = await uploadManyImages(
        newsGalleryFiles,
        newsForm.title || 'Galeria de noticia',
        'noticias',
      );
      const galleryUrls = [...splitUrls(newsForm.galleryText), ...uploadedGallery];

      if (!imageUrl) {
        throw new Error('La noticia necesita una imagen destacada.');
      }

      const payload: NewsPayload = {
        title: newsForm.title,
        excerpt: newsForm.excerpt,
        description: newsForm.description || newsForm.excerpt,
        date: newsForm.date,
        featuredImage: imageUrl,
        image: imageUrl,
        category: newsForm.category,
        author: newsForm.author,
        readTime: newsForm.readTime,
        content: splitParagraphs(newsForm.contentText),
        gallery: galleryUrls,
        published: newsForm.published,
      };

      if (selectedNewsId) {
        await updateNews(selectedNewsId, payload, token);
      } else {
        await createNews(payload, token);
      }

      resetNewsForm();
      await refreshContent(token);
      showNotice({ type: 'success', text: selectedNewsId ? 'Noticia actualizada.' : 'Noticia creada.' });
    } catch (error) {
      showNotice({
        type: 'error',
        text: error instanceof Error ? error.message : 'No se pudo guardar la noticia.',
      });
    } finally {
      setIsBusy(false);
    }
  };

  const handleDeleteNews = async (item: NewsItem) => {
    if (!window.confirm(`Eliminar la noticia "${item.title}"?`)) return;

    setIsBusy(true);
    try {
      await deleteNews(item.id, token);
      resetNewsForm();
      await refreshContent(token);
      showNotice({ type: 'success', text: 'Noticia eliminada.' });
    } catch {
      showNotice({ type: 'error', text: 'No se pudo eliminar la noticia.' });
    } finally {
      setIsBusy(false);
    }
  };

  const resetGalleryForm = () => {
    setSelectedGalleryId(null);
    setGalleryForm(defaultGalleryForm);
    setGalleryFile(null);
  };

  const editGallery = (item: ActivityGalleryItem) => {
    setSelectedGalleryId(item.id);
    setGalleryForm({
      title: item.title || '',
      category: item.category || 'Actividades',
      description: item.description || '',
      image: item.image || '',
      featured: item.featured ?? false,
      published: item.published ?? true,
    });
    setGalleryFile(null);
    setActiveTab('gallery');
  };

  const handleGallerySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBusy(true);

    try {
      const imageUrl = await uploadImage(
        galleryFile,
        galleryForm.image,
        galleryForm.title || 'Actividad Asoantioquia',
        'galeria',
      );

      if (!imageUrl) {
        throw new Error('La galeria necesita una imagen.');
      }

      const payload: GalleryPayload = {
        title: galleryForm.title,
        category: galleryForm.category,
        description: galleryForm.description,
        image: imageUrl,
        featured: galleryForm.featured,
        published: galleryForm.published,
      };

      if (selectedGalleryId) {
        await updateGalleryItem(selectedGalleryId, payload, token);
      } else {
        await createGalleryItem(payload, token);
      }

      resetGalleryForm();
      await refreshContent(token);
      showNotice({ type: 'success', text: selectedGalleryId ? 'Imagen actualizada.' : 'Imagen agregada.' });
    } catch (error) {
      showNotice({
        type: 'error',
        text: error instanceof Error ? error.message : 'No se pudo guardar la imagen.',
      });
    } finally {
      setIsBusy(false);
    }
  };

  const handleDeleteGallery = async (item: ActivityGalleryItem) => {
    if (!window.confirm(`Eliminar la imagen "${item.title}"?`)) return;

    setIsBusy(true);
    try {
      await deleteGalleryItem(item.id, token);
      resetGalleryForm();
      await refreshContent(token);
      showNotice({ type: 'success', text: 'Imagen eliminada.' });
    } catch {
      showNotice({ type: 'error', text: 'No se pudo eliminar la imagen.' });
    } finally {
      setIsBusy(false);
    }
  };

  const updateCurrentHero = (field: keyof HeroSlide, value: string) => {
    setHeroSlidesForm((current) => {
      const next = current.length ? [...current] : [defaultHeroSlide];
      next[selectedHeroIndex] = {
        ...(next[selectedHeroIndex] || defaultHeroSlide),
        [field]: value,
      };
      return next;
    });
  };

  const addHeroSlide = () => {
    setHeroSlidesForm((current) => {
      const next = [
        ...current,
        {
          ...defaultHeroSlide,
          eyebrow: 'Asoantioquia',
          title: 'Nuevo header',
          subtitle: 'Gestion ambiental y social',
        },
      ];
      setSelectedHeroIndex(next.length - 1);
      return next;
    });
    setHeroFile(null);
  };

  const deleteCurrentHero = () => {
    setHeroSlidesForm((current) => {
      if (current.length <= 1) {
        setSelectedHeroIndex(0);
        return [defaultHeroSlide];
      }

      const next = current.filter((_, index) => index !== selectedHeroIndex);
      setSelectedHeroIndex(Math.max(0, selectedHeroIndex - 1));
      return next;
    });
    setHeroFile(null);
  };

  const handleHeroSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBusy(true);

    try {
      const currentHero = heroSlidesForm[selectedHeroIndex] || defaultHeroSlide;
      const imageUrl = await uploadImage(
        heroFile,
        currentHero.image,
        currentHero.title || 'Header Asoantioquia',
        'header',
      );
      const nextSlides = heroSlidesForm.length ? [...heroSlidesForm] : [defaultHeroSlide];
      nextSlides[selectedHeroIndex] = { ...currentHero, image: imageUrl };

      await saveHeroSlides(nextSlides, token);
      setHeroSlidesForm(nextSlides);
      setHeroFile(null);
      showNotice({ type: 'success', text: 'Headers actualizados.' });
    } catch (error) {
      showNotice({
        type: 'error',
        text: error instanceof Error ? error.message : 'No se pudo actualizar el header.',
      });
    } finally {
      setIsBusy(false);
    }
  };

  const resetTestimonialForm = () => {
    setSelectedTestimonialId(null);
    setTestimonialForm(defaultTestimonialForm);
    setTestimonialFile(null);
  };

  const editTestimonial = (item: Recycler) => {
    setSelectedTestimonialId(item.id);
    setTestimonialForm({
      name: item.name || '',
      role: item.role || 'Reciclador de oficio',
      story: item.story || '',
      image: item.image || '',
      location: item.location || 'Antioquia',
      yearsWorking: String(item.yearsWorking ?? 0),
      published: item.published ?? true,
    });
    setTestimonialFile(null);
    setActiveTab('testimonials');
  };

  const handleTestimonialSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBusy(true);

    try {
      const imageUrl = await uploadImage(
        testimonialFile,
        testimonialForm.image,
        testimonialForm.name || 'Testimonio Asoantioquia',
        'testimonios',
      );

      if (!imageUrl) {
        throw new Error('El testimonio necesita una imagen.');
      }

      const payload: TestimonialPayload = {
        name: testimonialForm.name,
        role: testimonialForm.role,
        story: testimonialForm.story,
        image: imageUrl,
        location: testimonialForm.location,
        yearsWorking: Number(testimonialForm.yearsWorking || 0),
        published: testimonialForm.published,
      };

      if (selectedTestimonialId) {
        await updateTestimonial(selectedTestimonialId, payload, token);
      } else {
        await createTestimonial(payload, token);
      }

      resetTestimonialForm();
      await refreshContent(token);
      showNotice({ type: 'success', text: selectedTestimonialId ? 'Testimonio actualizado.' : 'Testimonio creado.' });
    } catch (error) {
      showNotice({
        type: 'error',
        text: error instanceof Error ? error.message : 'No se pudo guardar el testimonio.',
      });
    } finally {
      setIsBusy(false);
    }
  };

  const handleDeleteTestimonial = async (item: Recycler) => {
    if (!window.confirm(`Eliminar el testimonio de "${item.name}"?`)) return;

    setIsBusy(true);
    try {
      await deleteTestimonial(item.id, token);
      resetTestimonialForm();
      await refreshContent(token);
      showNotice({ type: 'success', text: 'Testimonio eliminado.' });
    } catch {
      showNotice({ type: 'error', text: 'No se pudo eliminar el testimonio.' });
    } finally {
      setIsBusy(false);
    }
  };

  const resetPartnerForm = () => {
    setSelectedPartnerId(null);
    setPartnerForm(defaultPartnerForm);
    setPartnerFile(null);
  };

  const editPartner = (item: Partner) => {
    setSelectedPartnerId(item.id);
    setPartnerForm({
      name: item.name || '',
      logo: item.logo || '',
      category: item.category || 'Aliado estrategico',
      website: item.website || '',
      description: item.description || '',
      published: item.published ?? true,
    });
    setPartnerFile(null);
    setActiveTab('partners');
  };

  const handlePartnerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBusy(true);

    try {
      const logoUrl = await uploadImage(
        partnerFile,
        partnerForm.logo,
        partnerForm.name || 'Logo aliado',
        'aliados',
      );

      if (!logoUrl) {
        throw new Error('El aliado necesita un logo o imagen.');
      }

      const payload: PartnerPayload = {
        name: partnerForm.name,
        logo: logoUrl,
        category: partnerForm.category,
        website: partnerForm.website || undefined,
        description: partnerForm.description || undefined,
        published: partnerForm.published,
      };

      if (selectedPartnerId) {
        await updatePartner(selectedPartnerId, payload, token);
      } else {
        await createPartner(payload, token);
      }

      resetPartnerForm();
      await refreshContent(token);
      showNotice({ type: 'success', text: selectedPartnerId ? 'Aliado actualizado.' : 'Aliado creado.' });
    } catch (error) {
      showNotice({
        type: 'error',
        text: error instanceof Error ? error.message : 'No se pudo guardar el aliado.',
      });
    } finally {
      setIsBusy(false);
    }
  };

  const handleDeletePartner = async (item: Partner) => {
    if (!window.confirm(`Eliminar el aliado "${item.name}"?`)) return;

    setIsBusy(true);
    try {
      await deletePartner(item.id, token);
      resetPartnerForm();
      await refreshContent(token);
      showNotice({ type: 'success', text: 'Aliado eliminado.' });
    } catch {
      showNotice({ type: 'error', text: 'No se pudo eliminar el aliado.' });
    } finally {
      setIsBusy(false);
    }
  };

  const handleFile = (
    event: ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void,
  ) => {
    setter(event.target.files?.[0] || null);
  };

  const currentHero = heroSlidesForm[selectedHeroIndex] || defaultHeroSlide;

  if (!isAuthenticated) {
    return (
      <section className="min-h-[calc(100vh-80px)] bg-slate-950 px-4 py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100">
              <ShieldCheck className="h-4 w-4" />
              Panel Asoantioquia
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
              Administracion de contenido del sitio
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              Gestiona noticias, galeria, testimonios, aliados y headers desde una vista conectada al backend.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="rounded-lg border border-white/10 bg-white p-6 text-slate-900 shadow-2xl shadow-black/30"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-emerald-50 p-3 text-emerald-700">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-xl font-bold">Iniciar sesion</h2>
                <p className="text-sm text-slate-500">Correo y contrasena</p>
              </div>
            </div>

            <label className="mt-6 block">
              <span className={labelClass}>Correo</span>
              <input
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
                className={`${inputClass} mt-2`}
                type="email"
                autoComplete="email"
                required
              />
            </label>

            <label className="mt-4 block">
              <span className={labelClass}>Contrasena</span>
              <input
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                className={`${inputClass} mt-2`}
                type="password"
                autoComplete="current-password"
                required
              />
            </label>

            <button
              type="submit"
              disabled={isBusy}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              Entrar
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Asoantioquia
            </span>
            <h1 className="mt-1 text-3xl font-bold text-slate-950">Dashboard administrador</h1>
            {sessionEmail && (
              <p className="mt-1 text-sm font-medium text-slate-500">{sessionEmail}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="h-4 w-4" />
            Salir
          </button>
        </div>

        {notice && (
          <div
            className={`mt-6 flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-semibold ${
              notice.type === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-red-200 bg-red-50 text-red-800'
            }`}
          >
            {notice.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            {notice.text}
          </div>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
          <nav className="h-fit rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-bold transition ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-900/10'
                      : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="space-y-6">
            {activeTab === 'overview' && (
              <>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  <SummaryCard icon={Newspaper} label="Noticias" value={newsItems.length} />
                  <SummaryCard icon={ImagePlus} label="Imagenes" value={galleryItems.length} />
                  <SummaryCard icon={Upload} label="Headers" value={heroSlidesForm.length} />
                  <SummaryCard icon={Users} label="Testimonios" value={testimonialItems.length} />
                  <SummaryCard icon={Handshake} label="Aliados" value={partnerItems.length} />
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionTitle icon={Sparkles} title="Cifras automaticas para la landing" />
                  <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
                    La seccion de cifras publica se alimenta del backend: cuenta noticias publicadas, imagenes de galeria, testimonios y aliados activos. Al crear o eliminar contenido aqui, esas cifras se actualizan solas.
                  </p>
                </div>
              </>
            )}

            {activeTab === 'news' && (
              <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
                <ContentList
                  title="Noticias existentes"
                  items={newsItems}
                  emptyText="No hay noticias todavia."
                  getTitle={(item) => item.title}
                  getSubtitle={(item) => item.category}
                  getImage={(item) => item.image}
                  onNew={resetNewsForm}
                  onEdit={editNews}
                  onDelete={handleDeleteNews}
                />

                <form onSubmit={handleNewsSubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionTitle icon={Newspaper} title={selectedNewsId ? 'Editar noticia' : 'Crear noticia'} />
                  <div className="mt-6 grid gap-6 2xl:grid-cols-[1fr_380px]">
                    <div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <TextField label="Titulo" value={newsForm.title} onChange={(value) => setNewsForm({ ...newsForm, title: value })} required />
                        <TextField label="Categoria" value={newsForm.category} onChange={(value) => setNewsForm({ ...newsForm, category: value })} />
                        <TextField label="Fecha" type="date" value={newsForm.date} onChange={(value) => setNewsForm({ ...newsForm, date: value })} />
                        <TextField label="Autor" value={newsForm.author} onChange={(value) => setNewsForm({ ...newsForm, author: value })} />
                        <TextField label="Tiempo de lectura" value={newsForm.readTime} onChange={(value) => setNewsForm({ ...newsForm, readTime: value })} />
                        <FileField label="Imagen destacada" onChange={(event) => handleFile(event, setNewsFile)} />
                        <TextField label="URL de imagen destacada" value={newsForm.featuredImage} onChange={(value) => setNewsForm({ ...newsForm, featuredImage: value })} />
                        <FileField
                          label="Galeria de la noticia"
                          multiple
                          onChange={(event) => setNewsGalleryFiles(Array.from(event.target.files || []))}
                        />
                      </div>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <TextArea label="Resumen" value={newsForm.excerpt} onChange={(value) => setNewsForm({ ...newsForm, excerpt: value })} required />
                        <TextArea label="Descripcion" value={newsForm.description} onChange={(value) => setNewsForm({ ...newsForm, description: value })} />
                      </div>
                      <div className="mt-4">
                        <TextArea label="URLs de galeria guardadas" value={newsForm.galleryText} onChange={(value) => setNewsForm({ ...newsForm, galleryText: value })} />
                      </div>
                      <RichTextArea
                        value={newsForm.contentText}
                        onChange={(value) => setNewsForm({ ...newsForm, contentText: value })}
                      />
                      <PublishedToggle
                        checked={newsForm.published}
                        onChange={(value) => setNewsForm({ ...newsForm, published: value })}
                      />
                      <SubmitButton isBusy={isBusy} label={selectedNewsId ? 'Actualizar noticia' : 'Crear noticia'} />
                    </div>
                    <NewsPreview form={newsForm} image={newsImagePreview} />
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
                <ContentList
                  title="Galeria existente"
                  items={galleryItems}
                  emptyText="No hay imagenes todavia."
                  getTitle={(item) => item.title}
                  getSubtitle={(item) => item.featured ? 'Destacada' : item.category}
                  getImage={(item) => item.image}
                  onNew={resetGalleryForm}
                  onEdit={editGallery}
                  onDelete={handleDeleteGallery}
                />

                <form onSubmit={handleGallerySubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionTitle icon={ImagePlus} title={selectedGalleryId ? 'Editar imagen' : 'Cargar imagen'} />
                  <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
                    <div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <TextField label="Titulo" value={galleryForm.title} onChange={(value) => setGalleryForm({ ...galleryForm, title: value })} required />
                        <TextField label="Categoria" value={galleryForm.category} onChange={(value) => setGalleryForm({ ...galleryForm, category: value })} />
                        <FileField label="Imagen" onChange={(event) => handleFile(event, setGalleryFile)} />
                        <TextField label="URL de imagen" value={galleryForm.image} onChange={(value) => setGalleryForm({ ...galleryForm, image: value })} />
                      </div>
                      <div className="mt-4">
                        <TextArea label="Descripcion" value={galleryForm.description} onChange={(value) => setGalleryForm({ ...galleryForm, description: value })} />
                      </div>
                      <label className="mt-4 flex items-center gap-3 text-sm font-semibold text-slate-700">
                        <input
                          type="checkbox"
                          checked={galleryForm.featured}
                          onChange={(event) => setGalleryForm({ ...galleryForm, featured: event.target.checked })}
                          className="h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-500"
                        />
                        Destacar en la landing
                      </label>
                      <PublishedToggle
                        checked={galleryForm.published}
                        onChange={(value) => setGalleryForm({ ...galleryForm, published: value })}
                      />
                      <SubmitButton isBusy={isBusy} label={selectedGalleryId ? 'Actualizar imagen' : 'Guardar imagen'} />
                    </div>
                    <ImagePreview image={galleryImagePreview} title={galleryForm.title} subtitle={galleryForm.category} />
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'headers' && (
              <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-base font-bold text-slate-950">Headers</h2>
                    <button
                      type="button"
                      onClick={addHeroSlide}
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-800"
                    >
                      <Plus className="h-4 w-4" />
                      Nuevo
                    </button>
                  </div>
                  <div className="mt-4 space-y-2">
                    {heroSlidesForm.map((slide, index) => (
                      <button
                        key={`${slide.title}-${index}`}
                        type="button"
                        onClick={() => {
                          setSelectedHeroIndex(index);
                          setHeroFile(null);
                        }}
                        className={`flex w-full gap-3 rounded-lg border p-3 text-left transition ${
                          selectedHeroIndex === index
                            ? 'border-emerald-300 bg-emerald-50'
                            : 'border-slate-100 hover:border-emerald-200 hover:bg-slate-50'
                        }`}
                      >
                        <img src={slide.image} alt={slide.title} className="h-14 w-16 rounded-md object-cover" />
                        <span>
                          <span className="line-clamp-1 text-sm font-bold text-slate-900">{slide.title}</span>
                          <span className="line-clamp-1 text-xs text-slate-500">{slide.subtitle}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleHeroSubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <SectionTitle icon={Upload} title={`Editar header ${selectedHeroIndex + 1}`} />
                    <button
                      type="button"
                      onClick={deleteCurrentHero}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </button>
                  </div>
                  <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
                    <div className="grid gap-4 md:grid-cols-2">
                      <TextField label="Etiqueta" value={currentHero.eyebrow} onChange={(value) => updateCurrentHero('eyebrow', value)} />
                      <TextField label="Titulo" value={currentHero.title} onChange={(value) => updateCurrentHero('title', value)} />
                      <TextField label="Subtitulo" value={currentHero.subtitle} onChange={(value) => updateCurrentHero('subtitle', value)} />
                      <FileField label="Imagen del header" onChange={(event) => handleFile(event, setHeroFile)} />
                      <TextField label="URL de imagen" value={currentHero.image} onChange={(value) => updateCurrentHero('image', value)} />
                      <TextField label="Cifra" value={currentHero.statValue} onChange={(value) => updateCurrentHero('statValue', value)} />
                      <TextField label="Etiqueta de cifra" value={currentHero.statLabel} onChange={(value) => updateCurrentHero('statLabel', value)} />
                      <TextArea label="Descripcion" value={currentHero.description} onChange={(value) => updateCurrentHero('description', value)} />
                    </div>
                    <ImagePreview image={heroImagePreview} title={currentHero.title} subtitle={currentHero.subtitle} dark />
                  </div>
                  <SubmitButton isBusy={isBusy} label="Guardar headers" />
                </form>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
                <ContentList
                  title="Testimonios"
                  items={testimonialItems}
                  emptyText="No hay testimonios todavia."
                  getTitle={(item) => item.name}
                  getSubtitle={(item) => item.role || item.location}
                  getImage={(item) => item.image}
                  onNew={resetTestimonialForm}
                  onEdit={editTestimonial}
                  onDelete={handleDeleteTestimonial}
                />

                <form onSubmit={handleTestimonialSubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionTitle icon={Users} title={selectedTestimonialId ? 'Editar testimonio' : 'Crear testimonio'} />
                  <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
                    <div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <TextField label="Nombre" value={testimonialForm.name} onChange={(value) => setTestimonialForm({ ...testimonialForm, name: value })} required />
                        <TextField label="Rol" value={testimonialForm.role} onChange={(value) => setTestimonialForm({ ...testimonialForm, role: value })} />
                        <TextField label="Ubicacion" value={testimonialForm.location} onChange={(value) => setTestimonialForm({ ...testimonialForm, location: value })} />
                        <TextField label="Anios trabajando" type="number" value={testimonialForm.yearsWorking} onChange={(value) => setTestimonialForm({ ...testimonialForm, yearsWorking: value })} />
                        <FileField label="Foto" onChange={(event) => handleFile(event, setTestimonialFile)} />
                        <TextField label="URL de foto" value={testimonialForm.image} onChange={(value) => setTestimonialForm({ ...testimonialForm, image: value })} />
                      </div>
                      <div className="mt-4">
                        <TextArea label="Historia" value={testimonialForm.story} onChange={(value) => setTestimonialForm({ ...testimonialForm, story: value })} required rows={6} />
                      </div>
                      <PublishedToggle
                        checked={testimonialForm.published}
                        onChange={(value) => setTestimonialForm({ ...testimonialForm, published: value })}
                      />
                      <SubmitButton isBusy={isBusy} label={selectedTestimonialId ? 'Actualizar testimonio' : 'Crear testimonio'} />
                    </div>
                    <TestimonialPreview form={testimonialForm} image={testimonialImagePreview} />
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'partners' && (
              <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
                <ContentList
                  title="Aliados"
                  items={partnerItems}
                  emptyText="No hay aliados todavia."
                  getTitle={(item) => item.name}
                  getSubtitle={(item) => item.category}
                  getImage={(item) => item.logo}
                  onNew={resetPartnerForm}
                  onEdit={editPartner}
                  onDelete={handleDeletePartner}
                />

                <form onSubmit={handlePartnerSubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <SectionTitle icon={Handshake} title={selectedPartnerId ? 'Editar aliado' : 'Crear aliado'} />
                  <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
                    <div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <TextField label="Nombre" value={partnerForm.name} onChange={(value) => setPartnerForm({ ...partnerForm, name: value })} required />
                        <TextField label="Categoria" value={partnerForm.category} onChange={(value) => setPartnerForm({ ...partnerForm, category: value })} />
                        <TextField label="Sitio web" value={partnerForm.website} onChange={(value) => setPartnerForm({ ...partnerForm, website: value })} />
                        <FileField label="Logo" onChange={(event) => handleFile(event, setPartnerFile)} />
                        <TextField label="URL de logo" value={partnerForm.logo} onChange={(value) => setPartnerForm({ ...partnerForm, logo: value })} />
                      </div>
                      <div className="mt-4">
                        <TextArea label="Descripcion" value={partnerForm.description} onChange={(value) => setPartnerForm({ ...partnerForm, description: value })} />
                      </div>
                      <PublishedToggle
                        checked={partnerForm.published}
                        onChange={(value) => setPartnerForm({ ...partnerForm, published: value })}
                      />
                      <SubmitButton isBusy={isBusy} label={selectedPartnerId ? 'Actualizar aliado' : 'Crear aliado'} />
                    </div>
                    <PartnerPreview form={partnerForm} image={partnerLogoPreview} />
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function useObjectUrl(file: File | null) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!file) {
      setUrl('');
      return;
    }

    const nextUrl = URL.createObjectURL(file);
    setUrl(nextUrl);

    return () => URL.revokeObjectURL(nextUrl);
  }, [file]);

  return url;
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="rounded-lg bg-emerald-50 p-3 text-emerald-700">
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-3xl font-bold text-slate-950">{value}</span>
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-600">{label}</p>
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="rounded-lg bg-emerald-50 p-3 text-emerald-700">
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        required={required}
        className={`${inputClass} mt-2`}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 4,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        required={required}
        className={`${inputClass} mt-2 resize-y`}
      />
    </label>
  );
}

function RichTextArea({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const appendBlock = (block: string) => {
    const separator = value.trim() ? '\n\n' : '';
    onChange(`${value}${separator}${block}`);
  };

  return (
    <div className="mt-4">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className={labelClass}>Contenido de la noticia</span>
        <div className="flex flex-wrap gap-2">
          <EditorButton icon={Heading2} label="Subtitulo" onClick={() => appendBlock('## Nuevo subtitulo')} />
          <EditorButton icon={List} label="Punto" onClick={() => appendBlock('- Punto destacado de la noticia.')} />
          <EditorButton icon={FileText} label="Parrafo" onClick={() => appendBlock('Nuevo parrafo de la noticia.')} />
        </div>
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={10}
        required
        className={`${inputClass} resize-y`}
      />
    </div>
  );
}

function EditorButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function FileField({
  label,
  onChange,
  multiple = false,
}: {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        onChange={onChange}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="mt-2 block w-full rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-700 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:border-emerald-300"
      />
    </label>
  );
}

function PublishedToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="mt-4 flex items-center gap-3 text-sm font-semibold text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-500"
      />
      Publicar en el sitio
    </label>
  );
}

function SubmitButton({ isBusy, label }: { isBusy: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={isBusy}
      className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {label}
    </button>
  );
}

function ContentList<T extends { id: string }>({
  title,
  items,
  emptyText,
  getTitle,
  getSubtitle,
  getImage,
  onNew,
  onEdit,
  onDelete,
}: {
  title: string;
  items: T[];
  emptyText: string;
  getTitle: (item: T) => string;
  getSubtitle: (item: T) => string;
  getImage: (item: T) => string;
  onNew: () => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}) {
  return (
    <div className="h-fit rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-950">{title}</h2>
        <button
          type="button"
          onClick={onNew}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-800"
        >
          <Plus className="h-4 w-4" />
          Nuevo
        </button>
      </div>

      <div className="mt-4 max-h-[680px] space-y-3 overflow-y-auto pr-1">
        {items.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-500">
            {emptyText}
          </p>
        )}
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-100 p-3">
            <button type="button" onClick={() => onEdit(item)} className="flex w-full gap-3 text-left">
              {getImage(item) ? (
                <img src={getImage(item)} alt={getTitle(item)} className="h-16 w-20 rounded-md object-cover" />
              ) : (
                <span className="flex h-16 w-20 items-center justify-center rounded-md bg-slate-100 text-slate-400">
                  <Images className="h-5 w-5" />
                </span>
              )}
              <span>
                <span className="line-clamp-2 text-sm font-bold text-slate-900">{getTitle(item)}</span>
                <span className="mt-1 block text-xs text-slate-500">{getSubtitle(item)}</span>
              </span>
            </button>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                <Eye className="h-3.5 w-3.5" />
                Editar
              </button>
              <button
                type="button"
                onClick={() => onDelete(item)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImagePreview({
  image,
  title,
  subtitle,
  dark = false,
}: {
  image: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-lg border ${dark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'}`}>
      {image ? (
        <img src={image} alt={title || 'Vista previa'} className="h-56 w-full object-cover" />
      ) : (
        <div className="flex h-56 items-center justify-center bg-slate-100 text-slate-400">
          <ImagePlus className="h-8 w-8" />
        </div>
      )}
      <div className={`p-5 ${dark ? 'text-white' : 'text-slate-900'}`}>
        <p className="text-xs font-bold uppercase text-emerald-600">{subtitle}</p>
        <h3 className="mt-1 text-xl font-bold">{title || 'Vista previa'}</h3>
      </div>
    </div>
  );
}

function NewsPreview({ form, image }: { form: NewsFormState; image: string }) {
  const gallery = splitUrls(form.galleryText);
  const content = splitParagraphs(form.contentText);

  return (
    <aside className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Vista previa</p>
      </div>
      {image ? (
        <img src={image} alt={form.title || 'Noticia'} className="h-56 w-full object-cover" />
      ) : (
        <div className="flex h-56 items-center justify-center bg-slate-100 text-slate-400">
          <ImagePlus className="h-8 w-8" />
        </div>
      )}
      <div className="p-5">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          {form.category || 'Categoria'}
        </span>
        <h3 className="mt-4 text-2xl font-bold leading-tight text-slate-950">
          {form.title || 'Titulo de la noticia'}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {form.excerpt || 'El resumen aparecera aqui mientras escribes.'}
        </p>
        <div className="mt-5 space-y-3">
          {content.slice(0, 4).map((block, index) => (
            <PreviewBlock key={`${block}-${index}`} block={block} />
          ))}
        </div>
        {gallery.length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-2">
            {gallery.slice(0, 3).map((item) => (
              <img key={item} src={item} alt="Galeria" className="aspect-square rounded-lg object-cover" />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

function PreviewBlock({ block }: { block: string }) {
  if (block.startsWith('## ')) {
    return (
      <h4 className="text-lg font-bold text-slate-950">
        {block.replace(/^##\s*/, '')}
      </h4>
    );
  }

  if (block.startsWith('- ')) {
    return (
      <div className="flex gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-slate-700">
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
        {block.replace(/^-\s*/, '')}
      </div>
    );
  }

  return <p className="text-sm leading-6 text-slate-600">{block}</p>;
}

function TestimonialPreview({ form, image }: { form: TestimonialFormState; image: string }) {
  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        {image ? (
          <img src={image} alt={form.name} className="h-20 w-20 rounded-full object-cover" />
        ) : (
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <Users className="h-7 w-7" />
          </span>
        )}
        <div>
          <h3 className="text-xl font-bold text-slate-950">{form.name || 'Nombre'}</h3>
          <p className="text-sm font-semibold text-emerald-700">{form.role}</p>
          <p className="text-xs text-slate-500">{form.location}</p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-slate-600">
        {form.story || 'La historia del testimonio aparecera aqui.'}
      </p>
    </aside>
  );
}

function PartnerPreview({ form, image }: { form: PartnerFormState; image: string }) {
  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5 text-center shadow-sm">
      <div className="mx-auto flex h-28 w-full items-center justify-center rounded-lg border border-slate-100 bg-slate-50 p-4">
        {image ? (
          <img src={image} alt={form.name} className="max-h-20 max-w-full object-contain" />
        ) : (
          <Handshake className="h-9 w-9 text-emerald-700" />
        )}
      </div>
      <h3 className="mt-5 text-xl font-bold text-slate-950">{form.name || 'Aliado'}</h3>
      <p className="mt-1 text-sm font-semibold text-emerald-700">{form.category}</p>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        {form.description || 'Descripcion del aliado.'}
      </p>
      {form.website && (
        <p className="mt-3 break-all text-xs font-semibold text-slate-500">{form.website}</p>
      )}
    </aside>
  );
}
