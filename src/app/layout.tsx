import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Configuración de fuentes (usa variables CSS)
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// 2. Metadata mejorada y con la configuración del viewport
export const metadata: Metadata = {
  title: "Invitaciones Personalizadas", // Esto se puede sobrescribir en pages.tsx
  description: "Diseños únicos para eventos inolvidables", // Esto se puede sobrescribir en pages.tsx
  // AÑADIR LA CONFIGURACIÓN DEL VIEWPORT AQUÍ
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1, // Esto evita que el usuario pueda hacer zoom in/out manualmente, lo cual es común para diseños fijos
    userScalable: false, // Esto es explícito para evitar escalado por el usuario
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}