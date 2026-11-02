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
          background: "#121619",
          color: "#faf7f0",
          fontSize: 44,
          fontWeight: 700,
        }}
      >
        B<span style={{ color: "#e5c687" }}>.</span>
      </div>
    ),
    size,
  );
}
