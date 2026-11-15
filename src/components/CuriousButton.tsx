"use client";

import { useRouter } from "next/navigation";

/** Opens a project picked at random. */
export default function CuriousButton({ hrefs, label }: { hrefs: string[]; label: string }) {
  const router = useRouter();
  return (
    <button type="button" className="btn" onClick={() => router.push(hrefs[Math.floor(Math.random() * hrefs.length)])}>
      {label}
    </button>
  );
}
