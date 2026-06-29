import { Link } from '@tanstack/react-router';
import {
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react';

const footerLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/impacto', label: 'Impacto' },
  { to: '/sedes', label: 'Sedes' },
  { to: '/responsabilidad-social', label: 'Responsabilidad Social' },
] as const;

const socialLinks = [
  {
    href: 'https://www.facebook.com/asoantioquia',
    label: 'Facebook',
    icon: Facebook,
  },
  {
    href: 'https://www.instagram.com/asoantioquia',
    label: 'Instagram',
    icon: Instagram,
  },
  {
    href: 'https://www.youtube.com/@asoantioquia',
    label: 'YouTube',
    icon: Youtube,
  },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#071814] via-[#0f2c25] to-[#17483c] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-emerald-300/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.35fr_0.8fr_0.9fr_0.9fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white shadow-lg shadow-black/20">
                <img
                  src="/logo-asoantioquia.png"
                  alt="Asoantioquia"
                  className="h-11 w-11 object-contain"
                />
              </span>
              <span className="text-2xl font-bold">Asoantioquia</span>
            </div>
            <p className="max-w-md text-sm leading-7 text-emerald-50/78">
              Promovemos la cultura del reciclaje, la economía circular y el
              trabajo digno de los recicladores de oficio.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/8 text-emerald-50 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200/70 hover:bg-emerald-300 hover:text-emerald-950"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <Link
              to="/contacto"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-bold text-emerald-950 shadow-lg shadow-emerald-950/20 transition-colors duration-200 hover:bg-emerald-300"
            >
              Hablar con nosotros
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-emerald-300">
              Navegación
            </h3>
            <div className="space-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm text-emerald-50/75 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-emerald-300">
              Contacto
            </h3>
            <div className="space-y-3 text-sm text-emerald-50/75">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-emerald-300" />
                <span>+57 (4) 789-1234</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-emerald-300" />
                <span>info@asoantioquia.org</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-emerald-300">
              Ubicaciones
            </h3>
            <div className="space-y-3 text-sm text-emerald-50/75">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-emerald-300" />
                <span>Montería, Córdoba</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-emerald-300" />
                <span>Turbo, Antioquia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-7 text-sm text-emerald-50/60 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2024 Asoantioquia. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              to="/terminos-condiciones"
              className="font-medium text-emerald-100/80 transition-colors duration-200 hover:text-white"
            >
              Términos y condiciones
            </Link>
            <span className="text-emerald-100/55">Reciclaje, inclusión y territorio.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
