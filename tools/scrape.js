import { chromium } from "playwright";
import fs from "fs";
import { scrapeTargets } from "./scrape-targets.js";

const targetId = process.argv[2];
const targets = getTargets(targetId);

function getTargets(id) {
  if (!id || id === "all") {
    return Object.values(scrapeTargets);
  }

  if (!scrapeTargets[id]) {
    console.error("Usage: node tools/scrape.js [target-id|all]");
    console.error("Available targets:", Object.keys(scrapeTargets).join(", "));
    process.exit(1);
  }

  return [scrapeTargets[id]];
}

async function saveBodyText(page, url, outputPath) {
  console.log(`Opening ${url}`);

  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });

  await page.waitForTimeout(5000);

  const text = await page.locator("body").innerText();
  fs.writeFileSync(outputPath, text, "utf8");
  console.log(`Saved ${outputPath}`);
}

async function scrapeTarget(page, target) {
  console.log(`\nStarting scraper for ${target.name}...`);

  await saveBodyText(page, target.bestUrl, `raw/${target.id}.txt`);
  await saveBodyText(page, target.budgetUrl, `raw/${target.id}-budget.txt`);
}

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    fs.mkdirSync("raw", { recursive: true });

    for (const target of targets) {
      await scrapeTarget(page, target);
    }

    console.log("\nDone.");
  } catch (err) {
    console.error("ERROR:", err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
