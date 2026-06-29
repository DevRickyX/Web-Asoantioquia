import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowRight, MapPin, Phone, Mail, Clock, Navigation, Building } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { locations } from '../services/mockData';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const getMapsUrl = (lat: number, lng: number) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

export function LocationsSection() {
  const FloatingParticle = ({ delay = 0, duration = 20, size = 'w-2 h-2' }) => (
    <motion.div
      className={`absolute ${size} bg-green-400/20 rounded-full blur-sm`}
      animate={{
        y: [-20, -100, -20],
        x: [-10, 10, -10],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration,
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
    <section className="py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50">
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 2} 
            duration={15 + Math.random() * 10}
            size={Math.random() > 0.5 ? 'w-1 h-1' : 'w-2 h-2'}
          />
        ))}
        
        {/* Geometric shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-green-400/10 to-green-600/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-blue-600/20 rounded-full blur-lg"></div>
        
        {/* Curved decorations */}
        <svg className="absolute top-0 left-0 w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#10b981" opacity="0.05"></path>
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
            <MapPin className="mr-2 h-4 w-4" />
            Nuestras Ubicaciones
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Cerca de
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"> Ti</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Estratégicamente ubicados para brindar el mejor servicio en la región caribeña y antioqueña
          </p>
        </motion.div>

        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="h-96 relative">
              <MapContainer
                center={[8.4, -75.8]}
                zoom={8}
                className="h-full w-full"
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {locations.map((location) => (
                  <Marker
                    key={location.id}
                    position={[location.coordinates.lat, location.coordinates.lng]}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-gray-900 mb-2">{location.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">{location.address}</p>
                        <p className="text-sm text-green-600 font-medium">{location.phone}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              
              {/* Custom zoom controls */}
              <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg">
                <button className="block p-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <Navigation className="h-4 w-4 text-gray-600" />
                </button>
                <button className="block p-3 hover:bg-gray-50 transition-colors">
                  <Building className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Building className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                        {location.name.split(' - ')[1]}
                      </h3>
                      <p className="text-green-600 font-medium">Sede {location.name.split(' - ')[0]}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-start group/item"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4 group-hover/item:bg-green-100 transition-colors duration-300">
                        <MapPin className="h-5 w-5 text-gray-600 group-hover/item:text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Dirección</p>
                        <p className="text-gray-600">{location.address}</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center group/item"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4 group-hover/item:bg-green-100 transition-colors duration-300">
                        <Phone className="h-5 w-5 text-gray-600 group-hover/item:text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Teléfono</p>
                        <p className="text-gray-600">{location.phone}</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center group/item"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4 group-hover/item:bg-green-100 transition-colors duration-300">
                        <Mail className="h-5 w-5 text-gray-600 group-hover/item:text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">{location.email}</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center group/item"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4 group-hover/item:bg-green-100 transition-colors duration-300">
                        <Clock className="h-5 w-5 text-gray-600 group-hover/item:text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Horarios</p>
                        <p className="text-gray-600">{location.hours}</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex gap-4">
                    <Link
                      to="/sedes/$slug"
                      params={{ slug: location.slug }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-green-700 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-green-700 hover:to-green-800 hover:shadow-xl"
                    >
                      Ver sede
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                    
                    <a
                      href={getMapsUrl(location.coordinates.lat, location.coordinates.lng)}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Ver ${location.city} en Google Maps`}
                      className="rounded-2xl border-2 border-green-600 px-6 py-3 font-semibold text-green-600 transition-all duration-300 hover:bg-green-600 hover:text-white"
                    >
                      <Navigation className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="relative bg-gradient-to-r from-green-600 via-green-700 to-green-800 rounded-3xl p-12 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&#34;60&#34; height=&#34;60&#34; viewBox=&#34;0 0 60 60&#34; xmlns=&#34;http://www.w3.org/2000/svg&#34;%3E%3Cg fill=&#34;none&#34; fill-rule=&#34;evenodd&#34;%3E%3Cg fill=&#34;%23ffffff&#34; fill-opacity=&#34;0.1&#34;%3E%3Ccircle cx=&#34;30&#34; cy=&#34;30&#34; r=&#34;4&#34;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            
            <div className="relative">
              <h3 className="text-4xl font-bold text-white mb-4">
                ¿Necesitas visitarnos?
              </h3>
              <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                Agenda una cita previa para recibir atención personalizada y conocer nuestras instalaciones
              </p>
              
              <Link
                to="/contacto"
                className="bg-white text-green-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Agendar Visita
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
