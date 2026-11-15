"use client";

import { useState } from "react";
import type { Dict } from "@/content/types";

type State = "idle" | "sending" | "sent" | "error";

/** Message form. Posts to /api/contact, which emails Brandon. */
export default function ContactForm({ t }: { t: Dict["contact"] }) {
  const [state, setState] = useState<State>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  };

  const field = "mt-1.5 w-full rounded-2xl border border-line/15 bg-sheet px-4 py-3 text-base outline-none transition-shadow hover:shadow-soft focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          {t.name}
          <input name="name" required maxLength={100} autoComplete="name" className={field} />
        </label>
        <label className="block text-sm font-medium">
          {t.email}
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block text-sm font-medium">
        {t.message}
        <textarea name="message" required minLength={10} maxLength={4000} rows={6} className={field} />
      </label>
      {/* Hidden from people; bots that fill it in are ignored. */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "sending"} className="btn btn-primary disabled:opacity-60">
          {state === "sending" ? t.sending : t.send}
        </button>
        <p role="status" className={`text-sm ${state === "error" ? "text-ox" : "text-leaf"}`}>
          {state === "sent" ? t.sent : state === "error" ? t.error : ""}
        </p>
      </div>
    </form>
  );
}
