import { motion } from 'framer-motion';
import { Target, Eye, Compass, Heart, Lightbulb, Users } from 'lucide-react';
import { companyInfo } from '../services/mockData';

export function Mission() {
  const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 2, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50">
        {/* Floating geometric shapes */}
        <FloatingElement delay={0}>
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-green-400/20 to-green-600/30 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement delay={2}>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-blue-600/30 rounded-full blur-lg"></div>
        </FloatingElement>
        <FloatingElement delay={4}>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-purple-600/30 rounded-full blur-md"></div>
        </FloatingElement>
        
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
              <Compass className="mr-2 h-4 w-4" />
              Nuestra Esencia
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Misión y
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"> Visión</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Los pilares fundamentales que guían nuestro propósito y definen el futuro que construimos juntos
            </p>
          </motion.div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-white rounded-3xl shadow-xl p-10 border border-gray-100 overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-green-100 to-transparent rounded-full transform translate-x-20 -translate-y-20"></div>
                
                <div className="relative">
                  <div className="flex items-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                      <Target className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                        Misión
                      </h2>
                      <p className="text-green-600 font-medium">Nuestro propósito</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {companyInfo.mission}
                  </p>
                  
                  {/* Key points */}
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">Economía circular sostenible</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">Empleo digno para recicladores</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">Impacto ambiental positivo</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-white rounded-3xl shadow-xl p-10 border border-gray-100 overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-100 to-transparent rounded-full transform translate-x-20 -translate-y-20"></div>
                
                <div className="relative">
                  <div className="flex items-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                      <Eye className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                        Visión
                      </h2>
                      <p className="text-blue-600 font-medium">Nuestro futuro</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {companyInfo.vision}
                  </p>
                  
                  {/* Key points */}
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">Liderazgo nacional en gestión de residuos</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">Reconocimiento por impacto social</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">Transformación ambiental positiva</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Nuestros Valores Fundamentales
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Los principios que nos guían en cada decisión y acción
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companyInfo.values.map((value, index) => {
                const icons = [Heart, Users, Lightbulb, Eye];
                const Icon = icons[index];
                const colors = ['red', 'green', 'purple', 'blue'];
                const color = colors[index];
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                      color === 'red' ? 'bg-red-100' :
                      color === 'green' ? 'bg-green-100' :
                      color === 'purple' ? 'bg-purple-100' : 'bg-blue-100'
                    }`}>
                      <Icon className={`h-8 w-8 ${
                        color === 'red' ? 'text-red-600' :
                        color === 'green' ? 'text-green-600' :
                        color === 'purple' ? 'text-purple-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{value.name}</h4>
                    <p className="text-sm text-gray-600 line-clamp-3">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Commitment Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 rounded-3xl p-12 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&#34;60&#34; height=&#34;60&#34; viewBox=&#34;0 0 60 60&#34; xmlns=&#34;http://www.w3.org/2000/svg&#34;%3E%3Cg fill=&#34;none&#34; fill-rule=&#34;evenodd&#34;%3E%3Cg fill=&#34;%23ffffff&#34; fill-opacity=&#34;0.1&#34;%3E%3Ccircle cx=&#34;30&#34; cy=&#34;30&#34; r=&#34;4&#34;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
              
              <div className="relative">
                <h3 className="text-4xl font-bold text-white mb-6">
                  Nuestro Compromiso Inquebrantable
                </h3>
                <p className="text-xl text-green-100 leading-relaxed max-w-4xl mx-auto mb-8">
                  En Asoantioquia trabajamos día a día para construir un futuro más sostenible, 
                  donde el reciclaje no solo sea una práctica ambiental, sino también una 
                  oportunidad de desarrollo social y económico para las comunidades más vulnerables.
                </p>
                
                <div className="hidden grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">2018</div>
                    <div className="text-green-200">Año de fundación</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">450+</div>
                    <div className="text-green-200">Empleos generados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">25</div>
                    <div className="text-green-200">Comunidades impactadas</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
