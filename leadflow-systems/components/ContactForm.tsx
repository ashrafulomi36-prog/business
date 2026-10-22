"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { budgetOptions, contactSchema, serviceOptions, type FieldErrors } from "@/lib/validation";
import { siteConfig } from "@/lib/site";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; message: string; fallbackEmail?: string | null; notConfigured?: boolean };

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: { sitekey: string; callback: (t: string) => void; "expired-callback": () => void }) => string;
      reset: (id?: string) => void;
    };
  }
}

export function ContactForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const tsRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [token, setToken] = useState("");
  const siteKey = siteConfig.turnstileSiteKey;

  // Prefill the message when a pricing button is clicked
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-package]");
      if (!a || !messageRef.current) return;
      if (!messageRef.current.value.trim()) {
        messageRef.current.value = `I'd like a quote for the ${a.dataset.package} package. `;
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Optional Cloudflare Turnstile
  useEffect(() => {
    if (!siteKey || !tsRef.current) return;
    const mount = () => {
      if (window.turnstile && tsRef.current && !tsRef.current.hasChildNodes()) {
        window.turnstile.render(tsRef.current, { sitekey: siteKey, callback: setToken, "expired-callback": () => setToken("") });
      }
    };
    if (window.turnstile) return mount();
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = mount;
    document.head.appendChild(s);
  }, [siteKey]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      website: String(fd.get("website") ?? ""),
      service: String(fd.get("service") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      company_fax: String(fd.get("company_fax") ?? ""),
      turnstileToken: token || undefined,
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fe: FieldErrors = {};
      for (const i of parsed.error.issues) {
        const k = i.path[0] as keyof FieldErrors;
        if (!fe[k]) fe[k] = i.message;
      }
      setErrors(fe);
      setStatus({ kind: "idle" });
      const first = Object.keys(fe)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean; code?: string; message?: string; fieldErrors?: FieldErrors; fallbackEmail?: string | null;
      };
      if (res.ok && data.ok) {
        setStatus({ kind: "success" });
        formRef.current?.reset();
        return;
      }
      if (data.fieldErrors) setErrors(data.fieldErrors);
      setStatus({
        kind: "error",
        message: data.message ?? "Something went wrong. Please try again.",
        fallbackEmail: data.fallbackEmail ?? siteConfig.contactEmail ?? null,
        notConfigured: data.code === "not_configured",
      });
      window.turnstile?.reset();
      setToken("");
    } catch {
      setStatus({ kind: "error", message: "We could not reach the server. Check your connection and try again.", fallbackEmail: siteConfig.contactEmail || null });
    }
  }

  const id = (n: string) => `${uid}-${n}`;
  const err = (n: keyof FieldErrors) => errors[n];
  const common = (n: keyof FieldErrors) => ({
    id: id(n),
    name: n,
    "aria-invalid": err(n) ? true : undefined,
    "aria-describedby": err(n) ? `${id(n)}-err` : undefined,
  });
  const Err = ({ n }: { n: keyof FieldErrors }) =>
    err(n) ? <p id={`${id(n)}-err`} className="mt-1.5 text-xs text-red-300">{err(n)}</p> : null;

  if (status.kind === "success") {
    return (
      <div className="mt-6 rounded-lg border border-accent/40 bg-accent/10 p-5" role="status">
        <p className="font-medium text-bone">Thanks, your request has been sent.</p>
        <p className="mt-1 text-sm text-mist">We&rsquo;ll reply to the email address you provided.</p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="mt-4 text-sm text-accent underline underline-offset-4">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="mb-1.5 block text-sm font-medium text-bone">Name</label>
          <input {...common("name")} type="text" autoComplete="name" className="field" required />
          <Err n="name" />
        </div>
        <div>
          <label htmlFor={id("email")} className="mb-1.5 block text-sm font-medium text-bone">Business email</label>
          <input {...common("email")} type="email" autoComplete="email" className="field" required />
          <Err n="email" />
        </div>
        <div>
          <label htmlFor={id("company")} className="mb-1.5 block text-sm font-medium text-bone">Company name</label>
          <input {...common("company")} type="text" autoComplete="organization" className="field" required />
          <Err n="company" />
        </div>
        <div>
          <label htmlFor={id("website")} className="mb-1.5 block text-sm font-medium text-bone">Website <span className="text-mist">(optional)</span></label>
          <input {...common("website")} type="text" inputMode="url" autoComplete="url" placeholder="example.com" className="field" />
          <Err n="website" />
        </div>
        <div>
          <label htmlFor={id("service")} className="mb-1.5 block text-sm font-medium text-bone">Service interest</label>
          <select {...common("service")} defaultValue="" className="field" required>
            <option value="" disabled>Choose one</option>
            {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <Err n="service" />
        </div>
        <div>
          <label htmlFor={id("budget")} className="mb-1.5 block text-sm font-medium text-bone">Budget range</label>
          <select {...common("budget")} defaultValue="" className="field" required>
            <option value="" disabled>Choose one</option>
            {budgetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <Err n="budget" />
        </div>
      </div>

      <div>
        <label htmlFor={id("message")} className="mb-1.5 block text-sm font-medium text-bone">Project description</label>
        <textarea {...common("message")} ref={messageRef} rows={5} className="field resize-y" required placeholder="How do inquiries reach you today, and what would you like to improve?" />
        <Err n="message" />
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>Leave this field empty<input type="text" name="company_fax" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {siteKey && <div ref={tsRef} />}

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-mist">
          <input {...common("consent")} type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#38bdf8]" />
          <span>I agree that {siteConfig.brand} may process the details above to respond to my request, as described in the <a href="/privacy" className="text-accent underline underline-offset-4">Privacy Policy</a>.</span>
        </label>
        <Err n="consent" />
      </div>

      {status.kind === "error" && (
        <div role="alert" className="rounded-lg border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-100">
          <p>{status.message}</p>
          {status.fallbackEmail ? (
            <p className="mt-1">You can email us directly at <a className="underline underline-offset-4" href={`mailto:${status.fallbackEmail}`}>{status.fallbackEmail}</a>.</p>
          ) : status.notConfigured ? (
            <p className="mt-1">The site owner needs to configure form delivery or a contact email.</p>
          ) : null}
        </div>
      )}

      <button type="submit" disabled={status.kind === "sending"} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
        {status.kind === "sending" ? (<><Loader2 size={16} className="animate-spin" aria-hidden /> Sending…</>) : "Send quote request"}
      </button>
    </form>
  );
}
