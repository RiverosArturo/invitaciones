'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import gsap from 'gsap';
import { Dancing_Script } from 'next/font/google';
import { SparklesF } from '@/components';

const dancing_script = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });

interface RSVPFormData {
  name: string;
  attend: 'yes' | 'no' | ''; 
  message?: string; 
}

export const RSVPSection = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [sent, setSent] = useState(false);

    const { register, handleSubmit, reset } = useForm<RSVPFormData>();

    const onSubmit = (data: RSVPFormData) => { 
        if (!formRef.current) return;
        console.log({data});
        gsap.to(formRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                setSent(true);
                reset();
            },
        });
    };

    return (
        <section
            id="formulario"
            className="bg-gradient-to-b from-purple-100 to-purple-300 flex flex-col items-center justify-center text-purple-900 overflow-hidden p-6"
        >
            <SparklesF />

            <motion.section
                id="rsvp"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8 }}
                className="py-8 px-4 bg-gradient-to-b from-purple-300 to-purple-50 backdrop-blur-lg rounded-xl mx-4 md:mx-auto max-w-md shadow-xl text-center"
            >
                <h2 className={`text-4xl mb-4 text-purple-900 ${dancing_script.className}`}>Confirmación de Asistencia</h2>
                {sent ? (
                    <p className="text-green-600 font-bold text-lg">¡Gracias por confirmar!</p>
                ) : (
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 text-left"
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm mb-1 text-purple-700">Nombre completo</label>
                            <input
                                id="name" // Añade un id para el label
                                type="text"
                                {...register('name', { required: true })}
                                placeholder="Nombre completo"
                                className="w-full p-3 rounded border border-purple-300"
                            />
                        </div>

                        <div>
                            <label htmlFor="attend" className="block text-sm mb-1 text-purple-700">¿Asistirás?</label>
                            <select
                                id="attend" // Añade un id para el label
                                {...register('attend', { required: true })}
                                className="w-full p-3 rounded border border-purple-300"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="yes">Sí, asistiré</option>
                                <option value="no">No podré asistir</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm mb-1 text-purple-700">Mensaje (opcional)</label>
                            <textarea
                                id="message" // Añade un id para el label
                                {...register('message')}
                                placeholder="Escribe un mensaje..."
                                className="w-full p-3 rounded border border-purple-300"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                        >
                            Enviar
                        </button>
                    </form>
                )}
            </motion.section>
        </section>
    );
};