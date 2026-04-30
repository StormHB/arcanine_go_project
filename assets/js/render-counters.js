import { counterBosses } from "./data/counters.js";

const countersGrid = document.querySelector("#counters-grid");

function formatType(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function renderMove(move) {
  const miniType = move.type
    ? `<span class="mini-type mini-type-${move.type}">
         ${move.type.charAt(0).toUpperCase() + move.type.slice(1)}
       </span>`
    : "";

  if (move.legacy) {
    return `<span class="move legacy-move" tabindex="0">
      ${move.name}
      ${miniType}
    </span>`;
  }

  return `<span class="move">
    ${move.name}
    ${miniType}
  </span>`;
}

function renderCounterChip(counter, type) {
  return `
    <div class="counter-chip ${type}">
      <span class="pokemon-name">${counter.name}</span>

      ${counter.moves.map(renderMove).join("")}

      <div class="counter-stats">
        <span class="stat-chip">TTW: ${counter.ttw}</span>
        <span class="stat-chip stat-diff">${counter.diff}</span>
      </div>
    </div>
  `;
}

function renderCounterGroup(title, counters, type) {
  return `
    <div class="counter-group">
      <h4>${title}</h4>

      <div class="counter-list">
        ${counters.map((counter) => renderCounterChip(counter, type)).join("")}
      </div>
    </div>
  `;
}

function renderBossCard(boss) {
  return `
    <article
      id="${boss.id}"
      class="boss-card ${boss.themeClass}"
      style="
        --primary-glow: var(--${boss.types[0]});
        --secondary-glow: ${boss.types[1] ? `var(--${boss.types[1]})` : "transparent"};
      "
    >
      <div class="boss-top">
        <img
          class="boss-art"
          src="${boss.image}"
          alt="${boss.imageAlt}"
        >

        <div class="boss-info">
          <h3>${boss.name}</h3>
          <p class="boss-subtitle">${boss.subtitle}</p>

          <div class="type-badges">
            ${boss.types
      .map((type) => `<span class="type-badge type-${type}">${formatType(type)}</span>`)
      .join("")}
          </div>
        </div>
      </div>

      <div class="boss-body">
        <div class="boss-meta">
          <div class="meta-box">
            <strong>Weak to</strong>
            ${boss.weaknesses}
          </div>

          <div class="meta-box">
            <strong>${boss.difficultyLabel || "Difficulty"}</strong>
            ${boss.difficulty}
          </div>
        </div>

        <div class="counter-columns">
          ${renderCounterGroup("Best counters", boss.bestCounters, "best")}
          ${renderCounterGroup("Budget counters", boss.budgetCounters, "budget")}
        </div>
      </div>
    </article>
  `;
}

function renderCounters() {
  countersGrid.innerHTML = counterBosses.map(renderBossCard).join("");
}

renderCounters();