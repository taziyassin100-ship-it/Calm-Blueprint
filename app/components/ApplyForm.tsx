"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import {
  validateApplication,
  type ApplicationErrors,
  type ApplicationInput,
} from "@/lib/validation";

const PLATFORMS = ["Instagram", "YouTube", "TikTok", "X", "Newsletter", "Podcast", "Other"];

const EMPTY_FORM: ApplicationInput = {
  name: "",
  email: "",
  platform: "",
  profileLink: "",
  audienceSize: "",
  note: "",
};

const fieldClass =
  "w-full rounded-lg border border-line bg-ink px-4 py-3 text-bone placeholder:text-muted focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass";

export function ApplyForm() {
  const [form, setForm] = useState<ApplicationInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function update<K extends keyof ApplicationInput>(
    key: K,
    value: ApplicationInput[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { valid, errors: validationErrors } = validateApplication(form);
    setErrors(validationErrors);
    if (!valid) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setErrors(data.errors ?? {});
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("idle");
      setErrors({ name: "Something went wrong. Please try again." });
    }
  }

  return (
    <section id="apply" className="scroll-mt-24 bg-ink">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow centered>Apply</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-[-0.01em] text-bone sm:text-4xl md:text-[2.75rem]">
              Apply to become a founding partner
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-line bg-ink-card p-7 sm:p-10">
            {status === "success" ? (
              <div className="py-10 text-center">
                <h3 className="font-serif text-2xl text-bone">
                  Application received.
                </h3>
                <p className="mt-3 text-bone-dim">We&rsquo;ll be in touch.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-6">
                <Field label="Name" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={fieldClass}
                  />
                </Field>

                <Field label="Email" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={fieldClass}
                  />
                </Field>

                <Field label="Primary platform" error={errors.platform}>
                  <select
                    value={form.platform}
                    onChange={(e) => update("platform", e.target.value)}
                    className={fieldClass}
                  >
                    <option value="">Select a platform</option>
                    {PLATFORMS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Profile link" error={errors.profileLink}>
                  <input
                    type="text"
                    value={form.profileLink}
                    onChange={(e) => update("profileLink", e.target.value)}
                    placeholder="https://"
                    className={fieldClass}
                  />
                </Field>

                <Field label="Audience size" error={errors.audienceSize}>
                  <input
                    type="text"
                    value={form.audienceSize}
                    onChange={(e) => update("audienceSize", e.target.value)}
                    placeholder="e.g. 120K followers"
                    className={fieldClass}
                  />
                </Field>

                <Field label="Anything else we should know? (optional)">
                  <textarea
                    value={form.note}
                    onChange={(e) => update("note", e.target.value)}
                    rows={3}
                    className={fieldClass}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-2 w-full rounded-full bg-brass px-8 py-3.5 text-[15px] font-semibold tracking-wide text-ink shadow-[0_10px_30px_-12px_rgba(201,162,75,0.7)] transition duration-200 hover:bg-brass-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass disabled:opacity-60"
                >
                  {status === "submitting" ? "Submitting…" : "Submit application"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-sm text-[#e0916f]">{error}</span>}
    </label>
  );
}
