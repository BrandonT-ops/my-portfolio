import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.name,
    start_url: "/",
    display: "browser",
    background_color: "#faf7f0",
    theme_color: "#faf7f0",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
