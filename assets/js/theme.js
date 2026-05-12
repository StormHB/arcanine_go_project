const STORAGE_KEY = "arcanine-theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return "dark";
}

function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "dark";

  const newTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(newTheme);
  localStorage.setItem(STORAGE_KEY, newTheme);

  updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
  const button = document.getElementById("theme-toggle");

  if (!button) {
    return;
  }

  button.textContent = theme === "dark" ? "☀️" : "🌙";
  button.setAttribute(
    "aria-label",
    theme === "dark"
      ? "Switch to light mode"
      : "Switch to dark mode"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const theme = getPreferredTheme();

  applyTheme(theme);
  updateThemeButton(theme);

  const button = document.getElementById("theme-toggle");

  if (button) {
    button.addEventListener("click", toggleTheme);
  }
});