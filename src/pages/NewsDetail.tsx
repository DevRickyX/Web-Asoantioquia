import { useEffect, useState } from 'react';
import { Link, useParams } from '@tanstack/react-router';
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Facebook,
  Image as ImageIcon,
  Maximize2,
  MessageCircle,
  Twitter,
  User,
  X,
} from 'lucide-react';
import { news } from '../services/mockData';
import { useBackendItem } from '../services/contentApi';
import { renderInlineRichText } from '../utils/richText';

export function NewsDetail() {
  const { slug } = useParams({ strict: false }) as { slug?: string };
  const fallbackArticle = news.find((item) => item.slug === slug);
  const article = useBackendItem(slug ? `/news/${slug}` : null, fallbackArticle);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);

    return new Date(year, month - 1, day).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!article) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <p className="text-sm font-bold uppercase text-emerald-700">Noticia no encontrada</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-950">
          Esta publicacion no esta disponible.
        </h1>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-emerald-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-white">
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-slate-950/75 to-slate-950/30" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-bold text-white transition-colors duration-200 hover:bg-white hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>

          <div className="mt-12 max-w-4xl">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-emerald-50 backdrop-blur">
              {article.category}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50/90">
              {article.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-emerald-50/85">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(article.date)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                {article.author}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.68fr_0.32fr] lg:px-8">
        <div className="max-w-3xl">
          {article.content.map((block, index) => (
            <ContentBlock key={`article-block-${index}`} block={block} />
          ))}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <NewsGallery images={article.gallery} title={article.title} />
          <ShareButtons title={article.title} />
        </aside>
      </div>
    </article>
  );
}

function NewsGallery({ images, title }: { images: string[]; title: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const goToPrevious = () => {
    setSelectedIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const goToNext = () => {
    setSelectedIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  const goToExpandedPrevious = () => {
    setExpandedIndex((current) => {
      const safeIndex = current ?? selectedIndex;
      return safeIndex === 0 ? images.length - 1 : safeIndex - 1;
    });
  };

  const goToExpandedNext = () => {
    setExpandedIndex((current) => {
      const safeIndex = current ?? selectedIndex;
      return safeIndex === images.length - 1 ? 0 : safeIndex + 1;
    });
  };

  useEffect(() => {
    if (images.length <= 1 || isPaused || expandedIndex !== null) return undefined;

    const interval = window.setInterval(() => {
      setSelectedIndex((current) => (current === images.length - 1 ? 0 : current + 1));
    }, 5000);

    return () => window.clearInterval(interval);
  }, [expandedIndex, images.length, isPaused]);

  useEffect(() => {
    if (expandedIndex === null) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpandedIndex(null);
      if (event.key === 'ArrowLeft') {
        setExpandedIndex((current) => {
          const safeIndex = current ?? selectedIndex;
          return safeIndex === 0 ? images.length - 1 : safeIndex - 1;
        });
      }
      if (event.key === 'ArrowRight') {
        setExpandedIndex((current) => {
          const safeIndex = current ?? selectedIndex;
          return safeIndex === images.length - 1 ? 0 : safeIndex + 1;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedIndex, images.length, selectedIndex]);

  if (!images.length) return null;

  return (
    <div
      className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between gap-3 px-5 py-4 text-sm font-bold uppercase text-emerald-700">
        <span className="inline-flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          Galeria
        </span>
        <span className="rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-500">
          {selectedIndex + 1} / {images.length}
        </span>
      </div>

      <div className="relative overflow-hidden bg-slate-950">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setExpandedIndex(index)}
              className="group relative h-64 w-full shrink-0 cursor-zoom-in overflow-hidden text-left sm:h-72 lg:h-64"
              aria-label={`Ampliar imagen ${index + 1}`}
            >
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900 opacity-0 shadow-lg transition group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
            </button>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white hover:text-emerald-700"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white hover:text-emerald-700"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && images.length <= 8 && (
        <div className="flex items-center justify-center gap-2 px-5 py-4">
          {images.map((image, index) => (
            <button
              key={`gallery-dot-${image}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`h-2.5 rounded-full transition ${
                selectedIndex === index
                  ? 'w-7 bg-emerald-700'
                  : 'w-2.5 cursor-pointer bg-slate-300 hover:bg-emerald-300'
              }`}
              aria-label={`Ver imagen ${index + 1}`}
            />
          ))}
        </div>
      )}

      {images.length > 8 && (
        <div className="px-5 py-4">
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <span
              className="block h-full rounded-full bg-emerald-700 transition-all duration-500 ease-out"
              style={{ width: `${((selectedIndex + 1) / images.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {expandedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 py-6 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setExpandedIndex(null)}
            className="absolute right-5 top-5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-slate-950"
            aria-label="Cerrar imagen"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={goToExpandedPrevious}
              className="absolute left-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-slate-950"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          <figure className="mx-auto max-w-6xl text-center">
            <img
              src={images[expandedIndex]}
              alt={`${title} ampliada ${expandedIndex + 1}`}
              className="max-h-[82vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-sm font-semibold text-white/80">
              {expandedIndex + 1} / {images.length}
            </figcaption>
          </figure>

          {images.length > 1 && (
            <button
              type="button"
              onClick={goToExpandedNext}
              className="absolute right-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-slate-950"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ShareButtons({ title }: { title: string }) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);
  const shareLinks = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: MessageCircle,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: Twitter,
    },
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-bold uppercase text-slate-700">Compartir noticia</p>
      <div className="mt-4 flex gap-3">
        {shareLinks.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            aria-label={`Compartir en ${label}`}
            title={label}
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
  );
}
function ContentBlock({ block }: { block: string }) {
  if (block.startsWith('## ')) {
    return (
      <h2 className="mb-4 mt-10 text-3xl font-bold leading-tight text-slate-950">
        {renderInlineRichText(block.replace(/^##\s*/, ''))}
      </h2>
    );
  }

  if (block.startsWith('- ')) {
    return (
      <div className="mb-4 flex gap-3 rounded-lg border border-emerald-100 bg-emerald-50/70 p-4 text-slate-700">
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
        <p className="text-lg leading-8">
          {renderInlineRichText(block.replace(/^-\s*/, ''))}
        </p>
      </div>
    );
  }

  if (/^\d+\.\s/.test(block)) {
    return (
      <div className="mb-4 rounded-lg border border-sky-100 bg-sky-50/70 p-4 text-lg leading-8 text-slate-700">
        {renderInlineRichText(block.replace(/^\d+\.\s*/, ''))}
      </div>
    );
  }

  if (block.startsWith('> ')) {
    return (
      <blockquote className="mb-7 border-l-4 border-emerald-600 bg-slate-50 px-5 py-4 text-xl italic leading-9 text-slate-700">
        {renderInlineRichText(block.replace(/^>\s*/, ''))}
      </blockquote>
    );
  }

  return (
    <p className="mb-7 text-lg leading-9 text-slate-700">
      {renderInlineRichText(block)}
    </p>
  );
}
