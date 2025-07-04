"use client";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles } from '@react-three/drei';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef, useState, useEffect, Suspense } from 'react'; // Added Suspense and useEffect
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { QrDisplay } from '@/components';


interface GuestSectionProps {
    guestName?: string;
    passes?: number;
}

// Componente para la escena 3D de fondo
// Se envuelve en Suspense para manejar la carga asíncrona
const Background3D = () => {
    return (
        <Canvas 
            camera={{ position: [0, 0, 5], fov: 75 }}
            flat // Renderizado plano, menos cálculos de luz
            linear // Tono de mapeo lineal
            dpr={[1, 1.5]} // Limita el Device Pixel Ratio para móviles (ej: 1 o 1.5 en vez de 2 o 3)
            performance={{ min: 0.5, max: 1 }} // Ajusta la calidad de rendimiento
        >
            <ambientLight intensity={1.0} /> {/* Reducir un poco la intensidad si es posible */}
            <pointLight position={[10, 10, 10]} intensity={0.8} /> {/* Reducir intensidad */}
            <Sparkles 
                count={100} // Reducido de 200 a 100
                scale={8} // Reducido ligeramente la escala
                size={0.8} // Reducido ligeramente el tamaño
                speed={0.4} // Reducido ligeramente la velocidad
                color="#FFD700" 
                noise={0.3} // Reducido el ruido
            />
            <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.8}> {/* Valores ligeramente reducidos */}
                <mesh>
                    <dodecahedronGeometry args={[0.5]} />
                    {/* Material con menos complejidad o uso de "flatShading" */}
                    <meshStandardMaterial 
                        color="#CBC3E3" 
                        roughness={0.7} // Aumentar un poco para reducir el brillo y los cálculos
                        metalness={0.5} // Reducir metalness si no es crítico
                        flatShading // Puede mejorar el rendimiento, pero cambia el aspecto
                    />
                </mesh>
            </Float>
            <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
        </Canvas>
    );
};

export const GuestsSection = ({ guestName = "Familia Invitada", passes = 1 }: GuestSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const urlForm = '/invitaciones/xv#formulario';
    const [showQr, setShowQr] = useState(false);
    const qrValue = `https://www.rhsolutionsmx.com`;

    // Estado para controlar si se debe renderizar el 3D
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            // Considera "móvil" si el ancho de la ventana es menor a un cierto umbral
            setIsMobile(window.innerWidth < 768); 
        };

        checkIsMobile(); // Comprobar al montar
        window.addEventListener('resize', checkIsMobile); // Escuchar cambios de tamaño

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    useGSAP(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    gsap.fromTo(cardRef.current, {
                        y: 50,
                        opacity: 0,
                        scale: 0.9,
                    }, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1.5,
                        ease: 'power3.out',
                        delay: 0.5,
                        onComplete: () => {
                            gsap.to(cardRef.current, {
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 50px rgba(183, 110, 121, 1)',
                                duration: 0.5,
                                yoyo: true,
                                repeat: 1,
                                ease: 'power2.inOut',
                                onReverseComplete: () => {
                                    gsap.set(cardRef.current, {
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                                    });
                                }
                            });
                        },
                    });
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const cardClasses = `
        relative z-10 w-full max-w-lg mx-auto p-10 text-center shadow-2xl space-y-8
        transition-all duration-500 transform-gpu rounded-3xl
        bg-[rgba(255,255,255,0.2)] backdrop-blur-sm
        border-t border-l border-[rgba(255,255,255,0.3)]
        [box-shadow:0_25px_50px_-12px_rgba(0,0,0,0.25)]
    `.replace(/\s+/g, ' ').trim();

    const buttonClasses = `
        w-full py-4 px-6 font-bold rounded-full shadow-lg
        transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
        focus:outline-none focus:ring-4
    `.replace(/\s+/g, ' ').trim();

    const linkClasses = `
    w-full py-4 px-6 font-bold rounded-full shadow-lg
    transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
    focus:outline-none focus:ring-4
    inline-flex items-center justify-center
`.replace(/\s+/g, ' ').trim();

    return (
        <section id="invitados" ref={sectionRef} className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-purple-400 to-[#F8F6F4] font-['Montserrat']">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@300;400;700&display=swap');
            `}</style>

            {/* Carga condicional del componente 3D */}
            {!isMobile && (
                <div className="absolute inset-0 z-0">
                    <Suspense fallback={null}> {/* Suspense para una mejor experiencia de carga */}
                        <Background3D />
                    </Suspense>
                </div>
            )}
            {/* Si es móvil, se podría cargar una imagen de fondo estática o un video ligero en su lugar */}
            {isMobile && (
                 <div className="absolute inset-0 z-0">
                    {/* Puedes poner una imagen estática de fondo para móviles si no se renderiza el 3D */}
                    <div className="absolute inset-0 bg-purple-400 opacity-20"></div>
                 </div>
            )}

            <div className="absolute inset-0 z-1 pointer-events-none">
                <Image
                    src="https://res.cloudinary.com/dsu3au60t/image/upload/v1751273030/iglesiaInv_lulxnq.jpg"
                    alt="Fondo pases"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', opacity: 0.2 }}
                />
            </div>

            <div
                ref={cardRef}
                className={cardClasses}
            >
                <h1 className="text-6xl text-white drop-shadow-lg leading-tight font-['Great_Vibes']">
                    <span className="block text-2xl font-light tracking-widest uppercase font-['Montserrat']">Pase VIP</span>
                    {`Están Invitados`}
                </h1>

                <h2 className="text-5xl text-purple-600 drop-shadow-md py-2 font-['Great_Vibes']">{guestName}</h2>

                <p className="text-xl text-white font-light italic opacity-90 font-['Montserrat']">¡Será un placer compartir este día con ustedes!</p>

                <div className="relative inline-flex items-center justify-center w-36 h-36 rounded-full bg-purple-200 backdrop-blur-sm border-4 border-purple-400 shadow-inner-lg transition-transform duration-300 hover:scale-105 cursor-pointer group">
                    <span className="text-6xl text-purple-400 font-bold transition-colors duration-300 group-hover:text-white">
                        {passes}
                    </span>
                    <span className="absolute bottom-3 text-sm text-purple-400 font-bold uppercase tracking-widest">
                        Pases
                    </span>
                </div>

                <p className="font-bold text-base text-white opacity-80 font-['Montserrat']">
                    Invitación válida para {passes} {passes > 1 ? 'personas' : 'persona'}
                </p>

                <div className="space-y-4 pt-6">
                    <AnimatePresence>
                        {showQr && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <QrDisplay value={qrValue} size={256} bgColor="#FFFFFF" fgColor="#3a005d" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <Link href={urlForm} className={`${linkClasses} bg-purple-400 text-white focus:ring-purple-400/50`}>
                        Confirma tu asistencia
                    </Link>
                    <button
                        className={`${buttonClasses} bg-transparent text-white border-2 border-white/50 hover:bg-white/10 focus:ring-white/50 cursor-pointer`}
                        onClick={() => setShowQr(!showQr)}>
                        {showQr ? 'Ocultar Código QR' : 'Mostrar Código QR'}
                    </button>
                </div>
            </div>
        </section>
    );
};