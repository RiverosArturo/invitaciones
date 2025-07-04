'use client';

import { useRef } from 'react';
import { ItineraryItem } from '@/interfaces';
import { Dancing_Script, Lora } from 'next/font/google';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SparklesF } from '@/components';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const dancing = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });
const lora = Lora({ subsets: ['latin'], weight: ['400', '700'] });

export const ItinerarySection = ({ items }: { items: ItineraryItem[] }) => {
  const sectionRef    = useRef<HTMLElement>(null);
  const titleRef      = useRef<HTMLHeadingElement>(null);
  const itemRefs      = useRef<HTMLDivElement[]>([]);

  /* ───────────────────────────── GSAP ───────────────────────────── */
  useGSAP(() => {
    /* título */
    gsap.from(titleRef.current, {
      y: -50,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 85%',
        once: true,
        immediateRender: true,
      },
    });

    /* items */
    itemRefs.current.forEach((el, i) => {
      const dir = i % 2 === 0 ? -100 : 100;
      gsap.fromTo(
        el,
        { x: dir, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
            immediateRender: true,
          },
        },
      );
    });
  }, { scope: sectionRef, dependencies: [items] });

  /* ──────────────────────────── JSX ─────────────────────────────── */
  return (
    <section
      id="itinerario"
      ref={sectionRef}
      className={`
        relative isolate overflow-hidden
        bg-purple-100
        min-h-[100dvh]          /* 100 dvh soluciona el fallo en móvil */
        ${dancing.className}
      `}
    >
      {/* Canvas de partículas */}
      <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
        <SparklesF />
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-24 pb-32">
        <h2
          ref={titleRef}
          className="text-5xl text-center mb-16 text-purple-900 drop-shadow-lg"
        >
          Itinerario
        </h2>

        {/* Línea vertical */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-purple-900/40 -translate-x-1/2" />

        {/* Lista de items */}
        <div className="flex flex-col gap-20">
          {items.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                ref={el => void (el && (itemRefs.current[i] = el))}
                className={`relative flex items-center justify-between
                  ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Texto */}
                <div className={`w-1/2 ${isLeft ? 'pr-6 text-right' : 'pl-6 text-left'}`}>
                  <p className="text-2xl sm:text-3xl text-purple-900 leading-tight">
                    {item.title}
                  </p>
                  <p className={`${lora.className} text-sm sm:text-md text-purple-700 mt-2`}>
                    {item.description}
                  </p>
                </div>

                {/* Icono */}
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-100 border-[3px] border-purple-900 shadow-md">
                  {item.icon}
                </div>

                {/* Espaciador */}
                <div className="w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
