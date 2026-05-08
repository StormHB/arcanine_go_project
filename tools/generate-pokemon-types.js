import fs from "fs";
import { counterDrafts } from "../assets/js/data/counter-drafts.generated.js";

const formNameMap = {
  "Alola Dugtrio": "dugtrio-alola",
  "Alola Golem": "golem-alola",
  "Alola Muk": "muk-alola",

  "Black Kyurem": "kyurem-black",
  "White Kyurem": "kyurem-white",

  "Dialga - Origin": "dialga-origin",
  "Giratina Origin": "giratina-origin",
  "Palkia - Origin": "palkia-origin",

  "Enamorus": "enamorus-incarnate",
  "Landorus": "landorus-incarnate",
  "Tornadus": "tornadus-incarnate",
  "Thundurus": "thundurus-incarnate",

  "Galarian Articuno": "articuno-galar",
  "Galarian Darmanitan": "darmanitan-galar",
  "Galarian Slowbro": "slowbro-galar",
  "Galarian Slowking": "slowking-galar",

  "Hisuian Arcanine": "arcanine-hisui",
  "Hisuian Braviary": "braviary-hisui",
  "Hisuian Decidueye": "decidueye-hisui",
  "Hisuian Qwilfish": "qwilfish-hisui",
  "Hisuian Samurott": "samurott-hisui",
  "Hisuian Typhlosion": "typhlosion-hisui",
  "Hisuian Zoroark": "zoroark-hisui",

  "Hoopa - Unbound": "hoopa-unbound",
  "Shaymin - Sky": "shaymin-sky",
  "Rotom - Mow": "rotom-mow",
  "Rotom - Wash": "rotom-wash",

  "Gastrodon - East Sea": "gastrodon-east",
  "Gastrodon - West Sea": "gastrodon-west",

  "Mega Charizard X": "charizard-mega-x",
  "Mega Charizard Y": "charizard-mega-y",
  "Mega Mewtwo X": "mewtwo-mega-x",
  "Mega Mewtwo Y": "mewtwo-mega-y",

  "Zacian - Crowned Sword": "zacian-crowned",
  "Zacian (Crowned Sword)": "zacian-crowned",
  "Zamazenta - Crowned Shield": "zamazenta-crowned",
  "Zamazenta (Crowned Shield)": "zamazenta-crowned",
  "Necrozma - Dusk Mane": "necrozma-dusk",
  "Necrozma (Dusk Mane)": "necrozma-dusk",
  "Necrozma - Dawn Wings": "necrozma-dawn",
  "Necrozma (Dawn Wings)": "necrozma-dawn",

  "Urshifu - Rapid Strike": "urshifu-rapid-strike",
  "Urshifu - Single Strike": "urshifu-single-strike",

  "Darmanitan": "darmanitan-standard",
  "Pyroar": "pyroar-male",
  "Oricorio": "oricorio-baile",
  "Keldeo": "keldeo-ordinary",
  "Tatsugiri": "tatsugiri-curly",

  "Galarian Darmanitan": "darmanitan-galar-standard",
  "Gastrodon - East Sea": "gastrodon",
  "Gastrodon - West Sea": "gastrodon",
  "Mega Charizard X": "charizard-mega-x",
  "Mega Charizard Y": "charizard-mega-y",
  "Mega Mewtwo X": "mewtwo-mega-x",
  "Mega Mewtwo Y": "mewtwo-mega-y",
  "Shadow Giratina": "giratina-altered"


};

function normalizePokemonName(name) {
  const cleaned = name
    .replace(/^Shadow /, "")
    .replace(/^Mega /, "")
    .replace(/^Primal /, "");

  if (formNameMap[cleaned]) return formNameMap[cleaned];

  return cleaned
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function collectPokemon() {
  const names = new Set();

  for (const draft of counterDrafts) {
    const counters = [
      ...(draft.bestCountersRaw ?? []),
      ...(draft.budgetCountersRaw ?? [])
    ];

    for (const counter of counters) {
      names.add(counter.name);
    }
  }

  return [...names].sort();
}

function getPokemonApiCandidates(name) {
  const cleaned = name
    .replace(/^Shadow /, "")
    .replace(/^Mega /, "")
    .replace(/^Primal /, "");

  const mapped = formNameMap[cleaned] || formNameMap[name];

  const baseSlug = cleaned
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  return [
    mapped,
    baseSlug,
    baseSlug.replace("galarian-", "").replace(/$/, "-galar"),
    baseSlug.replace("alola-", "").replace(/$/, "-alola"),
    baseSlug.replace("hisuian-", "").replace(/$/, "-hisui"),
    baseSlug.replace("mega-", "").replace(/$/, "-mega"),
    baseSlug.replace("mega-", "").replace("-x", "-mega-x"),
    baseSlug.replace("mega-", "").replace("-y", "-mega-y"),
    baseSlug.replace("---", "-"),
    baseSlug.replace("--", "-")
  ].filter(Boolean);
}

async function fetchPokemonTypes(name) {
  const candidates = [...new Set(getPokemonApiCandidates(name))];

  for (const apiName of candidates) {
    const url = `https://pokeapi.co/api/v2/pokemon/${apiName}`;
    const response = await fetch(url);

    if (!response.ok) continue;

    const data = await response.json();

    return data.types
      .sort((a, b) => a.slot - b.slot)
      .map((entry) => entry.type.name);
  }

  console.warn(`Could not find Pokémon: ${name} (${candidates.join(", ")})`);
  return null;
}

async function main() {
  const pokemon = collectPokemon();
  const pokemonTypes = {};

  for (const name of pokemon) {
    const types = await fetchPokemonTypes(name);

    if (types) {
      pokemonTypes[name] = types;
      console.log(`${name}: ${types.join(", ")}`);
    }
  }

  const output = `export const pokemonTypes = ${JSON.stringify(pokemonTypes, null, 2)};\n`;

  fs.writeFileSync("tools/pokemon-types.js", output, "utf8");

  console.log(`\nSaved ${Object.keys(pokemonTypes).length} Pokémon type entries to tools/pokemon-types.js`);
}

main();