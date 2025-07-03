'use client';

import { useQRCode } from 'next-qrcode';

interface QrDisplayProps {
  value: string; // El texto o URL que se codificará en el QR
  size?: number; // Tamaño del QR (por defecto 256)
  bgColor?: string; // Color de fondo (por defecto blanco)
  fgColor?: string; // Color del código (por defecto negro)
}

export const QrDisplay: React.FC<QrDisplayProps> = ({
  value,
  size = 256,
  bgColor = '#FFFFFF',
  fgColor = '#31224d',
}) => {
  const { Canvas } = useQRCode();

  if (!value) {
    return <p>Generando QR...</p>;
  }

  return (
    <div
      className="p-4 bg-white rounded-lg shadow-inner flex justify-center items-center"
      style={{ maxWidth: `${size}px`, margin: '0 auto' }} // Centra y establece el ancho máximo
    >
      <Canvas
        text={value}
        options={{
          errorCorrectionLevel: 'H',
          margin: 3,
          scale: 4,
          width: size,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        }}
      />
    </div>
  );
};