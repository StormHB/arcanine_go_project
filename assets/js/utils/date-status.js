const DEFAULT_ROLLOVER_HOUR = 10;
const RAID_END_OFFSET_DAYS = 1;

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function parseDateWithDefaultHour(value) {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const isDateOnly = typeof value === "string" && !value.includes("T");

  if (isDateOnly) {
    date.setHours(DEFAULT_ROLLOVER_HOUR, 0, 0, 0);
  }

  return date;
}

export function getAdjustedDateRange(dateRange) {
  if (!Array.isArray(dateRange) || dateRange.length < 2) {
    return null;
  }

  const start = parseDateWithDefaultHour(dateRange[0]);
  const rawEnd = parseDateWithDefaultHour(dateRange[1]);

  if (!start || !rawEnd) {
    return null;
  }

  return {
    start,
    end: addDays(rawEnd, RAID_END_OFFSET_DAYS)
  };
}

export function getMonthStatus(monthId) {
  const now = new Date();
  const [year, month] = monthId.split("-").map(Number);

  const start = new Date(year, month - 1, 1, DEFAULT_ROLLOVER_HOUR, 0, 0);
  const end = new Date(year, month, 1, DEFAULT_ROLLOVER_HOUR, 0, 0);

  if (now >= start && now < end) return "current";
  if (now < start) return "upcoming";
  return "history";
}

export function getDefaultMonth(months) {
  return (
    months.find((month) => getMonthStatus(month.id) === "current") ||
    months.find((month) => getMonthStatus(month.id) === "upcoming") ||
    months.at(-1)
  );
}

export function getRaidStatus(dateRange) {
  const adjustedRange = getAdjustedDateRange(dateRange);

  if (!adjustedRange) {
    return {
      text: "Planned",
      class: "planned"
    };
  }

  const now = new Date();
  const { start, end } = adjustedRange;

  if (now >= start && now < end) {
    return {
      text: "Active",
      class: "active"
    };
  }

  if (now < start) {
    return {
      text: `${start.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      })} → ${end.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      })}`,
      class: "upcoming"
    };
  }

  return {
    text: "Ended",
    class: "ended"
  };
}

export function getBossStatusFromDateRange(dateRange) {
  const status = getRaidStatus(dateRange);

  if (status.class === "active") {
    return {
      className: "current-boss",
      label: "Active"
    };
  }

  if (status.class === "upcoming") {
    return {
      className: "upcoming-boss",
      label: "Upcoming"
    };
  }

  return {
    className: status.class === "planned" ? "planned-boss" : "ended-boss",
    label: status.text === "Planned" ? "Planned" : "Ended"
  };
}