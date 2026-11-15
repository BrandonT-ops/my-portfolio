import type { MetadataRoute } from "next";
import { LANGS } from "@/content/types";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = ["", "/work", "/about", "/photography", ...projects.map((p) => `/work/${p.slug}`)];
  return paths.flatMap((path) =>
    LANGS.map((lang) => ({
      url: `${site.url}/${lang}${path}`,
      lastModified,
      changeFrequency: path === "" ? ("monthly" as const) : ("yearly" as const),
      priority: path === "" ? 1 : path.startsWith("/work/") ? 0.6 : 0.8,
      alternates: { languages: { en: `${site.url}/en${path}`, fr: `${site.url}/fr${path}` } },
    })),
  );
}
