import fs from "fs";
import { scrapeTargets } from "./scrape-targets.js";

const targetId = process.argv[2];
const targets = getTargets(targetId);
const outputPath = "assets/js/data/counter-drafts.generated.js";

function getTargets(id) {
  if (!id || id === "all") {
    return Object.values(scrapeTargets);
  }

  if (!scrapeTargets[id]) {
    console.error("Usage: node tools/parse-pokebattler.js [target-id|all]");
    console.error("Available targets:", Object.keys(scrapeTargets).join(", "));
    process.exit(1);
  }

  return [scrapeTargets[id]];
}

function readRawFile(path) {
  if (!fs.existsSync(path)) {
    throw new Error(`Missing raw file: ${path}. Run tools/scrape.js first.`);
  }

  return fs.readFileSync(path, "utf8");
}

function parseCounters(text, limit = 30) {
  const start = text.indexOf("Choose Moveset");
  const end = text.indexOf("Most Difficult Raids");

  if (start === -1) return [];

  const section = text.slice(start, end === -1 ? undefined : end);

  const regex =
    /Power([\d.]+)%\s*CP\s*(\d+)\s*Time to Win([\d.]+)s\s*Estimator([\d.]+)\s*×(\d+)\s*([\s\S]*?)(?=\nPower[\d.]+%|\nMost Difficult Raids|$)/g;

  const counters = [];
  let match;

  while ((match = regex.exec(section)) !== null) {
    const [, power, cp, timeToWin, estimator, deaths, block] = match;

    const lines = block
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);

    const rank = Number(lines.at(-1));

    if (!Number.isInteger(rank)) continue;

    const dateLine = lines.find(line =>
      /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(line)
    );

    counters.push({
      rank,
      name: lines[0],
      fastMove: lines[1] ?? null,
      chargedMove: lines[2] ?? null,
      legacyDate: dateLine ?? null,
      power: Number(power),
      cp: Number(cp),
      timeToWin: Number(timeToWin),
      estimator: Number(estimator),
      deaths: Number(deaths)
    });
  }

  return counters
    .sort((a, b) => a.rank - b.rank)
    .slice(0, limit);
}

function readExistingDrafts() {
  if (!fs.existsSync(outputPath)) return [];

  const fileText = fs.readFileSync(outputPath, "utf8");

  const jsonText = fileText
    .replace(/^export const counterDrafts = /, "")
    .replace(/;\s*$/, "");

  try {
    return JSON.parse(jsonText);
  } catch {
    return [];
  }
}

function parseCatchCp(text) {
  const normalMatch =
    text.match(/Catch CP:\s*(\d+)\s*-\s*(\d+)/i) ||
    text.match(/Caught CP Range:\s*(\d+)\s*-\s*(\d+)/i);

  const boostedMatch = text.match(/Boosted\s*\(([^)]+)\):\s*(\d+)\s*-\s*(\d+)/i);

  const normal = normalMatch
    ? {
      min: Number(normalMatch[1]),
      max: Number(normalMatch[2]),
      label: "Level 20"
    }
    : null;

  const boosted = boostedMatch
    ? {
      weather: boostedMatch[1],
      min: Number(boostedMatch[2]),
      max: Number(boostedMatch[3]),
      label: "Level 25 weather boost"
    }
    : normal
      ? {
        weather: null,
        min: Math.round(normal.min * 1.2500767),
        max: Math.round(normal.max * 1.2500767),
        label: "Level 25 weather boost"
      }
      : null;

  return {
    normal,
    boosted
  };
}

function buildDraft(target) {
  const raw = readRawFile(`raw/${target.id}.txt`);
  const rawBudget = readRawFile(`raw/${target.id}-budget.txt`);
  const catchCp = parseCatchCp(raw);

  return {
    id: target.id,
    name: target.name,
    source: "Pokebattler",
    sourceUrl: target.bestUrl,
    budgetSourceUrl: target.budgetUrl,
    settings: {
      attackerLevel: 40,
      weather: "No weather",
      friendship: "Not friends",
      partyPower: false,
      strategy: "Cinematic attack when possible",
      defense: "Pokebattler default/random movesets",
      sort: "Estimator"
    },
    meta: {
      tier: target.tier,
      themeClass: target.themeClass,
      image: target.image,
      imageAlt: target.imageAlt,
      subtitle: target.subtitle || target.tier,
      types: target.types,
      weaknesses: target.weaknesses,
      difficultyLabel: target.difficultyLabel,
      difficulty: target.difficulty,
      dateRange: target.dateRange,
      catchCp
    },
    bestCountersRaw: parseCounters(raw, 30),
    budgetCountersRaw: parseCounters(rawBudget, 30),
    reviewStatus: "needs-check"
  };
}

const existingDrafts = readExistingDrafts();
const newDrafts = targets.map(buildDraft);
const newDraftIds = new Set(newDrafts.map(draft => draft.id));

const mergedDrafts = [
  ...existingDrafts.filter(existing => !newDraftIds.has(existing.id)),
  ...newDrafts
];

fs.writeFileSync(
  outputPath,
  `export const counterDrafts = ${JSON.stringify(mergedDrafts, null, 2)};\n`,
  "utf8"
);

console.log(
  `Generated/updated ${outputPath} for ${newDrafts.map(draft => draft.name).join(", ")}`
);
