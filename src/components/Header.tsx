import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, PhoneCall } from "lucide-react";

const companyLinks = [
  { to: "/mision-vision", label: "Misión y Visión" },
  { to: "/responsabilidad-social", label: "Responsabilidad Social" },
  { to: "/valores", label: "Valores" },
] as const;

const mainLinks = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/impacto", label: "Impacto" },
  { to: "/sedes", label: "Sedes" },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownPinned, setIsDropdownPinned] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setIsDropdownPinned(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsDropdownOpen(false);
    setIsDropdownPinned(false);
  };

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  const closeDropdownFromHover = () => {
    if (!isDropdownPinned) {
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    const shouldPin = !isDropdownPinned || !isDropdownOpen;

    setIsDropdownPinned(shouldPin);
    setIsDropdownOpen(shouldPin);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setIsDropdownPinned(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center gap-4">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50 ring-1 ring-emerald-100">
              <img
                src="/logo-asoantioquia.png"
                alt="Asoantioquia"
                className="h-10 w-10 object-contain"
              />
            </span>
            <span className="hidden text-xl font-bold leading-tight text-slate-900 sm:block">
              Asoantioquia
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {mainLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {item.label}
              </Link>
            ))}

            <div
              ref={dropdownRef}
              className="group/dropdown relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdownFromHover}
              onPointerEnter={openDropdown}
              onPointerLeave={closeDropdownFromHover}
            >
              <button
                type="button"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
                aria-haspopup="menu"
                className="flex items-center rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                ¿Quiénes somos?
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute left-0 top-full z-50 w-64 origin-top pt-2 transition-all duration-200 group-hover/dropdown:pointer-events-auto group-hover/dropdown:translate-y-0 group-hover/dropdown:scale-100 group-hover/dropdown:opacity-100 ${
                  isDropdownOpen
                    ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none -translate-y-2 scale-[0.98] opacity-0"
                }`}
              >
                <div className="overflow-hidden rounded-lg border border-emerald-100 bg-white shadow-xl shadow-slate-900/10">
                  {companyLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-5 py-4 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-emerald-50 hover:text-emerald-700"
                      onClick={closeDropdown}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/contacto"
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition-colors duration-200 hover:bg-emerald-800"
            >
              <PhoneCall className="h-4 w-4" />
              Contacto
            </Link>
          </nav>

          <button
            type="button"
            onClick={toggleMenu}
            className="ml-auto rounded-lg p-2 text-slate-700 transition-colors duration-200 hover:bg-emerald-50 hover:text-emerald-700 lg:hidden"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mt-2 space-y-1 border-t border-emerald-100 py-5">
                {[...mainLinks, ...companyLinks].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-emerald-50 hover:text-emerald-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/contacto"
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-emerald-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PhoneCall className="h-4 w-4" />
                  Contacto
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
