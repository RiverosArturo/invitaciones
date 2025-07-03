'use client';

import React from 'react';
import { LuMenu } from 'react-icons/lu'; // Icono principal para el botón de menú
import { AnimatePresence, motion } from 'framer-motion'; // Para animaciones
import { useState } from 'react';
import Link from 'next/link'; // Importa Link para la navegación
import { Dancing_Script } from 'next/font/google'; // Importa la fuente

// Importa los iconos de React Icons que necesitas para el menú
import { FaHome, FaUsers, FaChurch, FaGift, FaCalendarAlt, FaInstagram, FaCameraRetro, FaCheckCircle } from 'react-icons/fa';
import { BiTimeFive, BiHotel } from 'react-icons/bi';
import { GiDress, GiPartyPopper } from 'react-icons/gi';


// Carga la fuente Dancing Script
const dancing_script = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

interface MenuItem {
  name: string;
  href: string; // La sección ID a la que enlaza (ej: #inicio)
  icon: React.ReactNode;
}

// Define tus elementos del menú aquí con sus iconos
const menuItems: MenuItem[] = [
  { name: 'Inicio', href: '#inicio', icon: <FaHome size={30}/> },
  { name: 'Contador', href: '#contador', icon: <BiTimeFive size={30}/> },
  { name: 'Invitados', href: '#invitados', icon: <FaUsers size={30}/> },
  { name: 'Padres', href: '#padres', icon: <GiPartyPopper size={30}/> },
  { name: 'Itinerario', href: '#itinerario', icon: <FaCalendarAlt size={30}/> },
  { name: 'Ceremonia', href: '#ceremonia', icon: <FaChurch size={30}/> },
  { name: 'Hospedaje', href: '#hospedaje', icon: <BiHotel size={30}/> },
  { name: 'Vestimenta', href: '#vestimenta', icon: <GiDress size={30}/> },
  { name: 'Instagram', href: '#instagram', icon: <FaInstagram size={30}/> },
  { name: 'Mesa de Regalos', href: '#regalos', icon: <FaGift size={30}/> },
  { name: 'Galería', href: '#galeria', icon: <FaCameraRetro size={30}/> },
  { name: 'Confirmar Asistencia', href: '#formulario', icon: <FaCheckCircle size={30}/> },
];

export const FloatingButtonMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // Eliminamos menuRef si ya no lo usaremos para cerrar al hacer clic fuera

  // Eliminamos handleClickOutside ya que no queremos que se cierre al hacer clic fuera.

  React.useEffect(() => {
    if (isOpen) {
      // document.addEventListener('mousedown', handleClickOutside); // ELIMINADO
      document.body.style.overflow = 'hidden'; // Deshabilita el scroll
    } else {
      // document.removeEventListener('mousedown', handleClickOutside); // ELIMINADO
      document.body.style.overflow = ''; // Habilita el scroll
    }
    return () => {
      // document.removeEventListener('mousedown', handleClickOutside); // ELIMINADO
      document.body.style.overflow = ''; // Limpia el estilo al desmontar
    };
  }, [isOpen]);


  return (
    <>
      {/* Botón Flotante: Ahora solo ABRE el menú */}
      <div className="fixed top-4 right-4 z-[100]">
        <motion.button
          onClick={() => setIsOpen(!isOpen)} // Cambiado de toggleMenu a openMenu
          className="w-12 h-12 rounded-full bg-gradient-to-b from-purple-500 to-purple-300 text-white flex items-center justify-center shadow-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            rotate: isOpen ? 90 : 0,
            y: [0, -5, 0]
          }}
          transition={{
            rotate: { duration: 0.3 },
            y: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: 0.5
            }
          }}
        >
          <LuMenu style={{ fontSize: '24px' }} />
        </motion.button>
      </div>

      {/* Side Menu (a pantalla completa) */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            // ref={menuRef} // Eliminado ya que handleClickOutside no se usa
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed top-0 left-0 w-screen h-screen
                        bg-gradient-to-br from-purple-50 to-purple-200 bg-opacity-95 backdrop-blur-sm shadow-xl
                        flex flex-col items-center justify-center
                        p-8 space-y-8 overflow-y-auto z-[90]`}
          >
            <h2 className={`text-3xl text-yellow-500 mb-4 border-b-2 border-purple-950 pb-2 ${dancing_script.className}`}>
              Menú
            </h2>
            <ul className="space-y-2 text-center w-full max-w-xs">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)} // Esto cierra el menú al hacer clic en un ítem
                    className="flex items-center gap-3 text-purple-950 hover:text-purple-100 transition-all duration-300 group p-2 rounded-lg hover:bg-purple-900 w-full justify-center sm:justify-start"
                  >
                    <span className="w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {item.icon}
                    </span>
                    <span className={`text-2xl ${dancing_script.className}`}>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};