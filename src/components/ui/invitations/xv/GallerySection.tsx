'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Dancing_Script } from 'next/font/google';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { SparklesF } from '@/components';

gsap.registerPlugin(Draggable);

const dancing_script = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

interface GallerySectionProps {
    backgroundImageSrc?: string;
    images: string[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ images }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const draggableInstance = useRef<Draggable[]>([]);

    useEffect(() => {
        if (!containerRef.current || !cardsRef.current[currentIndex]) return;

        // Limpiar anteriores
        draggableInstance.current.forEach((d) => d.kill());
        draggableInstance.current = [];

        // Estilos de fondo
        cardsRef.current.forEach((card, index) => {
            if (!card) return;
            if (index !== currentIndex) {
                gsap.set(card, {
                    rotation: -4 - index * 2,
                    y: index * 4,
                    x: index * -2,
                    scale: 1 - index * 0.05,
                    zIndex: cardsRef.current.length - index,
                    opacity: 1,
                });
            }
        });

        requestAnimationFrame(() => {
            const card = cardsRef.current[currentIndex];
            if (!card) return;

            draggableInstance.current = Draggable.create(card, {
                type: 'x',
                inertia: true,
                edgeResistance: 0.85,
                bounds: { minX: -window.innerWidth, maxX: window.innerWidth },
                onDragEnd: function () {
                    if (this.x > 80) {
                        const prevIndex = (currentIndex - 1 + images.length) % images.length;
                        gsap.to(this.target, {
                            x: window.innerWidth,
                            rotation: 20,
                            opacity: 0,
                            duration: 0.5,
                            onComplete: () => {
                                requestAnimationFrame(() => {
                                    setCurrentIndex(prevIndex);
                                });
                            },
                        });
                    } else if (this.x < -80) {
                        const nextIndex = (currentIndex + 1) % images.length;
                        gsap.to(this.target, {
                            x: -window.innerWidth,
                            rotation: -20,
                            opacity: 0,
                            duration: 0.5,
                            onComplete: () => {
                                requestAnimationFrame(() => {
                                    setCurrentIndex(nextIndex);
                                });
                            },
                        });
                    } else {
                        gsap.to(this.target, { x: 0, rotation: 0, duration: 0.3 });
                    }
                },
            });
        });
    }, [currentIndex, images.length]);

    return (
        <section
            id="galeria"
            className="min-h-screen py-20 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-purple-300 to-purple-100"
        >
            <SparklesF />
            <h2 className={`text-4xl text-center mb-10 text-purple-900 drop-shadow-md ${dancing_script.className}`}>
                Galería de Recuerdos
            </h2>

            <div className="relative w-full max-w-md mx-auto">
                <div ref={containerRef} className="relative w-full h-[420px] flex items-center justify-center">
                    {images.map((imgSrc, index) => (
                        <div
                            key={imgSrc}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el;
                            }}
                            className={`absolute w-[90%] rounded-3xl bg-white p-3 shadow-2xl border border-pink-100 transition-transform duration-300 ease-in-out
                ${index === currentIndex ? 'z-20' : 'z-10'}
                ${index === currentIndex ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}
                            style={{
                                transform:
                                    index === currentIndex
                                        ? 'none'
                                        : index === (currentIndex + 1) % images.length
                                            ? 'rotate(-2deg) translateY(4px) translateX(-2px) scale(0.95)'
                                            : 'rotate(-4deg) translateY(8px) translateX(-4px) scale(0.9)',
                                opacity: index === currentIndex ? 1 : 0,
                                touchAction: 'pan-y pinch-zoom',
                            }}
                        >
                            <div className="overflow-hidden rounded-xl">
                                <Image
                                    src={imgSrc}
                                    alt={`Galería imagen ${index + 1}`}
                                    width={400}
                                    height={500}
                                    className="aspect-[4/5] w-full object-cover rounded-xl"
                                    priority={index === currentIndex}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="h-8 w-8 mx-auto text-pink-800 animate-bounce"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h8m-8 5h8m-8 5h8" />
                    </svg>
                    <p className={`text-base text-pink-900 mt-2 ${dancing_script.className}`}>
                        Desliza para ver más fotos
                    </p>
                </div>

                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-4 py-1 text-sm font-light text-gray-800 shadow">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
        </section>
    );
};
