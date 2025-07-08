'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Dancing_Script, Montserrat } from 'next/font/google';

const dancing_script = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '700'] });

gsap.registerPlugin(ScrollTrigger);

export const ParentSection = () => {
  const sectionOneRef = useRef(null);
  const sectionTwoRef = useRef(null);

  const refsOne = useRef<HTMLDivElement[]>([]);
  const refsTwo = useRef<HTMLDivElement[]>([]);

  const setRefOne = (el: HTMLDivElement | null) => {
    if (el && !refsOne.current.includes(el)) refsOne.current.push(el);
  };

  const setRefTwo = (el: HTMLDivElement | null) => {
    if (el && !refsTwo.current.includes(el)) refsTwo.current.push(el);
  };

  useLayoutEffect(() => {
    ScrollTrigger.refresh();
    refsOne.current = refsOne.current.filter(Boolean);
    refsTwo.current = refsTwo.current.filter(Boolean);

    const animate = (elements: HTMLDivElement[], trigger: Element) => {
      gsap.from(elements, {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger,
          start: 'top 80%',
          toggleActions: 'restart none none none',
        },
      });
    };

    if (sectionOneRef.current) animate(refsOne.current, sectionOneRef.current);
    if (sectionTwoRef.current) animate(refsTwo.current, sectionTwoRef.current);

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      {/* === PADRES === */}
      <section
        id="padres"
        ref={sectionOneRef}
        className="bg-gradient-to-b from-purple-300 to-purple-100 container mx-auto pt-20"
      >
        <div className="h-0.5 w-20 bg-purple-900/60 mx-auto mb-4" />
        <h2
          ref={setRefOne}
          className={`text-4xl text-center text-purple-900 drop-shadow-lg ${dancing_script.className} pb-8`}
        >
          ¡Celebra con nosotros este día tan maravilloso!
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Imagen */}
          <div className="w-full md:w-1/2 px-4">
            <div className="flex flex-col items-center">
              <div
                ref={setRefOne}
                className="relative w-full max-w-sm h-[400px] md:h-[600px] overflow-hidden rounded-lg shadow-2xl"
              >
                <Image
                  src="https://res.cloudinary.com/dsu3au60t/image/upload/v1751273323/padresYXV_fcez9e.jpg"
                  alt="Imagen de Nuestros Padres"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Texto */}
          <div
            className="w-full md:w-1/2 flex flex-col justify-center items-center text-center space-y-6
              bg-[url('https://res.cloudinary.com/dsu3au60t/image/upload/v1751933733/fondo3_vinplk.webp')]
              bg-cover bg-center bg-no-repeat px-4 py-6"
          >
            <div ref={setRefOne}>
              <p className={`text-3xl md:text-4xl text-purple-900 ${dancing_script.className}`}>Mis Padres</p>
            </div>
            <div
              ref={setRefOne}
              className="w-24 h-1 bg-purple-400 mx-auto md:mx-0 origin-left transform"
            />
            <div className="space-y-4" ref={setRefOne}>
              <p className={`text-xl md:text-2xl text-purple-800 ${montserrat.className}`}>
                María Antonia<br />
                Fonseca Montero<br />
                &amp;<br />
                Víctor José<br />
                Loranca Pérez
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === PADRINOS === */}
      <section
        ref={sectionTwoRef}
        className="bg-gradient-to-b from-purple-100 to-purple-300 container mx-auto px-4 py-20"
      >
        <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8">
          {/* Imagen */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-col items-center">
              <div
                ref={setRefTwo}
                className="relative w-full max-w-sm h-[320px] md:h-[480px] overflow-hidden rounded-lg shadow-2xl"
              >
                <Image
                  src="https://res.cloudinary.com/dsu3au60t/image/upload/v1751924708/nuevaXV_bejiz0.jpg"
                  alt="Imagen de Nuestros Padrinos"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Texto */}
          <div
            className="w-full md:w-1/2 flex flex-col justify-center items-center text-center space-y-6
              bg-[url('https://res.cloudinary.com/dsu3au60t/image/upload/v1751933733/fondo_mb37xs.webp')]
              bg-cover bg-center bg-no-repeat px-4 py-6"
          >
            <div ref={setRefTwo}>
              <p className={`text-3xl md:text-4xl text-purple-900 ${dancing_script.className}`}>Mis Padrinos</p>
            </div>
            <div
              ref={setRefTwo}
              className="w-24 h-1 bg-purple-400 mx-auto md:mx-0 origin-left transform"
            />
            <div className="space-y-4" ref={setRefTwo}>
              <p className={`text-xl md:text-2xl text-purple-800 ${montserrat.className}`}>
                Lucía Cristina<br />
                Fragoso Martínez<br />
                &amp;<br />
                Martín<br />
                Calderón Sánchez
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
