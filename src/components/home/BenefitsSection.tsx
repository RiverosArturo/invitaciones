
export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      emoji: '💸', // Emoji de billetes o ahorro
      title: 'Inteligencia Financiera para tu Evento', // Enfocado en la decisión inteligente
      description: 'Olvídate de los altos costos de impresión y los envíos interminables. Invierte tu presupuesto donde realmente importa y obtén más por menos, con un diseño premium al alcance de tu mano.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      emoji: '⚡', // Emoji de rayo para rapidez
      title: 'Conexión Instantánea, Experiencia Fluida', // Destaca rapidez y facilidad
      description: 'Llega a tus invitados en segundos. Comparte tu invitación por WhatsApp, email o redes sociales y confirma asistencia al instante. Tu evento, a un clic de distancia.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      emoji: '🌳', // Emoji de árbol o naturaleza, más directo que el mundo
      title: 'Impacto Verde, Huella Digital', // Título más evocador
      description: 'Di adiós al papel y reduce tu impacto ambiental. Cada invitación digital es un paso hacia un planeta más sostenible, sin sacrificar la elegancia de tu evento.',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section id="ventajas" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-800">
            Más que una{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-600">
              Invitación Digital
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            ¿Listo para modernizar la forma en que invitas? Descubre las ventajas que solo una invitación digital puede ofrecerte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {benefit.emoji}
                </div>

                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};