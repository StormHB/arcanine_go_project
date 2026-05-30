import fs from "fs";
import { scrapeTargets } from "./scrape-targets.js";
import { generatedRaidAppearances } from "./generated-raid-appearances.generated.js";
import { raidRotations } from "../assets/js/data/rotations.js";

const ROTATIONS_PATH = "./assets/js/data/rotations.js";
const DEFAULT_TIME = "10:00 AM → 10:00 AM local time";

const month = {
  id: "2026-06",
  label: "June 2026",
  status: "current"
};

function formatScheduleDate(dateRange) {
  const [start, end] = dateRange;
  const startDate = new Date(start);
  const endDate = new Date(end);

  const startMonth = startDate.toLocaleString("en-US", { month: "short" });
  const endMonth = endDate.toLocaleString("en-US", { month: "short" });

  return `${startMonth} ${startDate.getDate()} – ${endMonth} ${endDate.getDate()}`;
}

function formatJs(value, indent = 2) {
  return JSON.stringify(value, null, indent).replace(/"([^"]+)":/g, "$1:");
}

function normalizeName(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function getBossIdsFromEntry(entry) {
  if (entry.bossIds?.length) return entry.bossIds;

  const names = [...toArray(entry.fiveStar), ...toArray(entry.mega)];

  return names
    .map((name) => {
      const normalized = normalizeName(name);

      const target = Object.values(scrapeTargets).find(
        (boss) =>
          boss.id === normalized ||
          normalizeName(boss.name) === normalized
      );

      return target?.id;
    })
    .filter(Boolean);
}

function buildScheduleEntry(bosses) {
  const orderedBosses = [
    ...bosses.filter((boss) => !boss.tier.includes("Mega")),
    ...bosses.filter((boss) => boss.tier.includes("Mega"))
  ];

  const bossIds = orderedBosses.map((boss) => boss.id);
  const fiveStarBoss = orderedBosses.find((boss) => !boss.tier.includes("Mega"));
  const displayBoss = fiveStarBoss || orderedBosses[0];

  return {
    date: formatScheduleDate(displayBoss.dateRange),
    time: DEFAULT_TIME,
    dateRange: displayBoss.dateRange,
    fiveStar: orderedBosses
      .filter((boss) => !boss.tier.includes("Mega"))
      .map((boss) => boss.name),
    mega: orderedBosses
      .filter((boss) => boss.tier.includes("Mega"))
      .map((boss) => boss.name),
    bossIds,
    icons: orderedBosses.map((boss) => ({
      name: boss.name,
      image: boss.image
    }))
  };
}

function parseScheduleDateRange(dateText, rotationId) {
  const [year] = rotationId.split("-").map(Number);
  const [startText, endText] = dateText.split("–").map((part) => part.trim());

  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
  };

  function parsePart(part, fallbackMonth = null) {
    const pieces = part.split(" ");

    if (pieces.length === 2) {
      return {
        month: pieces[0],
        day: Number(pieces[1])
      };
    }

    return {
      month: fallbackMonth,
      day: Number(pieces[0])
    };
  }

  const start = parsePart(startText);
  const end = parsePart(endText, start.month);

  let endYear = year;

  if (months[end.month] < months[start.month]) {
    endYear++;
  }

  function toIso(yearValue, monthName, day) {
    const monthNumber = String(months[monthName] + 1).padStart(2, "0");
    const paddedDay = String(day).padStart(2, "0");

    return `${yearValue}-${monthNumber}-${paddedDay}T10:00:00`;
  }

  return [
    toIso(year, start.month, start.day),
    toIso(endYear, end.month, end.day)
  ];
}

function getMonthDateRange(monthId) {
  const [year, monthNumber] = monthId.split("-").map(Number);

  return {
    start: new Date(year, monthNumber - 1, 1),
    end: new Date(year, monthNumber, 1)
  };
}

