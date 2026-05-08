import { counterMonths } from "./data/counters.js";
import { raidRotations } from "./data/rotations.js";
import { counterImageMap } from "./data/counter-image-map.generated.js";

const root = document.querySelector("#boss-detail-root");

const counterImageOverrides = {
  // Mega Pokémon
  "Mega Venusaur": "assets/img/counters/mega-venusaur.png",
  "Mega Charizard X": "assets/img/counters/mega-charizard-x.png",
  "Mega Charizard Y": "assets/img/counters/mega-charizard-y.png",
  "Mega Blastoise": "assets/img/counters/mega-blastoise.png",
  "Mega Beedrill": "assets/img/counters/mega-beedrill.png",
  "Mega Pidgeot": "assets/img/counters/mega-pidgeot.png",
  "Mega Alakazam": "assets/img/counters/mega-alakazam.png",
  "Mega Slowbro": "assets/img/counters/mega-slowbro.png",
  "Mega Gengar": "assets/img/counters/mega-gengar.png",
  "Mega Kangaskhan": "assets/img/counters/mega-kangaskhan.png",
  "Mega Pinsir": "assets/img/counters/mega-pinsir.png",
  "Mega Gyarados": "assets/img/counters/mega-gyarados.png",
  "Mega Aerodactyl": "assets/img/counters/mega-aerodactyl.png",
  "Mega Mewtwo X": "assets/img/counters/mega-mewtwo-x.png",
  "Mega Mewtwo Y": "assets/img/counters/mega-mewtwo-y.png",
  "Mega Ampharos": "assets/img/counters/mega-ampharos.png",
  "Mega Steelix": "assets/img/counters/mega-steelix.png",
  "Mega Scizor": "assets/img/counters/mega-scizor.png",
  "Mega Heracross": "assets/img/counters/mega-heracross.png",
  "Mega Houndoom": "assets/img/counters/mega-houndoom.png",
  "Mega Tyranitar": "assets/img/counters/mega-tyranitar.png",
  "Mega Sceptile": "assets/img/counters/mega-sceptile.png",
  "Mega Blaziken": "assets/img/counters/mega-blaziken.png",
  "Mega Swampert": "assets/img/counters/mega-swampert.png",
  "Mega Gardevoir": "assets/img/counters/mega-gardevoir.png",
  "Mega Sableye": "assets/img/counters/mega-sableye.png",
  "Mega Mawile": "assets/img/counters/mega-mawile.png",
  "Mega Aggron": "assets/img/counters/mega-aggron.png",
  "Mega Medicham": "assets/img/counters/mega-medicham.png",
  "Mega Manectric": "assets/img/counters/mega-manectric.png",
  "Mega Sharpedo": "assets/img/counters/mega-sharpedo.png",
  "Mega Camerupt": "assets/img/counters/mega-camerupt.png",
  "Mega Altaria": "assets/img/counters/mega-altaria.png",
  "Mega Banette": "assets/img/counters/mega-banette.png",
  "Mega Absol": "assets/img/counters/mega-absol.png",
  "Mega Glalie": "assets/img/counters/mega-glalie.png",
  "Mega Salamence": "assets/img/counters/mega-salamence.png",
  "Mega Metagross": "assets/img/counters/mega-metagross.png",
  "Mega Latias": "assets/img/counters/mega-latias.png",
  "Mega Latios": "assets/img/counters/mega-latios.png",
  "Mega Rayquaza": "assets/img/counters/mega-rayquaza.png",
  "Mega Lopunny": "assets/img/counters/mega-lopunny.png",
  "Mega Garchomp": "assets/img/counters/mega-garchomp.png",
  "Mega Lucario": "assets/img/counters/mega-lucario.png",
  "Mega Abomasnow": "assets/img/counters/mega-abomasnow.png",
  "Mega Gallade": "assets/img/counters/mega-gallade.png",
  "Mega Audino": "assets/img/counters/mega-audino.png",
  "Mega Diancie": "assets/img/counters/mega-diancie.png",

  // Primal forms
  "Primal Kyogre": "assets/img/counters/primal-kyogre.png",
  "Primal Groudon": "assets/img/counters/primal-groudon.png",

  // Fusion / Crowned / major alternate forms
  "Zacian (Crowned Sword)": "assets/img/counters/zacian-crowned-sword.png",
  "Zamazenta (Crowned Shield)": "assets/img/counters/zamazenta-crowned-shield.png",
  "Necrozma (Dusk Mane)": "assets/img/counters/necrozma-dusk-mane.png",
  "Necrozma - Dusk Mane": "assets/img/counters/necrozma-dusk-mane.png",
  "Dusk Mane Necrozma": "assets/img/counters/necrozma-dusk-mane.png",
  "Necrozma (Dawn Wings)": "assets/img/counters/necrozma-dawn-wings.png",
  "Necrozma - Dawn Wings": "assets/img/counters/necrozma-dawn-wings.png",
  "Dawn Wings Necrozma": "assets/img/counters/necrozma-dawn-wings.png",
  "White Kyurem": "assets/img/counters/white-kyurem.png",
  "Kyurem (White Kyurem)": "assets/img/counters/white-kyurem.png",
  "Black Kyurem": "assets/img/counters/black-kyurem.png",
  "Kyurem (Black Kyurem)": "assets/img/counters/black-kyurem.png",
  "Giratina (Origin)": "assets/img/counters/giratina-origin.png",
  "Landorus (Therian)": "assets/img/counters/landorus-therian.png",
  "Thundurus (Therian)": "assets/img/counters/thundurus-therian.png",
  "Tornadus (Therian)": "assets/img/counters/tornadus-therian.png",
  "Keldeo (Resolute)": "assets/img/counters/keldeo-resolute.png",

  // Meta-relevant Shadow attackers
  "Shadow Regigigas": "assets/img/counters/shadow-regigigas.png",

  "Shadow Machamp": "assets/img/counters/shadow-machamp.png",
  "Shadow Hariyama": "assets/img/counters/shadow-hariyama.png",
  "Shadow Blaziken": "assets/img/counters/shadow-blaziken.png",

  "Shadow Moltres": "assets/img/counters/shadow-moltres.png",
  "Shadow Salamence": "assets/img/counters/shadow-salamence.png",
  "Shadow Staraptor": "assets/img/counters/shadow-staraptor.png",
  "Shadow Honchkrow": "assets/img/counters/shadow-honchkrow.png",

  "Shadow Roserade": "assets/img/counters/shadow-roserade.png",
  "Shadow Victreebel": "assets/img/counters/shadow-victreebel.png",
  "Shadow Vileplume": "assets/img/counters/shadow-vileplume.png",
  "Shadow Toxicroak": "assets/img/counters/shadow-toxicroak.png",
  "Shadow Overqwil": "assets/img/counters/shadow-overqwil.png",

  "Shadow Groudon": "assets/img/counters/shadow-groudon.png",
  "Shadow Garchomp": "assets/img/counters/shadow-garchomp.png",
  "Shadow Landorus (Incarnate)": "assets/img/counters/shadow-landorus-incarnate.png",
  "Shadow Excadrill": "assets/img/counters/shadow-excadrill.png",
  "Shadow Mamoswine": "assets/img/counters/shadow-mamoswine.png",
  "Shadow Rhyperior": "assets/img/counters/shadow-rhyperior.png",
  "Shadow Golurk": "assets/img/counters/shadow-golurk.png",

  "Shadow Rampardos": "assets/img/counters/shadow-rampardos.png",
  "Shadow Tyranitar": "assets/img/counters/shadow-tyranitar.png",
  "Shadow Gigalith": "assets/img/counters/shadow-gigalith.png",
  "Shadow Aerodactyl": "assets/img/counters/shadow-aerodactyl.png",

  "Shadow Scizor": "assets/img/counters/shadow-scizor.png",
  "Shadow Pinsir": "assets/img/counters/shadow-pinsir.png",
  "Shadow Scyther": "assets/img/counters/shadow-scyther.png",

  "Shadow Chandelure": "assets/img/counters/shadow-chandelure.png",
  "Shadow Gengar": "assets/img/counters/shadow-gengar.png",
  "Shadow Banette": "assets/img/counters/shadow-banette.png",

  "Shadow Metagross": "assets/img/counters/shadow-metagross.png",
  "Shadow Dialga": "assets/img/counters/shadow-dialga.png",
  "Shadow Aggron": "assets/img/counters/shadow-aggron.png",

  "Shadow Entei": "assets/img/counters/shadow-entei.png",
  "Shadow Charizard": "assets/img/counters/shadow-charizard.png",
  "Shadow Ho-Oh": "assets/img/counters/shadow-ho-oh.png",

  "Shadow Kyogre": "assets/img/counters/shadow-kyogre.png",
  "Shadow Swampert": "assets/img/counters/shadow-swampert.png",
  "Shadow Gyarados": "assets/img/counters/shadow-gyarados.png",
  "Shadow Feraligatr": "assets/img/counters/shadow-feraligatr.png",
  "Shadow Kingler": "assets/img/counters/shadow-kingler.png",
  "Shadow Empoleon": "assets/img/counters/shadow-empoleon.png",
  "Shadow Greninja": "assets/img/counters/shadow-greninja.png",

  "Shadow Sceptile": "assets/img/counters/shadow-sceptile.png",
  "Shadow Venusaur": "assets/img/counters/shadow-venusaur.png",
  "Shadow Tangrowth": "assets/img/counters/shadow-tangrowth.png",
  "Shadow Torterra": "assets/img/counters/shadow-torterra.png",

  "Shadow Raikou": "assets/img/counters/shadow-raikou.png",
  "Shadow Magnezone": "assets/img/counters/shadow-magnezone.png",
  "Shadow Electivire": "assets/img/counters/shadow-electivire.png",
  "Shadow Zapdos": "assets/img/counters/shadow-zapdos.png",
  "Shadow Luxray": "assets/img/counters/shadow-luxray.png",

  "Shadow Mewtwo": "assets/img/counters/shadow-mewtwo.png",
  "Shadow Latios": "assets/img/counters/shadow-latios.png",
  "Shadow Alakazam": "assets/img/counters/shadow-alakazam.png",
  "Shadow Gardevoir": "assets/img/counters/shadow-gardevoir.png",
  "Shadow Gallade": "assets/img/counters/shadow-gallade.png",

  "Shadow Weavile": "assets/img/counters/shadow-weavile.png",
  "Shadow Articuno": "assets/img/counters/shadow-articuno.png",
  "Shadow Walrein": "assets/img/counters/shadow-walrein.png",
  "Shadow Glalie": "assets/img/counters/shadow-glalie.png",

  "Shadow Dragonite": "assets/img/counters/shadow-dragonite.png",
  "Shadow Latias": "assets/img/counters/shadow-latias.png",
  "Shadow Dialga": "assets/img/counters/shadow-dialga.png",
  "Shadow Palkia": "assets/img/counters/shadow-palkia.png",

  "Shadow Hydreigon": "assets/img/counters/shadow-hydreigon.png",
  "Shadow Darkrai": "assets/img/counters/shadow-darkrai.png",
  "Shadow Absol": "assets/img/counters/shadow-absol.png",

  "Shadow Granbull": "assets/img/counters/shadow-granbull.png",
  "Shadow Alolan Ninetales": "assets/img/counters/shadow-alolan-ninetales.png",
  "Shadow Mawile": "assets/img/counters/shadow-mawile.png"
};

