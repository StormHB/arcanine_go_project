# Arcanine Go Project

A clean, modern Pokémon GO raid guide website built with a data-driven JavaScript architecture.

This project focuses on:

- Dynamic raid rotations  
- Counter recommendations  
- Scalable UI system  
- Clean and responsive design  
- Accessibility and semantic structure  

---

## Pages

- Home – Overview and entry point  
- Raids – Dynamic raid rotations and featured bosses  
- Counters – Best and budget counters per boss  
- Contact – Support-style form page  

---

## Features

### Dynamic Raid System

- Fully JavaScript-driven raid rendering  
- Centralized data structure (`rotations.js`)  
- Automatic status detection:
  - Active  
  - Upcoming  
  - Ended  
- Dynamic summary cards based on current rotation  
- No manual updates required for status or featured raids  
- Designed for future automation (scraping / API integration)  
- Monthly rotation support with history/current/upcoming states  
- Support for multiple simultaneous raid bosses in a single rotation period  
- Automatic month status calculation based on raid activity windows
- No manual “current/upcoming/history” maintenance required
- Support for regional raid distributions (region-specific bosses)  

---

### Raid Overview

- Featured raids automatically selected (current + upcoming)  
- Clean card-based layout  
- Fully clickable raid and summary cards  
- Type-based visual styling  
- Consistent and scalable component structure  

---

### Raid Schedule

- Fully dynamic schedule rendering  
- Clear timeline of raid rotations  
- Boss icons and structured layout  
- Semantic list structure for accessibility  
- Consistent formatting across all rotation blocks  

---

### Regional Raids

- Support for region-specific raid bosses (Americas, EMEA, Asia-Pacific)  
- Multiple bosses can appear in the same time window depending on region  
- Region information is displayed directly on raid cards  
- Integrated seamlessly into both raid overview and counter pages  

---

### Counters Page

- Best and budget counters for each boss  
- Top 6 best + top 6 budget picks per raid  
- Performance displayed using Time to Win (TTW)  
- Percentage difference relative to the best counter  
- Counters strictly sorted by TTW performance  
- One Mega or Primal attacker per team  
- Legacy move detection per move  
- Smooth scrolling from raids to counters  
- Fixed anchor offset (accurate scroll positioning)  
- Month selector for historical, current and upcoming counter rotations  
- Automatic month status detection  
- Active boss highlighting for current counter rotations  

#### JS-driven system

- Data is generated and stored in structured files  
- UI is rendered dynamically via `assets/js/render-counters.js`  
- No manual HTML editing required for boss cards  
- Supports advanced move metadata (legacy moves, Hidden Power types)  

#### Layout improvements

- Center-aligned counter cards  
- Consistent chip sizing  
- Clear hierarchy:
  - Pokémon name  
  - Moves  
  - TTW and performance difference  

---

### Counter Methodology

All counters are evaluated using a consistent simulation standard:

- Level 40 counters  
- No weather boost  
- No friendship bonus  
- No party power boost  
- Pokebattler default/random boss movesets  

This keeps the workflow close to the standard Pokebattler raid page and avoids maintaining manual selector logic.

Raid performance data is based on Pokebattler simulations.

---

### Accessibility

- Semantic HTML structure (`header`, `nav`, `main`, `section`, `footer`)  
- ARIA labels for navigation and interactive elements  
- Skip link for keyboard navigation  
- Accessible clickable cards with descriptive labels  
- Improved screen reader compatibility  
- Form accessibility (labels, descriptions, autocomplete)  

---

### Technical Features

- Data-driven architecture (JavaScript + structured data)  
- Modular JavaScript (ES Modules)  
- Modular separation:
  - Raid data (`rotations.js`)  
  - Counter data (generated pipeline output)  
  - Raid rendering (`render-raids.js`)  
  - Counter rendering (`render-counters.js`)  
  - Layout (HTML + CSS)  
- Fully reproducible counter generation pipeline (scrape → parse → transform)  
- Fully responsive, mobile-friendly design  
- Clean and maintainable codebase  
- Deployed via GitHub Pages  
- Unified type color system using CSS variables  
- Automatic single-type and dual-type glow rendering  
- Shared month-based data model for raids and counters  
- Dynamic rendering for counter rotations  

---

### Visual Design

- Type-based glow system for raid and summary cards  
- Consistent hover effects and animations  
- Smooth scaling transitions  
- Clean dark theme UI  
- Improved spacing and alignment  
- Standardized Pokémon sprite presentation  
- Unified type colors shared across pills, badges and glow effects  
- Dual-type glow blending for raid cards  
- Type-based glow effects for counter boss cards  

---

### SEO & Metadata

- Page-specific meta descriptions  
- Open Graph (OG) support:
  - Title  
  - Description  
  - Preview image  
- Twitter card metadata  
- Improved structure for indexing and sharing  

---

## Pokebattler Counter Pipeline

This project includes a Node.js-based tooling pipeline for preparing raid counter data from Pokebattler simulations.

The pipeline is used to:

- Scrape raw Pokebattler counter data from the default raid pages  
- Parse best and budget counters without interacting with Pokebattler selectors  
- Sort counters by Time to Win (TTW)  
- Limit teams to one Mega/Primal attacker  
- Detect legacy/event-exclusive moves per move  
- Generate draft and final counter datasets  
- Supports multiple bosses without overwriting existing data  
- Standardized JSON-style generated datasets
- Shared metadata structure across generated and manual counter data

### Commands

```bash
node tools/scrape.js <target-id>
node tools/parse-pokebattler.js <target-id>
node tools/transform-counter-draft.js

# or run scrape/parse for every target
node tools/scrape.js all
node tools/parse-pokebattler.js all
node tools/transform-counter-draft.js
```

### Output files

- `counter-drafts.generated.js` – parsed raw data  
- `counter-final.generated.js` – final UI-ready data  

Generated data is reviewed manually before being used in the application.

---

### Contact Page

- Structured support-style form  
- Built-in HTML validation  
- Topic-based submission categories  
- Accessibility improvements  

---

## Raid Rotations

Raid rotations are dynamically managed through JavaScript.

The site automatically displays:

- Current (active) raids  
- Upcoming raid rotations  
- Featured raids based on real-time status  

All raid data is stored in structured JavaScript files and rendered dynamically.

---

## Tech Stack

- HTML5  
- CSS3 (no frameworks)  
- JavaScript (ES Modules)  
- Node.js (tooling pipeline)  
- Responsive design  

---

## Project Goals

This project was built to:

- Transition from static HTML to a dynamic data-driven system  
- Improve maintainability and scalability  
- Build reusable UI components  
- Practice modern frontend architecture  
- Integrate external simulation data into a frontend project  
- Improve accessibility and UX  

---

## Notes

- The contact form is currently static (no backend processing)  
- Backend integration is planned for future updates  
- Counter data is generated via a Pokebattler-based pipeline and reviewed before publishing  
- Raid data is structured for future automation  

---

## Future Improvements

- Backend support for contact form submissions  
- Full automation of raid and counter updates  
- Additional UI interactions and animations  
- Performance optimizations  

---

## Author

StormHB  

---

## License

This project is for educational and portfolio purposes.