'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Dancing_Script } from 'next/font/google';

const dancing_script = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

interface ShareOnSocialsSectionProps {
  backgroundImageUrl: string;
  altText?: string;
  hashtag: string;
}

export const ShareOnSocialsSection = ({
  backgroundImageUrl,
  altText = 'Fondo de celebración',
  hashtag,
}: ShareOnSocialsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hashtagRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const iconSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animación general para el fondo (sutil zoom)
            gsap.fromTo(currentSection,
              { scale: 1.05 },
              { scale: 1, duration: 1.5, ease: 'power2.out' }
            );

            // Crear una línea de tiempo GSAP para las animaciones secuenciales
            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

            // Animación de la tarjeta principal (entra desde abajo, escala y opacidad)
            tl.fromTo(cardRef.current,
              { opacity: 0, y: 100, scale: 0.8 },
              { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
            );

            // Animaciones secuenciales para los elementos dentro de la tarjeta
            tl.fromTo(titleRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8 }, '<0.2' // Comienza un poco después de la tarjeta
            )
            .fromTo(iconContainerRef.current,
              { opacity: 0, scale: 0.5, rotation: -90 },
              { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' }, '<0.3' // Comienza un poco después del título
            )
            .fromTo(hashtagRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8 }, '<0.2' // Comienza un poco después del icono
            )
            .fromTo(descriptionRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8 }, '<0.2' // Comienza un poco después del hashtag
            );

            observer.unobserve(currentSection); // Deja de observar una vez que las animaciones se han reproducido
          }
        });
      },
      { threshold: 0.2 } // Dispara cuando el 20% de la sección es visible
    );

    observer.observe(currentSection);

    // Función de limpieza
    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []); // El array de dependencias vacío asegura que este efecto se ejecuta una sola vez al montar

  return (
    <section
      id="instagram"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden"
    >
      <Image
        src={backgroundImageUrl}
        alt={altText}
        fill
        className="object-cover object-center transform transition-transform duration-500"
        priority
      />

      <div
        ref={cardRef}
        className="relative z-10 bg-white/20 bg-opacity-30 backdrop-blur-md text-purple-900 text-center p-6 rounded-xl shadow-2xl w-full max-w-md border border-white/20 border-opacity-20"
      >
        <h2
          ref={titleRef}
          className={`text-3xl mb-4 ${dancing_script.className} drop-shadow-md`}
        >
          Comparte con nosotros
        </h2>

        <div ref={iconContainerRef} className="flex justify-center items-center mb-6">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            className="w-20 h-20 transform transition-transform duration-300 hover:scale-110"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            ref={iconSvgRef}
          >
            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
          </svg>
        </div>

        <h3
          ref={hashtagRef}
          className={`text-3xl font-semibold mb-4 ${dancing_script.className} drop-shadow-md`}
        >
          #{hashtag}
        </h3>

        <p
          ref={descriptionRef}
          className={`text-base leading-relaxed ${dancing_script.className}`}
        >
          Comparte con nosotros todas tus fotografías del evento, usando el siguiente #hashtag en todas tus publicaciones de Facebook e Instagram.
        </p>
      </div>
    </section>
  );
};