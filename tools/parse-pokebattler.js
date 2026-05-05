import fs from "fs";

const raw = fs.readFileSync("raw.txt", "utf8");
const rawBudget = fs.readFileSync("raw-budget.txt", "utf8");

const bossName = raw.match(/Mega Glalie Counters/) ? "Mega Glalie" : "Unknown Boss";

function parseHardestMovesets(text) {
    const section = text.split("Hardest movesets to raid against")[1]?.split("Custom Raid")[0];

    if (!section) return [];

    const movePairs = [
        "Ice ShardShadow Ball",
        "Powder SnowShadow Ball",
        "Frost BreathShadow Ball",
        "RolloutShadow Ball",
        "Frost BreathAvalanche",
        "Ice ShardAvalanche",
        "Ice ShardGyro Ball",
        "RolloutAvalanche",
        "Powder SnowAvalanche",
        "RolloutGyro Ball",
        "Frost BreathGyro Ball",
        "Powder SnowGyro Ball"
    ];

    return movePairs
        .filter(pair => section.includes(pair))
        .map(pair => {
            const split = pair
                .replace("Shadow Ball", "|Shadow Ball")
                .replace("Avalanche", "|Avalanche")
                .replace("Gyro Ball", "|Gyro Ball")
                .split("|");

            return {
                fastMove: split[0],
                chargedMove: split[1]
            };
        });
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
      .map(l => l.trim())
      .filter(Boolean);

    // zadnja linija je rank
    const rank = Number(lines.at(-1));

    if (!Number.isInteger(rank)) continue;

    // ime je prva linija
    const name = lines[0];

    // moves su odmah ispod
    const fastMove = lines[1] ?? null;
    const chargedMove = lines[2] ?? null;

    // opcionalni datum
    const dateLine = lines.find(l =>
      /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(l)
    );

    counters.push({
      rank,
      name,
      fastMove,
      chargedMove,
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

const draft = {
    id: "mega-glalie",
    name: bossName,
    source: "Pokebattler",
    sourceUrl: "manual-check-url-here",
    settings: {
        attackerLevel: 40,
        weather: "No weather",
        friendship: "Not friends",
        partyPower: false,
        strategy: "No Dodging / Cinematic attack when possible",
        sort: "Estimator"
    },
    hardestMovesetsRaw: parseHardestMovesets(raw),
    selectedHardestMoveset: {
        fastMove: "Powder Snow",
        chargedMove: "Shadow Ball",
        note: "Selected manually from hardest movesets, ignoring Unknown / Unknown."
    },
    bestCountersRaw: parseCounters(raw, 30),
    budgetCountersRaw: parseCounters(rawBudget, 30),
    reviewStatus: "needs-check"
};

fs.writeFileSync(
    "assets/js/data/counter-drafts.generated.js",
    `export const counterDrafts = ${JSON.stringify([draft], null, 2)};\n`,
    "utf8"
);

console.log("Generated assets/js/data/counter-drafts.generated.js");