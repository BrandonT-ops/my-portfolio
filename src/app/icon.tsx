import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: "B." in the site palette. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#800020", borderRadius: "22%",
          color: "#ffffff",
          fontSize: 44,
          fontWeight: 700,
        }}
      >
        b<span style={{ color: "#c58f10" }}>.</span>
      </div>
    ),
    size,
  );
}
