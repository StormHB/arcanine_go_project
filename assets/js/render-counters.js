import { counterMonths } from "./data/counters.js";
import { raidRotations } from "./data/rotations.js";

const countersGrid = document.querySelector("#counters-grid");
const searchInput = document.querySelector("#counter-search");
const monthFilter = document.querySelector("#counter-month-filter");
const filterResults = document.querySelector("#filter-results");
const clearFiltersBtn = document.querySelector("#clear-filters-btn");

function formatType(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function findScheduleEntriesByBossId(bossId) {
  return raidRotations
    .flatMap((rotation) =>
      (rotation.schedule ?? []).map((entry) => ({
        ...entry,
        rotationId: rotation.id
      }))
    )
    .filter((entry) => entry.bossIds?.includes(bossId));
}

function getBestScheduleEntryForBoss(bossId, preferredMonthId = null) {
  const entries = findScheduleEntriesByBossId(bossId);

  if (entries.length === 0) return null;

  if (preferredMonthId) {
    const preferredEntry = entries.find(
      (entry) => entry.rotationId === preferredMonthId
    );

    if (preferredEntry) return preferredEntry;
  }

  const now = new Date();

  const active = entries.find((entry) => {
    if (!entry.dateRange) return false;

    const [start, end] = entry.dateRange.map((date) => new Date(date));

    return now >= start && now < end;
  });

  if (active) return active;

  const upcoming = entries
    .filter((entry) => {
      if (!entry.dateRange) return false;

      const [start] = entry.dateRange.map((date) => new Date(date));

      return now < start;
    })
    .sort((a, b) => new Date(a.dateRange[0]) - new Date(b.dateRange[0]))[0];

  if (upcoming) return upcoming;

  return entries
    .filter((entry) => entry.dateRange)
    .sort((a, b) => new Date(b.dateRange[1]) - new Date(a.dateRange[1]))[0];
}

function getBossStatusFromSchedule(entry) {
  if (!entry?.dateRange) {
    return {
      className: "ended-boss",
      label: "Ended"
    };
  }

  const now = new Date();
  const [start, end] = entry.dateRange.map((date) => new Date(date));

  if (now >= start && now < end) {
    return {
      className: "current-boss",
      label: "Active"
    };
  }

  if (now < start) {
    return {
      className: "upcoming-boss",
      label: "Upcoming"
    };
  }

  return {
    className: "ended-boss",
    label: "Ended"
  };
}

function formatCounterSubtitle(boss, preferredMonthId = null) {
  const entry = getBestScheduleEntryForBoss(boss.id, preferredMonthId);

  if (!entry?.dateRange) {
    return boss.subtitle;
  }

  const [start, end] = entry.dateRange;

  const startDate = new Date(start);
  const endDate = new Date(end);

  const startMonth = startDate.toLocaleString("en-US", { month: "short" });
  const endMonth = endDate.toLocaleString("en-US", { month: "short" });

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const tier = boss.tier ?? boss.subtitle?.split("•")[0]?.trim() ?? "Raid";

  return `${tier} • ${startMonth} ${startDay} to ${endMonth} ${endDay}`;
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

function renderMonthFilterOptions() {
  monthFilter.innerHTML = `
    <option value="all">All months</option>
  `;

  const currentMonth =
    counterMonths.find((month) => getMonthStatus(month.id) === "current") ||
    counterMonths[0];

  counterMonths.forEach((month) => {
    const option = document.createElement("option");

    option.value = month.id;
    option.textContent = month.label;

    if (month.id === currentMonth.id) {
      option.selected = true;
    }

    monthFilter.appendChild(option);
  });
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

function renderBossCard(boss, preferredMonthId = null) {
  const scheduleEntry = getBestScheduleEntryForBoss(boss.id, preferredMonthId);
  const displaySubtitle = formatCounterSubtitle(boss, preferredMonthId);
  const bossStatus = getBossStatusFromSchedule(scheduleEntry);

  return `
    <a  
      id="${boss.id}"
      href="boss.html?id=${boss.id}"
      class="boss-card boss-card-link ${boss.themeClass} ${bossStatus.className} ${bossStatus.className === "current-boss" ? "is-active" : ""}"
      style="
        --primary-glow: var(--${boss.types[0]});
        --secondary-glow: ${boss.types[1] ? `var(--${boss.types[1]})` : "transparent"};
      "
    >

      <span class="raid-status ${bossStatus.className.replace("-boss", "")}">
        ${bossStatus.label}
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
    boss.bestCounters?.map((counter) => counter.name).join(" "),
    boss.budgetCounters?.map((counter) => counter.name).join(" ")
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function renderCounters() {
  const selectedFilterMonth = monthFilter.value;
  const searchTerm = searchInput.value.trim().toLowerCase();

  countersGrid.innerHTML = "";

  let bossesToRender = [];

  if (selectedFilterMonth === "all") {
    const seenBossIds = new Set();

    bossesToRender = counterMonths
      .flatMap((month) =>
        month.bosses.map((boss) => ({
          ...boss,
          archiveMonth: month.label,
          archiveMonthId: month.id
        }))
      )
      .filter((boss) => {
        if (seenBossIds.has(boss.id)) {
          return false;
        }

        seenBossIds.add(boss.id);
        return true;
      });
  } else {
    const filteredMonth = counterMonths.find(
      (month) => month.id === selectedFilterMonth
    );

    bossesToRender = filteredMonth?.bosses ?? [];
  }

  const filteredBosses = bossesToRender.filter((boss) => {
    return searchTerm === "" || getBossSearchText(boss).includes(searchTerm);
  });

  if (filteredBosses.length === 0) {
    countersGrid.innerHTML = `
      <div class="empty-filter-state">
        <p class="meta-copy">No raid bosses match your filters.</p>
        <p class="meta-copy">Try another type, weakness, or counter.</p>
      </div>
    `;

    filterResults.textContent = "";
    return;
  }

  countersGrid.innerHTML = filteredBosses
    .map((boss) =>
      renderBossCard(
        boss,
        selectedFilterMonth === "all" ? boss.archiveMonthId : selectedFilterMonth
      )
    )
    .join("");

  filterResults.textContent = `${filteredBosses.length} bosses shown`;
}

renderMonthFilterOptions();
renderCounters();

searchInput.addEventListener("input", () => {
  renderCounters();
});

monthFilter.addEventListener("change", () => {
  renderCounters();
});

clearFiltersBtn.addEventListener("click", () => {
  searchInput.value = "";
  monthFilter.value = "all";
  renderCounters();
});