import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { OfferTeaser } from "./components/OfferTeaser";
import { BrandIntro } from "./components/BrandIntro";
import { AudienceFit } from "./components/AudienceFit";
import { PartnershipDetails } from "./components/PartnershipDetails";
import { HowItWorks } from "./components/HowItWorks";
import { Faq } from "./components/Faq";
import { ApplicationForm } from "./components/ApplicationForm";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <OfferTeaser />
        <BrandIntro />
        <AudienceFit />
        <PartnershipDetails />
        <HowItWorks />
        <Faq />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
}
