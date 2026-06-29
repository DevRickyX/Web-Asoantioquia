import { type ChangeEvent, type FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Bold,
  CheckCircle2,
  Code2,
  Eye,
  FileText,
  Handshake,
  Heading2,
  ImagePlus,
  Images,
  Italic,
  LayoutDashboard,
  Link2,
  List,
  ListOrdered,
  Loader2,
  LogOut,
  MessageCircle,
  Newspaper,
  Plus,
  Quote,
  Save,
  ShieldCheck,
  Sparkles,
  Strikethrough,
  Trash2,
  Underline,
  Upload,
  Users,
  Wand2,
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
  getImpactStatsSetting,
  saveHeroSlides,
  saveImpactStats,
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
import { defaultImpactStats, type ActivityGalleryItem, type ImpactStat } from '../services/contentApi';
import { heroSlides, type HeroSlide, type NewsItem, type Partner, type Recycler } from '../services/mockData';
import { escapeHtml, normalizeEditableHtml, sanitizeInlineHtml } from '../utils/richText';

type AdminTab = 'overview' | 'news' | 'gallery' | 'headers' | 'stats' | 'testimonials' | 'partners';
type Notice = { type: 'success' | 'error'; text: string } | null;
type NewsBlockKind = 'heading' | 'bullet' | 'ordered' | 'quote' | 'paragraph';

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
  { id: 'stats', label: 'Cifras', icon: Sparkles },
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
  const [impactStats, setImpactStats] = useState<ImpactStat[]>(defaultImpactStats);

  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  const [selectedTestimonialId, setSelectedTestimonialId] = useState<string | null>(null);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [newsEditorOpen, setNewsEditorOpen] = useState(false);
  const [galleryEditorOpen, setGalleryEditorOpen] = useState(false);
  const [testimonialEditorOpen, setTestimonialEditorOpen] = useState(false);
  const [partnerEditorOpen, setPartnerEditorOpen] = useState(false);

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
  const newsGalleryPreviews = useObjectUrls(newsGalleryFiles);
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

  const loadImpactStats = useCallback(async () => {
    try {
      const setting = await getImpactStatsSetting();
      setImpactStats(Array.isArray(setting.value) && setting.value.length > 0
        ? setting.value
        : defaultImpactStats);
    } catch {
      setImpactStats(defaultImpactStats);
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
        void loadImpactStats();
      })
      .catch(() => {
        localStorage.removeItem(adminTokenStorageKey);
      });
  }, [loadHeroSetting, loadImpactStats, refreshContent]);

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
      await loadImpactStats();
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

  const startNewsForm = () => {
    resetNewsForm();
    setNewsEditorOpen(true);
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
    setNewsEditorOpen(true);
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
      setNewsEditorOpen(false);
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
      setNewsEditorOpen(false);
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

  const startGalleryForm = () => {
    resetGalleryForm();
    setGalleryEditorOpen(true);
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
    setGalleryEditorOpen(true);
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
      setGalleryEditorOpen(false);
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
      setGalleryEditorOpen(false);
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

  const startTestimonialForm = () => {
    resetTestimonialForm();
    setTestimonialEditorOpen(true);
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
    setTestimonialEditorOpen(true);
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
      setTestimonialEditorOpen(false);
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
      setTestimonialEditorOpen(false);
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

  const startPartnerForm = () => {
    resetPartnerForm();
    setPartnerEditorOpen(true);
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
    setPartnerEditorOpen(true);
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
      setPartnerEditorOpen(false);
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
      setPartnerEditorOpen(false);
      await refreshContent(token);
      showNotice({ type: 'success', text: 'Aliado eliminado.' });
    } catch {
      showNotice({ type: 'error', text: 'No se pudo eliminar el aliado.' });
    } finally {
      setIsBusy(false);
    }
  };

  const updateImpactStat = (index: number, field: keyof ImpactStat, value: string) => {
    setImpactStats((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleStatsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBusy(true);

    try {
      await saveImpactStats(impactStats, token);
      showNotice({ type: 'success', text: 'Cifras actualizadas.' });
    } catch {
      showNotice({ type: 'error', text: 'No se pudieron guardar las cifras.' });
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
      <div className="mx-auto max-w-[1500px]">
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

        <div className="mt-6 grid gap-6 lg:grid-cols-[76px_minmax(0,1fr)]">
          <nav className="h-fit rounded-lg border border-slate-200 bg-white p-2 shadow-sm lg:sticky lg:top-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  title={tab.label}
                  aria-label={tab.label}
                  className={`group relative flex h-12 w-full cursor-pointer items-center justify-center rounded-lg text-sm font-bold transition ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-900/10'
                      : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="pointer-events-none absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                <SummaryCard icon={Newspaper} label="Noticias" value={newsItems.length} />
                <SummaryCard icon={ImagePlus} label="Imagenes" value={galleryItems.length} />
                <SummaryCard icon={Upload} label="Headers" value={heroSlidesForm.length} />
                <SummaryCard icon={Sparkles} label="Cifras" value={impactStats.length} />
                <SummaryCard icon={Users} label="Testimonios" value={testimonialItems.length} />
                <SummaryCard icon={Handshake} label="Aliados" value={partnerItems.length} />
              </div>
            )}

            {activeTab === 'news' && (
              <div className="space-y-6">
                {!newsEditorOpen ? (
                  <ContentList
                    title="Noticias existentes"
                    items={newsItems}
                    emptyText="No hay noticias todavia."
                    getTitle={(item) => item.title}
                    getSubtitle={(item) => item.category}
                    getImage={(item) => item.image}
                    onNew={startNewsForm}
                    onEdit={editNews}
                    onDelete={handleDeleteNews}
                  />
                ) : (
                <form onSubmit={handleNewsSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                  <EditorHeader
                    icon={Newspaper}
                    title={selectedNewsId ? 'Editar noticia' : 'Crear noticia'}
                    onBack={() => {
                      resetNewsForm();
                      setNewsEditorOpen(false);
                    }}
                  />
                  <div className="mt-6 grid gap-6 2xl:grid-cols-[minmax(0,1fr)_340px]">
                    <EditableNewsCanvas
                      form={newsForm}
                      image={newsImagePreview}
                      galleryPreviews={newsGalleryPreviews}
                      onChange={(changes) => setNewsForm((current) => ({ ...current, ...changes }))}
                      onFeaturedImageChange={(event) => handleFile(event, setNewsFile)}
                    />
                    <NewsOptionsPanel
                      form={newsForm}
                      isBusy={isBusy}
                      isEditing={Boolean(selectedNewsId)}
                      onChange={(changes) => setNewsForm((current) => ({ ...current, ...changes }))}
                      onFeaturedImageChange={(event) => handleFile(event, setNewsFile)}
                      onGalleryChange={(event) => setNewsGalleryFiles(Array.from(event.target.files || []))}
                      galleryPreviews={newsGalleryPreviews}
                    />
                  </div>
                </form>
                )}
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-6">
                {!galleryEditorOpen ? (
                  <ContentList
                    title="Galeria existente"
                    items={galleryItems}
                    emptyText="No hay imagenes todavia."
                    getTitle={(item) => item.title}
                    getSubtitle={(item) => item.featured ? 'Destacada' : item.category}
                    getImage={(item) => item.image}
                    onNew={startGalleryForm}
                    onEdit={editGallery}
                    onDelete={handleDeleteGallery}
                  />
                ) : (
                <form onSubmit={handleGallerySubmit} className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
                  <EditorHeader
                    icon={ImagePlus}
                    title={selectedGalleryId ? 'Editar imagen' : 'Cargar imagen'}
                    onBack={() => {
                      resetGalleryForm();
                      setGalleryEditorOpen(false);
                    }}
                  />
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
                )}
              </div>
            )}

            {activeTab === 'headers' && (
              <div className="space-y-6">
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

                <form onSubmit={handleHeroSubmit} className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
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
                      <FileField
                        label="Imagen del header"
                        helper="Resolucion recomendada: 1920 x 1080 px, horizontal y con peso optimizado."
                        onChange={(event) => handleFile(event, setHeroFile)}
                      />
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

            {activeTab === 'stats' && (
              <form onSubmit={handleStatsSubmit} className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
                <SectionTitle icon={Sparkles} title="Cifras de impacto" />
                <div className="mt-8 grid gap-5 xl:grid-cols-2">
                  {impactStats.map((stat, index) => (
                    <div key={`${stat.label}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                      <div className="grid gap-4 md:grid-cols-[0.8fr_1fr]">
                        <label className="block">
                          <span className={labelClass}>Icono</span>
                          <select
                            value={stat.icon}
                            onChange={(event) => updateImpactStat(index, 'icon', event.target.value)}
                            className={`${inputClass} mt-2`}
                          >
                            <option value="Recycle">Reciclaje</option>
                            <option value="Users">Personas</option>
                            <option value="Building2">Empresas</option>
                            <option value="Leaf">Ambiental</option>
                          </select>
                        </label>
                        <TextField
                          label="Valor"
                          value={stat.value}
                          onChange={(value) => updateImpactStat(index, 'value', value)}
                        />
                      </div>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <TextField
                          label="Etiqueta"
                          value={stat.label}
                          onChange={(value) => updateImpactStat(index, 'label', value)}
                        />
                        <TextArea
                          label="Detalle"
                          value={stat.detail}
                          onChange={(value) => updateImpactStat(index, 'detail', value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <SubmitButton isBusy={isBusy} label="Guardar cifras" />
              </form>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                {!testimonialEditorOpen ? (
                  <ContentList
                    title="Testimonios"
                    items={testimonialItems}
                    emptyText="No hay testimonios todavia."
                    getTitle={(item) => item.name}
                    getSubtitle={(item) => item.role || item.location}
                    getImage={(item) => item.image}
                    onNew={startTestimonialForm}
                    onEdit={editTestimonial}
                    onDelete={handleDeleteTestimonial}
                  />
                ) : (
                <form onSubmit={handleTestimonialSubmit} className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
                  <EditorHeader
                    icon={Users}
                    title={selectedTestimonialId ? 'Editar testimonio' : 'Crear testimonio'}
                    onBack={() => {
                      resetTestimonialForm();
                      setTestimonialEditorOpen(false);
                    }}
                  />
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
                )}
              </div>
            )}

            {activeTab === 'partners' && (
              <div className="space-y-6">
                {!partnerEditorOpen ? (
                  <ContentList
                    title="Aliados"
                    items={partnerItems}
                    emptyText="No hay aliados todavia."
                    getTitle={(item) => item.name}
                    getSubtitle={(item) => item.category}
                    getImage={(item) => item.logo}
                    onNew={startPartnerForm}
                    onEdit={editPartner}
                    onDelete={handleDeletePartner}
                  />
                ) : (
                <form onSubmit={handlePartnerSubmit} className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
                  <EditorHeader
                    icon={Handshake}
                    title={selectedPartnerId ? 'Editar aliado' : 'Crear aliado'}
                    onBack={() => {
                      resetPartnerForm();
                      setPartnerEditorOpen(false);
                    }}
                  />
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
                )}
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

function useObjectUrls(files: File[]) {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const nextUrls = files.map((file) => URL.createObjectURL(file));
    setUrls(nextUrls);

    return () => {
      nextUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  return urls;
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

function EditorHeader({
  icon: Icon,
  title,
  onBack,
}: {
  icon: LucideIcon;
  title: string;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
      <SectionTitle icon={Icon} title={title} />
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
      >
        Volver al listado
      </button>
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

function ToolbarDivider() {
  return <span className="mx-1 h-8 w-px bg-slate-200" />;
}

function IconEditorButton({
  icon: Icon,
  tooltip,
  onClick,
}: {
  icon: LucideIcon;
  tooltip: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={tooltip}
      onMouseDown={(event) => {
        event.preventDefault();
        onClick();
      }}
      className="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
    >
      <Icon className="h-5 w-5" />
      <span className="pointer-events-none absolute -top-11 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100">
        {tooltip}
      </span>
    </button>
  );
}

function FileField({
  label,
  onChange,
  multiple = false,
  helper,
}: {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  helper?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {helper && (
        <span className="mt-1 block text-xs font-medium text-slate-500">
          {helper}
        </span>
      )}
      <input
        onChange={onChange}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="mt-2 block w-full cursor-pointer rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-emerald-700 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:border-emerald-300"
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
    <div className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
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

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-500">
            {emptyText}
          </p>
        )}
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md">
            <button type="button" onClick={() => onEdit(item)} className="flex w-full gap-4 text-left">
              {getImage(item) ? (
                <img src={getImage(item)} alt={getTitle(item)} className="h-20 w-24 rounded-md object-cover" />
              ) : (
                <span className="flex h-20 w-24 items-center justify-center rounded-md bg-slate-100 text-slate-400">
                  <Images className="h-5 w-5" />
                </span>
              )}
              <span className="min-w-0">
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

function blockToEditorHtml(block: string) {
  const isHeading = block.startsWith('## ');
  const isBullet = block.startsWith('- ');
  const isOrdered = /^\d+\.\s/.test(block);
  const isQuote = block.startsWith('> ');
  const value = block
    .replace(/^##\s*/, '')
    .replace(/^-\s*/, '')
    .replace(/^\d+\.\s*/, '')
    .replace(/^>\s*/, '');
  const html = sanitizeInlineHtml(value) || '<br>';

  if (isHeading) return `<h2 class="news-editor-heading">${html}</h2>`;
  if (isBullet) return `<p class="news-editor-bullet" data-block-kind="bullet">${html}</p>`;
  if (isOrdered) return `<p class="news-editor-ordered" data-block-kind="ordered">${html}</p>`;
  if (isQuote) return `<blockquote class="news-editor-quote">${html}</blockquote>`;

  return `<p class="news-editor-paragraph">${html}</p>`;
}

function contentTextToEditorHtml(value: string) {
  return splitParagraphs(value).map(blockToEditorHtml).join('');
}

function prefixForBlockKind(kind: NewsBlockKind) {
  if (kind === 'heading') return '## ';
  if (kind === 'bullet') return '- ';
  if (kind === 'ordered') return '1. ';
  if (kind === 'quote') return '> ';

  return '';
}

function blockKindFromElement(element: HTMLElement): NewsBlockKind {
  const tag = element.tagName.toLowerCase();

  if (/^h[1-6]$/.test(tag)) return 'heading';
  if (tag === 'blockquote') return 'quote';
  if (element.dataset.blockKind === 'bullet') return 'bullet';
  if (element.dataset.blockKind === 'ordered') return 'ordered';

  return 'paragraph';
}

function editorHtmlToContentText(html: string) {
  const template = document.createElement('template');
  template.innerHTML = html;
  const blocks: string[] = [];

  const appendBlock = (kind: NewsBlockKind, value: string) => {
    const normalized = normalizeEditableHtml(value);
    if (!normalized) return;
    blocks.push(`${prefixForBlockKind(kind)}${normalized}`);
  };

  Array.from(template.content.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) appendBlock('paragraph', text);
      return;
    }

    if (!(node instanceof HTMLElement)) return;

    const tag = node.tagName.toLowerCase();

    if (tag === 'ul' || tag === 'ol') {
      node.querySelectorAll('li').forEach((item) => {
        appendBlock(tag === 'ol' ? 'ordered' : 'bullet', item.innerHTML);
      });
      return;
    }

    if (tag === 'br') return;

    appendBlock(blockKindFromElement(node), node.innerHTML);
  });

  return blocks.join('\n\n');
}

function EditableNewsCanvas({
  form,
  image,
  galleryPreviews,
  onChange,
  onFeaturedImageChange,
}: {
  form: NewsFormState;
  image: string;
  galleryPreviews: string[];
  onChange: (changes: Partial<NewsFormState>) => void;
  onFeaturedImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  const syncEditor = () => {
    const editor = editorRef.current;
    if (!editor) return;

    onChange({ contentText: editorHtmlToContentText(editor.innerHTML) });
  };

  const applyInlineCommand = (command: 'bold' | 'italic' | 'strikeThrough' | 'underline' | 'link' | 'code') => {
    const editor = editorRef.current;

    if (!editor) {
      return;
    }

    editor.focus();

    if (command === 'link') {
      const selectedText = document.getSelection()?.toString();
      const url = window.prompt('Pega la URL del enlace', 'https://');

      if (!url) return;

      if (!selectedText) {
        document.execCommand('insertHTML', false, `<a href="${escapeHtml(url)}">${escapeHtml(url)}</a>`);
      } else {
        document.execCommand('createLink', false, url);
      }
    } else if (command === 'code') {
      const selectedText = document.getSelection()?.toString() || 'codigo';
      document.execCommand('insertHTML', false, `<code>${escapeHtml(selectedText)}</code>`);
    } else {
      document.execCommand(command, false);
    }

    syncEditor();
  };

  const insertEditorBlock = (block: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();
    document.execCommand('insertHTML', false, blockToEditorHtml(block));
    syncEditor();
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || document.activeElement === editor) return;

    const nextHtml = contentTextToEditorHtml(form.contentText);
    if (editor.innerHTML !== nextHtml) editor.innerHTML = nextHtml;
  }, [form.contentText]);

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="relative min-h-[340px] bg-slate-900">
        {image ? (
          <img src={image} alt={form.title || 'Noticia'} className="h-[360px] w-full object-cover opacity-90" />
        ) : (
          <div className="flex h-[360px] items-center justify-center bg-slate-100 text-slate-400">
            <ImagePlus className="h-10 w-10" />
          </div>
        )}
        <label className="absolute bottom-5 right-5 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-emerald-50 hover:text-emerald-700">
          <ImagePlus className="h-4 w-4" />
          Cambiar portada
          <input type="file" accept="image/*" onChange={onFeaturedImageChange} className="sr-only" />
        </label>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10">
        <input
          value={form.category}
          onChange={(event) => onChange({ category: event.target.value })}
          className="inline-flex max-w-xs rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          placeholder="Categoria"
        />

        <textarea
          value={form.title}
          onChange={(event) => onChange({ title: event.target.value })}
          rows={2}
          required
          className="mt-5 w-full resize-none border-none bg-transparent p-0 text-4xl font-bold leading-tight text-slate-950 outline-none placeholder:text-slate-300 md:text-5xl"
          placeholder="Titulo de la noticia"
        />

        <textarea
          value={form.excerpt}
          onChange={(event) => onChange({ excerpt: event.target.value })}
          rows={3}
          required
          className="mt-4 w-full resize-y rounded-lg border border-transparent bg-slate-50 px-4 py-3 text-lg leading-8 text-slate-600 outline-none transition focus:border-emerald-200 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          placeholder="Resumen de la noticia"
        />

        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-950/5">
          <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50/80 p-2">
            <IconEditorButton icon={Bold} tooltip="Negrita Ctrl+B" onClick={() => applyInlineCommand('bold')} />
            <IconEditorButton icon={Italic} tooltip="Cursiva Ctrl+I" onClick={() => applyInlineCommand('italic')} />
            <IconEditorButton icon={Strikethrough} tooltip="Tachado" onClick={() => applyInlineCommand('strikeThrough')} />
            <IconEditorButton icon={Underline} tooltip="Subrayado" onClick={() => applyInlineCommand('underline')} />
            <ToolbarDivider />
            <IconEditorButton icon={Link2} tooltip="Enlace" onClick={() => applyInlineCommand('link')} />
            <IconEditorButton icon={Code2} tooltip="Codigo" onClick={() => applyInlineCommand('code')} />
            <ToolbarDivider />
            <IconEditorButton icon={Heading2} tooltip="Subtitulo" onClick={() => insertEditorBlock('## Nuevo subtitulo')} />
            <IconEditorButton icon={List} tooltip="Lista con vinetas" onClick={() => insertEditorBlock('- Punto destacado de la noticia.')} />
            <IconEditorButton icon={ListOrdered} tooltip="Lista numerada" onClick={() => insertEditorBlock('1. Punto numerado de la noticia.')} />
            <IconEditorButton icon={Quote} tooltip="Cita destacada" onClick={() => insertEditorBlock('> Cita destacada de la noticia.')} />
            <ToolbarDivider />
            <IconEditorButton icon={MessageCircle} tooltip="Nota" onClick={() => insertEditorBlock('- Nota breve para resaltar contexto.')} />
            <IconEditorButton icon={Wand2} tooltip="Bloque destacado" onClick={() => insertEditorBlock('Nuevo bloque destacado de contenido.')} />
            <IconEditorButton icon={FileText} tooltip="Parrafo" onClick={() => insertEditorBlock('Nuevo parrafo de la noticia.')} />
          </div>

          <div
            ref={editorRef}
            role="textbox"
            aria-label="Contenido de la noticia"
            aria-multiline="true"
            contentEditable
            suppressContentEditableWarning
            data-placeholder="Escribe los parrafos de la noticia aqui"
            onInput={syncEditor}
            onBlur={syncEditor}
            className="min-h-[520px] cursor-text px-5 py-6 text-lg leading-9 text-slate-700 outline-none empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)] sm:px-7 lg:px-9 [&_.news-editor-bullet]:my-4 [&_.news-editor-bullet]:rounded-lg [&_.news-editor-bullet]:border [&_.news-editor-bullet]:border-emerald-100 [&_.news-editor-bullet]:bg-emerald-50/70 [&_.news-editor-bullet]:px-5 [&_.news-editor-bullet]:py-4 [&_.news-editor-heading]:mb-4 [&_.news-editor-heading]:mt-8 [&_.news-editor-heading]:text-3xl [&_.news-editor-heading]:font-bold [&_.news-editor-heading]:leading-tight [&_.news-editor-heading]:text-slate-950 [&_.news-editor-ordered]:my-4 [&_.news-editor-ordered]:rounded-lg [&_.news-editor-ordered]:border [&_.news-editor-ordered]:border-sky-100 [&_.news-editor-ordered]:bg-sky-50/70 [&_.news-editor-ordered]:px-5 [&_.news-editor-ordered]:py-4 [&_.news-editor-paragraph]:my-5 [&_.news-editor-quote]:my-6 [&_.news-editor-quote]:border-l-4 [&_.news-editor-quote]:border-l-emerald-600 [&_.news-editor-quote]:bg-slate-50 [&_.news-editor-quote]:px-5 [&_.news-editor-quote]:py-4 [&_.news-editor-quote]:text-xl [&_.news-editor-quote]:italic [&_.news-editor-quote]:leading-9 [&_a]:font-semibold [&_a]:text-emerald-700 [&_a]:underline [&_a]:decoration-emerald-300 [&_a]:underline-offset-4 [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-base [&_code]:text-slate-900 [&_div]:my-5 [&_p]:my-5"
          />
        </div>

        <SelectedImageStrip images={[...splitUrls(form.galleryText), ...galleryPreviews]} />
      </div>
    </div>
  );
}

function NewsOptionsPanel({
  form,
  isBusy,
  isEditing,
  onChange,
  onFeaturedImageChange,
  onGalleryChange,
  galleryPreviews,
}: {
  form: NewsFormState;
  isBusy: boolean;
  isEditing: boolean;
  onChange: (changes: Partial<NewsFormState>) => void;
  onFeaturedImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onGalleryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  galleryPreviews: string[];
}) {
  return (
    <aside className="h-fit rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm xl:sticky xl:top-6">
      <h3 className="text-base font-bold text-slate-950">Opciones de publicacion</h3>
      <div className="mt-5 space-y-4">
        <TextField label="Fecha" type="date" value={form.date} onChange={(value) => onChange({ date: value })} />
        <TextField label="Autor" value={form.author} onChange={(value) => onChange({ author: value })} />
        <TextField label="Tiempo de lectura" value={form.readTime} onChange={(value) => onChange({ readTime: value })} />
        <TextArea label="Descripcion SEO" value={form.description} onChange={(value) => onChange({ description: value })} />
        <FileField label="Imagen destacada" onChange={onFeaturedImageChange} />
        <TextField
          label="URL de imagen destacada"
          value={form.featuredImage}
          onChange={(value) => onChange({ featuredImage: value })}
        />
        <FileField label="Galeria de la noticia" multiple onChange={onGalleryChange} />
        <SelectedImageStrip images={galleryPreviews} />
        <TextArea
          label="URLs de galeria guardadas"
          value={form.galleryText}
          onChange={(value) => onChange({ galleryText: value })}
        />
        <PublishedToggle checked={form.published} onChange={(value) => onChange({ published: value })} />
      </div>
      <SubmitButton isBusy={isBusy} label={isEditing ? 'Actualizar noticia' : 'Crear noticia'} />
    </aside>
  );
}

function SelectedImageStrip({ images }: { images: string[] }) {
  if (!images.length) return null;

  return (
    <div className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50/60 p-3">
      <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
        Imagenes seleccionadas
      </p>
      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
        {images.map((image) => (
          <img
            key={image}
            src={image}
            alt="Vista previa"
            className="aspect-square rounded-lg object-cover"
          />
        ))}
      </div>
    </div>
  );
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
