"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Blossom } from "@/components/ui/Blossom";
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
    <Section labelledBy={`${id}-title`}>
      <div className="relative grid gap-10 overflow-hidden rounded-[var(--radius-panel)] bg-ink p-8 text-white md:p-14 lg:grid-cols-2 lg:items-end">
        <Blossom color="var(--lime)" className="absolute -top-8 -right-8 size-32 opacity-90" />
        <div className="relative">
          <h2 id={`${id}-title`} className="text-4xl md:text-[52px] [&_em]:text-lime">
            <Emphasis text={heading || "Research worth *opening.*"} blossomColor="var(--lime)" />
          </h2>
          <p className="mt-4 max-w-[48ch] text-white/75">{text || "[NEWSLETTER DESCRIPTION]"}</p>
        </div>

        {done ? (
          <p role="status" className="relative text-2xl font-extrabold tracking-[-0.03em] text-lime">
            Thanks, you&rsquo;re on the list.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-2">
            <label htmlFor={`${id}-email`} className="text-sm font-semibold text-white">
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
                className="min-h-12 flex-1 rounded-xl border-2 border-transparent bg-white px-4 text-base text-ink placeholder:text-ink-muted aria-[invalid=true]:border-plum"
                placeholder="name@example.com"
              />
              <Button type="submit" variant="accent">
                Subscribe
              </Button>
            </div>
            <p id={`${id}-error`} role="alert" className="min-h-6 text-sm font-semibold text-blush">
              {error}
            </p>
          </form>
        )}
      </div>
    </Section>
  );
}
