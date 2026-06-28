import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { BannerStrip } from "./components/BannerStrip";
import { StatBar } from "./components/StatBar";
import { WhatYouGet } from "./components/WhatYouGet";
import { WhyYourAudience } from "./components/WhyYourAudience";
import { Partners } from "./components/Partners";
import { Partnership } from "./components/Partnership";
import { TheFit } from "./components/TheFit";
import { HowItWorks } from "./components/HowItWorks";
import { Faq } from "./components/Faq";
import { ApplyForm } from "./components/ApplyForm";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <BannerStrip />
        <StatBar />
        <WhatYouGet />
        <WhyYourAudience />
        <Partners />
        <Partnership />
        <TheFit />
        <HowItWorks />
        <Faq />
        <ApplyForm />
      </main>
      <Footer />
    </div>
  );
}
