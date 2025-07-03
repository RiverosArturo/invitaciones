'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useUiNavbar } from '@/store';
import { Menu, X } from 'lucide-react';

const getNavLinks = () => [
    // { name: "Inicio", href: "/" },
    { name: "Ventajas", href: "#ventajas" },
    { name: "Tipos de eventos", href: "#tipoDeEventos" },
    { name: "Precios", href: "#precios"},
    { name: "Funciones", href: "#funciones" },
    { name: "Contacto", href: "#contacto" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const isDrawerOpen = useUiNavbar(state => state.isDrawerOpen);
  const closeDrawer = useUiNavbar(state => state.closeDrawer);
  const toggleDrawer = useUiNavbar(state => state.toggleDrawer);
  const navLinks = getNavLinks();
  const mobileMenuRef = useRef<HTMLUListElement>(null);

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDrawerOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && !(event.target as Element).closest('button[aria-label="Abrir menú"]')) {
        closeDrawer();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDrawerOpen, closeDrawer]);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" onClick={closeDrawer} className="flex items-center gap-2">
          <Image
            src="https://res.cloudinary.com/dsu3au60t/image/upload/v1745271496/logo_rhz1cv.png"
            alt="RH Solutions Logo"
            width={36}
            height={36}
            className="rounded-full shadow-sm"
            priority
            style={{ width: 'auto' }}
          />
          <span className="text-xl sm:text-2xl font-extrabold text-gray-800 tracking-tight">
            <span className="text-blue-600">Invitaciones</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 text-sm sm:text-base font-medium text-gray-700">
          {navLinks.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              className={`relative px-2 py-1 transition-colors duration-200 hover:text-blue-600 ${isActive(href) ? 'text-blue-600 font-semibold underline underline-offset-4' : ''
                }`}
            >
              {name}
            </Link>
          ))}
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleDrawer}
            className="text-gray-700"
            aria-label="Abrir menú"
          >
            {isDrawerOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.ul
            ref={mobileMenuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden px-6 pb-6 pt-3 space-y-4 text-gray-700 font-medium bg-white/95 shadow-md rounded-b-xl"
          >
            {navLinks.map(({ name, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeDrawer}
                  className={`block py-1 px-2 rounded transition-colors duration-200 ${isActive(href) ? 'text-blue-600 font-semibold bg-gray-100' : 'hover:text-blue-600'
                    }`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};