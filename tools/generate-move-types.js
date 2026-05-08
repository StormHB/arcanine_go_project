import fs from "fs";
import { counterMonths } from "../assets/js/data/counters.js";

function normalizeMoveName(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function collectMoves() {
  const moves = new Set();

  for (const month of counterMonths) {
    for (const boss of month.bosses) {
      const allCounters = [
        ...(boss.bestCounters ?? []),
        ...(boss.budgetCounters ?? [])
      ];

      for (const counter of allCounters) {
        for (const move of counter.moves ?? []) {
          moves.add(move.name);
        }
      }
    }
  }

  return [...moves].sort();
}

async function fetchMoveType(moveName) {
  const apiName = normalizeMoveName(moveName);
  const url = `https://pokeapi.co/api/v2/move/${apiName}`;

  const response = await fetch(url);

  if (!response.ok) {
    console.warn(`Could not find move: ${moveName}`);
    return null;
  }

  const data = await response.json();
  return data.type.name;
}

async function main() {
  const moves = collectMoves();
  const moveTypes = {};

  for (const move of moves) {
    const type = await fetchMoveType(move);

    if (type) {
      moveTypes[move] = type;
      console.log(`${move}: ${type}`);
    }
  }

  const output = `export const moveTypes = ${JSON.stringify(moveTypes, null, 2)};\n`;

  fs.writeFileSync("tools/move-types.js", output, "utf8");

  console.log(`\nSaved ${Object.keys(moveTypes).length} move types to tools/move-types.js`);
}

main();