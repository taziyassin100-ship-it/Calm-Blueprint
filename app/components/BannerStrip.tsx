import { Container } from "./Container";

export function BannerStrip() {
  return (
    <div className="border-y border-line bg-gradient-to-r from-ink-panel via-ink-card to-ink-panel">
      <Container className="py-5">
        <p className="text-center text-sm leading-relaxed text-bone-dim sm:text-base">
          Partners earn{" "}
          <span className="font-serif font-medium text-brass">up to 70%</span> on
          every sale, before the rate settles at{" "}
          <span className="font-serif font-medium text-brass">40%</span>. No
          fee to join, ever.
        </p>
      </Container>
    </div>
  );
}
