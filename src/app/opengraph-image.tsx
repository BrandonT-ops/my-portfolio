import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — Digital Systems Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview card: a corner of the drafting sheet. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 28,
          background: "#0d2444",
          backgroundImage:
            "linear-gradient(rgba(233,241,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(233,241,255,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          color: "#e9f1ff",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 48,
            border: "2px solid rgba(233,241,255,0.55)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 4, textTransform: "uppercase" }}>
            <span style={{ color: "#ff8e42" }}>DWG 001</span>
            <span>Yaoundé · 3.87°N 11.52°E</span>
          </div>
          <div style={{ display: "flex", fontSize: 150, fontWeight: 800, lineHeight: 0.9, textTransform: "uppercase", letterSpacing: -3 }}>
            {site.name}
            <span style={{ color: "#ff8e42" }}>.</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "#a3bbde" }}>
            <span>Digital Systems Engineer</span>
            <span>Web · Mobile · Embedded</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
