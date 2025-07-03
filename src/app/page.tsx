import { Banner, BenefitsSection, ConfettiEffect, ContactForm, FeaturesSection, Footer, Navbar, PricingPlans, TypeEvents } from "@/components";


export default function Home() {
  return (
    <>
      <Navbar />
      <ConfettiEffect />
      <Banner />
      <TypeEvents />
      <PricingPlans />
      <BenefitsSection />
      <FeaturesSection />
      <ContactForm />
      <Footer />
    </>
  );
}
