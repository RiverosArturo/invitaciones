
export interface ItineraryItem { title: string; description: string; icon: React.ReactNode; alt: string; }
export interface TimeLeft { dias: number; horas: number; minutos: number; segundos: number; }
export interface LocationItem { type: string; time: string; name: string; image: string; mapLink: string; }
export interface HotelImage { src: string; alt: string; ubication: string }
export interface Gift {id: string; logoSrc: string; logoAlt: string; link: string;}