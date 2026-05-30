# Arcanine Go Project

Arcanine Go Project is a responsive Pokémon GO raid guide built around dynamic raid rendering, generated counter recommendations, reusable frontend architecture and a lightweight no-framework UI.

The project combines:

* JavaScript-driven raid, schedule, archive and counter rendering
* Dedicated boss detail pages
* Pokebattler-based counter data
* Persistent light/dark theme support
* Responsive and accessible UI design
* Reusable data structures for raid schedules and counters
* Automated scraping and transformation tooling

---

## Live Demo

[Arcanine Go Project Live Demo](https://stormhb.github.io/arcanine_go_project/)

---

## Pages

* **Home** – Project overview and main entry point
* **Raids** – Dynamic raid rotations, featured bosses and archive browsing
* **Counters** – Best and budget counters with search and month filtering
* **Boss Details** – Dedicated boss pages rendered through `boss.html?id=<boss-id>`
* **Contact** – Support-style feedback form powered by Formspree

---

## Features

### Dynamic Raid System

* Fully JavaScript-driven raid rendering
* Centralized rotation data in `rotations.js`
* Automatic raid status detection:
  * Active
  * Upcoming
  * Ended
* Date-based status handling for current, upcoming and historical rotations
* Rotation timing aligned with Pokémon GO-style 10:00 AM local rotation windows
* Dynamic summary cards based on current rotation state
* Monthly rotation support with history/current/upcoming states
* Historical monthly raid archive support from January 2026 onward
* Cross-month raid window handling
* Generated raid appearance pipeline for recurring and cross-month raid bosses
* Rotation schedule generation separated from reusable boss metadata
* Automatic rollover support for raids spanning multiple months
* Support for multiple simultaneous raid bosses in a single rotation period
* Support for regional raid distributions
* Shared rendering structure between raids, counters and boss detail pages

---

### Raid Overview

* Featured raids automatically selected from current and upcoming rotations
* Featured raids support rollover handling across monthly boundaries
* Clean card-based layout
* Fully clickable raid and summary cards
* Type-based visual styling
* Automatic glow colors based on Pokémon typing
* Consistent and scalable component structure
* Featured raids stay synchronized with current active rotation data

---

### Raid Schedule

* Fully dynamic schedule rendering
* Clear timeline of raid rotations
* Boss icons and structured layout
* Semantic list structure for accessibility
* Consistent formatting across rotation blocks
* Archive browsing through month selection
* Shared 10:00 AM local rotation timing support
* Automatic rollover rendering for cross-month raid windows

---

### Regional Raids

* Support for region-specific raid bosses such as Americas, EMEA and Asia-Pacific rotations
* Multiple bosses can appear in the same time window depending on region
* Region information is displayed directly on raid cards
* Integrated into both raid overview and counter pages

---

### Counters Page

* Best and budget counters for each boss
* Top 6 best + top 6 budget picks per raid
* Performance displayed using Time to Win (TTW)
* Percentage difference relative to the best counter
* Counters sorted by TTW performance
* One Mega or Primal attacker per team
* Legacy move detection per move
* Month selector for historical, current and upcoming counter rotations
* Automatic month status detection
* Active boss highlighting for current counter rotations
* Fully clickable counter boss cards
* Dedicated boss detail pages (`boss.html`)
* Direct navigation from counters to individual boss analysis pages
* Live counters search and month-based archive filtering
* Persistent filters between monthly rotation changes
* Mobile-friendly counters discovery system
* Shared boss metadata between raids and counters
* Rotation-derived status handling for recurring raid bosses

#### JS-driven system

* Data is generated and stored in structured files
* UI is rendered dynamically via `assets/js/render-counters.js`
* No manual HTML editing required for boss cards
* Supports advanced move metadata such as legacy moves and Hidden Power types

---

### Boss Detail Pages

Boss detail pages (`boss.html`) use a dedicated rendering system separate from the compact counters overview.

Features include:

* Pokémon artwork rendering
* Pokémon type badges
* Move type badges
* Legacy move indicators
* TTW comparison display
* Shadow counter overlays
* Responsive dual-column layouts
* Optimized mobile counter card layouts
* Date-based boss status detection from rotation metadata
* Shared rotation-derived status logic across pages
* Cleaner mobile spacing after removing redundant raid-tier pills
* Shared boss metadata between counters, raids and schedule data

---

### Counter Methodology

All counters are evaluated using a consistent simulation standard:

* Level 40 counters
* No weather boost
* No friendship bonus
* No party power boost
* Pokebattler default/random boss movesets

This keeps the workflow close to the standard Pokebattler raid page and avoids maintaining manual selected-moveset logic.

Raid performance data is based on Pokebattler simulations.

---

### Light/Dark Theme System

The site includes a persistent theme system implemented without a frontend framework.

* Site-wide light/dark mode support
* Theme toggle in the shared navigation header
* Saved preference using `localStorage`
* Theme state applied through the root `data-theme` attribute
* CSS variable-based theme tokens
* Component-level light theme overrides for cards, forms, filters, navigation and boss detail layouts
* Mobile navigation adjusted to keep both the theme toggle and hamburger menu usable

Theme logic lives in:

```text
assets/js/theme.js
```

Theme styling lives in:

```text
css/style.css
```

---

### Responsive Design

* Mobile-first responsive layout
* Adaptive boss card layouts
* Responsive navigation menu
* Mobile hamburger menu with visible theme-aware controls
* Scalable typography and spacing
* Optimized layouts for small mobile screens
* Improved touch targets and card interactions
* Optimized mobile boss detail counter layouts
* Better alignment consistency across mobile counter sections

---

### Accessibility

* Semantic HTML structure (`header`, `nav`, `main`, `section`, `footer`)
* ARIA labels for navigation and interactive elements
* Skip link for keyboard navigation
* Accessible clickable cards with descriptive labels
* Improved screen reader compatibility
* Form accessibility with labels, descriptions and autocomplete
* `aria-current` used for the active navigation item
* Theme toggle uses accessible button markup
* Hero metadata refactored into semantic list structure where appropriate

---

### Technical Features

* Modular JavaScript using ES Modules
* Modular separation:
  * Raid data (`rotations.js`)
  * Counter data (`counters.js` and generated datasets)
  * Raid rendering (`render-raids.js`)
  * Counter rendering (`render-counters.js`)
  * Boss detail rendering (`render-boss.js`)
  * Theme handling (`theme.js`)
  * Layout and styling (`HTML + CSS`)
* Fully reproducible counter generation pipeline (`scrape → parse → transform`)
* Generated raid appearance and schedule generation tooling
* Month-based scraping support
* Automatic rollover handling for recurring raid bosses
* Generated raid appearance layer separate from reusable boss metadata
* Rotation schedule generation automation
* Unified schedule-derived status handling across pages
* Deployed via GitHub Pages
* Unified type color system using CSS variables
* Automatic single-type and dual-type glow rendering
* Shared month-based data model for raids and counters
* Generated Pokémon type and move metadata datasets
* Automatic counter artwork generation pipeline

---

### Visual Design

* Type-based glow system for raid and summary cards
* Consistent hover effects and animations
* Smooth scaling transitions
* Light and dark theme support
* Improved spacing and alignment
* Standardized Pokémon sprite presentation
* Unified type colors shared across pills, badges and glow effects
* Dual-type glow blending for raid cards
* Type-based glow effects for counter boss cards
* Cleaner mobile boss detail hierarchy

---

### Shared UI Components

The frontend uses reusable shared informational components across pages to improve consistency and reduce duplicated layout structures.

Shared components currently include:

* informational hint containers
* reusable panel layouts
* shared type-based visual systems
* reusable filter and archive controls
* shared navigation/header pattern
* reusable theme toggle behavior

This approach keeps the UI scalable while preserving the lightweight no-framework architecture.

---

### SEO & Metadata

* Page-specific meta descriptions
* Open Graph (OG) support:
  * Title
  * Description
  * Preview image
* Twitter card metadata
* Improved structure for indexing and sharing
* `robots.txt` support for crawler/indexing control
* Dynamic `sitemap.xml` generation
* Search-engine-friendly page structure

---

## Architecture

The project follows a data-driven frontend architecture:

* Rotation schedules and raid appearances are stored separately from reusable boss metadata
* Reusable raid boss metadata is isolated from recurring schedule appearances
* Counter datasets are generated through a tooling pipeline
* Pages consume shared structured data instead of hardcoded HTML
* Rendering is handled through reusable JavaScript modules
* Styling is centralized through reusable CSS systems and theme variables
* Theme state is handled independently from page rendering logic
* Raid status logic is derived from shared rotation schedule metadata

This approach improves scalability, maintainability and future automation support.

---

## Automation Tooling

The project includes lightweight tooling scripts for automating structured frontend data generation.

Current automation features include:

* Pokebattler scraping and raw text collection
* Counter draft parsing
* Final counter dataset transformation
* Pokémon type metadata generation
* Move type metadata generation
* Counter artwork download and image map generation
* Dynamic sitemap generation
* Shared metadata handling across raids and counters
* Generated raid appearance and schedule generation tooling
* Month-based scraping support
* Automatic rollover handling for recurring raid bosses
* Rotation generation tooling for cross-month schedules
* Automatic featured raid synchronization

This reduces manual maintenance and keeps frontend content synchronized with structured data sources.
---

## Project Structure

```text
assets/
├── css/
│   └── style.css
│
├── img/
│   ├── counters/
│   └── ui/
│
└── js/
    ├── data/
    │   ├── rotations.js
    │   ├── counters.js
    │   ├── counter-drafts.generated.js
    │   ├── counter-final.generated.js
    │   ├── counter-image-map.generated.js
    │   ├── pokemon-types.generated.js
    │   └── move-types.generated.js
    │
    ├── render-raids.js
    ├── render-counters.js
    ├── render-boss.js
    └── theme.js

tools/
├── scrape.js
├── parse-pokebattler.js
├── transform-counter-draft.js
├── generate-pokemon-types.js
├── generate-move-types.js
├── download-counter-images.js
└── generate-sitemap.js
```

Main application logic lives inside reusable rendering modules, while tooling scripts are isolated from frontend code.

---

## Pokebattler Counter Pipeline

This project includes a Node.js-based tooling pipeline for preparing raid counter data from Pokebattler simulations.

The pipeline is used to:

* Scrape raw Pokebattler counter data from default raid pages
* Parse best and budget counters without interacting with Pokebattler selectors
* Sort counters by Time to Win (TTW)
* Limit teams to one Mega/Primal attacker
* Detect legacy/event-exclusive moves per move
* Generate draft and final counter datasets
* Support multiple bosses without overwriting existing data
* Standardize JSON-style generated datasets
* Share metadata structure across generated and manual counter data

### Generated Type Metadata

The project uses generated Pokémon and move type datasets to avoid manually maintaining rendering metadata.

Generated datasets include:

* Pokémon primary/secondary types
* Move types
* Hidden Power normalization
* Form-specific Pokémon mappings

These datasets are used across:

* boss detail pages
* counter rendering
* automatic badge generation
* counter artwork generation

Generation tools:

```bash
node tools/generate-pokemon-types.js
node tools/generate-move-types.js
```

---

### Counter Artwork Generation

Counter Pokémon artwork is generated automatically through a local asset pipeline.

The system:

* downloads missing artwork
* generates image mapping files
* supports form-specific Pokémon
* supports Shadow overlays
* reuses cached local assets

Command:

```bash
node tools/download-counter-images.js
```

Generated output:

* `assets/img/counters/`
* `counter-image-map.generated.js`

---

### Commands

```bash
node tools/scrape.js <target-id>
node tools/scrape.js <month-id>
node tools/scrape.js all

node tools/parse-pokebattler.js
node tools/transform-counter-draft.js

node tools/generate-scrape-targets.js
node tools/generate-rotation.js
```

Examples:

```bash
node tools/scrape.js mega-blaziken
node tools/scrape.js 2026-06
node tools/scrape.js June
node tools/scrape.js all
```

```bash
node tools/generate-sitemap.js
```

Generates a dynamic `sitemap.xml` file based on all current pages and boss routes.

Typical monthly workflow:

```bash
node tools/scrape.js 2026-06
node tools/parse-pokebattler.js
node tools/transform-counter-draft.js
node tools/generate-scrape-targets.js
node tools/generate-rotation.js
```

### Output files

* `counter-drafts.generated.js` – parsed raw data
* `counter-final.generated.js` – final UI-ready data
* `counter-image-map.generated.js` – generated artwork mapping

Generated data is reviewed manually before being used in the application.

---

## Contact Page

* Structured support-style form
* Built-in HTML validation
* Topic-based submission categories
* Accessibility improvements
* Formspree-powered backend form handling
* Direct email delivery for submissions
* Success message handling after form submission
* Lightweight spam protection via honeypot field

---

## Raid Rotations

Raid rotations are dynamically managed through JavaScript.

The site automatically displays:

* Current active raids
* Upcoming raid rotations
* Ended historical rotations
* Featured raids based on real-time status

All raid data is stored in structured JavaScript files and rendered dynamically.

---

## Tech Stack

* HTML5
* CSS3 with custom properties
* JavaScript ES Modules
* Node.js tooling pipeline
* GitHub Pages
* Formspree
* Responsive design

---

## Project Goals

This project was built to:

* Transition from static HTML to a dynamic data-driven system
* Improve maintainability and scalability
* Build reusable UI components
* Practice modern frontend architecture
* Integrate external simulation data into a frontend project
* Improve accessibility and UX
* Preserve a lightweight no-framework approach

---

## Notes

* Contact submissions are handled through Formspree
* Counter data is generated via a Pokebattler-based pipeline and reviewed before publishing
* Raid data is structured for future automation
* Theme preference is stored locally in the browser

---

## README Refactor Notes

The README is now accurate, but it is getting long. Future documentation cleanup could split some content into separate files:

* `docs/architecture.md` for rendering and data architecture
* `docs/pipeline.md` for Pokebattler scraping/parsing/transformation
* `docs/theming.md` for the light/dark theme system
* `docs/roadmap.md` for future improvements

This would keep the README focused on project overview, setup, structure and core features.

---

## Future Improvements

* Automated raid schedule ingestion
* API-driven counter updates
* Advanced archive search and filtering system
* URL-persistent filters and shareable filtered views
* Regional timezone handling
* Advanced boss analytics pages
* Improved offline/mobile caching
* Additional UI interactions and animations
* Performance optimizations
* Further CSS modularization once the stylesheet grows larger
* Fully automatic monthly raid discovery pipeline
* Automated regional raid schedule ingestion

---

## Future Ideas

* Ongoing monthly raid rotation updates
* Optional advanced metadata:
  * estimator
  * deaths
  * suggested team size
  * difficulty indicators
* Optional advanced filtering and sorting system

---

## Author

StormHB

---

## License

This project is for educational and portfolio purposes.
