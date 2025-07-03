'use client';

import { useRef, useState } from 'react';
import { HotelImage } from '@/interfaces';
import Image from 'next/image';
import { Dancing_Script, Montserrat } from 'next/font/google';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FaHotel } from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { SparklesF } from '@/components';

const dancing_script = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '700'] });

gsap.registerPlugin(ScrollTrigger);

export const LodgingSection = ({ images }: { images: HotelImage[] }) => {
    const [index, setIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 50 },
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
    }, []);

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <section
            ref={sectionRef}
            id="hospedaje"
            className="px-4 relative bg-gradient-to-b from-purple-300 to-purple-100"
        >
            <SparklesF />

            <div className="relative z-10">
                <h2 className={`text-5xl text-center mb-16 ${dancing_script.className} text-purple-900 drop-shadow-lg`}>
                    Sugerencia de Hospedaje
                </h2>

                <div className="relative max-w-xl mx-auto">
                    <div
                        ref={cardRef}
                        className="relative bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-between border border-purple-300 hover:shadow-purple-500/40 transition-all duration-300 ease-in-out group"
                    >
                        <div className="absolute -top-3 -right-3 w-10 h-10 bg-purple-500 rounded-full opacity-60 blur-sm animate-pulse" />

                        <FaHotel className="text-purple-700 w-8 h-8 mb-2" />

                        <div className="relative w-full h-52 rounded-xl overflow-hidden border border-purple-300 shadow-lg">
                            <Image
                                src={images[index].src}
                                alt={images[index].alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <p className={`text-center text-lg ${montserrat.className} text-purple-900 leading-relaxed mt-4`}>
                            <span className="block font-semibold text-purple-800 text-xl">{images[index].alt}</span>
                        </p>

                        <Link className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 hover:scale-105" href={images[index].ubication}>
                            Ver Detalle del Hotel
                        </Link>
                    </div>

                    {images.length > 1 && (
                        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 transform -translate-y-1/2 mb-10">
                            <button
                                onClick={handlePrev}
                                className="bg-white/70 p-3 rounded-full hover:bg-white shadow-md"
                                aria-label="Anterior"
                            >
                                <ChevronLeft className="text-purple-700 w-6 h-6" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-white/70 p-3 rounded-full hover:bg-white shadow-md"
                                aria-label="Siguiente"
                            >
                                <ChevronRight className="text-purple-700 w-6 h-6" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
