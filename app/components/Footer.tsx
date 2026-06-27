import { BrandMark } from "./BrandMark";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-ink py-14 text-center text-mist">
      <Container>
        <div className="flex justify-center">
          <BrandMark variant="dark" size={36} />
        </div>
        <p className="mt-4 font-serif text-xl italic text-bone">
          A blueprint for a calmer mind.
        </p>
        {/* Placeholder contact address — replace with the real partner inbox. */}
        <p className="mt-4 font-mono text-xs tracking-[0.16em] text-slate">
          QUESTIONS? PARTNERS@CALMBLUEPRINT.COM
        </p>
      </Container>
    </footer>
  );
}
