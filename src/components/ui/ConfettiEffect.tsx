'use client';

import { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';

interface ConfettiEffectProps {
  isActive?: boolean;
  duration?: number;
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  isActive = true,
  duration = 60000,
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [running, setRunning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Obtener tamaño de toda la página
  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: document.body.scrollHeight,
      });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Controlar confetti con duración exacta
  useEffect(() => {
    if (isActive) {
      setRunning(true); // empieza
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setRunning(false); // detiene después del tiempo
      }, duration);
    } else {
      setRunning(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isActive, duration]);

  if (dimensions.width === 0 || dimensions.height === 0 || !running) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={200}
        gravity={0.1}
        recycle={true}  // 💡 sigue lanzando partículas
        run={running}   // 💡 cuando sea false, se detiene
      />
    </div>
  );
};
