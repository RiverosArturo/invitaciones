'use client';

import { OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber"; // Importamos useThree
import { useEffect } from "react";
import * as THREE from 'three'; // Importamos THREE

// Componente para ajustar la cámara dinámicamente
const CameraAdjuster = () => {
    const { camera, size } = useThree();
    const isMobile = size.width < 768; // Define tu breakpoint para móvil

    useEffect(() => {
        if (camera instanceof THREE.PerspectiveCamera) {
            // Ajustes específicos para las Sparkles en esta escena simple.
            // Queremos que las sparkles se vean bien distribuidas.
            camera.position.z = isMobile ? 8 : 5; // Más lejos en móvil, más cerca en escritorio
            camera.fov = isMobile ? 85 : 75; // Ampliar FOV en móvil para que abarquen más
            camera.updateProjectionMatrix();
        }
    }, [isMobile, camera]);

    return null;
};

export const SparklesF = () => {
    return (
        <Canvas className="absolute inset-0 z-0">
            {/* Agregamos el ajustador de cámara */}
            <CameraAdjuster /> 

            {/* Aumentamos un poco la intensidad de la luz ambiental */}
            <ambientLight intensity={2.0} /> {/* Antes 1.5 */}

            {/* Ajustamos los parámetros de Sparkles para mayor visibilidad en móvil */}
            <Sparkles 
                count={200}    // Aumentamos el conteo para más densidad (antes 150)
                scale={18}     // Aumentamos el área de dispersión (antes 15)
                size={2.5}     // Hacemos las partículas individuales un poco más grandes (antes 2)
                speed={1.2}    // Ligeramente más rápidas
                color="#FFD700" 
                noise={1.0}    // Aumentamos el ruido para una dispersión más caótica y natural (antes 0.8)
            />

            {/* OrbitControls, aunque no tengas interacción, es bueno para asegurarnos de que la cámara se inicialice correctamente */}
            <OrbitControls 
                enablePan={false} 
                enableZoom={false} 
                enableRotate={false} 
            />
        </Canvas>
    );
};