import { NextResponse } from "next/server";
import { site } from "@/data/site";

/**
 * Receives the contact form and emails it to Brandon through Resend.
 *
 * Needs one environment variable, RESEND_API_KEY (Vercel → Project →
 * Settings → Environment Variables). Without it the Contact page hides the
 * form and this route answers 503. Optional: CONTACT_FROM, a sender address
 * on a domain verified in Resend (defaults to Resend's test sender, which
 * can only deliver to the account owner's own address).
 */
export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ error: "not configured" }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const name = text(body.name, 100);
  const email = text(body.email, 200);
  const message = text(body.message, 4000);

  // Honeypot: real visitors never see or fill this field.
  if (text(body.company, 100)) return NextResponse.json({ ok: true });

  if (!name || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [site.email],
        reply_to: email,
        subject: `Portfolio message from ${name.replace(/[\r\n]+/g, " ")}`,
        text: `${message}\n\n— ${name} <${email}>`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return NextResponse.json({ error: "send failed" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
