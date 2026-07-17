import type { Metadata } from "next";
import { Nav } from "../../components/Nav";
import { StartHero } from "../../components/StartHero";
import { StartVideo } from "../../components/StartVideo";
import { HowItWorks } from "../../components/HowItWorks";
import { StartDoneForYou } from "../../components/StartDoneForYou";
import { Faq } from "../../components/Faq";
import { StartReassurance } from "../../components/StartReassurance";
import { StartFinalCta } from "../../components/StartFinalCta";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "How to start | Calm Blueprint Partner Program",
  description:
    "You're in. Here's exactly how the Calm Blueprint partnership works, start to finish.",
};

const HOW_IT_WORKS_STEPS = [
  {
    n: "01",
    title: "We hand you the product",
    body: "Premium and finished, the kind of thing your audience already wants. Nothing to make, ship, or support.",
  },
  {
    n: "02",
    title: "We hand you the plan",
    body: "The store, the posting plan, and the marketing plan: all built and ready, adapted to your audience.",
  },
  {
    n: "03",
    title: "You share it, your way",
    body: "Your own schedule, in your own voice. No quota, no content minimums.",
  },
  {
    n: "04",
    title: "You get paid",
    body: "Up to 70% of every sale through your link. We only earn when you do.",
  },
];

const FAQS = [
  {
    q: "Do I have to create content from scratch?",
    a: "No. We give you hooks, captions, and a ready plan. You adapt them to your voice.",
  },
  {
    q: "How much time does it take?",
    a: "Minutes, not a content sprint. No quota, no minimum.",
  },
  {
    q: "What do I actually post?",
    a: "A simple flow we hand you: value first, then a short launch, laid out step by step.",
  },
  {
    q: "How do you help me sell?",
    a: "We've built the product, the offer, the proof, and the plan. You point your audience to it. The page and the protocol do the convincing.",
  },
  {
    q: "What if I've never sold anything?",
    a: "Fine. The plan is built for exactly that. You follow a path, you don't invent one.",
  },
  {
    q: "When and how do I get paid?",
    a: "We'll confirm your payout schedule and method by email once your application is reviewed. You earn commission on every sale through your link.",
  },
];

export default function PartnerStart() {
  return (
    <div className="flex min-h-full flex-col">
      <Nav brandHref="/" showCta={false} />
      <main className="flex-1">
        <StartHero />
        <StartVideo />
        <HowItWorks
          eyebrow="How it works"
          title="How it actually works, step by step."
          steps={HOW_IT_WORKS_STEPS}
        />
        <StartDoneForYou />
        <Faq eyebrow="Questions" title="Before you start" items={FAQS} />
        <StartReassurance />
        <StartFinalCta />
      </main>
      <Footer />
    </div>
  );
}
