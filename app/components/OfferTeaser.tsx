// app/components/OfferTeaser.tsx
import { Container } from "./Container";

export function OfferTeaser() {
  return (
    <section className="bg-midnight text-bone">
      <Container className="py-10 text-center">
        <p className="font-serif text-xl sm:text-2xl">
          Founding partners earn <span className="text-brass">70% commission</span> on every
          sale, before the rate settles at 40%.
        </p>
        <p className="mt-2 text-sm text-mist">
          We only make money when you make money — no fee to join, ever.
        </p>
      </Container>
    </section>
  );
}
