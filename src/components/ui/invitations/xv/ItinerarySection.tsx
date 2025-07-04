'use client';

import { ItineraryItem } from '@/interfaces';
import { Dancing_Script, Lora } from 'next/font/google';
import { SparklesF } from '@/components';
import { motion } from 'framer-motion';

const dancing = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });
const lora    = Lora({ subsets: ['latin'],  weight: ['400', '700'] });

/* 🟡 Curva bezier personalizada (quart‑out) */
const easeOutQuart: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

/* ──────────── VARIANTS ──────────── */
const titleVariants = {
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: easeOutQuart as any, // ← cast para evitar el error de tipos
    },
  },
};

const itemVariants = {
  hidden: (isLeft: boolean) => ({
    x: isLeft ? -100 : 100,
    opacity: 0,
  }),
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: easeOutQuart as any, // ← misma curva bezier
    },
  },
};

export const ItinerarySection = ({ items }: { items: ItineraryItem[] }) => (
  <section
    id="itinerario"
    className={`
      relative isolate overflow-hidden
      bg-purple-100 min-h-screen
      ${dancing.className}
    `}
  >
    {/* Partículas de fondo */}
    <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
      <SparklesF />
    </div>

    {/* Contenido */}
    <div className="relative z-10 max-w-3xl mx-auto px-4 pt-24 pb-32">

      {/* Título */}
      <motion.h2
        variants={titleVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="text-5xl text-center mb-16 text-purple-900 drop-shadow-lg"
      >
        Itinerario
      </motion.h2>

      {/* Línea central */}
      <div className="absolute left-1/2 top-[12.5rem] bottom-0 w-[3px] bg-purple-900/40 -translate-x-1/2" />
      {/* Lista */}
      <div className="flex flex-col gap-20">
        {items.map((item, i) => {
          const isLeft = i % 2 === 0;

          return (
            <motion.div
              key={i}
              custom={isLeft}
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className={`relative flex items-center justify-between ${
                isLeft ? 'flex-row' : 'flex-row-reverse'
              }`}
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
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
