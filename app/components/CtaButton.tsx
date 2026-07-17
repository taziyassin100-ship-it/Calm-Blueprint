import type { ReactNode } from "react";
import { brassButtonClass } from "./buttonStyles";

// The single repeated conversion action — a solid brass pill that
// sends visitors to the partner "how it starts" page.
export function CtaButton({
  children = "Apply to partner →",
  className = "",
  href = "/partners/start",
}: {
  children?: ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={`${brassButtonClass} hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </a>
  );
}
