"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      form.reset();
      setStatus("sent");
      setMessage("Thanks. We'll reply within one business day.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not send. Please email us instead.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="form" noValidate>
      <label>Name<input name="name" required autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label>What do you need?<textarea name="message" rows={4} required /></label>
      <input name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending" : "Send inquiry"}</button>
      <p role="status" className={status === "error" ? "msg err" : "msg"}>{status === "sent" || status === "error" ? message : ""}</p>
    </form>
  );
}
