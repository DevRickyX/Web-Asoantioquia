import { Link, useParams } from '@tanstack/react-router';
import { ArrowLeft, Calendar, Clock, Image as ImageIcon, User } from 'lucide-react';
import { news } from '../services/mockData';
import { useBackendItem } from '../services/contentApi';

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
          Esta publicación no está disponible.
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
            <ContentBlock key={`${block}-${index}`} block={block} />
          ))}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase text-emerald-700">
              <ImageIcon className="h-4 w-4" />
              Galería
            </div>
            <div className="grid grid-cols-2 gap-3">
              {article.gallery.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`${article.title} ${index + 1}`}
                  className="aspect-square rounded-lg object-cover"
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

function ContentBlock({ block }: { block: string }) {
  if (block.startsWith('## ')) {
    return (
      <h2 className="mb-4 mt-10 text-3xl font-bold leading-tight text-slate-950">
        {block.replace(/^##\s*/, '')}
      </h2>
    );
  }

  if (block.startsWith('- ')) {
    return (
      <div className="mb-4 flex gap-3 rounded-lg border border-emerald-100 bg-emerald-50/70 p-4 text-slate-700">
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
        <p className="text-lg leading-8">{block.replace(/^-\s*/, '')}</p>
      </div>
    );
  }

  return (
    <p className="mb-7 text-lg leading-9 text-slate-700">
      {block}
    </p>
  );
}
