'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { Dancing_Script } from 'next/font/google';
import { Canvas, useThree } from '@react-three/fiber'; // Importamos useThree
import { OrbitControls, Sparkles } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three'; // Importamos THREE

interface TimeLeft {
    dias: number;
    horas: number;
    minutos: number;
    segundos: number;
}

const dancing_script = Dancing_Script({
    subsets: ['latin'],
    weight: ['400', '700'],
});

// **NUEVO COMPONENTE: CameraAdjuster para responsividad**
const CameraAdjuster = () => {
    const { camera, size } = useThree();
    const isMobile = size.width < 768; // Puedes ajustar este breakpoint

    useEffect(() => {
        if (camera instanceof THREE.PerspectiveCamera) {
            // Ajusta la posición Z y FOV para móviles
            // Aléjate un poco más para que las sparkles abarquen un área más grande,
            // o acerca para que se vean más grandes. Aquí un equilibrio.
            camera.position.z = isMobile ? 6 : 3; // Más lejos en móvil si quieres que abarquen más espacio
            camera.fov = isMobile ? 85 : 75; // Aumentar FOV en móvil para un campo de visión más amplio
            camera.updateProjectionMatrix();
        }
    }, [isMobile, camera]);

    return null;
};

const Background3D = () => (
    <Canvas 
        camera={{ position: [0, 0, 3], fov: 75 }} // Valores iniciales, CameraAdjuster los sobrescribirá
        // Puedes probar con gl={{ antialias: false }} si hay problemas de rendimiento.
    >
        <Suspense fallback={null}>
            {/* Agregamos el ajustador de cámara */}
            <CameraAdjuster /> 

            {/* Luces para iluminar la escena */}
            <ambientLight intensity={0.6} /> {/* Aumentar un poco la intensidad de la luz ambiental */}
            <pointLight position={[10, 10, 10]} intensity={1.2} /> {/* Aumentar intensidad */}
            <pointLight position={[-10, -10, -10]} intensity={0.7} /> {/* Aumentar intensidad */}

            {/* Chispas y estrellas flotantes para un efecto mágico */}
            {/* Ajustar 'scale' y 'size' para hacerlas más visibles, y 'count' para densidad */}
            <Sparkles 
                count={300}    // Aumentamos ligeramente el conteo para que sean más notables
                scale={7}      // Hacemos el área de las sparkles más grande
                size={2}       // Hacemos las partículas individuales un poco más grandes
                speed={0.7}    // Un poco más rápidas
                opacity={0.8}  // Más opacas
                color="#FFD700" 
            />
            <Sparkles 
                count={150}    // Aumentamos ligeramente el conteo
                scale={5}      // Área de las sparkles un poco más grande
                size={1.5}     // Partículas individuales más grandes
                speed={0.4}    // Más rápidas
                opacity={0.7}  // Más opacas
                color="#FFFFFF" 
            />

            <OrbitControls 
                enablePan={false} 
                enableZoom={false} 
                enableRotate={false} 
            />
        </Suspense>
    </Canvas>
);

export const CountdownSection = ({ eventDate, backgroundImageSrc }: { eventDate: Date, backgroundImageSrc: string }) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const countdownRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const updateCountdown = () => {
            const diff = eventDate.getTime() - Date.now();
            setTimeLeft({
                dias: Math.max(0, Math.floor(diff / 86400000)),
                horas: Math.floor((diff / 3600000) % 24),
                minutos: Math.floor((diff / 60000) % 60),
                segundos: Math.floor((diff / 1000) % 60),
            });
        };

        updateCountdown();
        const id = setInterval(updateCountdown, 1000);
        return () => clearInterval(id);
    }, [eventDate]);

    useGSAP(
        () => {
            gsap.set(titleRef.current, { opacity: 0, y: -50 });
            countdownRefs.current.forEach((el) => {
                if (el) {
                    gsap.set(el, { opacity: 0, y: 50, scale: 0.8 });
                }
            });

            gsap.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power4.out',
                delay: 0.5,
            });

            countdownRefs.current.forEach((el, i) => {
                if (el) {
                    gsap.to(el, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                        delay: 1.0 + i * 0.2,
                    });
                }
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            id="contador"
            ref={sectionRef}
            className={`relative min-h-screen flex flex-col items-center justify-end p-4 overflow-hidden
                    bg-cover bg-center ${dancing_script.className}`}
            style={{ backgroundImage: `url(${backgroundImageSrc})` }}
        >
            {/* El Canvas ahora incluirá el CameraAdjuster */}
            <div className="absolute inset-0 z-0">
                <Background3D />
            </div>

            <div className="relative z-10 flex flex-col items-center bg-white/20 backdrop-blur-md rounded-t-3xl shadow-2xl p-4 pt-4 max-w-lg w-full">
                <h2
                    ref={titleRef}
                    className={`text-3xl md:text-4xl text-purple-800 mb-8 text-center tracking-wide leading-tight`}
                >
                    Sábado 26 de Septiembre de 2026
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-md">
                    {Object.entries(timeLeft).map(([unit, val], i) => (
                        <div
                            key={unit}
                            ref={(el: HTMLDivElement) => { countdownRefs.current[i] = el; }}
                            className="flex flex-col items-center bg-gradient-to-br from-purple-500 to-[#F8F6F4] rounded-xl p-4 sm:p-6 shadow-md
                          transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            style={{ border: '2px solid rgba(139, 92, 246, 0.5)' }}
                        >
                            <span className={`text-3xl sm:text-4xl text-purple-900 font-extrabold mb-2 leading-none tracking-tighter`}>
                                {val.toString().padStart(2, '0')}
                            </span>
                            <span className={`text-lg sm:text-xl text-purple-700 capitalize tracking-wide`}>
                                {unit}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="h-8"></div>
            </div>
        </section>
    );
};