import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const isGithubPages = process.env.GITHUB_PAGES === "true";
  const base = isGithubPages
    ? "https://gavin-morris-04.github.io/Momentum"
    : "https://fit60.app";
  const routes = [
    "",
    "/lift",
    "/diet",
    "/run",
    "/sleep",
    "/life",
    "/supplements",
    "/calendar",
    "/references",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
