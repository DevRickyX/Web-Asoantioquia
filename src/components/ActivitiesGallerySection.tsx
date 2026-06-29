import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, Images, Recycle, Users } from 'lucide-react';
import {
  fallbackGalleryItems,
  useBackendCollection,
} from '../services/contentApi';

export function ActivitiesGallerySection() {
  const galleryItems = useBackendCollection('/gallery', fallbackGalleryItems);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-emerald-50 py-28">
      <svg
        className="absolute -left-32 top-10 h-72 w-[42rem] opacity-20"
        viewBox="0 0 620 280"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M34 209C137 55 250 292 368 139C455 26 552 97 598 30"
          stroke="#0f766e"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M12 244C126 94 243 330 374 171C465 61 553 128 610 71"
          stroke="#f59e0b"
          strokeOpacity=".55"
          strokeWidth="3"
          strokeDasharray="10 12"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-950/10">
              <Images className="h-4 w-4" />
              Galería de actividades
            </span>
            <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              Momentos que muestran el trabajo en territorio
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="max-w-2xl lg:ml-auto"
          >
            <p className="text-lg leading-8 text-slate-600">
              Actividades con recicladores de oficio, jornadas de sensibilización,
              procesos de clasificación y encuentros con comunidades aliadas.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
                <Users className="h-4 w-4" />
                Comunidad
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-amber-800">
                <Recycle className="h-4 w-4" />
                Reciclaje
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-800">
                <Camera className="h-4 w-4" />
                Actividades
              </span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 lg:grid-rows-2">
          {galleryItems.map((item, index) => (
            <motion.article
              key={item.id || item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-lg bg-slate-900 shadow-xl shadow-slate-950/10 ${
                item.featured ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  item.featured ? 'h-[480px]' : 'h-[230px]'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/18 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-50 backdrop-blur">
                  {item.category}
                </span>
                <h3 className={`${item.featured ? 'text-3xl' : 'text-xl'} font-bold`}>
                  {item.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/responsabilidad-social"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition-colors duration-200 hover:bg-emerald-800"
          >
            Ver impacto social
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
