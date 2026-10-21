import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  if (body.company) return NextResponse.json({ ok: true }); // honeypot
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !message) return NextResponse.json({ error: "Please fill in your name and message." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (message.length > 4000) return NextResponse.json({ error: "Message is too long." }, { status: 400 });

  const url = process.env.CONTACT_WEBHOOK_URL;
  if (url) {
    try {
      const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message, at: new Date().toISOString() }) });
      if (!r.ok) throw new Error("webhook failed");
    } catch {
      return NextResponse.json({ error: "Could not deliver your inquiry. Please email us directly." }, { status: 502 });
    }
  } else {
    console.log("New inquiry", { name, email, message });
  }
  return NextResponse.json({ ok: true });
}
