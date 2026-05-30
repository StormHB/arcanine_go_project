import { chromium } from "playwright";
import fs from "fs";
import { scrapeTargets } from "./scrape-targets.js";
import { raidRotations } from "../assets/js/data/rotations.js";

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function getTargetIdsFromMonth(arg) {
  const normalizedArg = normalize(arg);

  const month = raidRotations.find((rotation) =>
    normalize(rotation.id) === normalizedArg ||
    normalize(rotation.label) === normalizedArg ||
    normalize(rotation.label).startsWith(normalizedArg)
  );

  if (!month) {
    return null;
  }

  return [
    ...new Set(
      month.schedule.flatMap((entry) => entry.bossIds ?? [])
    )
  ];
}

function getSelectedTargets() {
  const arg = process.argv[2];

  if (!arg || arg === "all") {
    return Object.values(scrapeTargets);
  }

  const monthTargetIds = getTargetIdsFromMonth(arg);

  if (monthTargetIds) {
    return Object.values(scrapeTargets).filter((target) =>
      monthTargetIds.includes(target.id)
    );
  }

  const normalizedArg = normalize(arg);

  const target = Object.entries(scrapeTargets).find(([key, value]) =>
    normalize(key) === normalizedArg ||
    normalize(value.id) === normalizedArg
  )?.[1];

  if (!target) {
    console.log("Usage: node tools/scrape.js [target-id|month|all]");
    console.log("Examples:");
    console.log("  node tools/scrape.js all");
    console.log("  node tools/scrape.js mega-blaziken");
    console.log("  node tools/scrape.js megaBlaziken");
    console.log("  node tools/scrape.js 2026-06");
    console.log("  node tools/scrape.js June");
    console.log("");
    console.log(`Available targets: ${Object.keys(scrapeTargets).join(", ")}`);
    process.exit(1);
  }

  return [target];
}

const targets = getSelectedTargets();

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
