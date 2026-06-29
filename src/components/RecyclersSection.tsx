import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { Clock, MapPin, Quote } from 'lucide-react';
import { recyclers } from '../services/mockData';
import { useBackendCollection } from '../services/contentApi';

export function RecyclersSection() {
  const testimonials = useBackendCollection('/testimonials', recyclers);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100">
        <svg className="absolute bottom-0 left-0 w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1200,160,1248,128,1296,112L1344,96L1344,120L1296,120C1248,120,1152,120,1056,120C960,120,864,120,768,120C672,120,576,120,480,120C384,120,288,120,192,120C96,120,48,120,24,120L0,120Z" fill="#10b981" opacity="0.1"></path>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6"
          >
            Historias de Impacto
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Voces que
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"> Transforman</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conoce las historias inspiradoras de quienes transforman residuos en oportunidades 
            y construyen un futuro más sostenible
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((recycler, index) => (
            <motion.div
              key={recycler.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={recycler.image}
                  alt={recycler.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Quote icon */}
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Quote className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Name overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {recycler.name}
                  </h3>
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {recycler.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {recycler.yearsWorking} años
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="relative">
                  <div className="absolute -top-2 -left-2 text-6xl text-green-200 font-serif">"</div>
                  <p className="text-gray-600 leading-relaxed italic relative z-10 pl-6">
                    {recycler.story}
                  </p>
                  <div className="absolute -bottom-4 -right-2 text-6xl text-green-200 font-serif rotate-180">"</div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="h-1 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            to="/responsabilidad-social"
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Conoce más historias
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
