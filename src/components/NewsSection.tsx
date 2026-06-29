import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Image as ImageIcon } from 'lucide-react';
import { news } from '../services/mockData';
import { useBackendCollection } from '../services/contentApi';

const categoryColors = {
  Infraestructura: 'bg-blue-50 text-blue-800 border-blue-100',
  Educación: 'bg-emerald-50 text-emerald-800 border-emerald-100',
  Alianzas: 'bg-violet-50 text-violet-800 border-violet-100',
} as const;

export function NewsSection() {
  const backendNews = useBackendCollection('/news', news);
  const [featuredNews, ...secondaryNews] = backendNews;

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);

    return new Date(year, month - 1, day).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
              Últimas noticias
            </span>
            <h2 className="mt-5 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              Historias, avances y resultados del territorio
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Un espacio editorial para publicar noticias con imagen destacada,
              cuerpo de texto y galería fotográfica.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
          >
            <Link
              to="/noticias/$slug"
              params={{ slug: featuredNews.slug }}
              className="grid h-full grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]"
            >
              <div className="relative min-h-80 overflow-hidden">
                <img
                  src={featuredNews.featuredImage}
                  alt={featuredNews.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4">
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold ${getCategoryColor(featuredNews.category)}`}>
                    {featuredNews.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between p-7">
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(featuredNews.date)}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {featuredNews.readTime}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold leading-tight text-slate-950 transition-colors duration-200 group-hover:text-emerald-700">
                    {featuredNews.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {featuredNews.excerpt}
                  </p>
                </div>

                <div className="mt-8">
                  <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <ImageIcon className="h-4 w-4" />
                    Galería de la noticia
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {featuredNews.gallery.slice(0, 3).map((image) => (
                      <img
                        key={image}
                        src={image}
                        alt=""
                        className="h-20 w-full rounded-lg object-cover"
                      />
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
                    Leer noticia
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>

          <div className="grid grid-cols-1 gap-6">
            {secondaryNews.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                <Link
                  to="/noticias/$slug"
                  params={{ slug: item.slug }}
                  className="grid grid-cols-1 sm:grid-cols-[180px_1fr]"
                >
                  <div className="relative h-56 overflow-hidden sm:h-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <h3 className="mt-4 text-xl font-bold leading-snug text-slate-950 transition-colors duration-200 group-hover:text-emerald-700">
                      {item.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {item.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-4 text-sm text-slate-500">
                      <span>{formatDate(item.date)}</span>
                      <span className="font-bold text-emerald-700">Leer</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
