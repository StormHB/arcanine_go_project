import fs from "fs";
import path from "path";
import { counterMonths } from "../assets/js/data/counters.js";

const OUTPUT_DIR = "assets/img/counters";
const MAP_OUTPUT = "assets/js/data/counter-image-map.generated.js";

const FALLBACK_IMAGE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

const FORM_OVERRIDES = {
  "White Kyurem": "kyurem-white",
  "Black Kyurem": "kyurem-black",

  "Necrozma (Dusk Mane)": "necrozma-dusk",
  "Necrozma - Dusk Mane": "necrozma-dusk",
  "Dusk Mane Necrozma": "necrozma-dusk",

  "Zacian (Crowned Sword)": "zacian-crowned",
  "Zamazenta (Crowned Shield)": "zamazenta-crowned",

  "Necrozma (Dawn Wings)": "necrozma-dawn",
  "Necrozma - Dawn Wings": "necrozma-dawn",
  "Dawn Wings Necrozma": "necrozma-dawn",

  "Giratina (Origin)": "giratina-origin",
  "Landorus (Therian)": "landorus-therian",
  "Thundurus (Therian)": "thundurus-therian",
  "Tornadus (Therian)": "tornadus-therian",

  "Hoopa Unbound": "hoopa-unbound",
  "Keldeo": "keldeo-ordinary",
  "Keldeo (Resolute)": "keldeo-resolute",

  "Primal Kyogre": "kyogre-primal",
  "Primal Groudon": "groudon-primal",

  "Alolan Ninetales": "ninetales-alola",
  "Galarian Darmanitan": "darmanitan-galar-standard",
  "Hisuian Decidueye": "decidueye-hisui",
  "Enamorus": "enamorus-incarnate",
  "Hisuian Braviary": "braviary-hisui",
};

function stripShadow(name) {
  return name.replace(/^Shadow\s+/i, "").trim();
}

function siteSlug(name) {
  return stripShadow(name)
    .toLowerCase()
    .replace(/[♀]/g, "-f")
    .replace(/[♂]/g, "-m")
    .replace(/[':.]/g, "")
    .replace(/[()]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

function toPokeApiSlug(name) {
  const cleanName = stripShadow(name);

  if (FORM_OVERRIDES[cleanName]) {
    return FORM_OVERRIDES[cleanName];
  }

  if (cleanName.startsWith("Mega ")) {
    const base = cleanName.replace(/^Mega\s+/i, "").trim();

    if (base.endsWith(" X")) {
      return `${siteSlug(base.replace(/\sX$/, ""))}-mega-x`;
    }

    if (base.endsWith(" Y")) {
      return `${siteSlug(base.replace(/\sY$/, ""))}-mega-y`;
    }

    return `${siteSlug(base)}-mega`;
  }

  if (cleanName.startsWith("Alolan ")) {
    const base = cleanName.replace(/^Alolan\s+/i, "").trim();
    return `${siteSlug(base)}-alola`;
  }

  if (cleanName.startsWith("Galarian ")) {
    const base = cleanName.replace(/^Galarian\s+/i, "").trim();
    return `${siteSlug(base)}-galar`;
  }

  return siteSlug(cleanName);
}

function collectCounterNames() {
  const names = new Set();

  for (const month of counterMonths) {
    for (const boss of month.bosses) {
      for (const counter of boss.bestCounters ?? []) {
        names.add(counter.name);
      }

      for (const counter of boss.budgetCounters ?? []) {
        names.add(counter.name);
      }
    }
  }

  return [...names].sort();
}

async function getArtworkUrl(pokeApiSlug) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeApiSlug}`);

  if (!response.ok) {
    throw new Error(`PokéAPI lookup failed for ${pokeApiSlug}`);
  }

  const data = await response.json();

  return (
    data.sprites?.other?.["official-artwork"]?.front_default ||
    data.sprites?.other?.home?.front_default ||
    data.sprites?.front_default
  );
}

async function downloadImage(url, outputPath) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Image download failed: ${url}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const counterNames = collectCounterNames();
  const imageMap = {};
  const missing = [];

  for (const name of counterNames) {
    const cleanName = stripShadow(name);
    const fileSlug = siteSlug(cleanName);
    const outputPath = path.join(OUTPUT_DIR, `${fileSlug}.png`);
    const localPath = `assets/img/counters/${fileSlug}.png`;

    imageMap[name] = localPath;

    if (fs.existsSync(outputPath)) {
      console.log(`Already exists: ${localPath}`);
      continue;
    }

    const pokeApiSlug = toPokeApiSlug(name);

    try {
      const artworkUrl = await getArtworkUrl(pokeApiSlug);

      if (!artworkUrl) {
        throw new Error(`No artwork URL for ${pokeApiSlug}`);
      }

      await downloadImage(artworkUrl, outputPath);
      console.log(`Downloaded: ${name} -> ${localPath}`);
    } catch (error) {
      console.warn(`Missing image: ${name} (${pokeApiSlug})`);
      missing.push({ name, pokeApiSlug });
      imageMap[name] = FALLBACK_IMAGE;
    }
  }

  const mapFile = `export const counterImageMap = ${JSON.stringify(imageMap, null, 2)};\n`;

  fs.writeFileSync(MAP_OUTPUT, mapFile);

  console.log(`\nGenerated ${MAP_OUTPUT}`);

  if (missing.length > 0) {
    console.log("\nStill missing:");
    for (const item of missing) {
      console.log(`- ${item.name} (${item.pokeApiSlug})`);
    }
  }
}

main();