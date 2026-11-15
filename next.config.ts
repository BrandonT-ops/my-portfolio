import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Visitors whose browser prefers French start on the French site.
      { source: "/", has: [{ type: "header", key: "accept-language", value: "^fr.*" }], destination: "/fr", permanent: false },
      { source: "/", destination: "/en", permanent: false },
      // The project list is the search page with the Projects tab open.
      { source: "/:lang(en|fr)/work", destination: "/:lang/search?t=projects", permanent: false },
      // Addresses from the previous version of the site.
      { source: "/work/:slug([^.]+)", destination: "/en/work/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
