"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Emphasis } from "@/components/ui/Emphasis";
import { Section } from "@/components/ui/Section";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Front-end only: validates and confirms inline. No data is sent anywhere. */
export function Newsletter({ heading, text }: { heading?: string | null; text?: string | null }) {
  const id = useId();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!EMAIL_RE.test(email)) {
      setError("Enter a valid email address, like name@example.com.");
      return;
    }
    setError(null);
    setDone(true);
  }

  return (
    <Section labelledBy={`${id}-title`} tone="paper">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="label text-gold">Newsletter</p>
          <h2 id={`${id}-title`} className="mt-5 text-4xl md:text-6xl">
            <Emphasis text={heading || "Research worth *opening.*"} blossomColor="none" />
          </h2>
          <p className="mt-5 max-w-[48ch] text-lg text-fg-muted">{text || "[NEWSLETTER DESCRIPTION]"}</p>
        </div>

        {done ? (
          <p role="status" className="font-serif text-3xl font-semibold text-gold">
            Thank you. You&rsquo;re on the list.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
            <label htmlFor={`${id}-email`} className="label text-fg-muted">
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className="min-h-12 flex-1 border-b border-fg/40 bg-transparent px-0 text-lg text-fg placeholder:text-fg-faint focus:border-gold focus:outline-none aria-[invalid=true]:border-plum"
                placeholder="name@example.com"
              />
              <Button type="submit">Subscribe</Button>
            </div>
            <p id={`${id}-error`} role="alert" className="min-h-6 text-sm text-plum">
              {error}
            </p>
          </form>
        )}
      </div>
    </Section>
  );
}
