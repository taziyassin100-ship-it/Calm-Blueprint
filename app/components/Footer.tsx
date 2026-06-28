import { Container } from "./Container";
import { Wordmark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-deep">
      <Container className="py-16 text-center">
        <div className="flex justify-center">
          <Wordmark />
        </div>
        <p className="mt-5 font-serif text-lg italic text-bone-dim">
          A blueprint for a calmer mind.
        </p>
        {/* Replace with the real partner inbox before launch. */}
        <a
          href="mailto:partners@calmblueprint.com"
          className="mt-6 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:text-bone-dim"
        >
          Questions? partners@calmblueprint.com
        </a>
      </Container>
    </footer>
  );
}
