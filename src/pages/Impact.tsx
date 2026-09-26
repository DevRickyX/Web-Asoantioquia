import { motion } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';
import { ActivitiesGallerySection } from '../components/ActivitiesGallerySection';
import { NewsSection } from '../components/NewsSection';

export function Impact() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.3)_1px,transparent_0)] [background-size:28px_28px]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-4 py-2 text-sm font-bold text-emerald-950">
            <HeartHandshake className="h-4 w-4" />
            Acciones con propósito
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-tight md:text-6xl">
            Nuestro trabajo se cuenta a través de acciones reales.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-emerald-50/80">
            Conoce los encuentros, actividades de sensibilización y espacios de reconocimiento
            que compartimos con los recicladores de oficio en Turbo.
          </p>
        </motion.div>
      </section>
      <ActivitiesGallerySection />
      <NewsSection />
    </main>
  );
}
