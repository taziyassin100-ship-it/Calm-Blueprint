"use client";

import { useEffect, useState } from "react";
import { Container } from "./Container";
import { Wordmark } from "./BrandMark";
import { CtaButton } from "./CtaButton";

export function Nav({
  brandHref = "#top",
  showCta = true,
  ctaHref = "/partners/start",
  ctaLabel = "Apply to partner →",
}: {
  brandHref?: string;
  showCta?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
} = {}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/90 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between py-4">
        <a
          href={brandHref}
          className="rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
        >
          <Wordmark />
        </a>
        {showCta && (
          <CtaButton href={ctaHref} className="px-6 py-2.5 text-[13px]">
            {ctaLabel}
          </CtaButton>
        )}
      </Container>
    </header>
  );
}
