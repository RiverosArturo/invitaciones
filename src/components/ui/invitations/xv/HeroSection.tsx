'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { Dancing_Script, Lora } from 'next/font/google';

const dancing_script = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });
const lora = Lora({ subsets: ['latin'], weight: ['400', '700'] });

/* --------- Escena --------- */
const FloatingSphere = () => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    mesh.current.position.y = Math.sin(t * 0.4) * 0.8;
    mesh.current.rotation.y = t * 0.2;
  });

  return (
    <Float floatIntensity={0.5} speed={1.5}>
      <mesh ref={mesh}>
        <sphereGeometry args={[1, 32, 32]} />
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

/* --------- Componente principal --------- */
export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLHeadingElement[]>([]);
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="bg-gradient-to-br from-purple-50 to-purple-200 min-h-screen relative flex flex-col items-center justify-center text-purple-900 overflow-hidden p-6 py-24"
    >
      {/* Texto */}
      <div className="z-10 text-center space-y-4 pt-12">
        <h1 ref={el => { if (el) textRefs.current[0] = el; }}
            className={`${dancing_script.className} text-5xl sm:text-6xl md:text-7xl font-bold tracking-wide leading-tight drop-shadow-md`}>
          Mis XV Años
        </h1>
        <h2 ref={el => { if (el) textRefs.current[1] = el; }}
            className={`${dancing_script.className} text-4xl sm:text-6xl md:text-7xl tracking-wide leading-tight drop-shadow-md`}>
          Mariana Esparza
        </h2>
        <h3 ref={el => { if (el) textRefs.current[2] = el; }}
            className={`${lora.className} text-sm sm:text-lg md:text-xl font-light tracking-widest uppercase mt-4 opacity-80 drop-shadow-sm`}>
          Sábado 26 de Septiembre de 2026
        </h3>
      </div>

      {/* Canvas 3D */}
      <Canvas
        className="absolute inset-0 z-0 touch-none pointer-events-none"
        /* limita el pixel‑ratio para móviles */
        dpr={dpr}
        /* antialias desactivado (suficiente con DPR 2) */
        gl={{ antialias: false, alpha: true }}
        /* bucle sólo cuando cambie algo */
        frameloop="demand"
        /* cámara reactiva al tamaño inicial */
        camera={{ position: [0, 0, isMobile ? 10 : 5], fov: isMobile ? 90 : 60 }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr([1, 1.5])}  /* baja aún más si va justo */
          onIncline={() => setDpr([1, 2])}
        />
        <Suspense fallback={null}>
          <Environment preset="sunset" background={false} />
          <ambientLight intensity={1} color="#FFD700" />
          <pointLight position={[5, 5, 5]} intensity={2} color="#FFD700" />
          <directionalLight position={[3, 5, 2]} intensity={1.5} color="#FFD700" />
          {/* Efectos */}
          <Sparkles count={200} scale={6} size={2.2} speed={0.6} opacity={0.7} color="#FFD700" />
          <Sparkles count={100} scale={4} size={1.8} speed={0.5} opacity={0.6} color="#FFFFFF" />
          <FloatingSphere />
        </Suspense>
      </Canvas>
    </section>
  );
};
