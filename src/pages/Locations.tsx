import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  Image as ImageIcon,
  MapPin,
  Recycle,
  Route,
  Users,
} from 'lucide-react';
import { locations } from '../services/mockData';

export function Locations() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-emerald-100/80 to-transparent" />
      <svg
        className="absolute -right-28 top-24 h-72 w-[42rem] opacity-20"
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

      <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-950/10">
            <MapPin className="h-4 w-4" />
            Nuestras sedes
          </span>
          <h1 className="mt-7 text-5xl font-bold leading-tight text-slate-950 md:text-6xl">
            Presencia operativa en el territorio
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-600">
            Conoce los puntos desde donde acompañamos rutas, recicladores,
            aliados empresariales y comunidades con programas de economía circular.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { icon: Building2, value: '2', label: 'Sedes activas' },
            { icon: Recycle, value: '12.5K', label: 'Toneladas recuperadas' },
            { icon: Users, value: '450+', label: 'Recicladores acompañados' },
          ].map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-lg shadow-slate-950/5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-4xl font-bold text-slate-950">{stat.value}</div>
                <div className="mt-2 font-semibold text-slate-600">{stat.label}</div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {locations.map((location, index) => (
            <motion.article
              key={location.id}
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-950/6 transition-shadow duration-300 hover:shadow-2xl"
            >
              <Link
                to="/sedes/$slug"
                params={{ slug: location.slug }}
                className="grid h-full grid-cols-1"
              >
                <div className="relative h-80 overflow-hidden bg-slate-900">
                  <img
                    src={location.heroImage}
                    alt={location.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-bold text-emerald-50 backdrop-blur">
                      {location.type}
                    </span>
                    <h2 className="mt-4 text-4xl font-bold">{location.city}</h2>
                    <p className="mt-2 text-emerald-50/90">{location.region}</p>
                  </div>
                </div>

                <div className="flex h-full flex-col p-7">
                  <p className="text-base leading-7 text-slate-600">{location.summary}</p>

                  <div className="mt-7 grid grid-cols-2 gap-3">
                    {location.stats.slice(0, 2).map((stat) => (
                      <div key={stat.label} className="rounded-lg bg-slate-50 p-4">
                        <div className="text-2xl font-bold text-slate-950">{stat.value}</div>
                        <div className="mt-1 text-xs font-bold uppercase text-slate-500">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                      <ImageIcon className="h-4 w-4" />
                      {location.gallery.length} fotos
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
                      Ver sede
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 overflow-hidden rounded-lg bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/15 md:p-10"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-emerald-300 text-emerald-950">
              <Route className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Cobertura conectada</h2>
              <p className="mt-3 max-w-3xl text-emerald-50/80">
                Cada sede opera como punto de encuentro entre empresas,
                comunidades y recicladores para recuperar materiales con mejor
                trazabilidad.
              </p>
            </div>
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition-colors duration-200 hover:bg-emerald-100"
            >
              Contactar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
