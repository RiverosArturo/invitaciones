// components/PricingPlans.tsx
'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Check } from 'lucide-react'; // Asegúrate de tener lucide-react instalado

// ... (tus interfaces Feature y Plan, y el array plans, que no han cambiado) ...

interface Feature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  tag?: string; // Por ejemplo, 'MÁS POPULAR'
  originalPrice: number; // Precio original
  currentPrice: number; // Precio de oferta
  colorClass: string; // Clase de color para el encabezado de la tarjeta (ej. 'bg-gradient-to-br from-purple-500 to-indigo-600')
  buttonColorClass: string; // Clase de color para el botón (ej. 'bg-purple-600 hover:bg-purple-700')
  isHighlighted?: boolean; // Para el plan "más popular" con el ring y la escala
  exampleLinks: { text: string; href: string }[];
  features: Feature[];
}

const plans: Plan[] = [
  {
    name: 'ESENCIAL',
    tag: undefined,
    originalPrice: 2000,
    currentPrice: 899,
    colorClass: 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800',
    buttonColorClass: 'bg-blue-500 hover:bg-blue-600',
    isHighlighted: false,
    exampleLinks: [
      // { text: '→ Ejemplo de XV años', href: '/ejemplos-xv' },
      // { text: '→ Ejemplos de Boda', href: '/ejemplos-boda' },
    ],
    features: [
      { text: 'Confirmación de Asistencia (RSVP)', included: true },
      { text: 'Ubicación Interactiva (Maps/Waze)', included: true },
      { text: 'Cuenta Regresiva Personalizada', included: true },
      { text: 'Música Ambiente Personalizada', included: true },
      { text: 'Diseño 100% Personalizado', included: true },
    ],
  },
  {
    name: 'PREMIUM',
    tag: 'MÁS POPULAR',
    originalPrice: 3000,
    currentPrice: 1599,
    colorClass: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white',
    buttonColorClass: 'bg-purple-600 hover:bg-purple-700',
    isHighlighted: true,
    exampleLinks: [
      // { text: '→ Ejemplo de XV años', href: '/ejemplos-xv' },
      // { text: '→ Ejemplos de Boda', href: '/ejemplos-boda' },
    ],
    features: [
      { text: 'Todo lo del Paquete Esencial', included: true },
      { text: 'Galería de Fotos (hasta 4 fotos)', included: true },
      { text: 'Vínculos a Redes Sociales y Hashtag', included: true },
      { text: 'Mesa de Regalos', included: true },
      { text: 'Información Adicional Completa', included: true },
      { text: 'Galería de Fotos y Videos (hasta 8 fotos)', included: true },
      
      { text: 'Diseño premium personalizado', included: true },
    ],
  },
  {
    name: 'INNOVADOR',
    tag: undefined,
    originalPrice: 3899,
    currentPrice: 2199,
    colorClass: 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white',
    buttonColorClass: 'bg-green-600 hover:bg-green-700',
    isHighlighted: false,
    exampleLinks: [
      { text: '→ Descubre una Invitación XV como ninguna otra. ', href: '/invitaciones/xv' },
      // { text: '→ Ejemplos de Boda', href: '/ejemplos-boda' },
    ],
    features: [
      { text: 'Todo lo del Paquete Premium', included: true },
      { text: 'Mensajes y Recordatorios Personalizados', included: true },
      { text: 'Sincronización con Calendarios', included: true },
      // { text: 'Control de asistencia por medio de QR', included: true },
      { text: 'Pase de Acceso con Código QR Personalizado', included: true },
      // { text: 'Asistente Virtual Integrado (Chatbot)', included: true },
      // { text: 'Métricas de Interacción y Apertura', included: true },
      { text: 'Múltiples Ubicaciones/Eventos', included: true },
      { text: 'Testimonios o Mensajes de los Invitados', included: true },
    ],
  },
];

