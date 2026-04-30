import { counterMonths } from "./data/counters.js";

const monthSelect = document.querySelector("#counter-month-select");
const countersGrid = document.querySelector("#counters-grid");

function formatType(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function getMonthStatus(monthId) {
  const now = new Date();
  const [year, month] = monthId.split("-").map(Number);

  const start = new Date(year, month - 1, 1, 10, 0, 0);
  const end = new Date(year, month, 1, 10, 0, 0);

  if (now >= start && now < end) return "current";
  if (now < start) return "upcoming";
  return "history";
}

function getBossStatus(subtitle) {
  const now = new Date();
  const match = subtitle.match(/([A-Za-z]+) (\d+) to ([A-Za-z]+) (\d+)/);

  if (!match) return "";

  const [, startMonthName, startDay, endMonthName, endDay] = match;
  const year = 2026;

  const start = new Date(`${startMonthName} ${startDay}, ${year} 10:00:00`);
  const end = new Date(`${endMonthName} ${endDay}, ${year} 10:00:00`);

  if (now >= start && now < end) return "current-boss";
  if (now < start) return "upcoming-boss";
  return "ended-boss";
}

function renderMove(move) {
  const miniType = move.type
    ? `<span class="mini-type mini-type-${move.type}">
         ${formatType(move.type)}
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

function renderMonthOptions() {
  monthSelect.innerHTML = "";

  const defaultMonth =
    counterMonths.find((month) => getMonthStatus(month.id) === "current" && month.bosses.length > 0) ||
    counterMonths.find((month) => month.bosses.length > 0) ||
    counterMonths[0];

  counterMonths.forEach((month) => {
    const option = document.createElement("option");
    const computedStatus = getMonthStatus(month.id);

    option.value = month.id;
    option.textContent = `${month.label} (${computedStatus})`;

    if (month.id === defaultMonth.id) {
      option.selected = true;
    }

    monthSelect.appendChild(option);
  });

  return defaultMonth.id;
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
  const bossStatus = getBossStatus(boss.subtitle);

  const bossStatusLabel =
  bossStatus === "current-boss"
    ? "Active"
    : bossStatus === "upcoming-boss"
      ? "Upcoming"
      : "Ended";

  return `
    <article
      id="${boss.id}"
      class="boss-card ${boss.themeClass} ${bossStatus} ${bossStatus === "current-boss" ? "is-active" : ""}"
      style="
        --primary-glow: var(--${boss.types[0]});
        --secondary-glow: ${boss.types[1] ? `var(--${boss.types[1]})` : "transparent"};
      "
    >

      <span class="raid-status ${bossStatus.replace("-boss", "")}">
        ${bossStatusLabel}
      </span>

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

function renderCounters(monthId) {
  const selectedMonth = counterMonths.find((month) => month.id === monthId);

  countersGrid.innerHTML = "";

  if (!selectedMonth || selectedMonth.bosses.length === 0) {
    countersGrid.innerHTML = `
      <p class="meta-copy">No counter data for this month yet.</p>
    `;
    return;
  }

  countersGrid.innerHTML = selectedMonth.bosses
    .map(renderBossCard)
    .join("");
}

const defaultMonthId = renderMonthOptions();
renderCounters(defaultMonthId);

monthSelect.addEventListener("change", () => {
  renderCounters(monthSelect.value);
});