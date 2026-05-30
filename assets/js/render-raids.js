import { raidRotations } from "./data/rotations.js";
import { counterMonths } from "./data/counters.js";

const monthSelect = document.querySelector("#month-select");
const scheduleList = document.querySelector("#raid-schedule-list");
const summaryGrid = document.querySelector("#raid-summary-grid");
const raidCardGrid = document.querySelector("#raid-card-grid");

function formatType(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/★/g, "")
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function asList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  return String(value)
    .split("/")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getScheduleBosses(rotation) {
  const bosses = [];

  asList(rotation.fiveStar).forEach((name, index) => {
    bosses.push({
      id: rotation.fiveStarIds?.[index] ?? rotation.bossIds?.[index] ?? slugify(name),
      name,
      tier: "5★",
      badgeClass: "legendary-badge"
    });
  });

  asList(rotation.mega).forEach((name, index) => {
    const offset = asList(rotation.fiveStar).length;

    bosses.push({
      id: rotation.megaIds?.[index] ?? rotation.bossIds?.[offset + index] ?? slugify(name),
      name,
      tier: "Mega",
      badgeClass: "mega-badge"
    });
  });

  return bosses;
}

function getRaidStatus(dateRange) {
  const today = new Date();

  const start = new Date(dateRange[0]);
  const end = new Date(dateRange[1]);

  if (today >= start && today <= end) {
    return {
      text: "Active",
      class: "active"
    };
  }

  if (today < start) {
    return {
      text: `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} → ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
      class: "upcoming"
    };
  }

  return {
    text: "Ended",
    class: "ended"
  };
}

function getMonthComputedStatus(month) {
  return month.status ?? "history";
}

function getDefaultMonth() {
  return (
    raidRotations.find((month) => month.status === "current") ||
    raidRotations.find((month) => month.status === "upcoming") ||
    raidRotations.at(-1)
  );
}

function renderMonthOptions() {
  monthSelect.innerHTML = "";

  const defaultMonth = getDefaultMonth();

  raidRotations.forEach((month) => {
    const option = document.createElement("option");
    const computedStatus = getMonthComputedStatus(month);

    option.value = month.id;
    option.textContent = `${month.label} (${computedStatus})`;

    if (month.id === defaultMonth.id) {
      option.selected = true;
    }

    monthSelect.appendChild(option);
  });
}

function renderSchedule(monthId) {
  const selectedMonth = raidRotations.find((month) => month.id === monthId);

  scheduleList.innerHTML = "";

  if (!selectedMonth || selectedMonth.schedule.length === 0) {
    scheduleList.innerHTML = `
      <li class="timeline-item raid-schedule-item">
        <p>No raid schedule added for this month yet.</p>
      </li>
    `;
    return;
  }

  selectedMonth.schedule.forEach((rotation) => {
    const item = document.createElement("li");
    item.className = "timeline-item raid-schedule-item";

    const icons = rotation.icons ?? [];

    item.innerHTML = `
      <div class="raid-schedule-head">
        ${icons
        .map(
          (icon) => `
              <img
                class="raid-schedule-icon"
                src="${icon.image}"
                alt="${icon.name}"
              >
            `
        )
        .join("")}

        <div>
          <h3>${rotation.date}</h3>
          <p class="raid-schedule-dates">
            ${rotation.time || "10:00 AM → 10:00 AM local time"}
          </p>
        </div>
      </div>

      <p><strong>5★:</strong> ${asList(rotation.fiveStar).join(" / ") || "—"}</p>
      <p><strong>Mega:</strong> ${asList(rotation.mega).join(" / ") || "—"}</p>
    `;

    scheduleList.appendChild(item);
  });
}

function renderSummaryCards() {
  const candidateMonths = raidRotations.filter((month) =>
    month.status === "current" || month.status === "upcoming"
  );

  summaryGrid.innerHTML = "";

  if (candidateMonths.length === 0) {
    summaryGrid.innerHTML = `
      <p class="meta-copy">No featured raids added yet.</p>
    `;
    return;
  }

  const cards = candidateMonths.flatMap((month) =>
    month.raidCards ?? buildCardsFromSchedule(month)
  );

  const cardsWithStatus = cards
    .map((raid) => {
      const status = raid.dateRange
        ? getRaidStatus(raid.dateRange)
        : {
          text: "Upcoming",
          class: "upcoming"
        };

      return {
        ...raid,
        computedStatus: status
      };
    })
    .sort(
      (a, b) =>
        new Date(a.dateRange?.[0] ?? 0) -
        new Date(b.dateRange?.[0] ?? 0)
    );

  const activeRaids = cardsWithStatus
    .filter((raid) => raid.computedStatus.class === "active")
    .slice(0, 2)
    .map((raid) => ({
      ...raid,
      featuredRole: "active"
    }));

  const activeIds = new Set(activeRaids.map((raid) => raid.id));

  const nextRaids = cardsWithStatus
    .filter((raid) =>
      raid.computedStatus.class === "upcoming" &&
      !activeIds.has(raid.id)
    )
    .slice(0, 2)
    .map((raid) => ({
      ...raid,
      featuredRole: "next",
      computedStatus: {
        ...raid.computedStatus,
        text: "Next",
        class: "next"
      }
    }));

  const featuredRaids = [...activeRaids, ...nextRaids];

  if (featuredRaids.length === 0) {
    summaryGrid.innerHTML = `
      <p class="meta-copy">No current or upcoming raids available.</p>
    `;
    return;
  }

  featuredRaids.forEach((raid) => {
    const [primaryType, secondaryType] = raid.types ?? ["normal"];

    const card = document.createElement("a");

    const statusClass =
      raid.featuredRole === "active"
        ? "current-boss"
        : raid.featuredRole === "next"
          ? "next-boss"
          : "";

    card.href = `boss.html?id=${raid.id}`;
    card.className = `summary-card ${secondaryType ? "dual-glow" : "single-glow"} summary-card-link ${statusClass}`;
    card.dataset.primaryType = primaryType;
    card.style.setProperty("--primary-glow", `var(--${primaryType})`);

    if (secondaryType) {
      card.dataset.secondaryType = secondaryType;
      card.style.setProperty("--secondary-glow", `var(--${secondaryType})`);
    }

    card.setAttribute("aria-label", `View ${raid.name} counters and details`);

    card.innerHTML = `
      <div class="summary-top">
        <div class="summary-title-wrap">
          <img
            class="summary-icon"
            src="${raid.image}"
            alt="${raid.imageAlt}"
          >
          <span class="summary-label ${raid.computedStatus.class}">
            ${raid.badge} ${raid.computedStatus.text}
          </span>
        </div>
        <h2>${raid.name}</h2>
      </div>

      <p class="dialgadex-line">
        ${raid.dexRank}
      </p>

      <p class="meta-copy">
        ${raid.description}
      </p>
    `;

    summaryGrid.appendChild(card);
  });
}

function renderRaidCards(monthId) {
  const selectedMonth = raidRotations.find((month) => month.id === monthId);

  raidCardGrid.innerHTML = "";

  if (!selectedMonth) {
    raidCardGrid.innerHTML = `
      <p class="meta-copy">No raid cards added for this month yet.</p>
    `;
    return;
  }

  const cards = selectedMonth.raidCards ?? buildCardsFromSchedule(selectedMonth);

  if (cards.length === 0) {
    raidCardGrid.innerHTML = `
      <p class="meta-copy">No raid cards added for this month yet.</p>
    `;
    return;
  }

  cards.forEach((raid) => {
    const status = raid.dateRange
      ? getRaidStatus(raid.dateRange)
      : { text: selectedMonth.status === "current" ? "Active" : "Ended", class: selectedMonth.status === "current" ? "active" : "ended" };

    const [primaryType, secondaryType] = raid.types ?? ["normal"];
    const card = document.createElement("a");

    const statusClass =
      raid.featuredRole === "active" ? "current-boss" :
        raid.featuredRole === "next" ? "next-boss" :
          "";

    card.href = `boss.html?id=${raid.id}`;
    card.className = `raid-card ${secondaryType ? "dual-glow" : "single-glow"} raid-card-link ${statusClass}`;
    card.dataset.primaryType = primaryType;
    card.style.setProperty("--primary-glow", `var(--${primaryType})`);

    if (secondaryType) {
      card.dataset.secondaryType = secondaryType;
      card.style.setProperty("--secondary-glow", `var(--${secondaryType})`);
    }

    card.setAttribute("aria-label", `View ${raid.name} counters and raid details`);

    card.innerHTML = `
      <div class="raid-card-image-wrap">
        <img
          class="raid-card-image"
          src="${raid.image}"
          alt="${raid.imageAlt}"
        >
        <span class="raid-badge ${raid.badgeClass}">${raid.badge}</span>
      </div>

      <div class="raid-card-body">
        <div class="raid-card-head">
          <h3>${raid.name}</h3>
          <span class="raid-status ${status.class}">${status.text}</span>
        </div>

        <div class="type-row">
          ${(raid.types ?? [])
        .map((type) => `<span class="type-pill ${type}">${formatType(type)}</span>`)
        .join("")}
        </div>

        <p class="raid-dex-rank">${raid.subtitle ?? raid.dexRank}</p>
        <p class="raid-meta-text">${raid.description}</p>
      </div>
    `;

    raidCardGrid.appendChild(card);
  });
}

function buildCardsFromSchedule(month) {
  const counterMonth = counterMonths.find((item) => item.id === month.id);

  if (!counterMonth) return [];

  return counterMonth.bosses.map((boss) => {
    const scheduleEntry = month.schedule?.find((entry) =>
      entry.bossIds?.includes(boss.id)
    );

    return {
      id: boss.id,
      name: boss.name,
      image: boss.image,
      imageAlt: boss.imageAlt,
      badge: boss.tier?.includes("Mega") ? "Mega" : "5★",
      badgeClass: boss.tier?.includes("Mega") ? "mega-badge" : "legendary-badge",
      types: boss.types,
      dexRank: boss.difficultyLabel,
      description: boss.difficulty,
      subtitle: boss.subtitle,
      dateRange: scheduleEntry?.dateRange
    };
  });
}

renderMonthOptions();
renderSchedule(monthSelect.value);
renderSummaryCards();
renderRaidCards(monthSelect.value);

monthSelect.addEventListener("change", () => {
  renderSchedule(monthSelect.value);
  renderSummaryCards();
  renderRaidCards(monthSelect.value);
});