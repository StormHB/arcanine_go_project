import fs from "fs";
import { counterDrafts } from "../assets/js/data/counter-drafts.generated.js";
import { legacyMoves } from "./legacy-moves.js";
import { moveTypes } from "./move-types.js";
import { raidRotations } from "../assets/js/data/rotations.js";
import { pokemonTypes } from "./pokemon-types.js";
import { getCatchCpForBoss } from "./catch-cp.js";

const monthNames = {
    Jan: 0, January: 0,
    Feb: 1, February: 1,
    Mar: 2, March: 2,
    Apr: 3, April: 3,
    May: 4,
    Jun: 5, June: 5,
    Jul: 6, July: 6,
    Aug: 7, August: 7,
    Sep: 8, September: 8,
    Oct: 9, October: 9,
    Nov: 10, November: 10,
    Dec: 11, December: 11
};

function getCounterTypes(counterName) {
    const normalizedName = normalizeName(counterName);

    const baseName = normalizedName
        .replace(/^Shadow /, "")
        .replace(/^Mega /, "")
        .replace(/^Primal /, "");

    return (
        pokemonTypes[counterName] ||
        pokemonTypes[normalizedName] ||
        pokemonTypes[baseName] ||
        []
    );
}

function slugify(name) {
    return name
        .toLowerCase()
        .replace(/★/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function cleanBossName(name) {
    return name
        .replace(/^5★:\s*/i, "")
        .replace(/^5-star:\s*/i, "")
        .replace(/^Mega:\s*/i, "")
        .trim();
}

function parseScheduleRange(dateLabel, fallbackYear) {
    const normalized = dateLabel
        .replace(/\s+/g, " ")
        .replace(/-/g, "–")
        .trim();

    const [startRaw, endRaw] = normalized
        .split("–")
        .map((part) => part.trim());

    const [startMonth, startDay] = startRaw.split(" ");
    const endParts = endRaw.split(" ");

    const endMonth = endParts.length === 2
        ? endParts[0]
        : startMonth;

    const endDay = endParts.length === 2
        ? endParts[1]
        : endParts[0];

    const startDate = new Date(
        fallbackYear,
        monthNames[startMonth],
        Number(startDay)
    );

    const endDate = new Date(
        fallbackYear,
        monthNames[endMonth],
        Number(endDay)
    );

    if (endDate < startDate) {
        endDate.setFullYear(endDate.getFullYear() + 1);
    }

    return { startDate, endDate };
}

function monthBounds(monthId) {
    const [year, month] = monthId.split("-").map(Number);
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);

    return { start, end };
}

function overlapsMonth(dateLabel, monthId) {
    const [year] = monthId.split("-").map(Number);
    const { startDate, endDate } = parseScheduleRange(dateLabel, year);
    const { start, end } = monthBounds(monthId);

    return startDate <= end && endDate >= start;
}

function splitBossNames(value) {
    if (typeof value !== "string") return [];

    return value
        .split("/")
        .map((name) => name.trim())
        .filter(Boolean);
}

function getScheduleBossNames(item) {
    const names = [];

    if (Array.isArray(item.bosses)) names.push(...item.bosses);
    if (Array.isArray(item.fiveStar)) names.push(...item.fiveStar);
    if (Array.isArray(item.mega)) names.push(...item.mega);
    if (Array.isArray(item.raids)) names.push(...item.raids);
    if (Array.isArray(item.bossNames)) names.push(...item.bossNames);

    if (typeof item.fiveStar === "string") names.push(...splitBossNames(item.fiveStar));
    if (typeof item.mega === "string") names.push(...splitBossNames(item.mega));
    if (typeof item.boss === "string") names.push(...splitBossNames(item.boss));

    return names;
}

function getScheduleBossIds(item) {
    const ids = [];

    if (Array.isArray(item.bossIds)) ids.push(...item.bossIds);
    if (Array.isArray(item.fiveStarIds)) ids.push(...item.fiveStarIds);
    if (Array.isArray(item.megaIds)) ids.push(...item.megaIds);

    return ids;
}

function getBossIdsForMonth(monthId) {
    const bossIds = new Set();

    for (const rotation of raidRotations) {
        for (const item of rotation.schedule ?? []) {
            if (!overlapsMonth(item.date, monthId)) continue;

            for (const bossId of getScheduleBossIds(item)) {
                bossIds.add(bossId);
            }

            for (const bossName of getScheduleBossNames(item)) {
                bossIds.add(slugify(cleanBossName(bossName)));
            }
        }
    }

    return bossIds;
}

function normalizeName(name) {
    return name
        .replace("Zamazenta - Crowned Shield", "Zamazenta (Crowned Shield)")
        .replace("Zacian - Crowned Sword", "Zacian (Crowned Sword)")
        .replace("Necrozma - Dusk Mane", "Necrozma (Dusk Mane)");
}

function formatTtw(value) {
    return `${Math.round(value)}s`;
}

function formatDiff(value, bestValue) {
    if (value === bestValue) return "Best";

    const diff = Math.round(((value - bestValue) / bestValue) * 100);
    return `+${diff}%`;
}

const typeWeaknesses = {
    normal: ["fighting"],
    fire: ["water", "ground", "rock"],
    water: ["grass", "electric"],
    electric: ["ground"],
    grass: ["fire", "ice", "poison", "flying", "bug"],
    ice: ["fire", "fighting", "rock", "steel"],
    fighting: ["flying", "psychic", "fairy"],
    poison: ["ground", "psychic"],
    ground: ["water", "grass", "ice"],
    flying: ["electric", "ice", "rock"],
    psychic: ["bug", "ghost", "dark"],
    bug: ["fire", "flying", "rock"],
    rock: ["water", "grass", "fighting", "ground", "steel"],
    ghost: ["ghost", "dark"],
    dragon: ["ice", "dragon", "fairy"],
    dark: ["fighting", "bug", "fairy"],
    steel: ["fire", "fighting", "ground"],
    fairy: ["poison", "steel"]
};

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function getWeaknessProfile(types) {
    const weaknessScores = {};

    types.forEach((type) => {
        typeWeaknesses[type].forEach((weakness) => {
            weaknessScores[weakness] = (weaknessScores[weakness] || 0) + 1;
        });
    });

    const weaknesses = Object.entries(weaknessScores)
        .filter(([, score]) => score > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([type]) => type);

    const doubleWeaknesses = Object.entries(weaknessScores)
        .filter(([, score]) => score >= 2)
        .sort((a, b) => b[1] - a[1])
        .map(([type]) => type);

    return {
        weaknesses,
        doubleWeaknesses
    };
}

function formatTypeList(types) {
    const formatted = types.map(capitalize);

    if (formatted.length === 1) {
        return formatted[0];
    }

    if (formatted.length === 2) {
        return `${formatted[0]} and ${formatted[1]}`;
    }

    return `${formatted.slice(0, -1).join(", ")} and ${formatted.at(-1)}`;
}

function buildDifficultyFromTypes(types) {
    const { weaknesses, doubleWeaknesses } = getWeaknessProfile(types);

    if (doubleWeaknesses.length > 0) {
        return `${capitalize(doubleWeaknesses[0])} attackers dominate due to double weakness`;
    }

    if (weaknesses.length === 1) {
        return `${capitalize(weaknesses[0])} attackers are the only strong option`;
    }

    return `${formatTypeList(weaknesses)} attackers perform best`;
}

function transformDraft(draft) {
    const sortedBest = [...draft.bestCountersRaw].sort(
        (a, b) => a.timeToWin - b.timeToWin
    );

    const sortedBudget = [...draft.budgetCountersRaw].sort(
        (a, b) => a.timeToWin - b.timeToWin
    );

    const bestTop = pickCountersWithMegaLimit(sortedBest, 6);
    const budgetTop = pickCountersWithMegaLimit(sortedBudget, 6);

    const bestTime = Math.min(...bestTop.map(c => c.timeToWin));
    const budgetBestTime = Math.min(...budgetTop.map(c => c.timeToWin));

    return {
        id: draft.id,
        name: draft.name,
        themeClass: draft.meta.themeClass,
        image: draft.meta.image,
        imageAlt: draft.meta.imageAlt,
        subtitle: draft.meta.subtitle,
        types: draft.meta.types,
        weaknesses: draft.meta.weaknesses,
        difficultyLabel: draft.meta.difficultyLabel,
        difficulty: buildDifficultyFromTypes(draft.meta.types),
        dateRange: draft.meta.dateRange,
        catchCp: getCatchCpForBoss(draft),

        bestCounters: bestTop.map(counter => transformCounter(counter, bestTime)),
        budgetCounters: budgetTop.map(counter => transformCounter(counter, budgetBestTime))
    };
}

function isMegaOrPrimal(name) {
    return name.startsWith("Mega ") || name.startsWith("Primal ");
}

function pickCountersWithMegaLimit(counters, limit = 6) {
    const picked = [];
    let megaUsed = false;

    for (const counter of counters) {
        if (isMegaOrPrimal(counter.name)) {
            if (megaUsed) continue;
            megaUsed = true;
        }

        picked.push(counter);

        if (picked.length === limit) break;
    }

    return picked;
}

function isLegacyMove(counterName, moveName) {
    const normalizedName = normalizeName(counterName);

    const baseName = normalizedName
        .replace(/^Mega /, "")
        .replace(/^Shadow /, "")
        .replace(/^Primal /, "");

    return (
        legacyMoves[counterName]?.includes(moveName) ||
        legacyMoves[normalizedName]?.includes(moveName) ||
        legacyMoves[baseName]?.includes(moveName) ||
        false
    );
}

function normalizeMove(moveName, counterName) {
    if (moveName === "moves.GIGATON_HAMMER") {
        return {
            name: "Gigaton Hammer",
            type: "steel",
            legacy: true
        };
    }

    if (
        counterName === "Shadow Regigigas" &&
        moveName === "Hidden Power"
    ) {
        return {
            name: "Hidden Power",
            type: "grass"
        };
    }

    return {
        name: moveName,
        type: moveTypes[moveName] || null
    };
}

function transformCounter(counter, bestTime) {
    const displayName = normalizeName(counter.name);

    const fastMove = normalizeMove(counter.fastMove, displayName);
    const chargedMove = normalizeMove(counter.chargedMove, displayName);

    return {
        name: displayName,
        types: getCounterTypes(counter.name),

        moves: [
            {
                name: fastMove.name,
                type: fastMove.type,
                ...(fastMove.legacy ? { legacy: true } : {}),
                ...(isLegacyMove(counter.name, fastMove.name) ? { legacy: true } : {})
            },
            {
                name: chargedMove.name,
                type: chargedMove.type,
                ...(chargedMove.legacy ? { legacy: true } : {}),
                ...(isLegacyMove(counter.name, chargedMove.name) ? { legacy: true } : {})
            }
        ],

        ttw: formatTtw(counter.timeToWin),
        diff: formatDiff(counter.timeToWin, bestTime)
    };
}

const transformed = counterDrafts.map(transformDraft);

fs.writeFileSync(
    "assets/js/data/counter-final.generated.js",
    `export const generatedCounters = ${JSON.stringify(transformed, null, 4)};\n`,
    "utf8"
);

console.log("Generated assets/js/data/counter-final.generated.js");

const counterMonths = raidRotations.map((rotation) => {
    const bossIdsForMonth = getBossIdsForMonth(rotation.id);

    console.log(rotation.label, [...bossIdsForMonth]);

    return {
        id: rotation.id,
        label: rotation.label,
        status: rotation.status,
        bosses: [...bossIdsForMonth]
            .map((id) => transformed.find((boss) => boss.id === id))
            .filter(Boolean)
    };
});

for (const month of counterMonths) {
    console.log(`${month.label}: ${month.bosses.length} bosses`);
}

fs.writeFileSync(
    "assets/js/data/counters.js",
    `export const counterMonths = ${JSON.stringify(counterMonths, null, 4)};\n`,
    "utf8"
);

console.log("Generated assets/js/data/counters.js");