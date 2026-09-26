import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, Phone, MessageSquare, Mail, MapPin, Clock } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  isPartnerForm?: boolean;
}

const formSubmitEndpoint = import.meta.env.VITE_FORMSUBMIT_ENDPOINT;
const publicSiteUrl = import.meta.env.VITE_PUBLIC_SITE_URL;

export function ContactForm({ isPartnerForm = false }: ContactFormProps) {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const subject = isPartnerForm
      ? `Propuesta de alianza: ${data.company || data.name}`
      : data.subject;

    setSubmissionStatus('sending');

    try {
      const response = await fetch(formSubmitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          nombre: data.name,
          correo: data.email,
          telefono: data.phone,
          empresa: data.company || 'No especificada',
          asunto: subject,
          mensaje: data.message,
          sitio_web: publicSiteUrl,
          _subject: `Nuevo mensaje desde la web: ${subject}`,
          _template: 'table',
        }),
      });

      if (!response.ok) throw new Error('No se pudo enviar el formulario');

      setSubmissionStatus('success');
      reset();
    } catch {
      setSubmissionStatus('error');
    }
  };

  const formTitle = isPartnerForm ? 'Únete como Aliado Estratégico' : 'Contáctanos';
  const formDescription = isPartnerForm 
    ? 'Completa el formulario y nos pondremos en contacto contigo para explorar oportunidades de colaboración'
    : '¿Tienes alguna pregunta o quieres trabajar con nosotros? Nos encantaría escucharte';

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-600/5 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6"
          >
            {isPartnerForm ? 'Alianzas Estratégicas' : 'Contacto'}
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {formTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {formDescription}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 lg:p-12"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Nombre completo *
                  </label>
                  <input
                    {...register('name', { required: 'El nombre es requerido' })}
                    type="text"
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Tu nombre"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Correo electrónico *
                  </label>
                  <input
                    {...register('email', {
                      required: 'El email es requerido',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Teléfono
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="+57 302 311 9180"
                  />
                </div>

                {isPartnerForm && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Empresa
                    </label>
                    <input
                      {...register('company')}
                      type="text"
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                )}

                {!isPartnerForm && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Asunto *
                    </label>
                    <select
                      {...register('subject', { required: 'Selecciona un asunto' })}
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="servicios">Información sobre servicios</option>
                      <option value="alianza">Propuesta de alianza</option>
                      <option value="empleo">Oportunidades de empleo</option>
                      <option value="general">Consulta general</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-2 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </div>
                )}
              </div>

              {isPartnerForm && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tipo de colaboración *
                  </label>
                  <select
                    {...register('subject', { required: 'Selecciona el tipo de colaboración' })}
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="gestion-residuos">Gestión de residuos corporativos</option>
                    <option value="responsabilidad-social">Programas de responsabilidad social</option>
                    <option value="capacitacion">Capacitación ambiental</option>
                    <option value="consultoria">Consultoría en sostenibilidad</option>
                    <option value="otro">Otro tipo de colaboración</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-2 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Mensaje *
                </label>
                <textarea
                  {...register('message', { required: 'El mensaje es requerido' })}
                  rows={6}
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                  placeholder={isPartnerForm 
                    ? "Cuéntanos sobre tu empresa y cómo podríamos colaborar juntos..."
                    : "Cuéntanos en qué podemos ayudarte..."
                  }
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submissionStatus === 'sending'}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <Send className="mr-3 h-5 w-5" />
                {submissionStatus === 'sending'
                  ? 'Enviando...'
                  : isPartnerForm ? 'Enviar Propuesta' : 'Enviar Mensaje'}
              </motion.button>

              {submissionStatus === 'success' && (
                <p className="rounded-2xl border border-green-200 bg-green-50 px-6 py-4 text-center text-sm text-green-700">
                  Mensaje enviado correctamente. Nos pondremos en contacto contigo.
                </p>
              )}
              {submissionStatus === 'error' && (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-center text-sm text-red-700">
                  No pudimos enviar el mensaje. Escríbenos a contactenos@asoantioquiaturbo.com.
                </p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Otras formas de contacto
              </h3>
              
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center group"
                >
                  <div className="bg-green-100 p-4 rounded-2xl mr-6 group-hover:bg-green-200 transition-colors duration-300">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Llámanos</h4>
                    <a href="tel:+573023119180" className="text-gray-600 hover:text-green-700">+57 302 311 9180</a>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center group"
                >
                  <div className="bg-green-100 p-4 rounded-2xl mr-6 group-hover:bg-green-200 transition-colors duration-300">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                    <a href="https://wa.me/573023119180" className="text-gray-600 hover:text-green-700">+57 302 311 9180</a>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center group"
                >
                  <div className="bg-green-100 p-4 rounded-2xl mr-6 group-hover:bg-green-200 transition-colors duration-300">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">contactenos@asoantioquiaturbo.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start group"
                >
                  <div className="bg-green-100 p-4 rounded-2xl mr-6 group-hover:bg-green-200 transition-colors duration-300">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Oficina Principal</h4>
                    <p className="text-gray-600">Calle 102 #10-61/71, barrio Buenos Aires, Turbo, Antioquia</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-8 text-white">
              <div className="flex items-center mb-6">
                <Clock className="h-6 w-6 mr-3" />
                <h4 className="font-semibold text-xl">Horarios de atención</h4>
              </div>
              <div className="space-y-3 text-green-100">
                <p><strong className="text-white">Lunes a Viernes:</strong> 7:00 AM - 5:00 PM</p>
                <p><strong className="text-white">Sábados:</strong> 8:00 AM - 12:00 PM</p>
                <p><strong className="text-white">Domingos:</strong> Cerrado</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
