'use client';

import { OrbitControls, Sparkles } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

// Ajusta la cámara según tamaño de pantalla
const CameraAdjuster = () => {
  const { camera, size } = useThree();
  const isMobile = size.width < 768;

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.position.z = isMobile ? 8 : 5;
      camera.fov = isMobile ? 85 : 75;
      camera.updateProjectionMatrix();
    }
  }, [camera, size]);

  return null;
};

export const SparklesF = () => {
  const [isClient, setIsClient] = useState(false);

  // Asegura que solo se renderice en cliente (no SSR)
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Canvas
      className="absolute inset-0 z-10 pointer-events-none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        touchAction: 'none',
        zIndex: 10,
      }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <CameraAdjuster />

      <ambientLight intensity={1.5} />
      
      <Sparkles
        count={150}
        scale={14}
        size={2.2}
        speed={0.9}
        color="#FFD700"
        noise={0.8}
      />

      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
    </Canvas>
  );
};
