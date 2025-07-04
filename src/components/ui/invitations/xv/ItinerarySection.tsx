'use client';

import { useRef, useEffect } from 'react';
import { ItineraryItem } from '@/interfaces';
import { Dancing_Script, Lora } from 'next/font/google';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SparklesF } from '@/components';

gsap.registerPlugin(ScrollTrigger);

const dancing_script = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });
const lora = Lora({ subsets: ['latin'], weight: ['400', '700'] });

export const ItinerarySection = ({ items }: { items: ItineraryItem[] }) => {
  const container = useRef<HTMLElement>(null);
  const animationItems = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!titleRef.current) return;

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

      animationItems.current.forEach((item, i) => {
        if (!item) return;

        const isLeft = i % 2 === 0;
        const direction = isLeft ? -100 : 100;

        gsap.fromTo(
          item,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              once: true,
              immediateRender: true,
            },
          }
        );
      });
    },
    { scope: container, dependencies: [items] }
  );

  // Forzar refresh de ScrollTrigger en móviles
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    // Fallback por si algo queda invisible
    setTimeout(() => {
      if (titleRef.current && titleRef.current.style.opacity === '0') {
        titleRef.current.style.opacity = '1';
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="itinerario"
      ref={container}
      className={`${dancing_script.className} relative min-h-screen bg-purple-100`}
    >
      <SparklesF />

      <div className="relative z-10">
        <h2
          ref={titleRef}
          className={`text-5xl text-center mb-16 text-purple-900 drop-shadow-lg`}
        >
          Itinerario
        </h2>

        <div className="relative max-w-3xl mx-auto px-4">
          <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-purple-900/40 -translate-x-1/2 z-0" />

          <div className="flex flex-col gap-20">
            {items.map((item, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={i}
                  ref={(el: HTMLDivElement) => {
                    if (el) animationItems.current[i] = el;
                  }}
                  className={`relative flex items-center justify-between z-10 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${isLeft ? 'pr-6 text-right' : 'pl-6 text-left'}`}>
                    <p className="text-2xl sm:text-3xl text-purple-900 leading-tight">
                      {item.title}
                    </p>
                    <p className={`${lora.className} text-sm sm:text-md text-purple-700 mt-2`}>
                      {item.description}
                    </p>
                  </div>

                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-100 border-[3px] border-purple-900 shadow-md z-20">
                    {item.icon}
                  </div>

                  <div className="w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
