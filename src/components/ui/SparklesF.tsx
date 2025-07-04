'use client';
import { Sparkles } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

export const SparklesF = () => {
  return (
    <Canvas className="absolute inset-0 z-0">
      <ambientLight intensity={1.5} />
      <Sparkles count={150} scale={15} size={2} speed={1} color="#FFD700" noise={0.8} />
    </Canvas>
  )
}
