// Plantilla mejorada con Framer Motion + GSAP + fondo 3D con globos flotantes (Three.js)
// Requiere: framer-motion, gsap, @react-three/fiber, drei, three

"use client";

// Importación de componentes necesarios para 3D y animaciones
import { Canvas, useFrame } from "@react-three/fiber"; // Canvas: escena 3D, useFrame: animaciones por frame
import { OrbitControls } from "@react-three/drei"; // Controles de cámara en la escena 3D
import { motion } from "framer-motion"; // Animaciones declarativas en React
import gsap from "gsap"; // Animaciones imperativas potentes
import { useEffect, useRef } from "react";
import * as THREE from "three"; // Motor gráfico base (Three.js)


interface BalloonProps {
  position: [number, number, number]; // Un array de 3 números para x, y, z
  color: string | number | THREE.Color; // El color puede ser un string (hex), un número (hex), o un objeto THREE.Color
}

// 🎈 Componente de Globo flotante
// Este componente crea una esfera que se mueve suavemente en Y (como flotando)
const Balloon = ({ position, color }: BalloonProps) => { // <--- ¡Cambio aquí!
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y += Math.sin(Date.now() * 0.001 + position[0]) * 0.002;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// 🎨 Fondo 3D con globos flotantes
// Esta escena se renderiza con una cámara, luces y varios globos
const BalloonsScene = () => (
  <Canvas camera={{ position: [0, 0, 5] }}>
    {/* Luz ambiental general */}
    <ambientLight intensity={1.2} />
    {/* Punto de luz para realismo */}
    <pointLight position={[10, 10, 10]} />
    {/* Controles para mover la cámara (en este caso desactivado zoom y paneo) */}
    <OrbitControls enableZoom={false} enablePan={false} />
    {/* Globos flotantes con diferentes posiciones y colores */}
    <Balloon position={[-1.5, 0, 0]} color="#FF69B4" />
    <Balloon position={[0, 0.5, 0]} color="#FFD700" />
    <Balloon position={[1.5, -0.2, 0]} color="#87CEFA" />
  </Canvas>
);

// Hook personalizado que anima una sección con GSAP cuando aparece en pantalla
const useGsapAnimation = (triggerRef: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    if (triggerRef.current) {
      gsap.fromTo(
        triggerRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }
  }, [triggerRef]);
};

// Componente que representa una sección de invitación
// Contiene el título, nombres, fecha y fondo opcional 3D
interface InvitationProps {
  title: string;
  names: string;
  date: string;
  backgroundClass: string;
  with3D: boolean;
}

const InvitationSection = ({ title, names, date, backgroundClass, with3D }: InvitationProps) => {
  const ref = useRef<HTMLDivElement|null>(null); // Referencia tipada para el contenedor principal
  useGsapAnimation(ref); // Animación GSAP al cargar la sección

  return (
    <section
      ref={ref}
      className={`relative min-h-screen ${backgroundClass} text-white flex flex-col items-center justify-center text-center p-8 overflow-hidden`}
    >
      {/* Si se activa el fondo 3D, renderiza la escena */}
      {with3D && (
        <div className="absolute inset-0 z-0">
          <BalloonsScene />
        </div>
      )}

      {/* Contenido textual por encima del fondo */}
      <div className="relative z-10">
        {/* Título animado con Framer Motion */}
        <motion.h1
          className="text-4xl md:text-6xl font-serif mb-4"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>

        {/* Nombres con efecto de escala */}
        <motion.p
          className="text-2xl md:text-4xl font-bold mb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {names}
        </motion.p>

        {/* Fecha con animación de entrada */}
        <motion.p
          className="text-xl md:text-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {date}
        </motion.p>
      </div>
    </section>
  );
};

// Componente principal que muestra las tres invitaciones
export const InvitationsChilds = () => {
  return (
    <main className="w-full">

      {/* Invitación Infantil con globos 3D */}
      <InvitationSection
        title="¡Estás invitado a mi fiesta!"
        names="Mateo cumple 6 años 🎈"
        date="Domingo 7 de Julio, 2025"
        backgroundClass="bg-gradient-to-br from-blue-300 to-cyan-500"
        with3D
      />
    </main>
  );
}
