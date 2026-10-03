"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Field = "name" | "email" | "topic" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const get = (k: string) => String(data.get(k) ?? "").trim();
  if (!get("name")) errors.name = "Enter your name.";
  if (!EMAIL_RE.test(get("email"))) errors.email = "Enter a valid email address, like name@example.com.";
  if (!get("topic")) errors.topic = "Choose what this is about.";
  if (get("message").length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  return errors;
}

const inputClass =
  "w-full rounded-xl border-2 border-sand bg-sand px-4 py-3 text-base placeholder:text-ink-muted/70 hover:border-line focus:border-accent focus:bg-paper focus:outline-none aria-[invalid=true]:border-plum";

/** Demo contact form: validates in the browser and confirms inline. Nothing is sent. */
export function ContactForm({ topics, successMessage }: { topics: string[]; successMessage: string }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate(new FormData(e.currentTarget));
    setErrors(next);
    const first = (Object.keys(next) as Field[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="rounded-[var(--radius-panel)] bg-mint p-8 md:p-10">
        <p className="text-3xl font-extrabold tracking-[-0.03em]">{successMessage}</p>
        <p className="mt-3 text-ink-muted">This is a demo form, so no message was actually sent.</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 font-semibold text-accent underline decoration-2 underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const field = (name: Field) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
  });
  const error = (name: Field) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="mt-2 text-sm font-semibold text-plum">
        {errors[name]}
      </p>
    ) : null;
  const label = (name: string, text: string, optional = false) => (
    <label htmlFor={`${id}-${name}`} className="mb-2 block text-sm font-semibold">
      {text}
      {optional && <span className="font-normal text-ink-muted"> (optional)</span>}
    </label>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 rounded-[var(--radius-panel)] bg-paper p-6 sm:grid-cols-2 md:p-10">
      <div>
        {label("name", "Name")}
        <input {...field("name")} type="text" autoComplete="name" className={inputClass} />
        {error("name")}
      </div>
      <div>
        {label("email", "Email")}
        <input {...field("email")} type="email" autoComplete="email" className={inputClass} />
        {error("email")}
      </div>
      <div>
        {label("organisation", "Organisation", true)}
        <input id={`${id}-organisation`} name="organisation" type="text" autoComplete="organization" className={inputClass} />
      </div>
      <div>
        {label("topic", "What's this about?")}
        <select {...field("topic")} defaultValue="" className={cn(inputClass, "appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10")} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%230D1421' stroke-width='1.6'/%3E%3C/svg%3E\")" }}>
          <option value="" disabled>
            Choose one
          </option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {error("topic")}
      </div>
      <div className="sm:col-span-2">
        {label("message", "Message")}
        <textarea {...field("message")} rows={6} className={cn(inputClass, "resize-y")} />
        {error("message")}
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-muted">Demo form: nothing is sent or stored.</p>
        <Button type="submit" variant="accent" size="lg">
          Send message
        </Button>
      </div>
    </form>
  );
}
