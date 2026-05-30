import fs from "fs";

const TARGETS_PATH = "./tools/scrape-targets.js";
const APPEARANCES_PATH = "./tools/generated-raid-appearances.generated.js";

const bosses = [
    { name: "Reshiram" },
    { name: "Zekrom" },
    { name: "Necrozma" },
    {
        name: "Kartana",
        leekDuckUrl:
            "https://leekduck.com/events/celesteela-kartana-in-5-star-raid-battles-june-2026/"
    },
    {
        name: "Celesteela",
        leekDuckUrl:
            "https://leekduck.com/events/celesteela-kartana-in-5-star-raid-battles-june-2026/"
    },
    { name: "Mega Audino" },
    {
        name: "Mega Blaziken",
        leekDuckUrl: "https://leekduck.com/events/catching-some-zs/",
        overrideDates: "June 10 to June 16"
    },
    { name: "Mega Scizor" },
    { name: "Mega Pidgeot" }
];

const TYPE_WEAKNESSES = {
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

function toId(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function toKey(name) {
    return toId(name).replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function getWeaknessProfile(types) {
    const weaknessScores = {};

    types.forEach((type) => {
        TYPE_WEAKNESSES[type].forEach((weakness) => {
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

function buildDifficulty({ weaknesses, doubleWeaknesses }) {
    if (doubleWeaknesses.length > 0) {
        return `${capitalize(doubleWeaknesses[0])} attackers dominate due to double weakness`;
    }

    if (weaknesses.length === 1) {
        return `${capitalize(weaknesses[0])} attackers are the only strong option`;
    }

    return `${formatTypeList(weaknesses)} attackers perform best`;
}

function getThemeClass(types) {
    return `${types[0]}-theme`;
}

function buildPokeApiSlug(name) {
    if (name.startsWith("Mega ")) {
        return `${name.replace("Mega ", "").toLowerCase().replace(/\s+/g, "-")}-mega`;
    }

    return name.toLowerCase().replace(/\s+/g, "-");
}

function buildPokebattlerCode(name) {
    if (name.startsWith("Mega ")) {
        return `${name.replace("Mega ", "").toUpperCase().replace(/\s+/g, "_")}_MEGA`;
    }

    return name.toUpperCase().replace(/\s+/g, "_");
}

function buildRaidLevel(tier) {
    return tier === "Mega Raid" ? "RAID_LEVEL_MEGA" : "RAID_LEVEL_5";
}

function buildDateRangeFromSubtitleDates(dates) {
    const [startText, endText] = dates.split(" to ");

    const startDate = new Date(`${startText}, 2026 10:00:00`);
    const endDate = new Date(`${endText}, 2026 10:00:00`);

    const toLocalIso = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}T10:00:00`;
    };

    return [toLocalIso(startDate), toLocalIso(endDate)];
}

function buildPokebattlerUrl({
    code,
    raidLevel,
    includeLegendary,
    includeShadow,
    includeMegas
}) {
    return `https://www.pokebattler.com/raids/defenders/${code}/levels/${raidLevel}/attackers/levels/40/strategies/CINEMATIC_ATTACK_WHEN_POSSIBLE/DEFENSE_RANDOM_MC?sort=ESTIMATOR&weatherCondition=NO_WEATHER&dodgeStrategy=DODGE_REACTION_TIME&aggregation=AVERAGE&includeLegendary=${includeLegendary}&includeShadow=${includeShadow}&includeMegas=${includeMegas}&attackerTypes=POKEMON_TYPE_ALL&primalAssistants=&numParty=1`;
}

async function fetchPokemonData(name) {
    const slug = buildPokeApiSlug(name);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);

    if (!response.ok) {
        throw new Error(`Could not fetch PokeAPI data for ${name}`);
    }

    return response.json();
}

function formatLeekDuckDates(startText, endText) {
    const startDate = new Date(startText.replace("Local Time", "").trim());
    const endDate = new Date(endText.replace("Local Time", "").trim());

    const start = startDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric"
    });

    const end = endDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric"
    });

    return `${start} to ${end}`;
}

async function fetchLeekDuckData(boss) {
    const slug = toId(boss.name);

    const possibleUrls = boss.leekDuckUrl
        ? [boss.leekDuckUrl]
        : [
            `https://leekduck.com/events/${slug}-in-5-star-raid-battles-june-2026/`,
            `https://leekduck.com/events/${slug}-in-mega-raids-june-2026/`,
            `https://leekduck.com/events/${slug}-in-mega-raid-battles-june-2026/`
        ];

    for (const url of possibleUrls) {
        const response = await fetch(url);

        if (!response.ok) continue;

        const html = await response.text();

        const text = html
            .replace(/&nbsp;/g, " ")
            .replace(/&#160;/g, " ")
            .replace(/[\u00A0]+/g, " ")
            .replace(/<[^>]+>/g, "\n")
            .replace(/[ \t]+/g, " ")
            .replace(/\n\s*\n/g, "\n")
            .trim();

        const startMatch = text.match(/Starts:\s*\n\s*([^\n]+)/i);
        const endMatch = text.match(/Ends:\s*\n\s*([^\n]+)/i);

        if (!startMatch || !endMatch) continue;

        const lowerText = text.toLowerCase();

        const tier =
            boss.name.toLowerCase().startsWith("mega ") ||
                lowerText.includes("mega raid battles")
                ? "Mega Raid"
                : "5★ Raid";

        return {
            tier,
            dates:
                boss.overrideDates ||
                formatLeekDuckDates(startMatch[1], endMatch[1])
        };
    }

    throw new Error(`Could not fetch Leek Duck data for ${boss.name}`);
}

async function generateTargetAndAppearance(boss) {
    const pokeData = await fetchPokemonData(boss.name);
    const leekData = await fetchLeekDuckData(boss);

    const id = toId(boss.name);
    const key = toKey(boss.name);
    const types = pokeData.types.map((entry) => entry.type.name);
    const weaknessProfile = getWeaknessProfile(types);
    const weaknesses = weaknessProfile.weaknesses;
    const code = buildPokebattlerCode(boss.name);
    const raidLevel = buildRaidLevel(leekData.tier);
    const dateRange = buildDateRangeFromSubtitleDates(leekData.dates);

    const target = `${key}: {
    id: "${id}",
    name: "${boss.name}",
    tier: "${leekData.tier}",
    themeClass: "${getThemeClass(types)}",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png",
    imageAlt: "Official artwork of ${boss.name}",
    subtitle: "${leekData.tier} • ${leekData.dates}",
    types: ${JSON.stringify(types)},
    weaknesses: "${weaknesses.map(capitalize).join(", ")}",
    difficultyLabel: "Focus",
    difficulty: "${buildDifficulty(weaknessProfile)}",
    bestUrl: "${buildPokebattlerUrl({
        code,
        raidLevel,
        includeLegendary: true,
        includeShadow: true,
        includeMegas: true
    })}",
    budgetUrl: "${buildPokebattlerUrl({
        code,
        raidLevel,
        includeLegendary: false,
        includeShadow: false,
        includeMegas: false
    })}"
}`;

    const appearance = {
        bossId: id,
        dateRange
    };

    return { target, appearance };
}

function writeGeneratedTargets(targets) {
    const existingFile = fs.readFileSync(TARGETS_PATH, "utf8");

    const updatedFile = existingFile.replace(
        /\/\/ AUTO-GENERATED START[\s\S]*?\/\/ AUTO-GENERATED END/,
        `// AUTO-GENERATED START

${targets.join(",\n\n")}

// AUTO-GENERATED END`
    );

    fs.writeFileSync(TARGETS_PATH, updatedFile);
}

function writeGeneratedAppearances(appearances) {
    const output = `export const generatedRaidAppearances = ${JSON.stringify(
        appearances,
        null,
        2
    )};\n`;

    fs.writeFileSync(APPEARANCES_PATH, output);
}

async function main() {
    const targets = [];
    const appearances = [];

    for (const boss of bosses) {
        console.log(`Generating ${boss.name}...`);

        const generated = await generateTargetAndAppearance(boss);

        targets.push(generated.target);
        appearances.push(generated.appearance);
    }

    writeGeneratedTargets(targets);
    writeGeneratedAppearances(appearances);

    console.log("Updated tools/scrape-targets.js");
    console.log("Updated tools/generated-raid-appearances.generated.js");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});