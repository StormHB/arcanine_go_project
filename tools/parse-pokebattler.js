import fs from "fs";
import { scrapeTargets } from "./scrape-targets.js";

const targetId = process.argv[2];

if (!targetId || !scrapeTargets[targetId]) {
  console.error("Usage: node tools/parse-pokebattler.js <target-id>");
  console.error("Available targets:", Object.keys(scrapeTargets).join(", "));
  process.exit(1);
}

const target = scrapeTargets[targetId];

const raw = fs.readFileSync(`raw/${target.id}.txt`, "utf8");
const rawBudget = fs.readFileSync(`raw/${target.id}-budget.txt`, "utf8");

const outputPath = "assets/js/data/counter-drafts.generated.js";

function parseHardestMovesets(text) {
  const section = text
    .split("Hardest movesets to raid against")[1]
    ?.split("Custom Raid")[0];

  if (!section) return [];

  const rows = section
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const chargedMoves = [
    "Shadow Ball",
    "Avalanche",
    "Gyro Ball",
    "Superpower",
    "Power-Up Punch",
    "Lunge",
    "Fell Stinger",
    "Brave Bird",
    "Fly",
    "Thunder",
    "Discharge",
    "Dazzling Gleam"
  ];

  return rows
    .filter(row => !row.includes("UnknownUnknown"))
    .map(row => {
      const chargedMove = chargedMoves.find(move => row.endsWith(move));

      if (!chargedMove) return null;

      return {
        fastMove: row.replace(chargedMove, ""),
        chargedMove
      };
    })
    .filter(Boolean);
}

function parseCounters(text, limit = 30) {
  const start = text.indexOf("Choose Moveset");
  const end = text.indexOf("Most Difficult Raids");

  const section = text.slice(start, end);

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

const hardestMovesetsRaw = parseHardestMovesets(raw);

const selectedHardestMoveset =
  target.selectedHardestMoveset ??
  hardestMovesetsRaw[0] ?? {
    fastMove: "Unknown",
    chargedMove: "Unknown"
  };

const draft = {
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
    strategy: "No Dodging / Cinematic attack when possible",
    sort: "Estimator"
  },
  meta: {
    tier: target.tier,
    themeClass: target.themeClass,
    image: target.image,
    imageAlt: target.imageAlt,
    subtitle: target.subtitle,
    types: target.types,
    weaknesses: target.weaknesses,
    difficultyLabel: target.difficultyLabel
  },
  hardestMovesetsRaw,
  selectedHardestMoveset,
  bestCountersRaw: parseCounters(raw, 30),
  budgetCountersRaw: parseCounters(rawBudget, 30),
  reviewStatus: "needs-check"
};

const existingDrafts = readExistingDrafts();
const mergedDrafts = [
  ...existingDrafts.filter(existing => existing.id !== draft.id),
  draft
];

fs.writeFileSync(
  outputPath,
  `export const counterDrafts = ${JSON.stringify(mergedDrafts, null, 2)};\n`,
  "utf8"
);

console.log(`Generated/updated ${outputPath} for ${target.name}`);