function rangesOverlap(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

function getExistingScheduleAppearances() {
  const { start, end } = getMonthDateRange(month.id);

  return raidRotations
    .filter((rotation) => rotation.id !== month.id)
    .flatMap((rotation) =>
      (rotation.schedule ?? []).map((entry) => {
        const dateRange =
          entry.dateRange ??
          (entry.date ? parseScheduleDateRange(entry.date, rotation.id) : null);

        return {
          entry,
          dateRange
        };
      })
    )
    .filter(({ dateRange }) => {
      if (!dateRange) return false;

      const [entryStart, entryEnd] = dateRange.map((date) => new Date(date));

      return rangesOverlap(entryStart, entryEnd, start, end);
    })
    .flatMap(({ entry, dateRange }) =>
      getBossIdsFromEntry(entry).map((bossId) => ({
        bossId,
        dateRange
      }))
    );
}

function getGeneratedScheduleAppearances() {
  const { start, end } = getMonthDateRange(month.id);

  return generatedRaidAppearances.filter((appearance) => {
    const [appearanceStart, appearanceEnd] = appearance.dateRange.map(
      (date) => new Date(date)
    );

    return rangesOverlap(appearanceStart, appearanceEnd, start, end);
  });
}

function getScheduleAppearancesForMonth() {
  const seen = new Set();

  return [
    ...getExistingScheduleAppearances(),
    ...getGeneratedScheduleAppearances()
  ].filter((appearance) => {
    const key = `${appearance.bossId}|${appearance.dateRange.join("|")}`;

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

function hydrateAppearance(appearance) {
  const boss = Object.values(scrapeTargets).find(
    (target) => target.id === appearance.bossId
  );

  if (!boss) {
    throw new Error(`Missing scrape target for ${appearance.bossId}`);
  }

  return {
    ...boss,
    dateRange: appearance.dateRange
  };
}

function buildRotation() {
  const bosses = getScheduleAppearancesForMonth().map(hydrateAppearance);

  const groupedByStartDate = Map.groupBy(
    bosses,
    (boss) => boss.dateRange[0]
  );

  const schedule = Array.from(groupedByStartDate.values())
    .map(buildScheduleEntry)
    .sort((a, b) => new Date(a.dateRange[0]) - new Date(b.dateRange[0]));

  return {
    ...month,
    schedule
  };
}

function findMatchingBrace(text, openIndex) {
  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = openIndex; i < text.length; i++) {
    const char = text[i];

    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) inString = false;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = true;
      quote = char;
      continue;
    }

    if (char === "{") depth++;
    if (char === "}") depth--;

    if (depth === 0) return i;
  }

  throw new Error("Could not find matching closing brace.");
}

function getRotationBlocks(fileText) {
  const blocks = [];
  const regex = /\{\s*id:\s*"(\d{4}-\d{2})"/g;

  let match;

  while ((match = regex.exec(fileText)) !== null) {
    const id = match[1];
    const start = match.index;
    const endBrace = findMatchingBrace(fileText, start);
    let end = endBrace + 1;

    if (fileText[end] === ",") end++;

    blocks.push({
      id,
      start,
      end
    });
  }

  return blocks;
}

function addDefaultTimes(fileText) {
  return fileText.replace(
    /(date:\s*"[^"]+",)(\s*\n)(?!\s*time:)/g,
    `$1$2        time: "${DEFAULT_TIME}",\n`
  );
}

function upsertRotation(fileText, rotation) {
  const rotationCode = `${formatJs(rotation, 2)},`;
  const blocks = getRotationBlocks(fileText);
  const existing = blocks.find((block) => block.id === rotation.id);

  if (existing) {
    return (
      fileText.slice(0, existing.start) +
      rotationCode +
      fileText.slice(existing.end)
    );
  }

  const insertBefore = blocks.find((block) => block.id > rotation.id);

  if (insertBefore) {
    return (
      fileText.slice(0, insertBefore.start) +
      `${rotationCode}\n\n  ` +
      fileText.slice(insertBefore.start)
    );
  }

  const arrayEnd = fileText.lastIndexOf("];");

  if (arrayEnd === -1) {
    throw new Error("Could not find end of raidRotations array.");
  }

  return (
    fileText.slice(0, arrayEnd).trimEnd() +
    `,\n\n  ${rotationCode}\n` +
    fileText.slice(arrayEnd)
  );
}

function main() {
  const rotation = buildRotation();

  let fileText = fs.readFileSync(ROTATIONS_PATH, "utf8");

  fileText = upsertRotation(fileText, rotation);
  fileText = addDefaultTimes(fileText);

  fs.writeFileSync(ROTATIONS_PATH, fileText);

  console.log(`Updated ${ROTATIONS_PATH}`);
  console.log(`Upserted ${rotation.id} and normalized schedule times.`);
}

main();