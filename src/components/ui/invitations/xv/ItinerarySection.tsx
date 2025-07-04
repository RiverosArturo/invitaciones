'use client';

import { useRef } from 'react';
import { ItineraryItem } from '@/interfaces';
import { Dancing_Script, Lora } from 'next/font/google';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SparklesF } from '@/components';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const dancing_script = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });
const lora = Lora({ subsets: ['latin'], weight: ['400', '700'] });

export const ItinerarySection = ({ items }: { items: ItineraryItem[] }) => {
    const container = useRef<HTMLElement>(null);
    const animationItems = useRef<HTMLDivElement[]>([]);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            // Animación del título
            gsap.from(titleRef.current, {
                // No establecemos opacity: 0 aquí. GSAP lo establecerá si es necesario.
                y: -50,
                opacity: 0, // <-- Mantenemos la opacidad inicial a 0 aquí para que la animación la maneje
                duration: 1.5,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 85%', // O ajusta este valor si prefieres que aparezca antes/después
                    // Marcamos "once: true" para que la animación solo se ejecute una vez
                    // y el elemento se quede en su estado final (visible)
                    once: true,
                    // Si el elemento ya está en el viewport cuando la página carga,
                    // esto asegura que se muestre inmediatamente.
                    // Si "start" ya pasó, la animación se ejecutará inmediatamente.
                    immediateRender: true, // Esto es clave
                },
            });

            // Animación de los elementos del itinerario
            animationItems.current.forEach((item, i) => {
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
                            once: true, // También importante para que se quede visible
                            immediateRender: true,
                        },
                    }
                );
            });
        },
        { scope: container, dependencies: [items] }
    );

    return (
        <section
            id="itinerario"
            ref={container}
            className={`${dancing_script.className} relative min-h-screen bg-purple-100`}
        >
            <div className="absolute inset-0 z-0">
                <SparklesF />
            </div>
            <div className="relative z-10">
                <h2
                    ref={titleRef}
                    className={`text-5xl text-center mb-16 ${dancing_script.className} text-purple-900 drop-shadow-lg`}
                    // Elimina los estilos en línea si los tienes, deja que GSAP los maneje
                    // Asegúrate de que no haya un opacity:0 inicial en Tailwind/CSS
                >
                    Itinerario
                </h2>

                {/* Remueve el segundo <h2> que tenías comentado */}

                <div className="relative max-w-3xl mx-auto px-4">
                    {/* Línea vertical central */}
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
                                    className={`relative flex items-center justify-between z-10 ${
                                        isLeft ? 'flex-row' : 'flex-row-reverse'
                                    }`}
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