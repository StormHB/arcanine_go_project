import { chromium } from "playwright";
import fs from "fs";

const bestUrl = "https://www.pokebattler.com/raids/defenders/GLALIE_MEGA/levels/RAID_LEVEL_MEGA/attackers/levels/40/strategies/CINEMATIC_ATTACK_WHEN_POSSIBLE/DEFENSE_RANDOM_MC?sort=ESTIMATOR&weatherCondition=NO_WEATHER&dodgeStrategy=DODGE_REACTION_TIME&aggregation=AVERAGE&includeLegendary=true&includeShadow=true&includeMegas=true&attackerTypes=POKEMON_TYPE_ALL&primalAssistants=&numParty=1";
const budgetUrl = "https://www.pokebattler.com/raids/defenders/GLALIE_MEGA/levels/RAID_LEVEL_MEGA/attackers/levels/40/strategies/CINEMATIC_ATTACK_WHEN_POSSIBLE/DEFENSE_RANDOM_MC?sort=ESTIMATOR&weatherCondition=NO_WEATHER&dodgeStrategy=DODGE_REACTION_TIME&aggregation=AVERAGE&includeLegendary=false&includeShadow=false&includeMegas=false&attackerTypes=POKEMON_TYPE_ALL&primalAssistants=&numParty=1";

async function saveBodyText(page, fileName) {
  await page.waitForTimeout(4000);
  const text = await page.locator("body").innerText();
  fs.writeFileSync(fileName, text, "utf8");
  console.log(`Saved ${fileName}`);
}

async function toggleOffIfChecked(page, labelText) {
  const label = page.locator("#results").getByText(labelText, { exact: true }).first();

  await label.evaluate(element => element.click());

  console.log(`Clicked: ${labelText}`);
  await page.waitForTimeout(3000);
}

(async () => {
  try {
    console.log("Starting scraper...");

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(bestUrl, { waitUntil: "networkidle" });
    console.log("Best page loaded");
    await saveBodyText(page, "raw.txt");

    await page.goto(budgetUrl, { waitUntil: "networkidle" });
    console.log("Budget page loaded");
    await saveBodyText(page, "raw-budget.txt");

    await browser.close();

    console.log("Done.");
  } catch (err) {
    console.error("ERROR:", err);
  }
})();