// components/FeaturesSection.tsx
'use client'; // Indicar que este componente se ejecuta en el lado del cliente

import React from 'react';

export const FeaturesSection: React.FC = () => {
  // Mantengo las características completas que definimos anteriormente
  const features = [
    // --- Fundamentales y de Gestión ---
    {
      emoji: '✅',
      title: 'Confirmación de Asistencia (RSVP)',
      description: 'Gestiona tu lista de invitados sin esfuerzo. Tus asistentes confirman su presencia con un clic, incluso especificando acompañantes o preferencias, y tú recibes un control en tiempo real.',
    },
    {
      emoji: '📍',
      title: 'Ubicación Interactiva (Maps/Waze)',
      description: 'Guía a tus invitados sin errores. Con un toque, la ubicación se abre en Google Maps o Waze, asegurando que nadie se pierda.',
    },
    {
      emoji: '⏳',
      title: 'Cuenta Regresiva Personalizada',
      description: 'Mantén la emoción al máximo. Un contador dinámico que muestra los días, horas y minutos exactos que faltan para tu gran día.',
    },
    {
      emoji: '🎁',
      title: 'Mesa de Regalos / Bote Virtual',
      description: 'Facilita la elección de obsequios. Enlaza directamente a tu mesa de regalos en tiendas o brinda una opción segura para aportaciones económicas.',
    },
    {
      emoji: '📝',
      title: 'Información Adicional Completa',
      description: 'Resuelve todas las dudas de tus invitados de antemano. Incluye detalles sobre código de vestimenta, hospedaje, transporte, horarios y más, todo en un solo lugar.',
    },

    // --- Interacción y Personalización Avanzada ---
    {
      emoji: '📸',
      title: 'Galería de Fotos y Videos',
      description: 'Comparte tu historia visualmente. Presenta una galería multimedia con los momentos más especiales, clips pre-evento o incluso un "save the date" en video.',
    },
    {
      emoji: '✨',
      title: 'Diseño Exclusivo y 100% Personalizado',
      description: 'Tu evento, tu esencia. Cada invitación se diseña a medida con tu paleta de colores, tipografías y estilo, garantizando una pieza única que refleja tu personalidad.',
    },
    {
      emoji: '🎶',
      title: 'Música Ambiente Personalizada',
      description: 'Crea la atmósfera perfecta desde el primer clic. Añade tu canción favorita o la melodía de tu evento para una experiencia inmersiva.',
    },
    {
      emoji: '🔗',
      title: 'Vínculos a Redes Sociales y Hashtag',
      description: 'Conecta y amplifica la emoción. Facilita que tus invitados compartan, etiqueten y se unan a la conversación online de tu evento.',
    },

    // --- Vanguardia e Innovación ---
    {
      emoji: '🎫',
      title: 'Pase de Acceso con Código QR Personalizado',
      description: 'Moderniza la entrada a tu evento. Genera códigos QR únicos por invitado para un control de acceso ágil, seguro y sin contacto.',
    },
    // {
    //   emoji: '🤖',
    //   title: 'Asistente Virtual Integrado (Chatbot)',
    //   description: 'Atención 24/7 para tus invitados. Un chatbot inteligente que responde preguntas frecuentes al instante, liberándote de consultas repetitivas.',
    // },
    // {
    //   emoji: '💬',
    //   title: 'Mensajes y Recordatorios Personalizados',
    //   description: 'Comunicación dirigida y efectiva. Envía recordatorios clave o mensajes específicos a grupos de invitados, asegurando que nadie se pierda un detalle.',
    // },
    {
      emoji: '🗓️',
      title: 'Sincronización con Calendarios (Google, Outlook)',
      description: 'Facilita la agenda de tus invitados. Permíteles añadir el evento directamente a su calendario personal con todos los detalles.',
    },
    {
      emoji: '📈',
      title: 'Métricas de Interacción y Apertura',
      description: 'Obtén insights valiosos. Monitorea cuántos invitados han abierto la invitación, clicado en enlaces o confirmado asistencia, para optimizar tu estrategia.',
    },
     {
      emoji: '🗺️',
      title: 'Múltiples Ubicaciones/Eventos (Bodas Destino, etc.)',
      description: 'Ideal para eventos con varias fases o locaciones. Ofrece diferentes mapas, horarios y detalles para cada parte de la celebración dentro de la misma invitación.',
    },
    {
      emoji: '🌟',
      title: 'Testimonios o Mensajes de los Invitados',
      description: 'Crea un muro interactivo donde los invitados puedan dejar mensajes, felicitaciones o anécdotas, enriqueciendo la experiencia para todos.',
    },
  ];

  return (
    <section id="funciones" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Encabezado de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center leading-tight text-gray-800">
            Invitaciones con{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              Funciones que Sorprenden
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Haz de tu invitación una experiencia única: interactiva, memorable y lista para compartir al instante.
          </p>
        </div>

        {/* Contenedor principal que maneja el cambio entre carrusel y grid */}
        {/* Carrusel para pantallas pequeñas y Grid para pantallas medianas y grandes */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Carrusel (visible solo en móviles) */}
          <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 no-scrollbar"> {/* Ajustado px a 4 y pb a 4 */}
            {features.map((feature, index) => (
              <div
                key={index}
                className="snap-center flex-shrink-0 w-80 sm:w-96 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 flex flex-col"
              >
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 flex-shrink-0">
                  <span className="text-2xl">{feature.emoji}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Grid (visible solo en pantallas medianas y grandes) */}
          {/* No necesitas un div adicional `hidden md:grid` aquí si el padre ya es un `md:grid`
              La magia de Tailwind es que si el padre es grid, los hijos serán ítems de grid
              Y simplemente ocultas el carrusel en md y el grid en sm
           */}
          {features.map((feature, index) => (
            <div key={index} className="hidden md:block group"> {/* Ocultar en móviles, mostrar en md y superiores */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 flex-shrink-0">
                  <span className="text-3xl">{feature.emoji}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};