import { Link, useParams } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Image as ImageIcon,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Route,
} from 'lucide-react';
import { locations } from '../services/mockData';

const getMapsUrl = (lat: number, lng: number) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

export function LocationDetail() {
  const { slug } = useParams({ strict: false }) as { slug?: string };
  const location = locations.find((item) => item.slug === slug);

  if (!location) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <p className="text-sm font-bold uppercase text-emerald-700">Sede no encontrada</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-950">
          Esta sede no está disponible.
        </h1>
        <Link
          to="/sedes"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-emerald-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Ver sedes
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-white">
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <img
          src={location.heroImage}
          alt={location.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/92 via-slate-950/76 to-slate-950/25" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Link
            to="/sedes"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-bold text-white transition-colors duration-200 hover:bg-white hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Todas las sedes
          </Link>

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.68fr_0.32fr] lg:items-end">
            <div>
              <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-emerald-50 backdrop-blur">
                {location.type}
              </span>
              <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
                {location.city}
              </h1>
              <p className="mt-5 max-w-3xl text-xl leading-8 text-emerald-50/90">
                {location.summary}
              </p>
            </div>

            <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
              <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase text-emerald-100">
                <MapPin className="h-4 w-4" />
                Información de contacto
              </div>
              <div className="space-y-4 text-sm text-emerald-50/90">
                <p className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{location.address}</span>
                </p>
                <p className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{location.phone}</span>
                </p>
                <p className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{location.email}</span>
                </p>
                <p className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{location.hours}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {location.stats.map((stat, index) => (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-lg shadow-slate-950/5"
              >
                <span className="text-xs font-bold uppercase text-slate-400">
                  0{index + 1}
                </span>
                <div className="mt-5 text-4xl font-bold text-slate-950">{stat.value}</div>
                <h2 className="mt-2 text-lg font-bold text-slate-800">{stat.label}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{stat.detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.66fr_0.34fr] lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
              <Building2 className="h-4 w-4" />
              Operación local
            </span>
            <h2 className="mt-6 text-4xl font-bold text-slate-950">
              Una sede para conectar reciclaje, comunidad y aliados
            </h2>
            <div className="mt-7">
              {location.description.map((paragraph) => (
                <p key={paragraph} className="mb-6 text-lg leading-9 text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {location.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="font-semibold text-slate-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5">
              <div className="mb-5 flex items-center gap-2 text-sm font-bold uppercase text-emerald-700">
                <Route className="h-4 w-4" />
                Área de cobertura
              </div>
              <div className="flex flex-wrap gap-2">
                {location.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800"
                  >
                    {area}
                  </span>
                ))}
              </div>

              <div className="mt-7 rounded-lg bg-slate-50 p-5">
                <div className="text-sm font-bold uppercase text-slate-500">
                  Coordenadas
                </div>
                <p className="mt-2 font-semibold text-slate-800">
                  {location.coordinates.lat}, {location.coordinates.lng}
                </p>
              </div>

              <a
                href={getMapsUrl(location.coordinates.lat, location.coordinates.lng)}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-emerald-800"
              >
                Ver en Google Maps
                <Navigation className="h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">
                <ImageIcon className="h-4 w-4" />
                Galería de la sede
              </span>
              <h2 className="mt-5 text-4xl font-bold text-slate-950">
                Actividades y operación en {location.city}
              </h2>
            </div>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-bold text-emerald-800 transition-colors duration-200 hover:bg-emerald-50"
            >
              Agendar visita
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 lg:grid-rows-2">
            {location.gallery.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.07 }}
                viewport={{ once: true }}
                className={`group overflow-hidden rounded-lg bg-slate-900 shadow-lg shadow-slate-950/10 ${
                  index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${location.city} actividad ${index + 1}`}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    index === 0 ? 'h-[470px]' : 'h-[225px]'
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