const pokemonImageIds = {
  "Kyogre": 382,
  "Primal Kyogre": 10077,
  "Shadow Kyogre": 382,
  "Groudon": 383,
  "Primal Groudon": 10078,
  "Shadow Groudon": 383,

  "Rayquaza": 384,
  "Mega Rayquaza": 10079,

  "Zekrom": 644,
  "Reshiram": 643,
  "White Kyurem": 646,
  "Black Kyurem": 646,

  "Zacian (Crowned Sword)": 888,
  "Zamazenta (Crowned Shield)": 889,
  "Necrozma (Dusk Mane)": 800,
  "Necrozma - Dusk Mane": 800,
  "Necrozma (Dawn Wings)": 800,
  "Necrozma - Dawn Wings": 800,
  "Dawn Wings Necrozma": 800,

  "Mega Lucario": 448,
  "Lucario": 448,
  "Mega Gengar": 94,
  "Gengar": 94,
  "Mega Absol": 359,
  "Absol": 359,
  "Mega Beedrill": 15,
  "Mega Sceptile": 254,

  "Metagross": 376,
  "Shadow Metagross": 376,
  "Empoleon": 395,
  "Shadow Empoleon": 395,
  "Greninja": 658,
  "Shadow Greninja": 658,
  "Gyarados": 130,
  "Shadow Gyarados": 130,

  "Raikou": 243,
  "Shadow Raikou": 243,
  "Electivire": 466,
  "Shadow Electivire": 466,
  "Magnezone": 462,
  "Xurkitree": 796,
  "Regieleki": 894,

  "Excadrill": 530,
  "Shadow Excadrill": 530,
  "Garchomp": 445,
  "Shadow Garchomp": 445,
  "Mamoswine": 473,
  "Shadow Mamoswine": 473,
  "Rhyperior": 464,
  "Shadow Rhyperior": 464,
  "Rhydon": 112,
  "Golurk": 623,
  "Krookodile": 553,
  "Landorus (Therian)": 645,

  "Rillaboom": 812,
  "Chesnaught": 652,
  "Meowscarada": 908,
  "Tangrowth": 465,
  "Roserade": 407,
  "Kartana": 798,

  "Toucannon": 733,
  "Shadow Toucannon": 733,
  "Staraptor": 398,
  "Shadow Staraptor": 398,
  "Braviary": 628,
  "Hisuian Braviary": 628,
  "Salamence": 373,
  "Shadow Salamence": 373,
  "Moltres": 146,
  "Shadow Moltres": 146,
  "Honchkrow": 430,
  "Flamigo": 973,
  "Enamorus": 905,

  "Hydreigon": 635,
  "Shadow Hydreigon": 635,
  "Tyranitar": 248,
  "Shadow Tyranitar": 248,
  "Kingambit": 983,
  "Incineroar": 727,
  "Zoroark": 571,
  "Darkrai": 491,
  "Shadow Darkrai": 491,
  "Weavile": 461,
  "Shadow Weavile": 461,

  "Chandelure": 609,
  "Shadow Chandelure": 609,
  "Dragapult": 887,
  "Gholdengo": 1000,
  "Dhelmise": 781,
  "Lunala": 792,
  "Shadow Mewtwo": 150,

  "Tinkaton": 959,
  "Baxcalibur": 998,
  "Galarian Darmanitan": 555,
  "Rampardos": 409,
  "Volcarona": 637,
  "Cinderace": 815,
  "Blaziken": 257,
  "Shadow Blaziken": 257,

  "Keldeo": 647,
  "Keldeo (Resolute)": 647,
  "Hisuian Decidueye": 724,
  "Breloom": 286,
  "Conkeldurr": 534,
  "Quaquaval": 914,
  "Primarina": 730,
  "Kingler": 99,
  "Golisopod": 768,
  "Tatsugiri": 978,

  "Naganadel": 804,
  "Nihilego": 793,
  "Overqwil": 904,
  "Shadow Overqwil": 904,
  "Toxicroak": 454,
  "Shadow Toxicroak": 454,
  "Revavroom": 966,
  "Scolipede": 545,
  "Victreebel": 71,
  "Toxtricity Low Key": 849
};

function getBossFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function findBossById(id) {
  return counterMonths
    .flatMap((month) => month.bosses)
    .find((boss) => boss.id === id);
}

function formatType(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function isShadowCounter(counter) {
  return counter.name.startsWith("Shadow ");
}

function getCounterImage(counter) {
  return counterImageMap[counter.name] ||
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
}

function getMoveType(move) {
  return move.type || moveTypes[move.name] || "normal";
}

function formatMoveName(name) {
  return name.split(" ").join("<br>");
}

function renderMove(move, index) {
  const legacy = move.legacy ? " legacy-move" : "";

  const typeBadge = move.type
    ? `<span class="type-badge type-${move.type}">${formatType(move.type)}</span>`
    : "";

  const label = index === 0 ? "Fast" : "Charged";
  const moveName = move.name.split(" ").join("<br>");

  const legacyIcon = move.legacy
    ? `<span class="legacy-star" tabindex="0" aria-label="Legacy or event-exclusive move">★</span>`
    : "";

  console.log(move);

  return `
    <span class="boss-detail-move">
      <span class="move-label">${label}</span>
      ${typeBadge}
      <span class="move-name-wrap">
        <span class="move-name${legacy}">${moveName}</span>
        ${legacyIcon}
      </span>
    </span>
  `;
}

function renderCounterTypes(counter) {
  const types = counter.types;

  if (!Array.isArray(types) || types.length === 0) return "";

  return `
    <div class="counter-type-row">
      ${types
        .map((type) => `<span class="type-badge type-${type}">${formatType(type)}</span>`)
        .join("")}
    </div>
  `;
}
function renderCounter(counter, index) {
  return `
    <div class="boss-detail-counter">
      <div class="counter-pokemon-art-wrap${isShadowCounter(counter) ? " is-shadow-counter" : ""}">
        <img
          class="counter-pokemon-art"
          src="${getCounterImage(counter)}"
          alt="${counter.name} artwork"
          loading="lazy"
          onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'"
        >

        ${
          isShadowCounter(counter)
            ? `<img class="shadow-badge-overlay" src="assets/img/ui/shadow-badge.svg" alt="" aria-hidden="true">`
            : ""
        }
      </div>

      <div class="counter-detail-title">
        <span class="counter-rank">#${index + 1}</span>
        <strong class="counter-detail-name">${counter.name}</strong>
        ${renderCounterTypes(counter)}
      </div>

      <div class="boss-detail-moves">
        ${counter.moves.map((move, index) => renderMove(move, index)).join("")}
      </div>

      <div class="counter-stats">
        <span class="stat-chip">TTW: ${counter.ttw}</span>
        <span class="stat-chip stat-diff">${counter.diff}</span>
      </div>
    </div>
  `;
}

function findRaidCardByBossId(bossId) {
  return raidRotations
    .flatMap((rotation) => rotation.raidCards ?? [])
    .find((card) => card.id === bossId);
}

function getBossDateRange(boss) {
  const raidCard = findRaidCardByBossId(boss.id);
  return raidCard?.dateRange ?? null;
}

function getBossStatus(boss) {
  const dateRange = getBossDateRange(boss);

  if (!dateRange) {
    return { text: "Planned", class: "planned" };
  }

  const now = new Date();
  const start = new Date(dateRange[0]);
  const end = new Date(dateRange[1]);

  if (now >= start && now <= end) return { text: "Active", class: "active" };
  if (now < start) return { text: "Upcoming", class: "upcoming" };

  return { text: "Ended", class: "ended" };
}

function renderBossDetail(boss) {
  const [primaryType, secondaryType] = boss.types;
  const status = getBossStatus(boss);

  root.innerHTML = `
    <article
      class="boss-detail-card ${boss.themeClass}"
      style="
        --primary-glow: var(--${primaryType});
        --secondary-glow: ${secondaryType ? `var(--${secondaryType})` : "transparent"};
      "
    >
      <div class="boss-detail-hero">
        <div class="boss-detail-art-wrap">
          <img class="boss-detail-art" src="${boss.image}" alt="${boss.imageAlt}">
        </div>

        <div class="boss-detail-heading">
          <h1>${boss.name}</h1>

          <div class="boss-detail-badges">
            <span class="raid-badge boss-raid-badge">
              ${boss.subtitle.split("•")[0].trim()}
            </span>

            ${boss.types
      .map((type) => `<span class="type-badge type-${type}">${formatType(type)}</span>`)
      .join("")}
          </div>

          <div class="boss-detail-date-row">
            <p class="boss-subtitle">${boss.subtitle}</p>
            <span class="boss-detail-status raid-status ${status.class}">${status.text}</span>
          </div>
        </div>
      </div>

      <div class="boss-detail-meta-grid">
        <div class="meta-box boss-detail-meta-box">
          <strong>Weak to</strong>
          <span>${boss.weaknesses}</span>
        </div>

        <div class="meta-box boss-detail-meta-box">
          <strong>${boss.difficultyLabel || "Focus"}</strong>
          <span>${boss.difficulty}</span>
        </div>
      </div>

      <div class="boss-detail-columns">
        <section class="counter-group boss-detail-counter-group">
          <h2>Best counters</h2>
          ${boss.bestCounters.map(renderCounter).join("")}
        </section>

        <section class="counter-group boss-detail-counter-group">
          <h2>Budget counters</h2>
          ${boss.budgetCounters.map(renderCounter).join("")}
        </section>
      </div>
    </article>
  `;
}

const bossId = getBossFromUrl();
const boss = findBossById(bossId);

if (!boss) {
  root.innerHTML = `
    <p class="meta-copy">Boss not found.</p>
    <a class="back-link" href="raids.html">← Back to raids</a>
  `;
} else {
  renderBossDetail(boss);
}