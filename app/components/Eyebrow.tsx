import type { ReactNode } from "react";

// Section label: ALL CAPS sans, letter-spaced, muted — led by a single
// brass hairline (the brand's "datum" motif), the one accent per section.
export function Eyebrow({
  children,
  centered = false,
  className = "",
}: {
  children: ReactNode;
  centered?: boolean;
  className?: string;
}) {
  const tick = <span className="h-px w-7 bg-brass" aria-hidden="true" />;
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted ${
        centered ? "justify-center" : ""
      } ${className}`}
    >
      {tick}
      {children}
      {centered && tick}
    </p>
  );
}
