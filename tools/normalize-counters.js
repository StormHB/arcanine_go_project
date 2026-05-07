import fs from "fs";
import { counterMonths } from "../assets/js/data/counters.js";

function toCamelCase(value) {
    return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

const updates = {
    kyogre: {
        subtitle: "5★ Raid • April 8 to April 14",
        difficultyLabel: "Focus"
    },

    megaAerodactyl: {
        subtitle: "Mega Raid • April 8 to April 14",
        difficultyLabel: "Focus"
    },

    groudon: {
        subtitle: "5★ Raid • April 15 to April 21",
        weaknesses: "Water, Grass, Ice",
        difficultyLabel: "Focus"
    },

    megaAlakazam: {
        subtitle: "Mega Raid • April 15 to April 21",
        difficultyLabel: "Focus"
    },

    tapuKoko: {
        subtitle: "5★ Raid • April 22 to April 28",
        difficultyLabel: "Focus"
    },

    megaSharpedo: {
        subtitle: "Mega Raid • April 22 to April 28",
        difficultyLabel: "Focus"
    },

    tapuLele: {
        subtitle: "5★ Raid • April 29 to May 5",
        difficultyLabel: "Focus"
    },

    megaBanette: {
        subtitle: "Mega Raid • April 29 to May 5",
        difficultyLabel: "Focus"
    },

    nihilego: {
        subtitle: "5★ Raid • May 6 to May 12",
        difficultyLabel: "Focus"
    },

    megaCamerupt: {
        subtitle: "Mega Raid • May 6 to May 12",
        difficultyLabel: "Focus"
    }
};

const normalized = counterMonths.map(month => ({
    ...month,

    bosses: month.bosses.map(boss => {
        const camelId = toCamelCase(boss.id);

        return {
            ...boss,
            id: camelId,
            ...(updates[camelId] ?? {}),

            difficultyLabel:
                boss.difficultyLabel ??
                "Focus"
        };
    })
}));

const output =
    `export const counterMonths = ${JSON.stringify(normalized, null, 4)};\n`;

fs.writeFileSync(
    "assets/js/data/counters.js",
    output,
    "utf8"
);

console.log("Normalized counters.js");