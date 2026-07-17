import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function StartHero() {
  return (
    <section className="bg-grad-ink relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-24">
      <div className="blueprint-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[540px] w-[860px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(232,181,62,0.14), transparent 70%)" }}
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow centered>You&rsquo;re in</Eyebrow>
            <h1 className="mt-6 font-serif text-3xl font-medium leading-[1.1] tracking-[-0.01em] text-bone sm:text-4xl md:text-5xl">
              This is how you can start.
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-bone-dim">
              Everything&rsquo;s already built. No funnel to wire, nothing to
              create. Here&rsquo;s exactly how the partnership works, start to
              finish, so you can begin with zero guesswork.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
