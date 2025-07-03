'use client';

import { forwardRef, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Mesh } from 'three';
import gsap from 'gsap';
import { Dancing_Script } from 'next/font/google';
import { AudioPlayer, FloatingButtonMenu } from '@/components';

const dancing_script = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const Rope3D = forwardRef<Mesh>((_, ref) => (
  <mesh ref={ref} rotation={[0, 0, 0]} position={[0, 0, 0.05]}>
    <cylinderGeometry args={[0.025, 0.025, 3, 32]} />
    <meshStandardMaterial color="#c8a27a" />
  </mesh>
));
Rope3D.displayName = 'Rope3D';

export const EnvelopeAnimation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const leftFlapRef = useRef<HTMLDivElement>(null);
  const rightFlapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sealWrapperRef = useRef<HTMLDivElement>(null);
  const envelopeWrapperRef = useRef<HTMLDivElement>(null);
  const fullScreenOverlayRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (opened) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setOpened(true);
        if (fullScreenOverlayRef.current) {
          gsap.set(fullScreenOverlayRef.current, { display: 'none' });
        }
      }
    });

    tl.to(sealWrapperRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'elastic.in(1.2, 0.5)',
      clearProps: 'all'
    });

    tl.to(leftFlapRef.current, {
      rotateY: -145,
      transformOrigin: 'left center',
      duration: 1.2,
      ease: 'power4.inOut',
      clearProps: 'transform'
    }, "+=0.1");

    tl.to(rightFlapRef.current, {
      rotateY: 145,
      transformOrigin: 'right center',
      duration: 1.2,
      ease: 'power4.inOut',
      clearProps: 'transform'
    }, "<");

    tl.to(fullScreenOverlayRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    tl.fromTo(contentRef.current, {
      opacity: 0,
      y: 40,
      scale: 0.95
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'expo.out'
    }, "<");
  };

  useEffect(() => {
    if (contentRef.current && !opened) {
      gsap.set(contentRef.current, { opacity: 0, y: 0, scale: 1 });
    }
  }, [opened]);

  return (
    <>
      <div
        ref={fullScreenOverlayRef}
        className={`
          fixed inset-0 z-50 flex items-center justify-center
          bg-gradient-to-br from-purple-100 to-purple-200
          ${opened ? 'pointer-events-none' : ''}
        `}
        style={{ display: opened ? 'none' : 'flex' }}
      >
        <div
          ref={envelopeWrapperRef}
          className="relative w-full h-full flex items-center justify-center perspective-[1400px]"
        >
          <div className="relative w-full h-full aspect-[2/3] bg-purple-200 rounded-xl shadow-[inset_0_0_6px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.2)] overflow-hidden border border-purple-300">
            <div
              ref={leftFlapRef}
              className="absolute left-0 top-0 w-1/2 h-full bg-purple-200 shadow-2xl z-20 rounded-l-xl"
              style={{
                transformOrigin: 'left center',
                // clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            />

            <div
              ref={rightFlapRef} //bg-[#f5f3e9]
              className="absolute right-0 top-0 w-1/2 h-full bg-purple-200 shadow-2xl z-20 rounded-r-xl"
              style={{
                transformOrigin: 'right center',
                // clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            />

            <div
              ref={sealWrapperRef}
              className="absolute top-1/2 left-1/2 w-24 h-24 z-30 cursor-pointer -translate-x-1/2 -translate-y-1/2"
              onClick={handleOpen}
            >
              <Image
                src="https://res.cloudinary.com/dsu3au60t/image/upload/v1751415321/selloCera_mggqrq.webp"
                alt="Sello de Cera"
                width={550}
                height={544}
                className="w-full h-full animate-pulse transition-transform duration-300 hover:scale-110"
                draggable={false}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className={`${dancing_script.className} text-xl md:text-2xl text-purple-50 font-bold`}>XV</p>
              </div>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-gray-800 px-3 py-1 rounded-full shadow-md text-sm whitespace-nowrap">
                ¡Haz clic aquí!
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col min-h-screen **transform-gpu**">
        { opened && ((
          <>
            <FloatingButtonMenu />
            <AudioPlayer src="https://res.cloudinary.com/dsu3au60t/video/upload/v1751499601/musicaInvitacion_avhsbr.mp3" autoplay={true} loop={true} />
          </>
        ))}
        {children}
      </div>
    </>
  );
};
