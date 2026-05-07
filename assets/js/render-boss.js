import { counterMonths } from "./data/counters.js";
import { raidRotations } from "./data/rotations.js";

const root = document.querySelector("#boss-detail-root");

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

function renderMove(move, index) {
  const legacy = move.legacy ? " legacy-move" : "";
  const type = move.type
    ? `<span class="mini-type mini-type-${move.type}">${formatType(move.type)}</span>`
    : "";

  const label = index === 0 ? "Fast" : "Charged";

  return `
    <span class="boss-detail-move">
      <span class="move-label">${label}</span>
      <span class="move${legacy}" ${move.legacy ? 'tabindex="0"' : ""}>
        ${move.name}
        ${type}
      </span>
    </span>
  `;
}

function renderCounter(counter, index) {
  return `
    <div class="boss-detail-counter">
      <span class="counter-rank">#${index + 1}</span>

      <div>
        <strong>${counter.name}</strong>

        <div class="boss-detail-moves">
          ${counter.moves.map((move, index) => renderMove(move, index)).join("")}
        </div>

        <div class="counter-stats">
          <span class="stat-chip">TTW: ${counter.ttw}</span>
          <span class="stat-chip stat-diff">${counter.diff}</span>
        </div>
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