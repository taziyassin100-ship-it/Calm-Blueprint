type BrandMarkProps = {
  variant?: "light" | "dark";
  size?: number;
  className?: string;
};

const STROKE_COLORS = {
  light: { mark: "#122337", line: "#5C7894" },
  dark: { mark: "#F2EBDB", line: "#B7C7D6" },
} as const;

export function BrandMark({ variant = "light", size = 40, className }: BrandMarkProps) {
  const { mark, line } = STROKE_COLORS[variant];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Calm Blueprint mark"
      className={className}
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="50" r="38" stroke={mark} strokeWidth="2.4" />
        <line x1="6" y1="50" x2="12" y2="50" stroke={mark} strokeWidth="2.4" />
        <line x1="88" y1="50" x2="94" y2="50" stroke={mark} strokeWidth="2.4" />
        <line x1="20" y1="50" x2="80" y2="50" stroke={line} strokeWidth="1" opacity="0.45" />
        <path
          d="M26,50 Q29,30 32,50 Q35,67 38,50 Q41,38 44,50 Q47,58 50,50 Q53,45 56,50 Q59,54 62,50 Q65,48 68,50 Q71,51.5 74,50"
          stroke={mark}
          strokeWidth="3"
        />
      </g>
      <circle cx="74" cy="50" r="3.6" fill="#C4A35A" />
    </svg>
  );
}
