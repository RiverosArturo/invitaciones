'use client';

import { OrbitControls, Sparkles } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

const CameraAdjuster = () => {
  const { camera, size } = useThree();
  const isMobile = size.width < 768;

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.position.z = isMobile ? 8 : 5;
      camera.fov = isMobile ? 85 : 75;
      camera.updateProjectionMatrix();
    }
  }, [isMobile, camera]);

  return null;
};

export const SparklesF = () => {
  return (
    <Canvas
      className="absolute inset-0 z-0 touch-none pointer-events-none"
      style={{ touchAction: 'none', pointerEvents: 'none' }}
      camera={{ position: [0, 0, 5], fov: 75 }}
    >
      <CameraAdjuster />

      <ambientLight intensity={2.0} />

      <Sparkles
        count={200}
        scale={18}
        size={2.5}
        speed={1.2}
        color="#FFD700"
        noise={1.0}
      />

      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
    </Canvas>
  );
};
