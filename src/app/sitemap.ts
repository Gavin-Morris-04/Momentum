import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://fit60.app";
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
