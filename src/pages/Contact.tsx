import { motion } from "framer-motion";
import { ContactForm } from "../components/ContactForm";
import { LocationsSection } from "../components/LocationsSection";
import { MessageCircle, Phone, Mail, Clock } from "lucide-react";

export function Contact() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Llámanos Directamente",
      description: "Atención personalizada de lunes a viernes",
      contact: "+57 302 311 9180",
      action: "Llamar ahora",
      href: "tel:+573023119180",
      color: "green",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Business",
      description: "Respuesta rápida y soporte inmediato",
      contact: "+57 302 311 9180",
      action: "Enviar mensaje",
      href: "https://wa.me/573023119180",
      color: "blue",
    },
    {
      icon: Mail,
      title: "Correo Electrónico",
      description: "Para consultas detalladas y documentos",
      contact: "contactenos@asoantioquiaturbo.com",
      action: "Enviar email",
      href: "mailto:contactenos@asoantioquiaturbo.com",
      color: "purple",
    },
  ];

  const officeHours = [
    { day: "Lunes - Viernes", hours: "7:00 AM - 5:00 PM", available: true },
    { day: "Sábados", hours: "8:00 AM - 12:00 PM", available: true },
    { day: "Domingos", hours: "Cerrado", available: false },
    { day: "Festivos", hours: "Cerrado", available: false },
  ];

  const FloatingParticle = ({ delay = 0 }) => (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-green-400/30"
      animate={{
        y: [-20, -80, -20],
        x: [-5, 5, -5],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 1.2} />
        ))}

        {/* Curved decorations */}
        <svg
          className="absolute top-0 left-0 w-full h-32"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="#10b981"
            opacity="0.05"
          ></path>
        </svg>
      </div>

      <div className="relative py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-4 mx-auto mb-16 text-center max-w-7xl sm:px-6 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 mb-8 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-green-600 to-green-700"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Conecta con Nosotros
          </motion.div>

          <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
            Hablemos del
            <span className="text-transparent bg-gradient-to-r from-green-600 to-green-800 bg-clip-text">
              {" "}
              Futuro
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
            Estamos aquí para escucharte y trabajar juntos en soluciones
            sostenibles que transformen tu empresa y comunidad
          </p>
        </motion.div>

        {/* Quick Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="px-4 mx-auto mb-20 max-w-7xl sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              const colorClasses = {
                green: {
                  bg: "bg-green-100",
                  text: "text-green-600",
                  gradient: "from-green-500 to-green-600",
                  border: "border-green-200",
                },
                blue: {
                  bg: "bg-blue-100",
                  text: "text-blue-600",
                  gradient: "from-blue-500 to-blue-600",
                  border: "border-blue-200",
                },
                purple: {
                  bg: "bg-purple-100",
                  text: "text-purple-600",
                  gradient: "from-purple-500 to-purple-600",
                  border: "border-purple-200",
                },
              };
              const colors =
                colorClasses[method.color as keyof typeof colorClasses];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-5 rounded-3xl blur-xl group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  <div
                    className={`relative bg-white rounded-3xl shadow-lg p-8 text-center border ${colors.border} group-hover:shadow-xl transition-all duration-300`}
                  >
                    <div
                      className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`h-8 w-8 ${colors.text}`} />
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-700">
                      {method.title}
                    </h3>

                    <p className="mb-4 leading-relaxed text-gray-600">
                      {method.description}
                    </p>

                    <div className="mb-6">
                      <div className={`text-lg font-semibold ${colors.text}`}>
                        {method.contact}
                      </div>
                    </div>

                    <motion.a
                      href={method.href}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`block w-full bg-gradient-to-r ${colors.gradient} text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300`}
                    >
                      {method.action}
                    </motion.a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Office Hours */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl px-4 mx-auto mb-20 sm:px-6 lg:px-8"
        >
          <div className="p-10 bg-white border border-gray-100 shadow-xl rounded-3xl">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 mr-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl">
                <Clock className="w-8 h-8 text-gray-600" />
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900">
                  Horarios de Atención
                </h3>
                <p className="text-gray-600">
                  Estamos disponibles para atenderte
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {officeHours.map((schedule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 ${
                    schedule.available
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${
                        schedule.available ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></div>
                    <span className="font-semibold text-gray-900">
                      {schedule.day}
                    </span>
                  </div>
                  <span
                    className={`font-medium ${
                      schedule.available ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {schedule.hours}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <ContactForm />

        {/* Locations */}
        <LocationsSection />
      </div>
    </div>
  );
}
