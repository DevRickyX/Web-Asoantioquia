import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { news } from '../services/mockData';

const categoryColors = {
  Infraestructura: 'bg-blue-50 text-blue-800 border-blue-100',
  Educación: 'bg-emerald-50 text-emerald-800 border-emerald-100',
  Alianzas: 'bg-violet-50 text-violet-800 border-violet-100',
  Comunidad: 'bg-amber-50 text-amber-800 border-amber-100',
} as const;

export function NewsSection() {
  const visibleNews = news.slice(0, 2);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) =>
    categoryColors[category as keyof typeof categoryColors] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <section id="noticias" className="relative scroll-mt-24 overflow-hidden bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm ring-1 ring-slate-200">
            Nuestras acciones
          </span>
          <h2 className="mt-5 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
            Historias construidas junto a los recicladores
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Encuentros y actividades que fortalecen la comunidad recicladora de Turbo.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-7 md:grid-cols-2">
          {visibleNews.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link to="/noticias/$slug" params={{ slug: item.slug }} className="flex h-full flex-col">
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-200">
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-bold ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="h-4 w-4" />
                    {formatDate(item.date)}
                  </span>
                  <h3 className="mt-4 text-2xl font-bold leading-snug text-slate-950 transition-colors group-hover:text-emerald-700">
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-base leading-7 text-slate-600">
                    {item.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-emerald-700">
                    Leer historia
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
