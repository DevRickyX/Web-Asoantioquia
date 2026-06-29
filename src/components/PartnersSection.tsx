import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { Building2, ArrowRight, Users, Handshake } from 'lucide-react';
import { partners } from '../services/mockData';
import { useBackendCollection } from '../services/contentApi';

export function PartnersSection() {
  const partnerItems = useBackendCollection('/partners', partners);
  const categoryCount = new Set(partnerItems.map((partner) => partner.category).filter(Boolean)).size;

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background with organic shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100">
        <svg className="absolute top-0 right-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="#059669" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <path d="M0,400 C300,200 600,600 1200,300 L1200,0 L0,0 Z" fill="url(#gradient1)"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8"
          >
            <Handshake className="mr-2 h-4 w-4" />
            Nuestros Aliados
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Únete a Nuestros
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"> Aliados</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Construimos alianzas estratégicas fundamentales para el desarrollo sostenible
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">{partnerItems.length}</div>
              <div className="text-gray-600">Empresas Aliadas</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">{categoryCount}</div>
              <div className="text-gray-600">Sectores Industriales</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">{partnerItems.length}</div>
              <div className="text-gray-600">Aliados visibles</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-12 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partnerItems.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="group relative"
              >
                <div className="bg-gray-50 rounded-2xl p-5 h-32 flex flex-col items-center justify-center group-hover:bg-green-50 transition-all duration-300 border border-gray-100 group-hover:border-green-200">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-16 max-w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                  )}
                  <span className="mt-3 line-clamp-1 text-center text-xs font-semibold text-slate-700">
                    {partner.name}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Beneficios de ser nuestro aliado
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Impacto Social Medible</h4>
                  <p className="text-gray-600">Contribuye directamente a la generación de empleo digno y al desarrollo de comunidades vulnerables.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Responsabilidad Corporativa</h4>
                  <p className="text-gray-600">Fortalece tu imagen corporativa con prácticas sostenibles y socialmente responsables.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Soluciones Personalizadas</h4>
                  <p className="text-gray-600">Desarrollamos estrategias específicas adaptadas a las necesidades de tu empresa.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">¿Listo para hacer la diferencia?</h4>
              <p className="text-green-100 mb-6">
                Únete a nuestra red de empresas comprometidas con el desarrollo sostenible y la responsabilidad social.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-300 rounded-full mr-3"></div>
                  <span className="text-sm">Consultoría gratuita inicial</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-300 rounded-full mr-3"></div>
                  <span className="text-sm">Reportes de impacto detallados</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-300 rounded-full mr-3"></div>
                  <span className="text-sm">Acompañamiento especializado</span>
                </div>
              </div>

              <Link
                to="/contacto"
                className="w-full bg-white text-green-700 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg"
              >
                Solicitar Información
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
