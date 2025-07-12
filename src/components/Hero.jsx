import { ArrowRight, Play, Pause } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const heroSlides = [
    {
      id: 1,
      title: "Comercio Sostenible",
      subtitle: "Descubre productos eco-amigables de empresas peruanas comprometidas con el futuro",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      cta: "Explorar Productos",
      color: "emerald",
      stats: "500+ productos sostenibles"
    },
    {
      id: 2,
      title: "Experiencia Premium",
      subtitle: "Diseño minimalista y compra inteligente para una experiencia única",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop",
      cta: "Comprar Ahora",
      color: "blue",
      stats: "Más de 10,000 clientes satisfechos"
    },
    {
      id: 3,
      title: "Envío Rápido",
      subtitle: "Delivery garantizado en 24h en Lima Metropolitana y 48h en provincias",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=600&fit=crop",
      cta: "Ver Zonas",
      color: "purple",
      stats: "Envío gratis desde S/99"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(nextSlide, 6000); // Aumentado a 6 segundos
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 3000); // Resume después de 3 segundos
  };

  const getColorClasses = (color) => {
    const colorMap = {
      emerald: {
        bg: 'bg-emerald-500',
        hover: 'hover:bg-emerald-600',
        ring: 'ring-emerald-500/30',
        gradient: 'from-emerald-500/20 to-emerald-600/40'
      },
      blue: {
        bg: 'bg-blue-500',
        hover: 'hover:bg-blue-600',
        ring: 'ring-blue-500/30',
        gradient: 'from-blue-500/20 to-blue-600/40'
      },
      purple: {
        bg: 'bg-purple-500',
        hover: 'hover:bg-purple-600',
        ring: 'ring-purple-500/30',
        gradient: 'from-purple-500/20 to-purple-600/40'
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900">
      {/* Slides */}
      {heroSlides.map((slide, index) => {
        const colorClasses = getColorClasses(slide.color);

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-105 pointer-events-none'
              }`}
          >

            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
                filter: 'brightness(0.7)'
              }}
            />

            {/* Overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className={`absolute inset-0 bg-gradient-to-b ${colorClasses.gradient}`} />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl text-white">
                  {/* Title */}
                  <h1 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg transform transition-all duration-700 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}>
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className={`text-lg md:text-xl lg:text-2xl mb-4 text-gray-100 leading-relaxed transform transition-all duration-700 delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}>
                    {slide.subtitle}
                  </p>

                  {/* Stats */}
                  <p className={`text-sm md:text-base text-gray-300 mb-8 transform transition-all duration-700 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}>
                    {slide.stats}
                  </p>

                  {/* CTA Button */}
                  <button
                    className={`group inline-flex items-center px-8 py-4 rounded-full font-semibold text-white transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 ring-2 ring-white/20 hover:ring-4 ${colorClasses.bg} ${colorClasses.hover} ${colorClasses.ring}`}
                  >
                    {slide.cta}
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>


                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={prevSlide}
          className="ml-4 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
          aria-label="Slide anterior"
        >
          <ArrowRight className="w-6 h-6 text-white rotate-180 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={nextSlide}
          className="mr-4 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
          aria-label="Siguiente slide"
        >
          <ArrowRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white" />
          ) : (
            <Play className="w-4 h-4 text-white" />
          )}
        </button>

        {/* Slide Indicators */}
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
                }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%`
          }}
        />
      </div>

      {/* Accessibility */}
      <div className="sr-only">
        <h2>Carrusel de productos destacados</h2>
        <p>Slide {currentSlide + 1} de {heroSlides.length}: {heroSlides[currentSlide].title}</p>
      </div>
    </section>
  );
}