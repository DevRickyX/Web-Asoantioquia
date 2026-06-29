import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Truck, Recycle, GraduationCap, FileText, ArrowRight, CheckCircle, Star, Users } from 'lucide-react';
import { services } from '../services/mockData';

const iconMap = {
  Truck,
  Recycle,
  GraduationCap,
  FileText,
};

export function Services() {
  const serviceFeatures = {
    '1': ['Rutas optimizadas', 'Personal capacitado', 'Horarios flexibles', 'Seguimiento en tiempo real'],
    '2': ['Tecnología avanzada', 'Clasificación técnica', 'Control de calidad', 'Trazabilidad completa'],
    '3': ['Metodología interactiva', 'Material didáctico', 'Certificación', 'Seguimiento post-capacitación'],
    '4': ['Diagnóstico integral', 'Plan personalizado', 'Implementación', 'Monitoreo continuo']
  };

  const FloatingParticle = ({ delay = 0 }) => (
    <motion.div
      className="absolute w-1 h-1 bg-green-400/40 rounded-full"
      animate={{
        y: [-20, -80, -20],
        x: [-5, 5, -5],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50">
        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.8} />
        ))}
        
        {/* Curved decorations */}
        <svg className="absolute top-0 left-0 w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#10b981" opacity="0.05"></path>
        </svg>
      </div>

      <div className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8"
            >
              <Star className="mr-2 h-4 w-4" />
              Servicios Especializados
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Nuestros
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"> Servicios</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ofrecemos soluciones integrales para la gestión de residuos, 
              combinando tecnología avanzada, experiencia y compromiso social
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="space-y-16 mb-20">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              const isEven = index % 2 === 0;
              const features = serviceFeatures[service.id as keyof typeof serviceFeatures];
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                    {/* Image Section */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`relative ${!isEven ? 'lg:col-start-2' : ''}`}
                    >
                      <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        
                        {/* Floating icon */}
                        <div className="absolute top-6 right-6">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        
                        {/* Service number */}
                        <div className="absolute bottom-6 left-6">
                          <div className="text-6xl font-bold text-white/30">
                            0{index + 1}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Content Section */}
                    <div className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                      >
                        <div className="flex items-center mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                              {service.title}
                            </h3>
                            <p className="text-green-600 font-medium">Servicio especializado</p>
                          </div>
                        </div>
                        
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                          {service.description}
                        </p>
                        
                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                          {features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.6, delay: 0.4 + featureIndex * 0.1 }}
                              className="flex items-center"
                            >
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link
                            to="/contacto"
                            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                          >
                            Solicitar Información
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                          
                          <Link
                            to="/impacto"
                            className="px-6 py-4 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center"
                          >
                            <Users className="mr-2 h-5 w-5" />
                            Ver Casos
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 rounded-3xl p-12 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&#34;60&#34; height=&#34;60&#34; viewBox=&#34;0 0 60 60&#34; xmlns=&#34;http://www.w3.org/2000/svg&#34;%3E%3Cg fill=&#34;none&#34; fill-rule=&#34;evenodd&#34;%3E%3Cg fill=&#34;%23ffffff&#34; fill-opacity=&#34;0.1&#34;%3E%3Ccircle cx=&#34;30&#34; cy=&#34;30&#34; r=&#34;4&#34;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
              
              <div className="relative">
                <h3 className="text-4xl font-bold text-white mb-6">
                  ¿Necesitas una Solución Personalizada?
                </h3>
                <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                  Trabajamos contigo para desarrollar estrategias específicas 
                  que se adapten a las necesidades de tu empresa o comunidad
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Link
                    to="/contacto"
                    className="bg-white text-green-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    Solicitar Cotización
                  </Link>
                  
                  <Link
                    to="/contacto"
                    className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 rounded-2xl font-bold transition-all duration-300"
                  >
                    Agendar Reunión
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
