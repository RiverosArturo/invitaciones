'use client';
import { FaChurch, FaUtensils } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { BiDrink } from "react-icons/bi";
import { GiMusicalScore, GiPartyPopper } from "react-icons/gi";
import { Gift, HotelImage, ItineraryItem, LocationItem } from '@/interfaces';
import { CountdownSection, DressCodeSection, GallerySection, GiftRegistrySection, GuestsSection, HeroSection, ItinerarySection, LocationsSection, LodgingSection, ParentSection, RSVPSection, ShareOnSocialsSection } from '@/components';





export const InvitationXV = () => {
    const itineraryItems: ItineraryItem[] = [
        {
            title: "Ceremonia Religiosa",
            description: "Acompaña a la quinceañera a recibir la bendición de Dios.",
            icon: <FaChurch size={25} className="text-purple-900" />, // URL de un icono representativo
            alt: "Icono de Iglesia",
        },
        {
            title: "Sesión de Fotos",
            description: "Captura momentos especiales con Mariana.",
            icon: <GrGallery size={25} className="text-purple-900" />, // URL de un icono de cámara/fotos
            alt: "Icono de Cámara",
        },
        {
            title: "Cóctel de Bienvenida",
            description: "Disfruta de un refrescante cóctel y aperitivos.",
            icon: <BiDrink size={25} className="text-purple-900" />,
            alt: "Icono de Cóctel",
        },
        {
            title: "Baile de XV Años",
            description: "Presencia el emotivo vals de la quinceañera.",
            icon: <GiMusicalScore size={25} className="text-purple-900" />,
            alt: "Icono de Baile",
        },
        {
            title: "Cena de Gala",
            description: "Deléitate con una exquisita cena.",
            icon: <FaUtensils size={25} className="text-purple-900" />, // URL de un icono de cubiertos/comida
            alt: "Icono de Cena",
        },
        {
            title: "Fiesta y Celebración",
            description: "¡A bailar y celebrar toda la noche!",
            icon: <GiPartyPopper size={25} className="text-purple-900" />,
            alt: "Icono de Fiesta",
        },
    ];

    // Ejemplos de datos para las Ubicaciones
    const locations: LocationItem[] = [
        {
            type: "Ceremonia",
            time: "6:00 p.m.",
            name: "Santa Iglesia Catedral",
            image: "https://res.cloudinary.com/dsu3au60t/image/upload/v1751306765/catedralTeziutlan_vcfmfm.jpg", // Foto del lugar
            mapLink: "https://maps.app.goo.gl/FSJsbKpQsn8ExsLf9", // Enlace real a Google Maps
        },
        {
            type: "Recepción",
            time: "8:00 p.m.",
            name: "Salón de Eventos 'Hotel Danini'",
            image: "https://res.cloudinary.com/dawwp31sm/image/upload/v1694404180/eventos/boda2_jnrajr.jpg", // Foto del lugar
            mapLink: "https://maps.app.goo.gl/pVpBmJyLh7MMvkhx8", // Enlace real a Google Maps
        },
    ];

    // Ejemplos de datos para las Imágenes del Hotel
    const hotelImages: HotelImage[] = [
        {
            src: "https://res.cloudinary.com/dawwp31sm/image/upload/v1694405110/inicio/inicio_oox5il.jpg", // Imagen del hotel 1
            alt: "Hotel Danini",
            ubication: "https://maps.app.goo.gl/pVpBmJyLh7MMvkhx8",
        },
        {
            src: "https://res.cloudinary.com/dsu3au60t/image/upload/v1751312112/hotel_k1lxbo.jpg", // Imagen del hotel 2
            alt: "Hotel Fiesta Inn",
            ubication: "https://maps.app.goo.gl/byhBg9WR2NSUaaDu6",
        },
    ];
    const giftOptions: Gift[] = [
        {
            id: '1',
            logoSrc: "https://res.cloudinary.com/dsu3au60t/image/upload/v1751442035/palacioHierro_lepubi.jpg",
            logoAlt: "PalacioDeHierro",
            link: "https://www.elpalaciodehierro.com/?srsltid=AfmBOorf-m-SiDMQ59Sg5RjB8jbCyrRVYeOiHB661_rIEKU51TeJJwji"
        },
        {
            id: '2',
            logoSrc: "https://res.cloudinary.com/dsu3au60t/image/upload/v1751442034/liverpool_dyhrw2.webp",
            logoAlt: "Liverpool",
            link: "https://www.liverpool.com.mx/tienda/home"
        }
    ];

    const galleryImages = [
        "https://res.cloudinary.com/dsu3au60t/image/upload/v1751486258/xv4_qwtfjt.jpg",
        "https://res.cloudinary.com/dsu3au60t/image/upload/v1751486258/xv3_o9h0du.jpg",
        "https://res.cloudinary.com/dsu3au60t/image/upload/v1751486258/xv2_kl8ats.jpg",
        "https://res.cloudinary.com/dsu3au60t/image/upload/v1751486259/xv1_apmyvz.jpg",
    ];

    return (
        <div className="w-full overflow-x-hidden bg-gradient-to-b from-purple-300 to-purple-100">
            <HeroSection />
            <CountdownSection eventDate={new Date('2025-12-25T20:00:00')} backgroundImageSrc="https://res.cloudinary.com/dsu3au60t/image/upload/v1751073303/xva%C3%B1os_qazid8.jpg" />
            <GuestsSection guestName='Familia Garcia' passes={4} />
            <ParentSection />
            <ItinerarySection items={itineraryItems} />
            <LocationsSection locations={locations} />
            <LodgingSection images={hotelImages} />
            <DressCodeSection />
            <ShareOnSocialsSection backgroundImageUrl={'https://res.cloudinary.com/dsu3au60t/image/upload/v1751439420/xvInsta_ww4i7x.jpg'} hashtag={'XVMariaSparza'} />
            <GiftRegistrySection giftOptions={giftOptions} />
            <GallerySection
                images={galleryImages}
            />
            <RSVPSection />
        </div>

    );
};
