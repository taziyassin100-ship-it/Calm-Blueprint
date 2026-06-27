import { Container } from "./Container";

export function PartnershipDetails() {
  return (
    <section id="partnership" className="border-b border-mist/20 bg-midnight text-bone">
      <Container className="py-20">
        <div className="eyebrow eyebrow-on-dark mb-4">THE PARTNERSHIP</div>
        <h2 className="max-w-2xl font-serif text-3xl font-medium tracking-[-0.01em] text-bone sm:text-4xl">
          40% commission, standard. 70% if you join the founding cohort.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-mist">
          You get a unique link. Every sale that comes through it earns you a commission —
          no fee to join, no minimum spend, no cost if it doesn&rsquo;t convert. We only make
          money when you make money.
        </p>

        <div className="datum-line my-10" />

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass-soft">
              Standard rate
            </div>
            <div className="mt-2 font-serif text-4xl text-bone">40%</div>
            <p className="mt-2 text-sm text-mist">Applies after the founding cohort closes.</p>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass-soft">
              Founding partner rate
            </div>
            <div className="mt-2 font-serif text-4xl text-brass">70%</div>
            <p className="mt-2 text-sm text-mist">
              For our first wave of partners — no fixed end date, but it won&rsquo;t stay open
              indefinitely.
            </p>
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-base text-mist">
          What you&rsquo;d be promoting: our flagship protocol, <em>The Cortisol Sleep Reset</em>
          , plus the wider catalogue across sleep, stress, focus, energy, and mind.
        </p>
      </Container>
    </section>
  );
}
