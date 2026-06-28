type BrandMarkProps = {
  size?: number;
  className?: string;
};

// The "regulation dial" — agitated peaks on the left settling into calm,
// even breathing on the right; the single brass node marks regulation.
export function BrandMark({ size = 28, className }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Calm Blueprint mark"
      className={className}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="50" cy="50" r="38" strokeWidth="2.4" />
        <line x1="6" y1="50" x2="12" y2="50" strokeWidth="2.4" />
        <line x1="88" y1="50" x2="94" y2="50" strokeWidth="2.4" />
        <line x1="20" y1="50" x2="80" y2="50" strokeWidth="1" opacity="0.4" />
        <path
          d="M26,50 Q29,30 32,50 Q35,67 38,50 Q41,38 44,50 Q47,58 50,50 Q53,45 56,50 Q59,54 62,50 Q65,48 68,50 Q71,51.5 74,50"
          strokeWidth="3"
        />
      </g>
      <circle cx="74" cy="50" r="3.6" fill="#C9A24B" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-bone ${className}`}
      aria-label="Calm Blueprint"
    >
      <BrandMark size={26} className="text-bone" />
      <span className="text-[13px] font-semibold uppercase tracking-[0.34em]">
        Calm Blueprint
      </span>
    </span>
  );
}
