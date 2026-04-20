# Arcanine Go Project

A clean, modern Pokémon GO raid guide website built with HTML and CSS.

This project focuses on:

- Active raid bosses  
- Counter recommendations  
- Raid schedule overview  
- Clean UI/UX with themed styling  

---

## Pages

- Home – Overview and entry point  
- Raids – Active raids + full schedule  
- Counters – Best and budget counters per boss  
- Contact – Support-style form page  

---

## Features

### Raid Overview

- Active raids clearly highlighted  
- Upcoming raids with exact dates (no more "Soon")  
- Clean card-based layout  
- Fully clickable raid and summary cards  
- Balanced 2-column grid layout for raid cards  
- Clear separation of:
  - 5★ raids (left)  
  - Mega raids (right)  
- Manually updated to reflect current in-game raid rotation  

---

### Raid Schedule

- Dedicated schedule section with:
  - Full date ranges  
  - Boss icons/sprites  
  - Clear rotation breakdown  
- Improved visual clarity and readability  
- Consistent formatting across all rotation blocks  

---

### Counters Page

- Best and budget counters for each boss  
- Top 6 best + top 6 budget picks per raid  
- Performance displayed using Time to Win (TTW)  
- Percentage difference relative to the best counter  
- Counters strictly sorted by TTW performance  
- Smooth scrolling from raids → counters  
- Fixed anchor offset (no incorrect scroll positions)  

#### Advanced counter features

- Legacy / event-exclusive moves  
  - Unified format across entire project:
    ```html
    <span class="move legacy-move" tabindex="0">Move Name</span>
    ```
  - Tooltip-based explanation  
  - Removed inconsistent legacy indicators  

- Move-specific indicators  
  - Hidden Power type support  
  - Clean inline type display  

#### Layout improvements

- Center-aligned counter cards  
- Consistent chip sizing across all bosses  
- Cleaner visual hierarchy for:
  - Pokémon name  
  - Moves  
  - TTW + % difference  

---

### Counter Methodology

All counters are evaluated using a consistent simulation standard:

- Level 40 counters  
- Extreme weather conditions  
- No friendship bonus  
- No party power boost  
- Hardest boss moveset selected  

This ensures fair comparison across all bosses.

Raid performance data is based on Pokebattler simulations.

---

### Visual Design

- Unified type-based glow system across raid and summary cards  
- Fully consistent hover effects and animations  
- Smooth scaling animations using transition-based hover system  
- Clean dark theme UI  
- Improved alignment and spacing across all components  
- Standardized Pokémon sprite scaling and positioning  
- Refactored legacy move tooltip system  
- Clear distinction between best and budget counters  

---

### SEO & Metadata

- Page-specific meta descriptions  
- Open Graph (OG) support:
  - Title, description, preview image  
  - Correct page URLs  
- Improved structure for indexing and sharing  

---

### Contact Page

- Structured support-style form  
- Built-in HTML validation  
- Topic-based submission categories  

---

## Current Raid Rotation (April 2026)

Active:
- Groudon (5★)  
- Mega Alakazam  

Upcoming:
- Tapu Koko (5★)  
- Mega Sharpedo  

---

## Tech Stack

- HTML5  
- CSS3 (no frameworks)  
- Responsive layout  
- No JavaScript (by design)  

---

## Project Goals

This project was built to:

- Practice semantic HTML structure  
- Build a multi-page responsive website  
- Create a consistent UI system  
- Present data in a structured way  
- Simulate a real-world gaming guide  

---

## Notes

- The contact form is currently static (no backend)  
- Backend or form service required for real submissions  
- Counter data is adapted manually  
- Raid rotations are updated manually  

---

## Future Improvements

- Add backend or form service integration  
- Add filtering/search for counters  
- Add animations or micro-interactions  
- Improve mobile navigation UX  
- Possibly introduce dynamic data loading  

---

## Author

StormHB  

---

## License

This project is for educational and portfolio purposes.