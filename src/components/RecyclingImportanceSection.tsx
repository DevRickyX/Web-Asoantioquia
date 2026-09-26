import { motion } from 'framer-motion';
import { HandHeart, PackageCheck, Recycle } from 'lucide-react';

const steps = [
  { icon: PackageCheck, title: 'Separa', text: 'Materiales limpios y secos.' },
  { icon: HandHeart, title: 'Entrega', text: 'Al reciclador de oficio.' },
  { icon: Recycle, title: 'Transforma', text: 'Los residuos vuelven a ser recursos.' },
] as const;

export function RecyclingImportanceSection() {
  return (
    <section id="por-que-reciclar" className="relative scroll-mt-24 overflow-hidden bg-white py-24 text-slate-900">
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800">
              Reciclar también es cuidar
            </span>
            <h2 className="mt-6 max-w-xl text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
              Un ciclo sencillo que puede cambiar nuestro entorno.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Separar bien los materiales ayuda a mantener limpio el territorio y facilita la labor de los recicladores de oficio.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <img
              src="/images/proceso-reciclaje.png"
              alt="Ilustración del proceso de separación, recolección y transformación de materiales reciclables"
              className="block max-h-[560px] w-full object-contain"
            />
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{step.text}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
