import { EnvelopeAnimation, InvitationXV } from "@/components";

export const metadata = {
  title: 'Invitación Digital XV Años ✨ | Muestra Plan Innovador',
  description: 'Descubre nuestra invitación digital de XV años de muestra. Sumérgete en un diseño interactivo y funciones sorprendentes. ¡La forma más moderna de invitar a tus seres queridos a tu gran fiesta!',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function XVPage() {
  return (
    <EnvelopeAnimation>
      <InvitationXV />
    </EnvelopeAnimation>
  );
}
