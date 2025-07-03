'use client'

import Image from 'next/image';
import Link from 'next/link';

export const Banner = () => {
    return (
        <section className="bg-gradient-to-br from-[#F8F6F4] to-amber-50 py-12 px-6 md:px-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
                {/* Text content */}
                <div className="text-center md:text-left md:w-1/2">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-amber-600 leading-tight">
                        Haz que tu invitación<br /><span className="text-black">diga tanto como tu evento</span>
                    </h1>
                    <p className="mt-4 text-gray-700 text-lg">
                        Sorprende a tus invitados desde el primer clic con invitaciones web personalizadas, interactivas y fáciles de compartir. Ideal para bodas, cumpleaños, eventos empresariales y más.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link href="/invitaciones/xv" className="bg-amber-600 hover:bg-amber-700 text-white text-base px-6 py-3 rounded-xl cursor-pointer">
                            Descubrir Diseño
                        </Link>
                        <Link href="#contacto" className="text-amber-600 border border-amber-500 hover:border-amber-400 hover:bg-amber-100 text-base px-6 py-3 rounded-xl cursor-pointer">
                            Solicitar Cotización
                        </Link>
                    </div>
                </div>

                {/* Images - Adaptadas para lucir las nuevas imágenes en la disposición existente */}
                <div className="relative md:w-1/2 flex justify-center">
                    {/* Imagen principal (más grande) con un ligero giro inicial */}
                    <div className="relative w-[280px] h-[390px] transform rotate-[-5deg] hover:rotate-[-2deg] transition-all duration-300">
                        <Image
                            src="https://res.cloudinary.com/dsu3au60t/image/upload/v1751074632/banner2_x8pbtl.jpg"
                            alt="Invitación digital principal"
                            fill
                            className="rounded-2xl shadow-xl object-cover" // Manteniendo el estilo de la imagen grande
                        />
                    </div>
                    {/* Imagen secundaria (más pequeña) superpuesta, con otro giro y ajuste de posición */}
                    <div className="absolute -bottom-6 -right-6 w-[220px] h-[310px] transform rotate-[5deg] hover:rotate-[2deg] transition-all duration-300">
                        <Image
                            src="https://res.cloudinary.com/dsu3au60t/image/upload/v1751074230/banner1_hm7xnd.jpg"
                            alt="Invitación digital secundaria"
                            fill
                            className="rounded-2xl shadow-md object-cover border-3 border-white" // Manteniendo el estilo de la imagen pequeña
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}