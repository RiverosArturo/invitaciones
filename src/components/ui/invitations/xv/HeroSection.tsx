'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Dancing_Script, Lora } from 'next/font/google';

const dancing_script = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });
const lora = Lora({ subsets: ['latin'], weight: ['400', '700'] });

const CameraAdjuster = () => {
  const { camera, size } = useThree();
  const isMobile = size.width < 768;

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.position.z = isMobile ? 8 : 5;
      camera.fov = isMobile ? 80 : 60;
      camera.updateProjectionMatrix();
    }
  }, [isMobile, camera]);

  return null;
};

// const FloatingSphere = () => {
//   const mesh = useRef<THREE.Mesh>(null!);
//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     if (mesh.current) {
//       mesh.current.position.y = Math.sin(t * 0.4) * 0.8;
//       mesh.current.rotation.y = t * 0.2;
//     }
//   });

//   return (
//     <Float floatIntensity={0.5} speed={1.5}>
//       <mesh ref={mesh}>
//         <sphereGeometry args={[1, 32, 32]} />
//         <meshStandardMaterial
//           color="#FFFACD"
//           metalness={0.8}
//           roughness={0.1}
//           emissive="#FFFACD"
//           emissiveIntensity={0.5}
//         />
//       </mesh>
//     </Float>
//   );
// };

const FloatingImage = ({ imageUrl }: { imageUrl: string }) => {
  const texture = new THREE.TextureLoader().load(imageUrl);
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(t * 0.4) * 0.8;
      // meshRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <Float floatIntensity={0.8} speed={1.2}>
      <mesh ref={meshRef}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
};


export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLHeadingElement[]>([]);
  const [canvasVisible, setCanvasVisible] = useState(false);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.style.opacity = '1';
      heroRef.current.style.transform = 'none';

      // Usamos ResizeObserver para detectar cuándo el contenedor ya tiene tamaño válido
      const observer = new ResizeObserver(([entry]) => {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          setCanvasVisible(true);
        }
      });

      observer.observe(heroRef.current);
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    textRefs.current.forEach((el) => {
      if (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
  }, []);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="bg-gradient-to-br from-purple-50 to-purple-200 h-screen relative flex flex-col items-center justify-center text-purple-900 overflow-hidden p-6 pt-24"
    >
      <div className="z-10 text-center space-y-4 pt-12">
        <h1
          ref={(el) => {
            if (el) textRefs.current[0] = el;
          }}
          className={`${dancing_script.className} text-6xl sm:text-7xl font-bold tracking-wide leading-tight drop-shadow-md`}
        >
          Mis XV Años
        </h1>
        <h2
          ref={(el) => {
            if (el) textRefs.current[1] = el;
          }}
          className={`${dancing_script.className} text-5xl sm:text-7xl tracking-wide leading-tight drop-shadow-md`}
        >
          Mariana Esparza
        </h2>
        <h3
          ref={(el) => {
            if (el) textRefs.current[2] = el;
          }}
          className={`${lora.className} text-lg sm:text-xl font-light tracking-widest uppercase mt-4 opacity-80 drop-shadow-sm`}
        >
          Sábado 26 de Septiembre de 2026
        </h3>
      </div>

      {canvasVisible && (
        <Canvas className="absolute inset-0 z-0 fade-in-canvas" style={{ touchAction: 'none', pointerEvents: 'none' }} shadows>
          <CameraAdjuster />
          <Environment preset="sunset" background={false} />
          <ambientLight intensity={1.0} color="#FFD700" />
          <pointLight position={[5, 5, 5]} intensity={2.0} color="#FFD700" />
          <directionalLight position={[3, 5, 2]} intensity={1.5} color="#FFD700" />
          <Sparkles count={100} scale={7} size={2.5} speed={0.7} opacity={0.9} color="#FFD700" />
          <Sparkles count={100} scale={5} size={2} speed={0.4} opacity={0.8} color="#FFFFFF" />
          <FloatingImage imageUrl={'https://res.cloudinary.com/dsu3au60t/image/upload/v1751931907/xv_gaocsh.webp'} />
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
        </Canvas>
      )}
    </section>
  );
};
