'use client';

import { useRef } from 'react';
import { LocationItem } from '@/interfaces';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dancing_Script, Montserrat } from 'next/font/google';
import { FaMapMarkerAlt } from 'react-icons/fa';

const dancing_script = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '700'] });

gsap.registerPlugin(ScrollTrigger);

interface LocationsSectionProps {
  locations: LocationItem[];
}

export const LocationsSection = ({ locations }: LocationsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const locationsGridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      locationsGridRef.current?.children || '',
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.2)',
        stagger: 0.2,
        scrollTrigger: {
          trigger: locationsGridRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ceremonia"
      className="relative px-4 overflow-hidden bg-gradient-to-b from-purple-100 to-purple-300 pb-10 pt-24"
    >
      {/* <SparklesF /> */}

      <div className="relative z-10">
        <h2
          ref={titleRef}
          className={`text-5xl text-center mb-16 ${dancing_script.className} text-purple-900 drop-shadow-lg`}
        >
          Ubicaciones Importantes
        </h2>

        <div
          ref={locationsGridRef}
          className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2"
        >
          {locations.map((loc, i) => (
            <div
              key={i}
              className="relative bg-white/60 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center justify-between border border-purple-300 hover:shadow-purple-500/40 transition-all duration-300 ease-in-out group"
            >
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-purple-500 rounded-full opacity-60 blur-sm animate-pulse" />

              <h3 className={`text-3xl text-center ${dancing_script.className} text-purple-900`}>{loc.type}</h3>

              <div className="relative w-full h-52 rounded-xl overflow-hidden border border-purple-300 shadow-lg">
                <Image
                  src={loc.image}
                  alt={loc.type}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <p className={`text-center text-lg ${montserrat.className} text-purple-900 leading-relaxed mt-4`}>
                <span className="block font-semibold text-purple-800 text-xl">{loc.name}</span>
                {loc.time && <span className="block text-sm mt-1">Hora: {loc.time}</span>}
              </p>

              <a
                href={loc.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 hover:scale-105"
              >
                <FaMapMarkerAlt className="w-5 h-5" />
                Ver ubicación
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
