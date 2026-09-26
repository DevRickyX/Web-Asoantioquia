import { motion } from 'framer-motion';
import { Leaf, Users, Lightbulb, Eye, Heart, Shield, Target, Zap } from 'lucide-react';
import { companyInfo } from '../services/mockData';

export function Values() {
  const iconMap = {
    'Sostenibilidad': Leaf,
    'Inclusión Social': Users,
    'Innovación': Lightbulb,
    'Transparencia': Eye
  };

  const colorMap = {
    'Sostenibilidad': { primary: 'green', gradient: 'from-green-500 to-green-600', bg: 'bg-green-100', text: 'text-green-600' },
    'Inclusión Social': { primary: 'blue', gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-100', text: 'text-blue-600' },
    'Innovación': { primary: 'purple', gradient: 'from-purple-500 to-purple-600', bg: 'bg-purple-100', text: 'text-purple-600' },
    'Transparencia': { primary: 'orange', gradient: 'from-orange-500 to-orange-600', bg: 'bg-orange-100', text: 'text-orange-600' }
  };

  const additionalValues = [
    { icon: Heart, title: 'Compromiso', description: 'Dedicación absoluta con cada proyecto y comunidad que servimos' },
    { icon: Shield, title: 'Integridad', description: 'Actuamos con honestidad y ética en todas nuestras relaciones' },
    { icon: Target, title: 'Excelencia', description: 'Buscamos la mejora continua en todos nuestros procesos' },
    { icon: Zap, title: 'Agilidad', description: 'Respondemos rápidamente a las necesidades de nuestros aliados' }
  ];

  const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [0, 3, 0],
      }}
      transition={{
        duration: 8,
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
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50">
        {/* Floating geometric shapes */}
        <FloatingElement delay={0}>
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-purple-600/30 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement delay={2}>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-br from-green-400/20 to-green-600/30 rounded-full blur-lg"></div>
        </FloatingElement>
        <FloatingElement delay={4}>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-blue-600/30 rounded-full blur-md"></div>
        </FloatingElement>
        
        {/* Curved decorations */}
        <svg className="absolute top-0 left-0 w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#8b5cf6" opacity="0.05"></path>
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
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8"
            >
              <Heart className="mr-2 h-4 w-4" />
              Nuestros Principios
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Nuestros
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent"> Valores</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Los principios fundamentales que guían nuestro trabajo y definen nuestra identidad 
              como organización comprometida con el cambio social y ambiental
            </p>
          </motion.div>

          {/* Main Values */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {companyInfo.values.map((value, index) => {
              const Icon = iconMap[value.name as keyof typeof iconMap];
              const colors = colorMap[value.name as keyof typeof colorMap];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-5 rounded-3xl blur-xl group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative bg-white rounded-3xl shadow-xl p-10 border border-gray-100 overflow-hidden">
                    {/* Decorative background */}
                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${colors.bg} to-transparent rounded-full transform translate-x-20 -translate-y-20`}></div>
                    
                    <div className="relative">
                      <div className="flex items-center mb-8">
                        <div className={`w-20 h-20 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-10 w-10 text-white" />
                        </div>
                        <div>
                          <h3 className={`text-3xl font-bold text-gray-900 group-hover:${colors.text} transition-colors duration-300`}>
                            {value.name}
                          </h3>
                          <p className={`${colors.text} font-medium`}>Valor fundamental</p>
                        </div>
                      </div>
                      
                      <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        {value.description}
                      </p>
                      
                      {/* Action points */}
                      <div className="space-y-3">
                        {value.name === 'Sostenibilidad' && (
                          <>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              <span className="text-gray-700">Economía circular en todos nuestros procesos</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              <span className="text-gray-700">Reducción de huella de carbono</span>
                            </div>
                          </>
                        )}
                        {value.name === 'Inclusión Social' && (
                          <>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                              <span className="text-gray-700">Oportunidades equitativas para todos</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                              <span className="text-gray-700">Dignificación del trabajo reciclador</span>
                            </div>
                          </>
                        )}
                        {value.name === 'Innovación' && (
                          <>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              <span className="text-gray-700">Tecnologías limpias y eficientes</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              <span className="text-gray-700">Mejora continua de procesos</span>
                            </div>
                          </>
                        )}
                        {value.name === 'Transparencia' && (
                          <>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                              <span className="text-gray-700">Comunicación abierta y honesta</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                              <span className="text-gray-700">Rendición de cuentas constante</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Valores Complementarios
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Principios adicionales que fortalecen nuestra cultura organizacional
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalValues.map((value, index) => {
                const Icon = value.icon;
                const colors = ['red', 'green', 'blue', 'purple'];
                const color = colors[index];
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                      color === 'red' ? 'bg-red-100' :
                      color === 'green' ? 'bg-green-100' :
                      color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      <Icon className={`h-8 w-8 ${
                        color === 'red' ? 'text-red-600' :
                        color === 'green' ? 'text-green-600' :
                        color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                      }`} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3">{value.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Values in Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-3xl p-12 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&#34;60&#34; height=&#34;60&#34; viewBox=&#34;0 0 60 60&#34; xmlns=&#34;http://www.w3.org/2000/svg&#34;%3E%3Cg fill=&#34;none&#34; fill-rule=&#34;evenodd&#34;%3E%3Cg fill=&#34;%23ffffff&#34; fill-opacity=&#34;0.1&#34;%3E%3Ccircle cx=&#34;30&#34; cy=&#34;30&#34; r=&#34;4&#34;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
              
              <div className="relative">
                <h3 className="text-4xl font-bold text-white mb-6">
                  Vivimos Nuestros Valores Cada Día
                </h3>
                <p className="text-xl text-purple-100 mb-12 max-w-3xl mx-auto">
                  Estos valores no son solo palabras para nosotros. Son el fundamento 
                  de cada decisión que tomamos, cada proyecto que desarrollamos y 
                  cada relación que construimos con nuestras comunidades.
                </p>
                
                <div className="hidden grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="text-4xl font-bold text-white mb-2"
                    >
                      100%
                    </motion.div>
                    <div className="text-purple-200">Compromiso con nuestros valores</div>
                  </div>
                  <div className="text-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                      className="text-4xl font-bold text-white mb-2"
                    >
                      6
                    </motion.div>
                    <div className="text-purple-200">Años aplicando estos principios</div>
                  </div>
                  <div className="text-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.6 }}
                      className="text-4xl font-bold text-white mb-2"
                    >
                      450+
                    </motion.div>
                    <div className="text-purple-200">Vidas impactadas positivamente</div>
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
