'use client';

import React, { useRef, useEffect, useState } from 'react';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa'; // Importa los iconos que vas a usar

// Define las props para el FloatingAudioPlayer
interface FloatingAudioPlayerProps {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
}

export const AudioPlayer = ({ src, autoplay = true, loop = false }: FloatingAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    if (audioRef.current && autoplay && !hasInteracted) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
            setShowTooltip(false);
            console.log('Autoplay exitoso.');
          })
          .catch((err: DOMException) => {
            console.warn('Autoplay bloqueado. Por favor, haz clic en el icono.', err);
            setIsPlaying(false);
            if (!hasInteracted) {
                 setShowTooltip(true);
                 const timer = setTimeout(() => setShowTooltip(false), 5000);
                 return () => clearTimeout(timer);
            }
          });
      }
    }
  }, [autoplay, hasInteracted]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play()
          .then(() => {
            setShowTooltip(false);
          })
          .catch((err: DOMException) => {
            console.error('Error al intentar reproducir manualmente:', err);
            setShowTooltip(true);
            const timer = setTimeout(() => setShowTooltip(false), 5000);
            return () => clearTimeout(timer);
          });
      }
      setIsPlaying(!isPlaying);
      setHasInteracted(true);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={src} 
        loop={loop} 
        preload="auto" 
        playsInline 
        className="hidden" 
        onEnded={() => {
          if (!loop) setIsPlaying(false);
        }}
      />

      <div className="fixed bottom-4 right-4 z-50">
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 p-2 bg-red-600 text-white text-xs rounded-lg shadow-lg whitespace-nowrap animate-fade-in-up">
            Haz clic para reproducir la música.
          </div>
        )}

        <button 
          onClick={togglePlayPause}
          className={`
            w-14 h-14 rounded-full flex items-center justify-center 
            shadow-lg transition-all duration-300 ease-in-out 
            transform hover:scale-110 
            focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-75
            ${isPlaying ? 'bg-gradient-to-b from-purple-600 to-purple-100' : 'bg-purple-700 hover:bg-purple-600'}
          `}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {/* Renderiza el icono completo de React-Icons */}
          {isPlaying ? (
            <FaPauseCircle size={30} className="text-purple-100" /> // Icono de pausa
          ) : (
            <FaPlayCircle size={30} className="text-purple-100" /> // Icono de play
          )}
        </button>
      </div>
    </>
  );
};