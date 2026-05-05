import { chromium } from "playwright";
import fs from "fs";
import { scrapeTargets } from "./scrape-targets.js";

const targetId = process.argv[2];

if (!targetId || !scrapeTargets[targetId]) {
  console.error("Usage: node tools/scrape.js <target-id>");
  console.error("Available targets:", Object.keys(scrapeTargets).join(", "));
  process.exit(1);
}

const target = scrapeTargets[targetId];

fs.mkdirSync("raw", { recursive: true });

async function saveBodyText(page, fileName) {
  await page.waitForTimeout(8000);
  const text = await page.locator("body").innerText();
  fs.writeFileSync(fileName, text, "utf8");
  console.log(`Saved ${fileName}`);
}

(async () => {
  try {
    console.log(`Starting scraper for ${target.name}...`);

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(target.bestUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000
    });

    console.log("Best page loaded");
    await saveBodyText(page, `raw/${target.id}.txt`);

    await page.goto(target.budgetUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000
    });

    console.log("Budget page loaded");
    await saveBodyText(page, `raw/${target.id}-budget.txt`);

    await browser.close();

    console.log("Done.");
  } catch (err) {
    console.error("ERROR:", err);
  }
})();