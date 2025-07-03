'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Dancing_Script } from 'next/font/google';
import { Gift } from '@/interfaces';
import Link from 'next/link';
import { SparklesF } from '@/components';

const dancing_script = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

interface GiftRegistryProps {
    backgroundColor?: string;
    titleSectionColor?: string;
    cardBackgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    giftOptions: Gift[];
}

export const GiftRegistrySection = ({
    giftOptions,
}: GiftRegistryProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleSectionRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const giftOptionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const currentSection = sectionRef.current;
        if (!currentSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

                    tl.fromTo(titleSectionRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 });
                    tl.fromTo(descriptionRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '<0.3');

                    giftOptionRefs.current.forEach((el, index) => {
                        if (el) {
                            tl.fromTo(
                                el,
                                { opacity: 0, y: 50, scale: 0.9 },
                                { opacity: 1, y: 0, scale: 1, duration: 0.8 },
                                `<${index === 0 ? 0.3 : 0.2}`
                            );
                        }
                    });

                    observer.unobserve(currentSection);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(currentSection);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="regalos"
            ref={sectionRef}
            className={`relative items-center justify-center min-h-screen px-4 bg-gradient-to-b from-purple-100 to-purple-300 ${dancing_script.className}`}
        >
            <SparklesF />
            <div className="relative z-10 w-full max-w-xl mx-auto text-purple-900">
                <div ref={titleSectionRef} className="text-center py-10 rounded-b-[50%] shadow-md bg-purple-300">
                    <h1
                        className={`text-5xl font-bold`}
                    >
                        Mesa de Regalos
                    </h1>
                </div>

                <div className="text-center mt-6 px-6">
                    <p
                        ref={descriptionRef}
                        className={`text-xl leading-relaxed`}
                    >
                        Su presencia en mi fiesta de quince años es el mejor regalo que puedo recibir. Si desean hacerme un obsequio adicional, ¡gracias por su generosidad!
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 px-6">
                    {giftOptions.map((option, index) => (
                        <div
                            key={option.id}
                            ref={(el) => { giftOptionRefs.current[index] = el; }}
                            className="flex flex-col items-center gap-3"
                        >
                            <div
                                className="w-28 h-28 rounded-full border-4 flex items-center justify-center shadow-lg bg-purple-300"
                            >
                                <Image
                                    src={option.logoSrc}
                                    alt={option.logoAlt}
                                    width={80}
                                    height={80}
                                    className="object-contain rounded-full"
                                />
                            </div>
                            <Link
                                href={option.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-full shadow-md text-sm transition-all hover:scale-105 hover:shadow-lg bg-purple-100 border-2 border-purple-200"
                            >
                                Ir a la Mesa
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
