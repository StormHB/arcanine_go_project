import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, "cache");
const OUTPUT_FILE = path.join(
  OUTPUT_DIR,
  "pokemon-go-stats.generated.json"
);

async function main() {
  const response = await fetch(
    "https://pogoapi.net/api/v1/pokemon_stats.json"
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Pokémon GO stats: ${response.status}`
    );
  }

  const data = await response.json();

  const stats = Object.values(data).map((pokemon) => ({
    pokemonName: pokemon.pokemon_name,
    form: pokemon.form,
    attack: pokemon.base_attack,
    defense: pokemon.base_defense,
    stamina: pokemon.base_stamina
  }));

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(stats, null, 2)
  );

  console.log(
    `Generated ${stats.length} Pokémon GO stat entries.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});