import { type ChangeEvent, type FormEvent, useCallback, useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ImagePlus,
  LayoutDashboard,
  Loader2,
  LogOut,
  Newspaper,
  Save,
  ShieldCheck,
  Upload,
} from 'lucide-react';
import {
  adminLogin,
  adminTokenStorageKey,
  createGalleryItem,
  createNews,
  getAdminGallery,
  getAdminNews,
  getHeroSlidesSetting,
  saveHeroSlides,
  uploadMedia,
  type GalleryPayload,
  type NewsPayload,
} from '../services/adminApi';
import type { ActivityGalleryItem } from '../services/contentApi';
import { heroSlides, type HeroSlide, type NewsItem } from '../services/mockData';

type AdminTab = 'overview' | 'news' | 'gallery' | 'header';
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
}

interface GalleryFormState {
  title: string;
  category: string;
  description: string;
  image: string;
  featured: boolean;
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
};

const defaultGalleryForm: GalleryFormState = {
  title: '',
  category: 'Actividades',
  description: '',
  image: '',
  featured: false,
};

const defaultHeroForm: HeroSlide = {
  ...heroSlides[0],
};

const tabs: Array<{ id: AdminTab; label: string; icon: typeof LayoutDashboard }> = [
  { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
  { id: 'news', label: 'Noticias', icon: Newspaper },
  { id: 'gallery', label: 'Galería', icon: ImagePlus },
  { id: 'header', label: 'Header', icon: Upload },
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
  const [newsForm, setNewsForm] = useState<NewsFormState>(defaultNewsForm);
  const [galleryForm, setGalleryForm] = useState<GalleryFormState>(defaultGalleryForm);
  const [heroForm, setHeroForm] = useState<HeroSlide>(defaultHeroForm);
  const [newsFile, setNewsFile] = useState<File | null>(null);
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);

  const loadHeroSetting = useCallback(async () => {
    try {
      const setting = await getHeroSlidesSetting();
      if (Array.isArray(setting.value) && setting.value[0]) {
        setHeroForm(setting.value[0]);
      }
    } catch {
      setHeroForm(defaultHeroForm);
    }
  }, []);

  const refreshContent = useCallback(async (activeToken: string) => {
    const [adminNews, adminGallery] = await Promise.all([
      getAdminNews(activeToken),
      getAdminGallery(activeToken),
    ]);

    setNewsItems(adminNews);
    setGalleryItems(adminGallery);
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
      showNotice({ type: 'success', text: 'Sesión iniciada.' });
    } catch {
      showNotice({ type: 'error', text: 'Correo o contraseña inválidos.' });
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

  const handleNewsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBusy(true);

    try {
      let imageUrl = newsForm.featuredImage.trim();

      if (newsFile) {
        const media = await uploadMedia(newsFile, token, {
          alt: newsForm.title || 'Portada de noticia',
          category: 'noticias',
        });
        imageUrl = media.url;
      }

      if (!imageUrl) {
        throw new Error('La noticia necesita imagen destacada.');
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
        gallery: splitUrls(newsForm.galleryText),
        published: true,
      };

      await createNews(payload, token);
      setNewsForm(defaultNewsForm);
      setNewsFile(null);
      await refreshContent(token);
      showNotice({ type: 'success', text: 'Noticia creada.' });
    } catch (error) {
      showNotice({
        type: 'error',
        text: error instanceof Error ? error.message : 'No se pudo crear la noticia.',
      });
    } finally {
      setIsBusy(false);
    }
  };

  const handleGallerySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBusy(true);

    try {
      let imageUrl = galleryForm.image.trim();

      if (galleryFile) {
        const media = await uploadMedia(galleryFile, token, {
          alt: galleryForm.title || 'Actividad Asoantioquia',
          category: 'galeria',
        });
        imageUrl = media.url;
      }

      if (!imageUrl) {
        throw new Error('La galería necesita una imagen.');
      }

      const payload: GalleryPayload = {
        title: galleryForm.title,
        category: galleryForm.category,
        description: galleryForm.description,
        image: imageUrl,
        featured: galleryForm.featured,
        published: true,
      };

      await createGalleryItem(payload, token);
      setGalleryForm(defaultGalleryForm);
      setGalleryFile(null);
      await refreshContent(token);
      showNotice({ type: 'success', text: 'Imagen agregada a la galería.' });
    } catch (error) {
      showNotice({
        type: 'error',
        text: error instanceof Error ? error.message : 'No se pudo guardar la imagen.',
      });
    } finally {
      setIsBusy(false);
    }
  };

  const handleHeroSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBusy(true);

    try {
      let imageUrl = heroForm.image.trim();

      if (heroFile) {
        const media = await uploadMedia(heroFile, token, {
          alt: heroForm.title || 'Header Asoantioquia',
          category: 'header',
        });
        imageUrl = media.url;
      }

      await saveHeroSlides([{ ...heroForm, image: imageUrl }], token);
      setHeroForm((current) => ({ ...current, image: imageUrl }));
      setHeroFile(null);
      showNotice({ type: 'success', text: 'Header actualizado.' });
    } catch (error) {
      showNotice({
        type: 'error',
        text: error instanceof Error ? error.message : 'No se pudo actualizar el header.',
      });
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
              Administración de contenido del sitio
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              Gestiona noticias, imágenes de actividades y el header principal desde una sola vista conectada al backend.
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
                <h2 className="text-xl font-bold">Iniciar sesión</h2>
                <p className="text-sm text-slate-500">Correo y contraseña</p>
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
              <span className={labelClass}>Contraseña</span>
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
              <div className="grid gap-4 md:grid-cols-3">
                <SummaryCard icon={Newspaper} label="Noticias" value={newsItems.length} />
                <SummaryCard icon={ImagePlus} label="Imágenes de galería" value={galleryItems.length} />
                <SummaryCard icon={Upload} label="Header editable" value={heroForm.image ? 1 : 0} />
              </div>
            )}

            {activeTab === 'news' && (
              <form onSubmit={handleNewsSubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <SectionTitle icon={Newspaper} title="Crear noticia" />
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <TextField label="Título" value={newsForm.title} onChange={(value) => setNewsForm({ ...newsForm, title: value })} required />
                  <TextField label="Categoría" value={newsForm.category} onChange={(value) => setNewsForm({ ...newsForm, category: value })} />
                  <TextField label="Fecha" type="date" value={newsForm.date} onChange={(value) => setNewsForm({ ...newsForm, date: value })} />
                  <TextField label="Autor" value={newsForm.author} onChange={(value) => setNewsForm({ ...newsForm, author: value })} />
                  <TextField label="Tiempo de lectura" value={newsForm.readTime} onChange={(value) => setNewsForm({ ...newsForm, readTime: value })} />
                  <FileField label="Imagen destacada" onChange={(event) => handleFile(event, setNewsFile)} />
                  <TextArea label="Resumen" value={newsForm.excerpt} onChange={(value) => setNewsForm({ ...newsForm, excerpt: value })} required />
                  <TextArea label="Descripción" value={newsForm.description} onChange={(value) => setNewsForm({ ...newsForm, description: value })} />
                  <TextField label="URL de imagen destacada" value={newsForm.featuredImage} onChange={(value) => setNewsForm({ ...newsForm, featuredImage: value })} />
                  <TextArea label="URLs de galería" value={newsForm.galleryText} onChange={(value) => setNewsForm({ ...newsForm, galleryText: value })} />
                </div>
                <div className="mt-4">
                  <TextArea label="Párrafos" value={newsForm.contentText} onChange={(value) => setNewsForm({ ...newsForm, contentText: value })} required rows={8} />
                </div>
                <SubmitButton isBusy={isBusy} label="Crear noticia" />
              </form>
            )}

            {activeTab === 'gallery' && (
              <form onSubmit={handleGallerySubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <SectionTitle icon={ImagePlus} title="Cargar imagen de galería" />
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <TextField label="Título" value={galleryForm.title} onChange={(value) => setGalleryForm({ ...galleryForm, title: value })} required />
                  <TextField label="Categoría" value={galleryForm.category} onChange={(value) => setGalleryForm({ ...galleryForm, category: value })} />
                  <FileField label="Imagen" onChange={(event) => handleFile(event, setGalleryFile)} />
                  <TextField label="URL de imagen" value={galleryForm.image} onChange={(value) => setGalleryForm({ ...galleryForm, image: value })} />
                </div>
                <div className="mt-4">
                  <TextArea label="Descripción" value={galleryForm.description} onChange={(value) => setGalleryForm({ ...galleryForm, description: value })} />
                </div>
                <label className="mt-4 flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={galleryForm.featured}
                    onChange={(event) => setGalleryForm({ ...galleryForm, featured: event.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-500"
                  />
                  Destacar en la galería
                </label>
                <SubmitButton isBusy={isBusy} label="Guardar imagen" />
              </form>
            )}

            {activeTab === 'header' && (
              <form onSubmit={handleHeroSubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <SectionTitle icon={Upload} title="Editar header principal" />
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
                  <div className="grid gap-4 md:grid-cols-2">
                    <TextField label="Etiqueta" value={heroForm.eyebrow} onChange={(value) => setHeroForm({ ...heroForm, eyebrow: value })} />
                    <TextField label="Título" value={heroForm.title} onChange={(value) => setHeroForm({ ...heroForm, title: value })} />
                    <TextField label="Subtítulo" value={heroForm.subtitle} onChange={(value) => setHeroForm({ ...heroForm, subtitle: value })} />
                    <FileField label="Imagen del header" onChange={(event) => handleFile(event, setHeroFile)} />
                    <TextField label="URL de imagen" value={heroForm.image} onChange={(value) => setHeroForm({ ...heroForm, image: value })} />
                    <TextField label="Cifra" value={heroForm.statValue} onChange={(value) => setHeroForm({ ...heroForm, statValue: value })} />
                    <TextField label="Etiqueta de cifra" value={heroForm.statLabel} onChange={(value) => setHeroForm({ ...heroForm, statLabel: value })} />
                    <TextArea label="Descripción" value={heroForm.description} onChange={(value) => setHeroForm({ ...heroForm, description: value })} />
                  </div>
                  <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950">
                    <img src={heroForm.image} alt={heroForm.title} className="h-56 w-full object-cover opacity-80" />
                    <div className="p-5 text-white">
                      <p className="text-xs font-bold uppercase text-emerald-200">{heroForm.eyebrow}</p>
                      <h3 className="mt-2 text-2xl font-bold">{heroForm.title}</h3>
                      <p className="text-lg text-emerald-100">{heroForm.subtitle}</p>
                    </div>
                  </div>
                </div>
                <SubmitButton isBusy={isBusy} label="Actualizar header" />
              </form>
            )}

            <RecentContent newsItems={newsItems} galleryItems={galleryItems} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof LayoutDashboard;
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

function SectionTitle({ icon: Icon, title }: { icon: typeof LayoutDashboard; title: string }) {
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

function FileField({
  label,
  onChange,
}: {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        onChange={onChange}
        type="file"
        accept="image/*"
        className="mt-2 block w-full rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-700 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:border-emerald-300"
      />
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

function RecentContent({
  newsItems,
  galleryItems,
}: {
  newsItems: NewsItem[];
  galleryItems: ActivityGalleryItem[];
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-950">Noticias recientes</h2>
        <div className="mt-4 space-y-3">
          {newsItems.slice(0, 4).map((item) => (
            <div key={item.id} className="flex gap-3 rounded-lg border border-slate-100 p-3">
              <img src={item.image} alt={item.title} className="h-16 w-20 rounded-md object-cover" />
              <div>
                <p className="line-clamp-2 text-sm font-bold text-slate-900">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-950">Galería reciente</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {galleryItems.slice(0, 6).map((item) => (
            <img
              key={item.id}
              src={item.image}
              alt={item.title}
              className="aspect-square rounded-lg object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
