'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import gsap from 'gsap';
import { Suspense, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';

interface ParentsSectionProps {
    mainMessage?: string;
    parentsTitle?: string;
    parent1Name?: string;
    parent2Name?: string;
    godparentsTitle?: string;
    godparent1Name?: string;
    godparent2Name?: string;
}

const Background3D = () => (
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
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
        </Suspense>
    </Canvas>
);

export const ParentsSection: React.FC<ParentsSectionProps> = ({
    mainMessage = "¡Celebra con nosotros este día tan maravilloso!",
    parentsTitle = "Mis Padres",
    parent1Name = "Fátima Guzmán",
    parent2Name = "Sanrom Fabyo",
    godparentsTitle = "Mis Padrinos",
    godparent1Name = "Elida Navarro",
    godparent2Name = "Carlos López",
}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const parentsNamesRef = useRef<HTMLDivElement>(null);
    const godparentsNamesRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useGSAP(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);

                    gsap.fromTo(cardRef.current, {
                        y: '-100%',
                        opacity: 0,
                        scaleY: 0.8,
                        transformOrigin: 'top center',
                    }, {
                        y: '0%',
                        opacity: 1,
                        scaleY: 1,
                        duration: 1.2,
                        ease: 'power3.out',
                        delay: 0.3,
                        onComplete: () => {
                            gsap.from(titleRef.current, {
                                opacity: 0,
                                y: -20,
                                duration: 0.8,
                                ease: 'power2.out',
                            });
                            gsap.from(dividerRef.current, {
                                width: 0,
                                opacity: 0,
                                duration: 1,
                                ease: 'power2.out',
                                delay: 0.2,
                            });
                            gsap.from(parentsNamesRef.current?.children || '', {
                                opacity: 0,
                                y: 20,
                                stagger: 0.2,
                                duration: 0.8,
                                ease: 'power2.out',
                                delay: 0.4,
                            });
                            gsap.from(godparentsNamesRef.current?.children || '', {
                                opacity: 0,
                                y: 20,
                                stagger: 0.2,
                                duration: 0.8,
                                ease: 'power2.out',
                                delay: 0.6,
                            });
                        }
                    });

                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);


    return (
        <section id="padres" ref={sectionRef} className="relative min-h-screen w-full overflow-hidden font-['Montserrat'] bg-cover"
            style={{ backgroundImage: `url(https://res.cloudinary.com/dsu3au60t/image/upload/v1751273323/padresYXV_fcez9e.jpg)`, backgroundPosition: 'center 1%' }} >
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;900&family=Montserrat:wght@300;400;900&display=swap');
            `}</style>

            <div className="absolute inset-0 z-0">
                <Background3D />
            </div>
                
            <div className="relative w-full z-10">
                <div ref={cardRef} className={`relative mx-auto max-w-5xl px-8 pt-6 pb-16 text-center bg-gradient-to-b from-purple-300 to-purple-50 rounded-b-full shadow-xl transition-opacity duration-300 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <div className="space-y-4">
                        <h2
                            ref={titleRef}
                            className={`text-4xl text-center font-['Dancing_Script']  text-purple-900 drop-shadow-lg`}
                        >
                            {mainMessage}
                        </h2>
                        <div ref={dividerRef} className="h-0.5 w-20 bg-purple-900/60 mx-auto" />

                        <div className="grid grid-cols-2 gap-8">
                            <div ref={parentsNamesRef} className="space-y-2">
                                <p className="text-2xl font-['Dancing_Script'] text-purple-900 uppercase tracking-wide">{parentsTitle}</p>
                                <p className="text-xl font-['Dancing_Script'] text-purple-700">{parent1Name}</p>
                                <p className="text-xl font-['Dancing_Script'] text-purple-700">{parent2Name}</p>
                            </div>
                            <div ref={godparentsNamesRef} className="space-y-2">
                                <p className="text-2xl font-['Dancing_Script'] text-purple-800 uppercase tracking-wide">{godparentsTitle}</p>
                                <p className="text-xl font-['Dancing_Script'] text-purple-700">{godparent1Name}</p>
                                <p className="text-xl font-['Dancing_Script'] text-purple-700">{godparent2Name}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-32 md:h-48"></div>
            </div>
        </section>
    );
};
