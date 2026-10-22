import { NextResponse } from "next/server";
import { contactSchema, type FieldErrors } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  // Basic origin check against cross-site form posts
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json({ ok: false, code: "forbidden", message: "Request not allowed." }, 403);
    } catch {
      return json({ ok: false, code: "forbidden", message: "Request not allowed." }, 403);
    }
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(`contact:${ip}`)) {
    return json({ ok: false, code: "rate_limited", message: "Too many requests. Please try again in a few minutes." }, 429);
  }

  let raw: unknown;
  try {
    if (Number(req.headers.get("content-length") ?? 0) > 20_000) throw new Error("too large");
    raw = await req.json();
  } catch {
    return json({ ok: false, code: "bad_request", message: "We could not read that request." }, 400);
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof FieldErrors | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return json({ ok: false, code: "validation", message: "Please correct the highlighted fields.", fieldErrors }, 422);
  }
  const data = parsed.data;

  // Honeypot tripped: pretend nothing happened to the bot, but do not send anything.
  if (data.company_fax) return json({ ok: true });

  // Optional Turnstile verification
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    if (!data.turnstileToken) {
      return json({ ok: false, code: "spam_check", message: "Please complete the spam check and try again." }, 400);
    }
    try {
      const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: turnstileSecret, response: data.turnstileToken, remoteip: ip }),
      });
      const result = (await res.json()) as { success?: boolean };
      if (!result.success) {
        return json({ ok: false, code: "spam_check", message: "Spam check failed. Please try again." }, 400);
      }
    } catch {
      return json({ ok: false, code: "delivery_failed", message: "We could not verify the spam check. Please try again." }, 502);
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    // Do not silently discard, and do not claim success.
    return json(
      {
        ok: false,
        code: "not_configured",
        message: "Online form delivery is not set up yet, so your message was not sent.",
        fallbackEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
      },
      503,
    );
  }

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company}`,
    `Website: ${data.website ?? "—"}`,
    `Service: ${data.service}`,
    `Budget: ${data.budget}`,
    "",
    data.message,
  ].join("\n");

  const html = `<h2>New inquiry</h2><table cellpadding="6">
    <tr><td><b>Name</b></td><td>${escapeHtml(data.name)}</td></tr>
    <tr><td><b>Email</b></td><td>${escapeHtml(data.email)}</td></tr>
    <tr><td><b>Company</b></td><td>${escapeHtml(data.company)}</td></tr>
    <tr><td><b>Website</b></td><td>${escapeHtml(data.website ?? "—")}</td></tr>
    <tr><td><b>Service</b></td><td>${escapeHtml(data.service)}</td></tr>
    <tr><td><b>Budget</b></td><td>${escapeHtml(data.budget)}</td></tr></table>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `New inquiry from ${data.name} (${data.company})`,
        text,
        html,
      }),
    });
    if (!res.ok) {
      console.error("contact: email provider returned", res.status); // no personal data logged
      return json({ ok: false, code: "delivery_failed", message: "We could not send your message. Please try again or email us directly.", fallbackEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null }, 502);
    }
  } catch {
    console.error("contact: email provider request failed");
    return json({ ok: false, code: "delivery_failed", message: "We could not send your message. Please try again or email us directly.", fallbackEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null }, 502);
  }

  return json({ ok: true });
}
