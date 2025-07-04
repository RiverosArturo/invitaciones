'use client';

import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Dancing_Script, Lora } from 'next/font/google';

const dancing_script = Dancing_Script({
    subsets: ['latin'],
    weight: ['400', '700'],
});

const lora = Lora({
    subsets: ['latin'],
    weight: ['400', '700'],
});

// Componente para ajustar la cámara dinámicamente
const CameraAdjuster = () => {
    const { camera, size } = useThree();
    const isMobile = size.width < 768; // Define un breakpoint para móvil (ej. 768px)

    useEffect(() => {
        if (camera instanceof THREE.PerspectiveCamera) {
            // Ajuste fino para móviles:
            // Alejar un poco más la cámara si las Sparkles no se ven bien,
            // o ajustar el FOV para que abarquen más espacio.
            camera.position.z = isMobile ? 7 : 5; // Antes 8, ahora 7 (un poco más cerca para ver las sparkles)
            camera.fov = isMobile ? 80 : 60; // Aumentar FOV en móvil para un campo de visión más amplio
            camera.updateProjectionMatrix();
        }
    }, [isMobile, camera]);

    return null;
};

const FloatingSphere = () => {
    const mesh = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (mesh.current) {
            mesh.current.position.y = Math.sin(t * 0.4) * 0.8;
            mesh.current.rotation.y = t * 0.2;
        }
    });

    return (
        <Float floatIntensity={0.5} speed={1.5}>
            <mesh ref={mesh}>
                {/* Mantener la geometría reducida para rendimiento en móvil */}
                <sphereGeometry args={[1, 32, 32]} /> {/* Ya lo habíamos ajustado a 32,32 */}
                <meshStandardMaterial
                    color="#FFFACD"
                    metalness={0.8}
                    roughness={0.1}
                    emissive="#FFFACD"
                    emissiveIntensity={0.5}
                />
            </mesh>
        </Float>
    );
};

export const HeroSection = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<HTMLHeadingElement[]>([]);

    useEffect(() => {
        if (heroRef.current) {
            heroRef.current.style.opacity = '1';
            heroRef.current.style.transform = 'none';
        }
        textRefs.current.forEach(el => {
            if (el) {
                el.style.opacity = '1';
                el.style.transform = 'none';
            }
        });
        const canvasElement = document.querySelector('.fade-in-canvas') as HTMLElement;
        if (canvasElement) {
            canvasElement.style.opacity = '1';
        }
    }, []);

    return (
        <section
            id="inicio"
            ref={heroRef}
            className="bg-gradient-to-br from-purple-50 to-purple-200 h-screen relative flex flex-col items-center justify-center text-purple-900 overflow-hidden p-6 py-24"
        >
            <div className="z-10 text-center space-y-4 pt-12">
                <h1
                    ref={(el: HTMLHeadingElement | null) => {
                        if (el) {
                            textRefs.current[0] = el;
                        }
                    }}
                    className={`${dancing_script.className} text-6xl sm:text-7xl font-bold tracking-wide leading-tight drop-shadow-md`}
                >
                    Mis XV Años
                </h1>
                <h2
                    ref={(el: HTMLHeadingElement | null) => {
                        if (el) {
                            textRefs.current[1] = el;
                        }
                    }}
                    className={`${dancing_script.className} text-5xl sm:text-7xl tracking-wide leading-tight drop-shadow-md`}
                >
                    Mariana Esparza
                </h2>
                <h3
                    ref={(el: HTMLHeadingElement | null) => {
                        if (el) {
                            textRefs.current[2] = el;
                        }
                    }}
                    className={`${lora.className} text-lg sm:text-xl font-light tracking-widest uppercase mt-4 opacity-80 drop-shadow-sm`}
                >
                    Sábado 26 de Septiembre de 2026
                </h3>
            </div>

            <Canvas className="absolute inset-0 z-0 fade-in-canvas" shadows>
                <CameraAdjuster />
                <Environment preset="sunset" background={false} />
                {/* Aumentar la intensidad de las luces para que las sparkles sean más brillantes */}
                <ambientLight intensity={1.0} color="#FFD700" /> {/* Antes 0.7 */}
                <pointLight position={[5, 5, 5]} intensity={2.0} color="#FFD700" /> {/* Antes 1.5 */}
                <directionalLight position={[3, 5, 2]} intensity={1.5} color="#FFD700" /> {/* Antes 1.2 */}
                
                {/* Ajustar parámetros de Sparkles para mayor visibilidad */}
                <Sparkles 
                    count={300}    // Aumentar el conteo para mayor densidad
                    scale={7}      // Aumentar el área de dispersión
                    size={2.5}     // Hacer las partículas individuales más grandes
                    speed={0.7}    // Ajustar velocidad
                    opacity={0.9}  // Hacerlas más opacas
                    color="#FFD700" 
                />
                <Sparkles 
                    count={150}    // Aumentar el conteo
                    scale={5}      // Aumentar el área
                    size={2}       // Hacer las partículas individuales más grandes
                    speed={0.4}    // Ajustar velocidad
                    opacity={0.8}  // Hacerlas más opacas
                    color="#FFFFFF" 
                />
                <FloatingSphere />
                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    enableRotate={false}
                />
            </Canvas>
        </section>
    );
};