// --- Función para formatear el precio en MXN ---
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// --- Componente principal PricingPlans ---
export const PricingPlans: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    const container = carouselRef.current;
    if (container) {
      // Calcula el ancho de una tarjeta de plan, incluyendo su padding horizontal
      // Cada tarjeta tiene w-full y un px-2 (que se convierte en 4px a cada lado), lo que significa
      // el ancho real de la tarjeta es container.clientWidth.
      const scrollAmount = container.clientWidth * index;
      container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      setActiveIndex(index);
    }
  }, []);

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      let newIndex = direction === 'left' ? activeIndex - 1 : activeIndex + 1;
      if (newIndex < 0) newIndex = plans.length - 1;
      else if (newIndex >= plans.length) newIndex = 0;
      scrollToIndex(newIndex);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeIndex, plans, scrollToIndex]
  );

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      scroll('right');
    }, 6000);
  }, [scroll]);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const clientWidth = container.clientWidth;
      const newActiveIndex = Math.round(scrollLeft / clientWidth);
      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
        stopAutoScroll(); // Detener el auto-scroll
        startAutoScroll(); // Y reiniciarlo después de un breve período si lo deseas, o no reiniciarlo automáticamente después de scroll manual
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, startAutoScroll, stopAutoScroll]);

  return (
    <section id="precios" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Elige tu Plan Perfecto</h2>
        </div>

        {/* Carrusel para móviles */}
        <div className="block lg:hidden">
          <div className="relative">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-4 py-2"
              onPointerEnter={stopAutoScroll}
              onPointerLeave={startAutoScroll}
            >
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`snap-center flex-shrink-0 w-full px-2 py-2`}
                >
                  <div
                    className={`bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ${plan.isHighlighted ? 'ring-4 ring-purple-500 scale-105 z-10' : ''
                      }`}
                  >
                    <div className={`px-6 py-4 ${plan.colorClass}`}>
                      <h3 className="text-2xl font-bold text-center">{plan.name}</h3>
                      {plan.tag && (
                        <span className="block text-center text-sm bg-yellow-400 text-purple-900 px-3 py-1 rounded-full mx-auto w-max mt-2 font-semibold">
                          {plan.tag}
                        </span>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="text-center mb-6">
                        <span className="text-gray-400 line-through text-lg">
                          {formatPrice(plan.originalPrice)}
                        </span>
                        <div className="text-5xl font-bold text-gray-900 my-2">
                          {formatPrice(plan.currentPrice)}
                        </div>
                        <div className="text-green-500 font-semibold">
                          Ahorra {formatPrice(plan.originalPrice - plan.currentPrice)}
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-4 font-medium">
                          Elige uno de nuestros diseños exclusivos
                        </p>
                        <div className="space-y-2">
                          {plan.exampleLinks.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.href}
                              className="block text-purple-600 hover:text-purple-700 hover:underline text-sm font-medium"
                            >
                              {link.text}
                            </a>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 mb-8">
                        <h4 className="font-semibold text-gray-900">Incluye:</h4>
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-2 text-sm">
                              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-gray-600">{feature.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        className={`w-full py-4 rounded-xl font-bold text-white transition-colors ${plan.buttonColorClass}`}
                      >
                        SELECCIONAR PLAN
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {plans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === activeIndex ? 'bg-indigo-600' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Ir a plan ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Grid para pantallas medianas y grandes */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 items-center justify-center">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ${plan.isHighlighted ? 'ring-4 ring-purple-500 scale-105 z-10' : ''
                }`}
            >
              <div className={`px-6 py-4 ${plan.colorClass}`}>
                <h3 className="text-2xl font-bold text-center">{plan.name}</h3>
                {plan.tag && (
                  <span className="block text-center text-sm bg-yellow-400 text-purple-900 px-3 py-1 rounded-full mx-auto w-max mt-2 font-semibold">
                    {plan.tag}
                  </span>
                )}
              </div>

              <div className="p-6">
                <div className="text-center mb-6">
                  <span className="text-gray-400 line-through text-lg">
                    {formatPrice(plan.originalPrice)}
                  </span>
                  <div className="text-5xl font-bold text-gray-900 my-2">
                    {formatPrice(plan.currentPrice)}
                  </div>
                  <div className="text-green-500 font-semibold">
                    Ahorra {formatPrice(plan.originalPrice - plan.currentPrice)}
                  </div>
                </div>

                {/* <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-4 font-medium">
                    Elige uno de nuestros diseños exclusivos
                  </p>
                  <div className="space-y-2">
                    {plan.exampleLinks.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.href}
                        className="block text-purple-600 hover:text-purple-700 hover:underline text-sm font-medium"
                      >
                        {link.text}
                      </a>
                    ))}
                  </div>
                </div> */}

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900">Incluye:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm">
                        <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full py-4 rounded-xl font-bold text-white transition-colors cursor-pointer ${plan.buttonColorClass}`}
                >
                  SELECCIONAR PLAN
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};