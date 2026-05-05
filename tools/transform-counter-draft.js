import fs from "fs";
import { counterDrafts } from "../assets/js/data/counter-drafts.generated.js";

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
        themeClass: "ice-theme",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10074.png",
        imageAlt: "Official artwork of Mega Glalie",
        subtitle: "Mega Raid • May 2026",
        types: ["ice"],
        weaknesses: "Fighting, Rock, Steel, Fire",
        difficultyLabel: "Mega",
        difficulty: `Hardest checked moveset: ${draft.selectedHardestMoveset.fastMove} / ${draft.selectedHardestMoveset.chargedMove}`,

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
    const legacyMoves = {
        "Mega Lucario": ["Force Palm"],
        "Lucario": ["Force Palm"],
        "Zamazenta - Crowned Shield": ["Behemoth Bash"],
        "Zacian - Crowned Sword": ["Behemoth Blade"],
        "Necrozma - Dusk Mane": ["Sunsteel Strike"],
        "Keldeo": ["Secret Sword"],
        "Metagross": ["Meteor Mash"],
        "Shadow Metagross": ["Meteor Mash"]
    };

    return legacyMoves[counterName]?.includes(moveName) ?? false;
}

function transformCounter(counter, bestTime) {
    return {
        name: normalizeName(counter.name),
        moves: [
            {
                name: counter.fastMove,
                ...(isLegacyMove(counter.name, counter.fastMove) ? { legacy: true } : {})
            },
            {
                name: counter.chargedMove,
                ...(isLegacyMove(counter.name, counter.chargedMove) ? { legacy: true } : {})
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