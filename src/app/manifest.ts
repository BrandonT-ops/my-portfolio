import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Portfolio`,
    short_name: site.name,
    start_url: "/",
    display: "browser",
    background_color: "#0d2444",
    theme_color: "#0d2444",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
