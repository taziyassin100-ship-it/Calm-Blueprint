import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";

const TERRITORIES = ["Sleep", "Regulation", "Focus", "Energy", "Mind"];

export function WhyYourAudience() {
  return (
    <section className="bg-grad-ink">
      <Container className="py-24 sm:py-32">
        <SectionHeader
          eyebrow="Why your audience"
          title={
            <>
              If your audience already asks about sleep, stress, or burnout,
              they&rsquo;re already qualified.
            </>
          }
          intro={
            <>
              Calm Blueprint&rsquo;s customers are founders, executives, and
              high-performers in their 30s and 40s, the same audience that
              already follows creators covering these five territories:
            </>
          }
          containerClassName="max-w-3xl"
        >
          <ul className="mt-9 flex flex-wrap justify-center gap-3">
            {TERRITORIES.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-bone-dim"
              >
                {t}
              </li>
            ))}
          </ul>
        </SectionHeader>
      </Container>
    </section>
  );
}
