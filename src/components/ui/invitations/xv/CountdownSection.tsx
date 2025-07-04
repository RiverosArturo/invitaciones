/* CountdownSection.tsx */
'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import { Dancing_Script } from 'next/font/google';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

/* ---------- 3D helpers ----------- */
const CameraAdjuster = () => {
  const { camera, size } = useThree();
  const isMobile = size.width < 768;

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.position.z = isMobile ? 6 : 3;
      camera.fov = isMobile ? 85 : 75;
      camera.updateProjectionMatrix();
    }
  }, [isMobile, camera]);

  return null;
};

const Background3D = () => (
  <Canvas
    className="absolute inset-0 z-0 pointer-events-none touch-none"
    style={{ touchAction: 'none', pointerEvents: 'none' }}
    /* limitar DPR para que no se caiga el contexto WebGL en móviles */
    dpr={[1, 2]}
    camera={{ position: [0, 0, 3], fov: 75 }}
  >
    <Suspense fallback={null}>
      <CameraAdjuster />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} intensity={0.7} />
      {/* mismos sparkles que en ParentsSection */}
      <Sparkles count={150} scale={5} size={1.5} speed={0.5} opacity={0.7} color="#FFD700" />
      <Sparkles count={75} scale={3} size={1} speed={0.3} opacity={0.5} color="#FFFFFF" />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Suspense>
  </Canvas>
);

/* ---------- Componente principal ----------- */
export const CountdownSection = ({
  eventDate,
  backgroundImageSrc,
}: {
  eventDate: Date;
  backgroundImageSrc: string;
}) => {
  /* estado de la cuenta atrás */
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const countdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ------------ lógica de cuenta atrás ------------- */
  useEffect(() => {
    const update = () => {
      const diff = eventDate.getTime() - Date.now();
      setTimeLeft({
        dias: Math.max(0, Math.floor(diff / 86400000)),
        horas: Math.floor((diff / 3600000) % 24),
        minutos: Math.floor((diff / 60000) % 60),
        segundos: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [eventDate]);

  /* ------------ animaciones GSAP ------------- */
  useGSAP(() => {
    if (!sectionRef.current || !titleRef.current) return;

    gsap.set(titleRef.current, { opacity: 0, y: -50 });
    countdownRefs.current.forEach(el => el && gsap.set(el, { opacity: 0, y: 50, scale: 0.8 }));

    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power4.out',
      delay: 0.4,
    });

    countdownRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.8 + i * 0.15,
      });
    });
  }, { scope: sectionRef });

  /* ------------ JSX ------------- */
  return (
    <section
      id="contador"
      ref={sectionRef}
      className={`relative min-h-screen flex flex-col items-center justify-end p-4 overflow-hidden bg-cover bg-center ${dancingScript.className}`}
      style={{ backgroundImage: `url(${backgroundImageSrc})` }}
    >
      {/* Fondo Three.js */}
      <div className="absolute inset-0 z-0">
        <Background3D />
      </div>

      {/* Tarjeta con cuenta atrás */}
      <div className="relative z-10 flex flex-col items-center bg-white/20 backdrop-blur-md rounded-t-3xl shadow-2xl p-4 pt-4 max-w-lg w-full">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl text-purple-800 mb-8 text-center tracking-wide leading-tight"
        >
          Sábado 26 de Septiembre de 2026
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-md">
          {Object.entries(timeLeft).map(([unit, val], i) => (
            <div
              key={unit}
              ref={el => { countdownRefs.current[i] = el; }} // no retorna nada ⇒ sin error TS
              className="flex flex-col items-center bg-gradient-to-br from-purple-500 to-[#F8F6F4] rounded-xl p-4 sm:p-6 shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              style={{ border: '2px solid rgba(139, 92, 246, 0.5)' }}
            >
              <span className="text-3xl sm:text-4xl text-purple-900 font-extrabold mb-2 leading-none tracking-tighter">
                {val.toString().padStart(2, '0')}
              </span>
              <span className="text-lg sm:text-xl text-purple-700 capitalize tracking-wide">
                {unit}
              </span>
            </div>
          ))}
        </div>

        <div className="h-8" />
      </div>
    </section>
  );
};
