import { motion } from 'framer-motion';
import { Building2, Leaf, Recycle, TrendingUp, Users } from 'lucide-react';
import { companyInfo } from '../services/mockData';
import { type LandingMetrics, useBackendItem } from '../services/contentApi';

export interface ImpactStat {
  icon: 'Recycle' | 'Users' | 'Building2' | 'Leaf';
  value: string;
  label: string;
  detail: string;
}

const statIcons = {
  Recycle,
  Users,
  Building2,
  Leaf,
} as const;

const statStyles = [
  {
    accent: 'from-emerald-500 to-teal-500',
    iconBg: 'bg-emerald-50 text-emerald-700',
  },
  {
    accent: 'from-sky-500 to-cyan-500',
    iconBg: 'bg-sky-50 text-sky-700',
  },
  {
    accent: 'from-violet-500 to-fuchsia-500',
    iconBg: 'bg-violet-50 text-violet-700',
  },
  {
    accent: 'from-amber-400 to-orange-500',
    iconBg: 'bg-amber-50 text-amber-700',
  },
] as const;

export const defaultImpactStats: ImpactStat[] = [
  {
    icon: 'Recycle',
    value: companyInfo.impact.tonnagesRecycled.toLocaleString('es-CO'),
    label: 'Toneladas recicladas',
    detail: 'Material recuperado y reintegrado a cadenas productivas.',
  },
  {
    icon: 'Users',
    value: `${companyInfo.impact.jobsCreated}+`,
    label: 'Empleos generados',
    detail: 'Oportunidades de trabajo digno para recicladores de oficio.',
  },
  {
    icon: 'Building2',
    value: `${companyInfo.impact.companiesPartnered}+`,
    label: 'Empresas aliadas',
    detail: 'Organizaciones vinculadas a programas de economia circular.',
  },
  {
    icon: 'Leaf',
    value: `${companyInfo.impact.communitiesBenefited}`,
    label: 'Comunidades beneficiadas',
    detail: 'Sectores acompanados con formacion, rutas y procesos sostenibles.',
  },
];

export function StatsSection() {
  const metrics = useBackendItem<LandingMetrics>('/metrics/landing', {
    partners: companyInfo.impact.companiesPartnered,
    gallery: 0,
    news: 0,
    testimonials: 0,
    stats: defaultImpactStats,
  });
  const stats = metrics?.stats?.length ? metrics.stats : defaultImpactStats;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 py-24">
      <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_1px_1px,rgba(15,23,42,.16)_1px,transparent_0)] [background-size:30px_30px]" />
      <svg
        className="absolute -right-24 top-8 h-72 w-[38rem] opacity-20"
        viewBox="0 0 620 280"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M34 209C137 55 250 292 368 139C455 26 552 97 598 30"
          stroke="url(#statsAccent)"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <path
          d="M12 244C126 94 243 330 374 171C465 61 553 128 610 71"
          stroke="#0f172a"
          strokeOpacity=".22"
          strokeWidth="2"
          strokeDasharray="10 12"
        />
        <defs>
          <linearGradient id="statsAccent" x1="34" y1="209" x2="598" y2="30">
            <stop stopColor="#0ea5e9" />
            <stop offset=".48" stopColor="#10b981" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-lg border border-slate-200 bg-white/85 p-8 shadow-xl shadow-slate-950/5 backdrop-blur md:p-10"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white">
              <TrendingUp className="h-4 w-4" />
              Cifras de impacto
            </span>
            <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              Resultados que respaldan la operacion sostenible
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Datos clave para ver el alcance ambiental, social y empresarial
              del trabajo que hace Asoantioquia en el territorio.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="text-3xl font-bold text-slate-950">92%</div>
                <div className="mt-1 text-xs font-semibold uppercase text-slate-500">
                  aprovechamiento
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="text-3xl font-bold text-slate-950">+15%</div>
                <div className="mt-1 text-xs font-semibold uppercase text-slate-500">
                  crecimiento anual
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stats.map((item, index) => {
              const Icon = statIcons[item.icon] || Recycle;
              const style = statStyles[index % statStyles.length];

              return (
                <motion.article
                  key={`${item.label}-${index}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-lg shadow-slate-950/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-slate-950/10"
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.accent}`} />
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${style.iconBg}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-slate-950">{item.value}</div>
                  <h3 className="mt-2 text-lg font-bold text-slate-800">{item.label}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                    {item.detail}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
