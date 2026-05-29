import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STATS_PATH = path.join(
    __dirname,
    "cache",
    "pokemon-go-stats.generated.json"
);

const CPM = {
    20: 0.5974,
    25: 0.667934
};

function normalizeKey(value) {
    return value
        .toLowerCase()
        .replace(/♀/g, "-female")
        .replace(/♂/g, "-male")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function calculateCp(attack, defense, stamina, level) {
    const cpm = CPM[level];

    return Math.floor(
        ((attack + 15) *
            Math.sqrt(defense + 15) *
            Math.sqrt(stamina + 15) *
            cpm ** 2) /
        10
    );
}

function loadStatsMap() {
    const stats = JSON.parse(
        fs.readFileSync(STATS_PATH, "utf8")
    );

    const map = new Map();

    stats.forEach((pokemon) => {
        const name = pokemon.pokemonName;
        const form = pokemon.form;

        const keys = [
            normalizeKey(name),
            normalizeKey(`${form} ${name}`),
            normalizeKey(`${name} ${form}`)
        ];

        keys.forEach((key) => {
            map.set(key, pokemon);
        });
    });

    return map;
}

const statsMap = loadStatsMap();

export function getCatchCpForBoss(boss) {
    const megaName = boss.name.replace(/^Mega\s+/i, "");

    const keys = [
        normalizeKey(boss.id),
        normalizeKey(boss.name),
        normalizeKey(megaName),
        normalizeKey(`${megaName} Mega`),
        normalizeKey(`Mega ${megaName}`),
        normalizeKey(`${megaName} (Mega)`),
        normalizeKey(`(Mega) ${megaName}`)
    ];

    const stats = keys
        .map((key) => statsMap.get(key))
        .find(Boolean);

    if (!stats) {
        console.warn(`Missing Pokémon GO stats for ${boss.name}`);
        return null;
    }

    return {
        normal: {
            level: 20,
            max: calculateCp(stats.attack, stats.defense, stats.stamina, 20),
            label: "Level 20"
        },
        boosted: {
            level: 25,
            max: calculateCp(stats.attack, stats.defense, stats.stamina, 25),
            label: "Level 25 weather boost"
        }
    };
}