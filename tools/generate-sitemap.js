import fs from "fs";
import { counterMonths } from "../assets/js/data/counters.js";

const SITE_URL = "https://stormhb.github.io/arcanine_go_project";

const staticPages = [
  "/",
  "/raids.html",
  "/counters.html",
  "/contact.html",
];

const bossPages = counterMonths
  .flatMap((month) => month.bosses)
  .map((boss) => `/boss.html?id=${boss.id}`);

const uniqueUrls = [...new Set([...staticPages, ...bossPages])];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls
  .map((path) => {
    const priority = path === "/" ? "1.0" : path.startsWith("/boss.html") ? "0.7" : "0.8";

    return `  <url>
    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

fs.writeFileSync("sitemap.xml", sitemap, "utf8");

console.log(`Generated sitemap.xml with ${uniqueUrls.length} URLs.`);