import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iOS. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1b1b1f",
          color: "#ffffff",
          fontSize: 120,
          fontWeight: 700,
        }}
      >
        b<span style={{ color: "#ff6b4a" }}>.</span>
      </div>
    ),
    size,
  );
}
