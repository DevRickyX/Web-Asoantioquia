import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  Globe,
  Handshake,
  Heart,
  TrendingUp,
  Users,
} from 'lucide-react';

export function SocialResponsibility() {
  const initiatives = [
    {
      icon: Users,
      title: 'Inclusión Laboral',
      description: 'Generamos empleo digno para recicladores de oficio, mejorando sus condiciones de vida y formalizando su trabajo.',
      color: 'blue',
      stats: '450+ empleos creados',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
    {
      icon: BookOpen,
      title: 'Educación Ambiental',
      description: 'Desarrollamos programas educativos en colegios y comunidades para promover la cultura del reciclaje.',
      color: 'green',
      stats: '10,000+ personas capacitadas',
      image: 'https://images.pexels.com/photos/8348740/pexels-photo-8348740.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
    {
      icon: Heart,
      title: 'Apoyo Comunitario',
      description: 'Brindamos capacitación técnica y apoyo psicosocial a las familias de recicladores.',
      color: 'red',
      stats: '25 comunidades beneficiadas',
      image: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
    {
      icon: Award,
      title: 'Reconocimiento',
      description: 'Celebramos y visibilizamos el trabajo de los recicladores como agentes ambientales clave.',
      color: 'purple',
      stats: '15 reconocimientos otorgados',
      image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
  ];

  const programs = [
    {
      title: 'Programa de Microcréditos',
      description: 'Facilitamos acceso a capital para que los recicladores puedan mejorar sus herramientas y equipos.',
      icon: TrendingUp,
      beneficiaries: 120,
    },
    {
      title: 'Red de Apoyo Familiar',
      description: 'Acompañamiento integral a las familias con servicios de salud, educación y bienestar.',
      icon: Handshake,
      beneficiaries: 300,
    },
    {
      title: 'Certificación Laboral',
      description: 'Programas de certificación que dignifican y profesionalizan el oficio del reciclaje.',
      icon: Globe,
      beneficiaries: 200,
    },
  ];

  const colorClasses = {
    blue: {
      light: 'bg-blue-100',
      text: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600',
      hoverText: 'group-hover:text-blue-600',
    },
    green: {
      light: 'bg-green-100',
      text: 'text-green-600',
      gradient: 'from-green-500 to-green-600',
      hoverText: 'group-hover:text-green-600',
    },
    red: {
      light: 'bg-red-100',
      text: 'text-red-600',
      gradient: 'from-red-500 to-red-600',
      hoverText: 'group-hover:text-red-600',
    },
    purple: {
      light: 'bg-purple-100',
      text: 'text-purple-600',
      gradient: 'from-purple-500 to-purple-600',
      hoverText: 'group-hover:text-purple-600',
    },
  };

  const particles = [
    ['7%', '20%'],
    ['16%', '68%'],
    ['29%', '34%'],
    ['43%', '82%'],
    ['61%', '23%'],
    ['74%', '70%'],
    ['88%', '38%'],
    ['95%', '62%'],
  ];

  const FloatingParticle = ({ delay = 0, left, top }: { delay?: number; left: string; top: string }) => (
    <motion.div
      className="absolute h-2 w-2 rounded-full bg-green-400/30 blur-[1px]"
      animate={{
        y: [-20, -100, -20],
        x: [-10, 10, -10],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      style={{ left, top }}
    />
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-red-50">
        {particles.map(([left, top], index) => (
          <FloatingParticle key={`${left}-${top}`} delay={index * 1.5} left={left} top={top} />
        ))}

        <svg className="absolute left-0 top-0 h-32 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="#ef4444"
            opacity="0.05"
          />
        </svg>
      </div>

      <div className="relative py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 inline-flex items-center rounded-full bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 text-sm font-semibold text-white"
            >
              <Heart className="mr-2 h-4 w-4" />
              Compromiso Social
            </motion.div>

            <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
              Responsabilidad
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent"> Social</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
              Nuestro compromiso va más allá del reciclaje. Trabajamos por la
              transformación social y el desarrollo sostenible de las comunidades.
            </p>
          </motion.div>

          <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon;
              const colors = colorClasses[initiative.color as keyof typeof colorClasses];

              return (
                <motion.article
                  key={initiative.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative h-full"
                >
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${colors.gradient} opacity-5 blur-xl transition-opacity duration-500 group-hover:opacity-10`} />

                  <div className="relative flex h-full min-h-[350px] overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
                    <div className="flex w-full flex-col md:flex-row">
                      <div className="relative h-56 overflow-hidden md:h-auto md:min-h-[350px] md:w-2/5">
                        <img
                          src={initiative.image}
                          alt={initiative.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${colors.light} ${colors.text}`}>
                            {initiative.stats}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-8 md:w-3/5">
                        <div className="mb-6 flex items-center">
                          <div className={`mr-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${colors.gradient} transition-transform duration-300 group-hover:scale-110`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <h2 className={`text-2xl font-bold text-gray-900 transition-colors duration-300 ${colors.hoverText}`}>
                            {initiative.title}
                          </h2>
                        </div>

                        <p className="mb-6 flex-1 text-base leading-relaxed text-gray-600">
                          {initiative.description}
                        </p>

                        <Link
                          to="/impacto"
                          className={`inline-flex items-center font-semibold transition-opacity duration-300 hover:opacity-80 ${colors.text}`}
                        >
                          Conocer más
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="ml-2"
                          >
                            →
                          </motion.span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Programas Complementarios
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Iniciativas adicionales que fortalecen nuestro impacto social
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {programs.map((program, index) => {
                const Icon = program.icon;

                return (
                  <motion.article
                    key={program.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 transition-all duration-300 group-hover:from-green-100 group-hover:to-green-200">
                      <Icon className="h-8 w-8 text-gray-600 transition-colors duration-300 group-hover:text-green-600" />
                    </div>

                    <h3 className="mb-4 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-700">
                      {program.title}
                    </h3>

                    <p className="mb-6 flex-1 leading-relaxed text-gray-600">
                      {program.description}
                    </p>

                    <div className="rounded-lg bg-green-50 p-3">
                      <div className="text-2xl font-bold text-green-600">{program.beneficiaries}+</div>
                      <div className="text-sm text-green-700">Beneficiarios</div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="relative mb-24"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 p-12 text-center">
              <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_30px_30px,rgba(255,255,255,.75)_4px,transparent_5px)] [background-size:60px_60px]" />

              <div className="relative">
                <h2 className="mb-6 text-4xl font-bold text-white">
                  Nuestro Impacto Social Medible
                </h2>
                <p className="mx-auto mb-12 max-w-3xl text-xl text-red-100">
                  Cada número representa vidas transformadas y comunidades fortalecidas.
                </p>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                  {[
                    ['450+', 'Empleos Generados'],
                    ['25', 'Comunidades Beneficiadas'],
                    ['10,000+', 'Personas Capacitadas'],
                    ['95%', 'Satisfacción Familiar'],
                  ].map(([value, label], index) => (
                    <motion.div
                      key={label}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                      className="text-center"
                    >
                      <div className="mb-2 text-4xl font-bold text-white">{value}</div>
                      <div className="text-red-200">{label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
