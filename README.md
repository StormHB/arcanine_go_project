# Arcanine Go Project

Arcanine Go Project is a static multi-page website built with pure HTML and CSS.

The website presents a Pokémon GO raid guide focused on the April 2026 rotation, with an overview of active Mega and Tier 5 raid bosses, their weaknesses, and both best and budget counter suggestions.

## Project purpose

The purpose of this project is to create a clean, responsive and semantically structured static website without JavaScript.

The site was created as a faculty project for practicing core web development concepts such as:

- semantic HTML
- CSS layout and styling
- responsive design
- accessibility basics
- multi-page site structure
- GitHub Pages deployment

## Pages

The project contains four main pages:

- **Home** (`index.html`)  
  Introduction to the project, featured raid bosses and a short overview of the website goals.

- **Raids** (`raids.html`)  
  A simple overview of the April 2026 raid rotation, organized by date ranges.

- **Counters** (`counters.html`)  
  The main guide page, containing counter cards for all active Mega and Tier 5 raid bosses in the selected rotation window.

- **Contact** (`contact.html`)  
  A contact form page with labels, required fields and basic HTML validation.

## Main features

- Pure **HTML5** and **CSS3**
- No JavaScript
- Responsive layout for mobile and desktop screens
- Shared navigation across all pages
- CSS-only hamburger menu
- Semantic page structure using `header`, `nav`, `main`, `section` and `footer`
- Skip to content link
- Visible keyboard focus states
- Pokémon type colour badges
- Card-based layout for raid bosses and counters
- Contact form with basic validation
- Project structure ready for GitHub Pages

## Raid content included

The counters page includes active **Mega Raids** and **Tier 5 Raids** from the April 2026 rotation:

### Mega Raids
- Mega Aerodactyl
- Mega Alakazam
- Mega Sharpedo
- Mega Banette

### Tier 5 Raids
- Kyogre
- Groudon
- Tapu Koko
- Tapu Lele

Each boss card includes:
- boss name
- raid category
- Pokémon types
- weakness summary
- best counters
- budget counters

## Technologies used

- HTML5
- CSS3
- GitHub
- GitHub Pages

## Folder structure

```text
arcanine-go-project/
│
├── index.html
├── raids.html
├── counters.html
├── contact.html
│
├── css/
│   └── style.css
│
├── README.md
└── CHANGELOG.md