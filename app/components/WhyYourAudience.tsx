import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

const TERRITORIES = ["Sleep", "Regulation", "Focus", "Energy", "Mind"];

export function WhyYourAudience() {
  return (
    <section className="bg-ink">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow centered>Why your audience</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-bone sm:text-4xl md:text-[2.75rem]">
              If your audience already asks about sleep, stress, or burnout,
              they&rsquo;re already qualified.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-bone-dim">
              Calm Blueprint&rsquo;s customers are founders, executives, and
              high-performers in their 30s and 40s — the same audience that
              already follows creators covering these five territories:
            </p>
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
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
