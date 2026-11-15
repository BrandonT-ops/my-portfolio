import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — Digital Systems Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview card: the wordmark over a search box. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#1b1b1f",
        }}
      >
        <div style={{ display: "flex", fontSize: 190, fontWeight: 700, letterSpacing: -9, lineHeight: 1 }}>
          {[["b", "#800020"], ["r", "#0b84b8"], ["a", "#c58f10"], ["n", "#09814a"], ["d", "#800020"], ["o", "#0b84b8"], ["n", "#c58f10"]].map(([ch, c], i) => (
            <span key={i} style={{ color: c }}>
              {ch}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 48,
            width: 820,
            height: 92,
            padding: "0 40px",
            borderRadius: 46,
            border: "2px solid #dcdfe6",
            fontSize: 34,
            color: "#5c606c",
            boxShadow: "0 18px 40px rgba(11,104,176,0.16)",
          }}
        >
          Digital Systems Engineer · Yaoundé
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 28, color: "#0b68b0" }}>Web · Mobile · Embedded</div>
      </div>
    ),
    size,
  );
}
