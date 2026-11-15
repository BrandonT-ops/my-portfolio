import type { Metadata } from "next";
import type { Lang } from "@/content/types";

/** Canonical URL plus the English/French alternates for a path such as "/work". */
export const alternates = (lang: Lang, path = ""): Metadata["alternates"] => ({
  canonical: `/${lang}${path}`,
  languages: { en: `/en${path}`, fr: `/fr${path}`, "x-default": `/en${path}` },
});
