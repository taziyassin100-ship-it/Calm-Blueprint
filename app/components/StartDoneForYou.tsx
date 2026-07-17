import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { CheckBadge } from "./TheFit";

const DONE_FOR_YOU = [
  "The product",
  "The store",
  "Order handling and fulfilment",
  "The posting plan",
  "The marketing plan",
  "Customer support",
  "Everything adapted to your audience",
];

const YOURS_TO_DO = ["Share it with your audience", "Follow the plan we give you"];

export function StartDoneForYou() {
  return (
    <section className="bg-grad-ink">
      <Container className="py-24 sm:py-32">
        <SectionHeader
          eyebrow="What’s done, what’s yours"
          title="Here’s exactly where the line is."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="surface-card h-full rounded-2xl border border-line p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-brass">
                Done for you
              </h3>
              <ul className="mt-6 space-y-4">
                {DONE_FOR_YOU.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-bone-dim">
                    <CheckBadge />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="surface-card-feature glow-brass-strong h-full rounded-2xl border border-brass p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-brass">
                Yours to do
              </h3>
              <ul className="mt-6 space-y-4">
                {YOURS_TO_DO.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-bone-dim">
                    <CheckBadge />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-semibold text-brass">That&rsquo;s it.</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
