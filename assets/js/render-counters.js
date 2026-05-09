import { counterMonths } from "./data/counters.js";
import { raidRotations } from "./data/rotations.js";

const monthSelect = document.querySelector("#counter-month-select");
const countersGrid = document.querySelector("#counters-grid");
const searchInput = document.querySelector("#counter-search");
const statusFilter = document.querySelector("#counter-status-filter");
const filterResults = document.querySelector("#filter-results");

function findRaidCardByBossId(bossId) {
  return raidRotations
    .flatMap(rotation => rotation.raidCards ?? [])
    .find(card => card.id === bossId);
}

function formatCounterSubtitle(boss) {
  const raidCard = findRaidCardByBossId(boss.id);

  if (!raidCard?.dateRange) {
    return boss.subtitle;
  }

  const [start, end] = raidCard.dateRange;

  const startDate = new Date(start);
  const endDate = new Date(end);

  const startMonth = startDate.toLocaleString("en-US", { month: "short" });
  const endMonth = endDate.toLocaleString("en-US", { month: "short" });

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const tier =
    raidCard.badge === "Mega"
      ? "Mega Raid"
      : raidCard.badge === "Regional"
        ? "Regional 5★"
        : boss.subtitle?.split("•")[0]?.trim() ?? "Raid";

  return `${tier} • ${startMonth} ${startDay} to ${endMonth} ${endDay}`;
}

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
  const end = new Date(`${endMonthName} ${endDay}, ${year} 20:00:00`);

  if (now >= start && now < end) return "current-boss";
  if (now < start) return "upcoming-boss";
  return "ended-boss";
}

function renderMove(move) {
  const hiddenPowerType =
    move.name.toLowerCase().includes("hidden power") && move.type
      ? `<span class="mini-type mini-type-${move.type}">${formatType(move.type)}</span>`
      : "";

  return `
    <span class="move${move.legacy ? " legacy-move" : ""}" ${move.legacy ? 'tabindex="0"' : ""}>
      ${move.name}
      ${hiddenPowerType}
      ${move.legacy ? ' <span class="legacy-star-inline" aria-hidden="true">★</span>' : ""}
    </span>
  `;
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
  const displaySubtitle = formatCounterSubtitle(boss);
  const bossStatus = getBossStatus(displaySubtitle);

  const bossStatusLabel =
  bossStatus === "current-boss"
    ? "Active"
    : bossStatus === "upcoming-boss"
      ? "Upcoming"
      : "Ended";

  return `
    <a  
      id="${boss.id}"
      href="boss.html?id=${boss.id}"
      class="boss-card boss-card-link ${boss.themeClass} ${bossStatus} ${bossStatus === "current-boss" ? "is-active" : ""}"
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
          <p class="boss-subtitle">${displaySubtitle}</p>

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
    </a>
  `;
}

function getBossSearchText(boss) {
  return [
    boss.name,
    boss.subtitle,
    boss.types?.join(" "),
    boss.weaknesses,
    boss.difficulty,
    boss.bestCounters?.map(counter => counter.name).join(" "),
    boss.budgetCounters?.map(counter => counter.name).join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function renderCounters(monthId) {
  const selectedMonth = counterMonths.find((month) => month.id === monthId);
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;

  countersGrid.innerHTML = "";

  if (!selectedMonth || selectedMonth.bosses.length === 0) {
    countersGrid.innerHTML = `
      <p class="meta-copy">No counter data for this month yet.</p>
    `;
    filterResults.textContent = "";
    return;
  }

  const filteredBosses = selectedMonth.bosses.filter((boss) => {
    const displaySubtitle = formatCounterSubtitle(boss);
    const bossStatus = getBossStatus(displaySubtitle);
    const matchesSearch =
      searchTerm === "" || getBossSearchText(boss).includes(searchTerm);

    const matchesStatus =
      selectedStatus === "all" || bossStatus === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  if (filteredBosses.length === 0) {
    countersGrid.innerHTML = `
      <p class="meta-copy">No bosses match your current filters.</p>
    `;
  } else {
    countersGrid.innerHTML = filteredBosses
      .map(renderBossCard)
      .join("");
  }

  filterResults.textContent =
    `${filteredBosses.length} of ${selectedMonth.bosses.length} bosses shown`;
}

const defaultMonthId = renderMonthOptions();
renderCounters(defaultMonthId);

monthSelect.addEventListener("change", () => {
  searchInput.value = "";
  statusFilter.value = "all";
  renderCounters(monthSelect.value);
});

searchInput.addEventListener("input", () => {
  renderCounters(monthSelect.value);
});

statusFilter.addEventListener("change", () => {
  renderCounters(monthSelect.value);
});