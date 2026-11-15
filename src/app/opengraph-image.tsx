import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview card, generated at build time in the site palette. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#faf7f0",
          color: "#121619",
          border: "16px solid #121619",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#9e0031" }}>
          {site.role}
        </div>
        <div style={{ display: "flex", fontSize: 128, fontWeight: 600, lineHeight: 0.95 }}>
          {site.name}
          <span style={{ color: "#9e0031" }}>.</span>
        </div>
        <div style={{ fontSize: 30, color: "#545a60" }}>Web products, end to end.</div>
      </div>
    ),
    size,
  );
}
