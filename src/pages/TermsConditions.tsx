import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Mail, ShieldCheck } from 'lucide-react';

const sections = [
  {
    title: 'Uso del sitio',
    content:
      'La información publicada en este sitio tiene fines informativos sobre los servicios, programas e iniciativas de Asoantioquia. El usuario se compromete a utilizarla de forma responsable y conforme a la legislación aplicable.',
  },
  {
    title: 'Contenido e imágenes',
    content:
      'Los textos, fotografías, gráficos y demás contenidos del sitio pueden estar protegidos por derechos de autor. Su reproducción o uso comercial requiere autorización previa de Asoantioquia.',
  },
  {
    title: 'Solicitudes y formularios',
    content:
      'La información enviada a través de formularios de contacto será utilizada para atender solicitudes, brindar información sobre servicios y establecer comunicación con el usuario.',
  },
  {
    title: 'Enlaces externos',
    content:
      'El sitio puede contener enlaces a plataformas externas, incluyendo redes sociales. Asoantioquia no controla las políticas o contenidos publicados por terceros.',
  },
  {
    title: 'Actualizaciones',
    content:
      'Asoantioquia podrá actualizar estos términos y condiciones cuando sea necesario. La versión publicada en esta página será la vigente para el uso del sitio.',
  },
];

export function TermsConditions() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-emerald-100/70 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-4 py-28 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-emerald-800 shadow-sm transition-colors duration-200 hover:bg-emerald-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-lg border border-slate-200 bg-white p-8 shadow-xl shadow-slate-950/5 md:p-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2 text-sm font-bold text-white">
            <FileText className="h-4 w-4" />
            Información legal
          </span>

          <h1 className="mt-7 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
            Términos y condiciones
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Condiciones generales para el uso del sitio web de Asoantioquia y
            sus canales digitales.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5">
            {sections.map((section, index) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.07 }}
                className="rounded-lg border border-slate-200 bg-slate-50 p-6"
              >
                <h2 className="text-xl font-bold text-slate-950">
                  {section.title}
                </h2>
                <p className="mt-3 leading-7 text-slate-600">
                  {section.content}
                </p>
              </motion.section>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 rounded-lg bg-emerald-950 p-6 text-white md:grid-cols-[auto_1fr] md:items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-300 text-emerald-950">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Contacto para asuntos legales</h2>
              <p className="mt-2 flex flex-wrap items-center gap-2 text-emerald-50/80">
                <Mail className="h-4 w-4" />
                info@asoantioquia.org
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
