"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { brassButtonClass } from "./buttonStyles";
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

// order used to move focus to the first field with an error on submit
const FIELD_ORDER: (keyof ApplicationInput)[] = [
  "name",
  "email",
  "platform",
  "profileLink",
  "audienceSize",
];

const fieldClass =
  "w-full rounded-lg border border-line bg-ink px-4 py-3 text-bone placeholder:text-muted focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass aria-[invalid=true]:border-danger";

export function ApplyForm() {
  const [form, setForm] = useState<ApplicationInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function update<K extends keyof ApplicationInput>(
    key: K,
    value: ApplicationInput[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    // clear this field's error as soon as the user starts correcting it
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    // clear any stale form-level (network) error once the user edits anything
    setFormError(null);
  }

  function focusFirstError(errs: ApplicationErrors) {
    const first = FIELD_ORDER.find((key) => errs[key]);
    if (first) document.getElementById(`field-${first}`)?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return; // guard against double-submit (e.g. Enter)
    setFormError(null);

    const { valid, errors: validationErrors } = validateApplication(form);
    setErrors(validationErrors);
    if (!valid) {
      focusFirstError(validationErrors);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        if (data.errors) {
          setErrors(data.errors);
          focusFirstError(data.errors);
        } else {
          setFormError("Something went wrong. Please try again.");
        }
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("idle");
      setFormError("Couldn't reach the server. Check your connection and try again.");
    }
  }

  return (
    <section id="apply" className="scroll-mt-24 bg-grad-ink">
      <Container className="py-24 sm:py-32">
        <SectionHeader eyebrow="Apply" title="Apply to become a partner" />

        <Reveal>
          <div className="surface-card glow-brass mx-auto mt-12 max-w-2xl rounded-2xl border border-line p-7 sm:p-10">
            {status === "success" ? (
              <div className="py-10 text-center" role="status">
                <h3 className="font-serif text-2xl text-bone">
                  Application received.
                </h3>
                <p className="mt-3 text-bone-dim">We&rsquo;ll be in touch.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-6">
                <Field id="field-name" label="Name" error={errors.name}>
                  <input
                    id="field-name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "field-name-error" : undefined}
                    className={fieldClass}
                  />
                </Field>

                <Field id="field-email" label="Email" error={errors.email}>
                  <input
                    id="field-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "field-email-error" : undefined}
                    className={fieldClass}
                  />
                </Field>

                <Field id="field-platform" label="Primary platform" error={errors.platform}>
                  <select
                    id="field-platform"
                    value={form.platform}
                    onChange={(e) => update("platform", e.target.value)}
                    aria-invalid={!!errors.platform}
                    aria-describedby={errors.platform ? "field-platform-error" : undefined}
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

                <Field id="field-profileLink" label="Profile link" error={errors.profileLink}>
                  <input
                    id="field-profileLink"
                    type="text"
                    inputMode="url"
                    value={form.profileLink}
                    onChange={(e) => update("profileLink", e.target.value)}
                    placeholder="https://"
                    aria-invalid={!!errors.profileLink}
                    aria-describedby={errors.profileLink ? "field-profileLink-error" : undefined}
                    className={fieldClass}
                  />
                </Field>

                <Field id="field-audienceSize" label="Audience size" error={errors.audienceSize}>
                  <input
                    id="field-audienceSize"
                    type="text"
                    value={form.audienceSize}
                    onChange={(e) => update("audienceSize", e.target.value)}
                    placeholder="e.g. 120K followers"
                    aria-invalid={!!errors.audienceSize}
                    aria-describedby={errors.audienceSize ? "field-audienceSize-error" : undefined}
                    className={fieldClass}
                  />
                </Field>

                <Field id="field-note" label="Anything else we should know? (optional)">
                  <textarea
                    id="field-note"
                    value={form.note}
                    onChange={(e) => update("note", e.target.value)}
                    rows={3}
                    className={fieldClass}
                  />
                </Field>

                {formError && (
                  <p
                    role="alert"
                    className="rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
                  >
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={`${brassButtonClass} mt-2 w-full disabled:opacity-60`}
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
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
