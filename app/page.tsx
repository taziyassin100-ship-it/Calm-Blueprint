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
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { ApplyModalProvider } from "./components/ApplyModalContext";
import { ApplyModal } from "./components/ApplyModal";

export default function Home() {
  return (
    <ApplyModalProvider>
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
          <FinalCta />
        </main>
        <Footer />
      </div>
      <ApplyModal />
    </ApplyModalProvider>
  );
}
