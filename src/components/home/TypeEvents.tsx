'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const eventTypes = [
  {
    title: 'Bodas',
    image: 'https://res.cloudinary.com/dsu3au60t/image/upload/v1751073081/bodas_jviyak.jpg',
    phrase: 'Celebra el amor con una invitación que enamora desde el primer clic.',
    bgColor: 'to-pink-200',
  },
  {
    title: 'XV Años',
    image: 'https://res.cloudinary.com/dsu3au60t/image/upload/v1751073303/xva%C3%B1os_qazid8.jpg',
    phrase: 'Haz que su gran noche comience con una invitación inolvidable.',
    bgColor: 'to-purple-200',
    btColor: 'from-purple-600',
    hover: 'bg-purple-700',
    ring: 'ring-purple-500',
    cta: 'Ver invitación',
    ctaLink: '/invitaciones/xv',
  },
  {
    title: 'Primera Comunión y Confirmación',
    image: 'https://res.cloudinary.com/dsu3au60t/image/upload/v1751075518/primeraComunion_ddflhk.jpg', 
    phrase: 'Celebra su fe con una invitación tan pura como su momento.',
    bgColor: 'to-sky-50', // Un tono de azul claro que evoca pureza y serenidad
  },
  {
    title: 'Bautizos',
    image: 'https://res.cloudinary.com/dsu3au60t/image/upload/v1751073540/bautizos_zywzas.jpg',
    phrase: 'Una bienvenida especial merece una invitación especial.',
    bgColor: 'to-green-200',
  },
  {
    title: 'Baby Shower',
    image: 'https://res.cloudinary.com/dsu3au60t/image/upload/v1751073706/babyShower_qcfa6r.jpg',
    phrase: 'Comparte la emoción de la llegada del bebé con estilo y ternura.',
    bgColor: 'to-yellow-200',
  },
  {
    title: 'Fiestas & Cumpleaños',
    image: 'https://res.cloudinary.com/dsu3au60t/image/upload/v1751073813/fiestas_rs8aal.jpg',
    phrase: 'Convierte cualquier celebración en un evento memorable desde la invitación.',
    bgColor: 'to-blue-200',
  },
  {
    title: '¿Tienes un evento único?',
    image: 'https://res.cloudinary.com/dsu3au60t/image/upload/v1751073911/eventos_s6bg5s.jpg',
    phrase: 'Nos adaptamos a tu visión para crear algo extraordinario. ¡Tu idea, nuestra creación!',
    bgColor: 'to-orange-200',
    btColor: 'from-orange-600',
    hover: 'bg-orange-800',
    ring: "ring-orange-500",
    cta: '¡Hablemos de tu evento!',
    ctaLink: '#contacto',
  },
];

export const TypeEvents = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // Nuevo useRef para almacenar el ID del intervalo de auto-avance
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToIndex = (index: number) => {
    const container = carouselRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * index;
      container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  const scroll = useCallback((direction: 'left' | 'right') => {
    let newIndex = direction === 'left' ? activeIndex - 1 : activeIndex + 1;

    if (newIndex < 0) {
      newIndex = eventTypes.length - 1;
    } else if (newIndex >= eventTypes.length) {
      newIndex = 0;
    }
    scrollToIndex(newIndex);
  }, [activeIndex]); // `activeIndex` es una dependencia para que `scroll` siempre tenga el valor más actual

  // Lógica para el auto-avance
  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      scroll('right');
    }, 5000);
  }, [scroll]);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Limpiar la referencia
    }
  }, []);

  // Iniciar auto-avance cuando el componente se monta
  useEffect(() => {
    startAutoScroll();
    // Limpiar el intervalo al desmontar el componente
    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]); // Dependencias para re-iniciar si las funciones de control cambian

  // Observador para actualizar activeIndex si el usuario scrollea manualmente
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const clientWidth = container.clientWidth;
      const newActiveIndex = Math.round(scrollLeft / clientWidth);
      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
        // Opcional: Reiniciar el auto-scroll si el usuario scrollea manualmente
        // startAutoScroll();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [activeIndex]); // activeIndex para re-evaluar si ha habido un cambio

  return (
    <section id="tipoDeEventos" className="h-screen bg-white py-12 px-6 md:px-16 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
          Invitaciones para Todo Tipo de Evento
        </h2>

        <div className="relative flex-1 flex items-center justify-center">
          {/* Botón de navegación izquierda */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-20 hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Contenedor del carrusel con scroll y snap */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory w-full h-full"
            // Pausar y reanudar el auto-avance con el mouse
            onPointerEnter={stopAutoScroll}
            onPointerLeave={startAutoScroll}
          >
            {eventTypes.map(({ title, image, phrase, bgColor, btColor, hover, cta, ctaLink, ring }, index) => (
              <div
                key={title}
                className={` bg-gradient-to-br from-[#F8F6F4] ${bgColor}  snap-center flex-shrink-0 w-full h-full flex flex-col justify-center items-center rounded-xl px-6 md:px-12 py-8 transition duration-300`}
              >
                <div className="flex flex-col md:flex-row items-center gap-10 w-full justify-center">
                  {/* Contenedor de la imagen */}
                  <div className="relative w-full md:w-1/2 min-h-[250px] md:min-h-[350px] rounded-xl overflow-hidden shadow-xl">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index === 0}
                    />
                  </div>
                  {/* Contenido del texto */}
                  <div className="md:w-1/2 text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{title}</h3>
                    <p className="text-lg md:text-xl text-gray-600 mb-6">{phrase}</p>
                    {cta && (
                      <Link
                        href={ctaLink}
                        className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-bl ${btColor} ${bgColor} hover:${hover} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${ring} transition-colors duration-300`}
                      >
                        {cta}
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón de navegación derecha */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-20 hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Indicadores de navegación (puntos) */}
        <div className="mt-6 flex justify-center gap-2">
          {eventTypes.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === activeIndex ? 'bg-indigo-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Ir a diapositiva ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};