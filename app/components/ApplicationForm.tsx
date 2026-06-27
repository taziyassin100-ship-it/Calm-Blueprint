"use client";

import { useState, type FormEvent } from "react";
import { Container } from "./Container";
import { validateApplication, type ApplicationErrors, type ApplicationInput } from "@/lib/validation";

const PLATFORMS = ["Instagram", "YouTube", "TikTok", "X", "Newsletter", "Other"];

const EMPTY_FORM: ApplicationInput = {
  name: "",
  email: "",
  platform: "",
  profileLink: "",
  audienceSize: "",
  note: "",
};

export function ApplicationForm() {
  const [form, setForm] = useState<ApplicationInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  function update<K extends keyof ApplicationInput>(key: K, value: ApplicationInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
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
        const body = await response.json();
        setErrors(body.errors ?? {});
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("idle");
      setFormError("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <section id="apply" className="border-b border-mist/20 bg-porcelain">
        <Container className="py-20 text-center">
          <h2 className="font-serif text-3xl text-midnight">Application received.</h2>
          <p className="mt-3 text-lg text-ink/75">We&rsquo;ll be in touch.</p>
        </Container>
      </section>
    );
  }

  return (
    <section id="apply" className="border-b border-mist/20 bg-porcelain">
      <Container className="py-20">
        <div className="eyebrow mb-4">APPLY</div>
        <h2 className="max-w-2xl font-serif text-3xl font-medium tracking-[-0.01em] text-midnight sm:text-4xl">
          Apply to become a founding partner
        </h2>

        <form onSubmit={handleSubmit} className="mt-10 grid max-w-2xl gap-6">
          <Field label="Name" error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full rounded-md border border-mist/50 bg-porcelain px-4 py-2.5 text-ink focus:border-brass focus:outline-none"
            />
          </Field>

          <Field label="Email" error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full rounded-md border border-mist/50 bg-porcelain px-4 py-2.5 text-ink focus:border-brass focus:outline-none"
            />
          </Field>

          <Field label="Primary platform" error={errors.platform}>
            <select
              value={form.platform}
              onChange={(e) => update("platform", e.target.value)}
              className="w-full rounded-md border border-mist/50 bg-porcelain px-4 py-2.5 text-ink focus:border-brass focus:outline-none"
            >
              <option value="">Select a platform</option>
              {PLATFORMS.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
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
              className="w-full rounded-md border border-mist/50 bg-porcelain px-4 py-2.5 text-ink focus:border-brass focus:outline-none"
            />
          </Field>

          <Field label="Audience size" error={errors.audienceSize}>
            <input
              type="text"
              value={form.audienceSize}
              onChange={(e) => update("audienceSize", e.target.value)}
              placeholder="e.g. 120K followers"
              className="w-full rounded-md border border-mist/50 bg-porcelain px-4 py-2.5 text-ink focus:border-brass focus:outline-none"
            />
          </Field>

          <Field label="Anything else we should know? (optional)" error={errors.note}>
            <textarea
              value={form.note}
              onChange={(e) => update("note", e.target.value)}
              rows={3}
              className="w-full rounded-md border border-mist/50 bg-porcelain px-4 py-2.5 text-ink focus:border-brass focus:outline-none"
            />
          </Field>

          {formError && (
            <p className="text-sm text-error">{formError}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-midnight px-7 py-3 text-base font-medium text-bone transition-colors hover:bg-ink disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting…" : "Submit application"}
          </button>
        </form>
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
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-error">{error}</span>}
    </label>
  );
}
