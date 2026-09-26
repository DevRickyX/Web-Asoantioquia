import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';
import { heroSlides } from '../services/mockData';

export function HeroSection() {
  const slides = heroSlides;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return undefined;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  useEffect(() => {
    if (currentSlideIndex >= slides.length) {
      setCurrentSlideIndex(0);
    }
  }, [currentSlideIndex, slides.length]);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentSlideIndex] || heroSlides[0];

  return (
    <section className="relative isolate min-h-[70svh] overflow-hidden bg-slate-900 md:h-[600px] md:min-h-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlideIndex}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#102e2c]/85 via-slate-950/55 to-[#8b6b3f]/15" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 mx-auto flex min-h-[70svh] max-w-7xl items-center px-4 py-12 sm:px-6 md:h-[600px] md:min-h-0 lg:px-8">
        <div className="max-w-4xl text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <span className="inline-flex items-center rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                {currentSlide.eyebrow}
              </span>

              <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-7xl">
                {currentSlide.title}
                <span className="block text-[#e5dfc9]">
                  {currentSlide.subtitle}
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/95 sm:mt-6 sm:text-lg sm:leading-8">
                {currentSlide.description}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <a
                  href="#noticias"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d2b06f] px-6 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-slate-950/20 transition-colors duration-200 hover:bg-[#e2c58b]"
                >
                  Conocer nuestras acciones
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#por-que-reciclar"
                  className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-white hover:text-slate-950"
                >
                  ¿Por qué reciclar?
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* <div className="mt-10 hidden max-w-3xl grid-cols-1 gap-3 sm:grid sm:grid-cols-3">
            {heroMetrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <div
                  key={metric.label}
                  className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur"
                >
                  <Icon className="h-5 w-5 shrink-0 text-emerald-200" />
                  <div>
                    <div className="text-xl font-bold">{metric.value}</div>
                    <div className="text-xs font-medium uppercase text-emerald-50/75">
                      {metric.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div> */}
        </div>
      </div>

      <div className="absolute bottom-6 left-4 right-4 z-30 mx-auto flex max-w-7xl items-center justify-between gap-4 px-0 sm:left-6 sm:right-6 lg:px-2">
        <div className="ml-auto flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/35 p-1.5 backdrop-blur">
          <button
            type="button"
            onClick={prevSlide}
            className="rounded-full p-2 text-white transition-colors duration-200 hover:bg-white/15"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-1 px-1">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setCurrentSlideIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlideIndex
                    ? 'w-8 bg-[#d2b06f]'
                    : 'w-2.5 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Ir a ${slide.title}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsAutoPlaying((value) => !value)}
            className="rounded-full p-2 text-white transition-colors duration-200 hover:bg-white/15"
            aria-label={isAutoPlaying ? 'Pausar carrusel' : 'Reproducir carrusel'}
          >
            {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="rounded-full p-2 text-white transition-colors duration-200 hover:bg-white/15"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
