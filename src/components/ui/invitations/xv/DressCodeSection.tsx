'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap'; 
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
import { Dancing_Script } from 'next/font/google';
import { SparklesF } from '@/components';

// Carga la fuente Dancing Script
const dancing_script = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

// Registra el plugin ScrollTrigger de GSAP (solo una vez)
gsap.registerPlugin(ScrollTrigger);

interface DressCodeSectionProps {
    primaryColor?: string; // Color principal de fondo del header y círculos de íconos
    secondaryColor?: string; // Color para el texto de h1, h2, h3 y p
    paletteColorsMujeres?: string[]; // Array de colores para la paleta de colores
    paletteColorsHombres?: string[];
}

export const DressCodeSection = ({
    paletteColorsMujeres = ['#FFC0CB', '#ADD8E6', '#90EE90', '#FFD700', '#DDA0DD'],
    paletteColorsHombres = ['#36454F', '#0A0A0A', '#5D8AA8', '#808080', '#000080'],
}: DressCodeSectionProps) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const formalCardRef = useRef<HTMLDivElement>(null);
    const colorPaletteCardRef = useRef<HTMLDivElement>(null);
    const manIconRef = useRef<HTMLDivElement>(null);
    const womanIconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animaciones con GSAP y ScrollTrigger
        // El 'once: true' asegura que la animación solo se reproduzca una vez cuando el elemento entra en vista.

        // Animación para el header (fade-down)
        if (headerRef.current) {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: -50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: 'top 80%', // Cuando el 80% superior del trigger entra en vista
                        toggleActions: 'play none none none',
                        once: true,
                    },
                }
            );
        }

        // Animación para la tarjeta "Formal" (fade-up con retraso)
        if (formalCardRef.current) {
            gsap.fromTo(formalCardRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.2, // Simula el data-aos-delay="200"
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: formalCardRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                        once: true,
                    },
                }
            );
        }

        // Animación para el ícono de Hombres (fade-right con retraso)
        if (manIconRef.current) {
            gsap.fromTo(manIconRef.current,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    delay: 0.4, // Simula el data-aos-delay="400"
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: formalCardRef.current, // El trigger es la tarjeta formal
                        start: 'top 70%', // Un poco después de que la tarjeta formal entre en vista
                        toggleActions: 'play none none none',
                        once: true,
                    },
                }
            );
        }

        // Animación para el ícono de Mujeres (fade-left con retraso)
        if (womanIconRef.current) {
            gsap.fromTo(womanIconRef.current,
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    delay: 0.4, // Simula el data-aos-delay="400"
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: formalCardRef.current, // El trigger es la tarjeta formal
                        start: 'top 70%',
                        toggleActions: 'play none none none',
                        once: true,
                    },
                }
            );
        }

        // Animación para la tarjeta "Paleta de colores" (fade-up con retraso)
        if (colorPaletteCardRef.current) {
            gsap.fromTo(colorPaletteCardRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.6, // Simula el data-aos-delay="600"
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: colorPaletteCardRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                        once: true,
                    },
                }
            );
        }

    }, []); // El array de dependencias vacío asegura que useEffect se ejecute una sola vez al montar el componente

    return (
        <section id="vestimenta" className="w-full min-h-screen py-24 bg-gradient-to-b from-purple-100 to-purple-300">
            <SparklesF />
            <div className="max-w-xl mx-auto px-4 text-purple-900">
                {/* Sección de Código de Vestimenta - Encabezado */}
                <div ref={headerRef} className="relative min-w-full">
                    <div
                        className="pb-16 pt-12 rounded-b-[50%] shadow-lg bg-gradient-to-b from-purple-100 to-purple-400"
                    >
                        <h1
                            className={`text-center text-3xl px-4 ${dancing_script.className} `}
                        >
                            Código de<br />Vestimenta
                        </h1>
                    </div>
                </div>

                {/* Tarjeta de Vestimenta Formal */}
                <div ref={formalCardRef} className="relative mx-auto mt-8 rounded-3xl bg-purple-50 p-8 shadow-lg">
                    <h2
                        className={`text-center text-2xl mb-8 ${dancing_script.className}`}
                    // Asegúrate de que secondaryColor esté aplicado aquí si lo deseas
                    >
                        Formal
                    </h2>
                    {/* Modificación aquí: Añadir place-items-center al contenedor grid */}
                    <div className="grid grid-cols-2 gap-8 place-items-center">
                        {/* Hombres */}
                        <div ref={manIconRef} className="text-center">
                            <div
                                className="mx-auto h-40 w-40 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110 bg-purple-300"
                            // Asegúrate de que primaryColor esté aplicado aquí si lo deseas
                            >
                                <Image
                                    src="https://res.cloudinary.com/dsu3au60t/image/upload/v1751435826/hombreTraje_wetd1t.webp"
                                    alt="Vestimenta Hombre"
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                />
                            </div>
                            <h3
                                className={`text-xl mb-2 ${dancing_script.className}`}
                            // Asegúrate de que secondaryColor esté aplicado aquí si lo deseas
                            >
                                Hombres
                            </h3>
                            <p
                                className={`text-sm ${dancing_script.className}`}
                            // Asegúrate de que secondaryColor esté aplicado aquí si lo deseas
                            >
                                <span>Traje Completo</span>
                            </p>
                        </div>

                        {/* Mujeres */}
                        <div ref={womanIconRef} className="text-center">
                            <div
                                className="mx-auto h-40 w-40 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110 bg-purple-300"
                            // Asegúrate de que primaryColor esté aplicado aquí si lo deseas
                            >
                                <Image
                                    src="https://res.cloudinary.com/dsu3au60t/image/upload/v1751435826/mujerVestido_wk6y7z.webp"
                                    alt="Vestimenta Mujer"
                                    width={60}
                                    height={60}
                                    className="object-contain"
                                />
                            </div>
                            <h3
                                className={`text-xl mb-2 ${dancing_script.className}`}
                            // Asegúrate de que secondaryColor esté aplicado aquí si lo deseas
                            >
                                Mujeres
                            </h3>
                            <p
                                className={`text-sm ${dancing_script.className}`}
                            // Asegúrate de que secondaryColor esté aplicado aquí si lo deseas
                            >
                                <span>Vestido Completo</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tarjeta de Paleta de Colores */}
                <div ref={colorPaletteCardRef} className="relative mx-auto mt-8 rounded-3xl bg-purple-50 p-8 shadow-lg">
                    <h2
                        className={`text-center text-2xl mb-8 ${dancing_script.className}`}
                    >
                        Colores sugeridos
                    </h2>
                    <div className="mb-8"> {/* Añadido margen inferior para separar las secciones */}
                        <h3
                            className={`text-center text-xl mb-4 ${dancing_script.className}`}
                        >
                            Hombres
                        </h3>
                        <div className="flex justify-center gap-2 flex-wrap"> {/* gap-2 para más espacio, flex-wrap para que se ajusten */}
                            {paletteColorsHombres.map((color, index) => (
                                <div
                                    key={`hombre-${index}`} // Key única
                                    className="h-12 w-12 rounded-full hover:scale-125 transition-transform duration-300 transform-gpu" // transform-gpu para mejor rendimiento
                                    style={{ backgroundColor: color }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Colores para Mujeres */}
                    <div>
                        <h3
                            className={`text-center text-xl mb-4 ${dancing_script.className}`}
                        >
                            Mujeres
                        </h3>
                        <div className="flex justify-center gap-2 flex-wrap"> {/* gap-2 para más espacio, flex-wrap para que se ajusten */}
                            {paletteColorsMujeres.map((color, index) => (
                                <div
                                    key={`mujer-${index}`} // Key única
                                    className="h-12 w-12 rounded-full hover:scale-125 transition-transform duration-300 transform-gpu"
                                    style={{ backgroundColor: color }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};