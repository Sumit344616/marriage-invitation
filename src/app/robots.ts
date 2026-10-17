import type { MetadataRoute } from "next";

/**
 * Dynamic robots.txt generation
 * Permits indexing for the public wedding invitation while explicitly
 * excluding administrative routes, guest data, and backend APIs.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_sections/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
