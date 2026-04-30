import { raidRotations } from "./data/rotations.js";

const monthSelect = document.querySelector("#month-select");
const scheduleList = document.querySelector("#raid-schedule-list");
const summaryGrid = document.querySelector("#raid-summary-grid");
const raidCardGrid = document.querySelector("#raid-card-grid");

function formatType(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
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

function renderMonthOptions() {
  raidRotations.forEach((month) => {
    const option = document.createElement("option");

    option.value = month.id;
    option.textContent = `${month.label} (${month.status})`;

    if (month.status === "current") {
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

    item.innerHTML = `
      <div class="raid-schedule-head">
        ${rotation.icons
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
          <p class="raid-schedule-dates">${rotation.time}</p>
        </div>
      </div>

      <p><strong>5★:</strong> ${rotation.fiveStar}</p>
      <p><strong>Mega:</strong> ${rotation.mega}</p>
    `;

    scheduleList.appendChild(item);
  });
}

function renderSummaryCards(monthId) {
  const selectedMonth = raidRotations.find((month) => month.id === monthId);

  summaryGrid.innerHTML = "";

  if (!selectedMonth || !selectedMonth.raidCards || selectedMonth.raidCards.length === 0) {
    summaryGrid.innerHTML = `
      <p class="meta-copy">No featured raids added for this month yet.</p>
    `;
    return;
  }

  const featuredRaids = selectedMonth.raidCards
    .map((raid) => {
      const status = getRaidStatus(raid.dateRange);

      return {
        ...raid,
        computedStatus: status
      };
    })
    .filter((raid) => raid.computedStatus.class === "active" || raid.computedStatus.class === "upcoming")
    .sort((a, b) => new Date(a.dateRange[0]) - new Date(b.dateRange[0]))
    .slice(0, 4);

  if (featuredRaids.length === 0) {
    summaryGrid.innerHTML = `
      <p class="meta-copy">No current or upcoming raids available.</p>
    `;
    return;
  }

  featuredRaids.forEach((raid) => {
    const [primaryType, secondaryType] = raid.types;
    const card = document.createElement("a");

    card.href = raid.href;
    card.className = `summary-card ${secondaryType ? "dual-glow" : "single-glow"} summary-card-link`;
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
          <span class="summary-label">
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

  if (!selectedMonth || !selectedMonth.raidCards || selectedMonth.raidCards.length === 0) {
    raidCardGrid.innerHTML = `
      <p class="meta-copy">No raid cards added for this month yet.</p>
    `;
    return;
  }

  selectedMonth.raidCards.forEach((raid) => {
    const status = getRaidStatus(raid.dateRange);
    const [primaryType, secondaryType] = raid.types;

    const card = document.createElement("a");

    card.href = raid.href;
    card.className = `raid-card ${secondaryType ? "dual-glow" : "single-glow"} raid-card-link`;
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
          ${raid.types
        .map((type) => `<span class="type-pill ${type}">${formatType(type)}</span>`)
        .join("")}
        </div>

        <p class="raid-dex-rank">${raid.dexRank}</p>
        <p class="raid-meta-text">${raid.description}</p>
      </div>
    `;

    raidCardGrid.appendChild(card);
  });
}

renderMonthOptions();
renderSchedule(monthSelect.value);
renderSummaryCards(monthSelect.value);
renderRaidCards(monthSelect.value);

monthSelect.addEventListener("change", () => {
  renderSchedule(monthSelect.value);
  renderSummaryCards(monthSelect.value);
  renderRaidCards(monthSelect.value);
});