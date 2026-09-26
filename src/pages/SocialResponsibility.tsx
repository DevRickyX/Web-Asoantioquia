import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Handshake, Heart, Users } from 'lucide-react';

const actions = [
  {
    icon: Heart,
    eyebrow: 'Reconocimiento',
    title: 'Valoramos el oficio reciclador',
    description: 'En el Día Mundial del Reciclador compartimos una jornada de reconocimiento y gratitud por el aporte diario de los recicladores de oficio.',
    image: '/images/noticias/reconocimiento-recicladores-2026/reconocimiento-recicladores-2026-01.jpeg',
    slug: 'reconocimiento-recicladores-dia-mundial-2026',
  },
  {
    icon: Users,
    eyebrow: 'Comunidad',
    title: 'Creamos espacios para encontrarnos',
    description: 'Promovemos encuentros cercanos para escuchar experiencias, compartir y fortalecer los vínculos con la comunidad recicladora de Turbo.',
    image: '/images/noticias/almuerzo-sensibilizacion-recicladores-2026/actividad-almuerzo-sensibilizacion-03.jpeg',
    slug: 'almuerzo-sensibilizacion-recicladores-oficio-2026',
  },
  {
    icon: BookOpen,
    eyebrow: 'Sensibilización',
    title: 'Conversamos sobre el cuidado ambiental',
    description: 'Durante nuestras actividades abordamos prácticas sencillas de separación y aprovechamiento que facilitan la labor de los recicladores.',
    image: '/images/noticias/almuerzo-sensibilizacion-recicladores-2026/actividad-almuerzo-sensibilizacion-01.jpeg',
    slug: 'almuerzo-sensibilizacion-recicladores-oficio-2026',
  },
  {
    icon: Handshake,
    eyebrow: 'Acompañamiento',
    title: 'Fortalecemos relaciones desde la cercanía',
    description: 'El diálogo, el respeto y las actividades comunitarias orientan la manera en que Asoantioquia se relaciona con los recicladores del territorio.',
    image: '/images/noticias/almuerzo-sensibilizacion-recicladores-2026/actividad-almuerzo-sensibilizacion-13.jpeg',
    slug: 'almuerzo-sensibilizacion-recicladores-oficio-2026',
  },
];

export function SocialResponsibility() {
  return (
    <main className="min-h-screen bg-white pt-28">
      <section className="border-b border-slate-100 bg-gradient-to-b from-emerald-50/70 to-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-6 inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
              <Heart className="mr-2 h-4 w-4" />
              Compromiso con la comunidad
            </span>
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
              Responsabilidad social desde la cercanía
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
              Reconocemos el valor de los recicladores de oficio y construimos espacios de encuentro, escucha y sensibilización ambiental en Turbo.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Acciones realizadas</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Así acompañamos a la comunidad recicladora</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Estas acciones recogen actividades que ya hemos compartido con recicladores de oficio y muestran nuestro compromiso actual, sin cifras estimadas.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.article
                  key={action.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="h-72 overflow-hidden">
                    <img
                      src={action.image}
                      alt={action.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7 md:p-8">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-700">{action.eyebrow}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{action.title}</h3>
                    <p className="mt-4 leading-7 text-slate-600">{action.description}</p>
                    <Link
                      to="/noticias/$slug"
                      params={{ slug: action.slug }}
                      className="mt-6 inline-flex items-center font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
                    >
                      Conocer la actividad
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-900 px-6 py-12 text-center md:px-12">
            <h2 className="text-3xl font-bold text-white">Construyamos nuevas acciones juntos</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Si quieres proponer una actividad o conocer cómo colaborar con la comunidad recicladora de Turbo, conversemos.
            </p>
            <Link
              to="/contacto"
              className="mt-8 inline-flex items-center rounded-xl bg-emerald-500 px-6 py-3 font-bold text-white transition-colors hover:bg-emerald-400"
            >
              Solicitar información
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
