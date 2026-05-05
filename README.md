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

### Counters Page

- Best and budget counters for each boss  
- Top 6 best + top 6 budget picks per raid  
- Performance displayed using Time to Win (TTW)  
- Percentage difference relative to the best counter  
- Counters strictly sorted by TTW performance  
- Smooth scrolling from raids to counters  
- Fixed anchor offset (accurate scroll positioning)  
- Month selector for historical, current and upcoming counter rotations
- Automatic month status detection
- Active boss highlighting for current counter rotations

#### JS-driven system

- Data is defined in `assets/js/data/counters.js`  
- UI is rendered dynamically via `assets/js/render-counters.js`  
- No manual HTML editing required for boss cards  
- Supports advanced move metadata (legacy moves, Hidden Power types)

#### Updating counters

1. Add or update a boss object in `counters.js`  
2. Save — the page automatically re-renders all counters  

#### Counter system features

- Legacy / event-exclusive move support  
  - Unified format:
    ```html
    <span class="move legacy-move" tabindex="0">Move Name</span>
    ```
  - Tooltip-based explanation  
  - Consistent across all counters  

- Move-specific indicators  
  - Hidden Power type support  
  - Clean inline type display  

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
- Extreme weather conditions  
- No friendship bonus  
- No party power boost  
- Hardest boss moveset selected  

This ensures fair and comparable results.

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
  - Counter data (`counters.js`)  
  - Raid rendering (`render-raids.js`)  
  - Counter rendering (`render-counters.js`)  
  - Layout (HTML + CSS)  
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
- Responsive design  

---

## Project Goals

This project was built to:

- Transition from static HTML to a dynamic data-driven system  
- Improve maintainability and scalability  
- Build reusable UI components  
- Practice modern frontend architecture  
- Improve accessibility and UX  

---

## Notes

- The contact form is currently static (no backend processing)  
- Backend integration is planned for future updates  
- Counter data is currently maintained manually via structured JavaScript  
- Raid data is structured for future automation  

---

## Future Improvements

- Backend support for contact form submissions  
- Automated raid data updates (scraper / API integration)  
- Counter filtering and search system  
- Additional UI interactions and animations  
- Performance optimizations  

---

## Author

StormHB  

---

## License

This project is for educational and portfolio purposes.