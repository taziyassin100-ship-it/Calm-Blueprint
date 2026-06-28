import type { ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

type Stat = {
  icon: ReactNode;
  value: ReactNode;
  label: string;
};

const iconClass =
  "h-6 w-6 stroke-brass [stroke-width:1.6] fill-none [stroke-linecap:round] [stroke-linejoin:round]";

const STATS: Stat[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <path d="M4 16l5-5 4 4 7-8" />
        <path d="M16 3h4v4" />
      </svg>
    ),
    value: <span className="text-brass">Up to 70%</span>,
    label: "Founding-partner commission",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9.5 9.2c0-1.2 1.1-2 2.5-2s2.5.8 2.5 2-1.1 1.8-2.5 1.8-2.5.6-2.5 1.8 1.1 2 2.5 2 2.5-.8 2.5-2" />
      </svg>
    ),
    value: <span className="text-brass">$0</span>,
    label: "To join — no fee, no subscription",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <path d="M12 3l8 4-8 4-8-4 8-4z" />
        <path d="M4 12l8 4 8-4M4 17l8 4 8-4" />
      </svg>
    ),
    value: (
      <>
        <span className="text-brass">5</span> territories
      </>
    ),
    label: "Sleep · stress · focus · energy · mind",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.2-2.8 7.6-7 9-4.2-1.4-7-4.8-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    value: "No quotas",
    label: "No content minimums, ever",
  },
];

export function StatBar() {
  return (
    <section className="bg-ink">
      <Container className="py-16 sm:py-20">
        <Reveal>
          <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-line">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center px-4 text-center md:px-6"
              >
                {stat.icon}
                <dd className="mt-4 font-serif text-3xl font-medium text-bone sm:text-4xl">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-sm text-bone-dim">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
