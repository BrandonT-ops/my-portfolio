"use client";

import { useState } from "react";

/** Shows the email address with a button that copies it to the clipboard. */
export default function CopyEmail({ email, copy, copied }: { email: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Older browsers: select the text so the visitor can copy it by hand.
      const range = document.createRange();
      const node = document.getElementById("contact-email");
      if (node) {
        range.selectNodeContents(node);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      return;
    }
    setDone(true);
    window.setTimeout(() => setDone(false), 2200);
  };

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <span id="contact-email" className="break-all font-display text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-[-0.02em]">
        {email}
      </span>
      <button type="button" onClick={onCopy} className="btn" aria-live="polite">
        <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {done ? <path d="m5 12 5 5L20 7" /> : <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></>}
        </svg>
        {done ? copied : copy}
      </button>
    </div>
  );
}
