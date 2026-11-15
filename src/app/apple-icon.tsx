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
          background: "#121619",
          color: "#faf7f0",
          fontSize: 120,
          fontWeight: 700,
        }}
      >
        B<span style={{ color: "#e5c687" }}>.</span>
      </div>
    ),
    size,
  );
}
