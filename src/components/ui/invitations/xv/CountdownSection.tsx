'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { Dancing_Script } from 'next/font/google';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface TimeLeft {
    dias: number;
    horas: number;
    minutos: number;
    segundos: number;
}

const dancing_script = Dancing_Script({
    subsets: ['latin'],
    weight: ['400', '700'], // Aseguramos que se carguen los pesos necesarios
});

export const CountdownSection = ({ eventDate, backgroundImageSrc }: { eventDate: Date, backgroundImageSrc: string }) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const countdownRefs = useRef<(HTMLDivElement | null)[]>([]); // Referencias para cada bloque de contador

    // Efecto para el cálculo del tiempo restante
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

        updateCountdown(); // Actualiza inmediatamente al montar
        const id = setInterval(updateCountdown, 1000); // Actualiza cada segundo
        return () => clearInterval(id); // Limpia el intervalo al desmontar
    }, [eventDate]); // Se re-ejecuta si eventDate cambia

    // Animaciones GSAP para la entrada de elementos
    useGSAP(
        () => {
            // 1. Aseguramos que los elementos estén inicialmente ocultos y en su posición de inicio de animación
            gsap.set(titleRef.current, { opacity: 0, y: -50 });
            countdownRefs.current.forEach((el) => {
                if (el) {
                    gsap.set(el, { opacity: 0, y: 50, scale: 0.8 });
                }
            });

            // 2. Animamos los elementos a su estado final visible
            gsap.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power4.out',
                delay: 0.5, // Pequeño retraso para que no sea instantáneo
            });

            countdownRefs.current.forEach((el, i) => {
                if (el) {
                    gsap.to(el, {
                        opacity: 1,
                        y: 0, // Anima a su posición original
                        scale: 1, // Anima a su escala original
                        duration: 0.8,
                        ease: 'back.out(1.7)', // Un efecto elástico para la entrada
                        delay: 1.0 + i * 0.2, // Retraso escalonado para cada elemento
                    });
                }
            });
        },
        { scope: sectionRef } // Limita el scope de las animaciones a esta sección
    );

    return (
        <section
            id="contador"
            ref={sectionRef} // Asignamos la referencia a la sección principal
            className={`relative min-h-screen flex flex-col items-center justify-end p-4 overflow-hidden
                  bg-cover bg-center ${dancing_script.className}`} // Quitamos el gradiente, usamos bg-cover y bg-center
            style={{ backgroundImage: `url(${backgroundImageSrc})` }} // <-- Aquí se usa la imagen de fondo
        >
            {/* Contenedor para la escena 3D de fondo (ahora sobre la imagen) */}
            {/* La opacidad general de la sección con la imagen se controla desde aquí */}
            <div className="absolute inset-0 z-0"> {/* Quitado opacity-80 de aquí para que la imagen se vea más nítida, la blur en el contador es suficiente */}
                <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
                    <Suspense fallback={null}>
                        {/* Luces para iluminar la escena */}
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} />

                        {/* Chispas y estrellas flotantes para un efecto mágico - Ajuste de posición si es necesario */}
                        {/* Las chispas flotarán en el espacio 3D, apareciendo sobre la foto y el contador */}
                        <Sparkles count={200} scale={5} size={1.5} speed={0.5} opacity={0.7} color="#FFD700" />
                        <Sparkles count={100} scale={3} size={1} speed={0.3} opacity={0.5} color="#FFFFFF" />

                        {/* Objeto flotante decorativo */}
                        {/* <FancyFloatingObject /> */}

                        {/* Controles de órbita para ver la escena desde diferentes ángulos (opcional para el usuario) */}
                        <OrbitControls enablePan={false} enableZoom={false}  enableRotate={false} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Contenido del contador - Z-index para que esté sobre la foto y los brillos 3D */}
            <div className="relative z-10 flex flex-col items-center bg-white/20 backdrop-blur-md rounded-t-3xl shadow-2xl p-4 pt-4 max-w-lg w-full"> {/* Eliminado transform -translate-y-8, añadido padding arriba */}
                <h2
                    ref={titleRef} // Asignamos la referencia al título
                    className={`text-3xl md:text-4xl text-purple-800 mb-8 text-center tracking-wide leading-tight`}
                >
                    Sábado 26 de Septiembre de 2026
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-md">
                    {Object.entries(timeLeft).map(([unit, val], i) => (
                        <div
                            key={unit}
                            ref={(el: HTMLDivElement) => { countdownRefs.current[i] = el; }} // Guardamos la referencia
                            className="flex flex-col items-center bg-gradient-to-br from-purple-500 to-[#F8F6F4] rounded-xl p-4 sm:p-6 shadow-md
                         transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            style={{ border: '2px solid rgba(139, 92, 246, 0.5)' }} // Borde suave púrpura
                        >
                            <span className={`text-3xl sm:text-4xl text-purple-900 font-extrabold mb-2 leading-none tracking-tighter`}>
                                {val.toString().padStart(2, '0')} {/* Formato de 2 dígitos */}
                            </span>
                            <span className={`text-lg sm:text-xl text-purple-700 capitalize tracking-wide`}>
                                {unit}
                            </span>
                        </div>
                    ))}
                </div>
                {/* Añadimos un pequeño espacio al final del contador para que no se pegue al borde inferior */}
                <div className="h-8"></div>
            </div>
        </section>
    );
};
