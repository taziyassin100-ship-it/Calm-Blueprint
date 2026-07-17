import type { ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

type Stat = {
  icon: ReactNode;
  value: ReactNode;
  label: string;
};

const iconClass =
  "icon-animated h-8 w-8 stroke-brass [stroke-width:1.9] fill-none [stroke-linecap:round] [stroke-linejoin:round]";

const STATS: Stat[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <path d="M4 18l6-6 4 4 5.5-6.5" />
        <path d="M14.5 9.5h5v5" />
      </svg>
    ),
    value: <span className="text-brass">Up to 70%</span>,
    label: "Partner commission",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6.5v11M14.5 9c0-1.2-1.1-2-2.6-2s-2.6.8-2.6 1.9 1.1 1.8 2.6 1.8 2.6.7 2.6 1.9-1.1 2-2.6 2-2.6-.8-2.6-2" />
      </svg>
    ),
    value: <span className="text-brass">$0</span>,
    label: "To join, no fee or subscription",
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
    <section className="bg-grad-ink">
      <Container className="py-16 sm:py-20">
        <Reveal>
          <dl className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-line">
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
