# Changelog

All notable changes to this project are documented here.

---

## [1.14.0] - Boss Detail Pages & Contact Form Backend Integration

### Added
- Dedicated `boss.html` pages for individual raid bosses
- Fully clickable counter boss cards linking directly to detailed boss pages
- Formspree integration for contact form submissions
- Success message handling for completed contact submissions
- Spam protection support using hidden honeypot field (`_gotcha`)

### Changed
- Removed redundant “View on counters page” navigation from boss detail pages
- Updated contact page footer to reflect JavaScript and Formspree usage
- Improved mobile navigation consistency across all pages
- Updated contact form wording to reflect active backend submission support

### Improved
- Better mobile responsiveness for boss detail layouts
- Cleaner navigation flow between raids, counters and boss pages
- Improved maintainability of counter-to-detail-page routing
- More realistic production-style contact/support workflow

---

## [1.13.0] - Rotation Automation & Data Standardization

### Added
- Automatic raid month status detection based on active raid windows
- Unified difficulty metadata system across all counter entries

### Changed
- Standardized counter datasets to use fully quoted JSON-style object formatting
- Unified camelCase formatting across generated counter data
- Synchronized counter metadata structure between generated and manual datasets

### Improved
- Reduced manual maintenance for raid rotation updates
- Improved long-term maintainability of generated counter files
- Cleaner consistency between scraper output and frontend rendering

---

## [1.12.0] - Default Pokebattler Counter Workflow

### Changed
- Removed custom boss moveset selection from the scraper workflow
- Simplified `tools/scrape.js` so it only opens the default Pokebattler pages and saves raw page text
- Cleaned `tools/parse-pokebattler.js` by removing legacy selected-moveset parsing and metadata
- Updated generated counter difficulty labels to use default Pokebattler simulations
- Updated methodology text for the default Pokebattler simulation workflow

---

## [1.11.0] - Regional Raid Support and Multi-Boss Handling

### Added
- Support for regional 5★ raid bosses (Buzzwole, Pheromosa, Xurkitree)
- Region-specific descriptions displayed directly on raid cards
- Ability to handle multiple simultaneous 5★ bosses in a single rotation period

### Changed
- Updated May 2026 rotation to replace Blacephalon/Stakataka with regional Ultra Beasts
- Raid schedule now displays multiple bosses in the same time window
- Counter pages now correctly integrate regional bosses

### Improved
- Synchronised raid and counter dates using shared rotation data
- Cleaner rendering of multi-boss schedule entries

### Fixed
- Mega Glalie start date mismatch (May 12 → May 13)
- Scraper/parse pipeline now supports multiple bosses without overwriting data

---

## [1.10.0] - Pokebattler Integration and Dynamic Counter Pipeline

### Added
- Node.js tooling for scraping Pokebattler raid counter data
- Parser for extracting best and budget counters from simulations
- Draft and final counter data generation pipeline
- Support for Time to Win (TTW) based counter evaluation

### Changed
- Replaced static counter data with generated data from Pokebattler simulations
- Counter rendering now uses dynamically generated datasets instead of manual entries

### Improved
- Best and budget counters are now sorted by TTW automatically
- Counter teams now limit to one Mega or Primal Pokémon
- Legacy move detection improved with move-specific mapping (e.g. Force Palm on Lucario)
- More accurate and consistent counter recommendations based on simulation data

---

## [1.9.2] - Counter Month Selector and Active Boss Highlighting

### Added
- Month selector support on the counters page
- Automatic counter month status detection
- Active / upcoming / ended boss status badges
- Active boss highlighting on current counter cards

### Changed
- Reworked counter data into month-based structure
- Updated counter rendering to support historical, current and upcoming months
- Improved counters page behavior when a month has no boss data yet

### Improved
- Counter cards now stay aligned with the same monthly rotation model used by raids
- Active raid bosses are easier to identify on the counters page

---

## [1.9.1] - Unified Type Styling and May Raid Rotation

### Added
- May 2026 raid rotation data
- Unified type-based glow system for raid and summary cards
- Type-based glow effects for counter boss cards
- Complete type color support for all Pokémon types

### Changed
- Unified type data handling using lowercase type keys
- Updated raid rendering to generate glow colors from type data
- Replaced manual glow classes with CSS variable-based styling

### Improved
- Dual-type raid cards now display blended glow effects
- Counter boss cards now use matching type-based glow styling
- Visual consistency across raids, summaries, counters and type badges

---

## [1.9.0] - JS Counters System

### Added
- Fully JavaScript-driven counters page
- Centralized counter data (`counters.js`)
- Dynamic rendering of boss cards and counter lists
- Support for advanced move metadata:
  - Legacy / event-exclusive moves
  - Hidden Power type indicators

### Changed
- Removed static HTML boss cards from `counters.html`
- Converted all counters to structured JavaScript data
- Standardized best vs budget counter logic

### Improved
- Maintainability and scalability of counter data
- Consistency across all boss entries
- Prepared foundation for future filtering, search and scraping

---

## [1.8.2] - Complete Raids Page JS Refactor

### Added
- Automatic summary card generation based on raid data
- Dynamic raid status calculation (Active / Upcoming / Ended)

### Changed
- Replaced static summary cards with dynamic JS rendering
- Unified raid rendering system across summary, schedule, and cards

### Improved
- Raids page is now fully data-driven
- Removed need for manual updates of raid status and featured cards
- Reduced HTML duplication and improved maintainability

### Notes
- Raids page now automatically reflects current and upcoming rotations

---

## [1.8.1] - Raid Cards Migration to JS

### Added
- Full raid card dataset for April 2026 in `rotations.js`

### Changed
- Replaced all static raid cards with dynamic JS rendering
- Unified raid card generation through `render-raids.js`

### Improved
- Reduced HTML size and duplication
- Centralized raid data management
- Raid status is now calculated dynamically based on date ranges (Active / Upcoming / Ended)

### Notes
- Raids page is now fully data-driven

---

## [1.8.0] - JS Raid System (Initial Refactor)

### Added
- JavaScript-based raid schedule rendering (`render-raids.js`)
- Month selector for raid rotations
- `rotations.js` data structure for managing raid data

### Changed
- Replaced static raid schedule HTML with dynamic JS rendering
- Introduced modular data → render architecture

### Notes
- Initial step towards full JS-driven site
- Only partial raid card migration (Kyogre)

---

## [1.7.0] - Accessibility & Semantic Structure Improvements

### Added

* Added ARIA labels to navigation, interactive elements, and sections
* Added descriptive `aria-label` attributes to all clickable cards
* Introduced skip link for improved keyboard navigation
* Improved form accessibility (`aria-describedby`, `autocomplete`)

### Changed

* Updated navigation to include proper `aria-label` and `aria-current`
* Converted raid schedule timeline to semantic list structure (`ul` / `li`)
* Standardized semantic sectioning across all pages (`section`, `main`, `nav`)
* Improved mobile navigation toggle accessibility (checkbox + label pattern)

### Improved

* Enhanced screen reader compatibility across all pages
* Improved keyboard navigation usability
* Increased consistency of HTML structure and readability
* Refined overall accessibility compliance of the project
* Added mobile-friendly and accessibility indicators to hero section
* Improved project metadata clarity on homepage

---

## [1.6.1] - Clickable Cards & Glow System Refinement

### Changed

* Reworked `raids.html` structure to use **fully clickable cards**
  * Replaced nested links (image + title) with single anchor wrappers
  * Simplified markup for better maintainability and accessibility
* Updated summary cards to follow the same clickable pattern

### Fixed

* Fixed **Electric glow inconsistency** (Tapu Koko no longer displays incorrect blue tint)
* Removed conflicting hover styles that overrode type-based glow system

### Improved

* Unified **type-based glow system** across:
  * Raid cards
  * Summary cards
* Improved hover animations:
  * Moved `transition` to base elements for smoother scaling
* Cleaned up unused CSS:
  * Removed redundant link styles and duplicate rules
* Enhanced visual consistency across the raids page

---

## [1.6.0] - Raid Rotation Update & Counter Accuracy Fixes

### Changed

* Updated **raid rotation** on `raids.html` to reflect current in-game schedule
  * Groudon + Mega Alakazam now set as active raids
  * Kyogre + Mega Aerodactyl moved out of active state
* Updated all **date labels and schedule blocks** to match new rotation window
* Adjusted **raid card statuses** (Active / Upcoming) across the page

### Fixed

* Corrected **counter ordering issues** on multiple bosses (sorted strictly by TTW)
* Fixed **incorrect TTW percentage differences** (ΔTTW now always based on best counter)
* Resolved inconsistencies where:
  * Lower TTW counters were showing worse ranking
  * Delta values did not match actual performance differences

### Improved

* Ensured full consistency of **legacy move system** across all counters
* Unified formatting for:
  * Legacy-tagged moves
  * Counter chip layout
* Minor UI polish across counters and raid cards for better visual consistency

---

## [1.5.2] - Legacy System & Counter UI Improvements

### Changed
- Replaced the old legacy move tooltip system with a cleaner `legacy-move` class approach
- Updated all legacy / event-exclusive moves on `counters.html` to use the new unified markup
- Added keyboard focus support for legacy move indicators with `tabindex="0"`
- Reworked the note box legend at the bottom of the counters page to match the new legacy move system
- Reduced and softened the explanatory legend text for improved visual hierarchy

### Removed
- Removed the old tooltip-based legacy markup from counter entries
- Removed obsolete star/tooltip dependency from the counters page structure

### Improved
- Center-aligned counter chips inside the best/budget counter group panels
- Standardized chip width for cleaner visual balance across raid boss cards
- Kept existing chip layout while improving spacing and consistency

---

## [1.5.1] - SEO & Structure Improvements

### Added

* Open Graph (OG) meta tags on all pages:
  * `og:title`, `og:description`, `og:image`
  * `og:url` per page
  * `og:site_name`
* Page-specific meta descriptions for better SEO

### Fixed

* Incorrect `og:url` values (all pages now point to correct URLs)
* Inconsistent HTML indentation across pages
* Improved structure inside `<body>` for readability
* Standardized Open Graph metadata across all pages

### Improved

* Better link previews when sharing pages (Discord, WhatsApp, etc.)
* More consistent and maintainable HTML structure

## [1.5.0] - Raid Card Layout & Visual Consistency

### Changed

* Reworked raid cards into a **proper 2-column grid layout**
* Interleaved raid ordering:
  * 5★ raids on the left
  * Mega raids on the right
* Ensured consistent **row alignment across all raid cards**
* Removed previous column-based layout causing uneven alignment

### Improved

* Better visual grouping of raid types (Mega vs 5★)
* More balanced spacing and structure across raid page
* Improved readability and scanability of raid cards
* More consistent Pokémon image sizing and positioning

### Fixed

* Raid cards no longer misaligned due to varying content height
* Fixed inconsistent Mega icon rendering (correct sprites used)
* Resolved issues with small or unevenly scaled Pokémon images

## [1.4.0] - Counter Methodology & TTW System

### Added

* Dedicated **Methodology section** on counters page
* Clear explanation of counter evaluation standard
* **Time to Win (TTW)** as primary performance metric
* Percentage difference vs best counter (ΔTTW)
* Pokebattler credit for raid performance data

### Changed

* Standardized all counters using:
  * Level 40
  * No weather boost
  * No friendship bonus
  * No party power
  * Pokebattler default/random boss movesets
* Refactored counters to show:
  * **Top 6 best**
  * **Top 6 budget**
* Improved clarity and consistency of counter comparisons

---

## [1.3.0] - Raid Schedule + UI Improvements

### Added

* Full **Raid Schedule section** on raids page
* Date ranges for all upcoming raids
* Small Pokémon icons in schedule
* Schedule replaces vague "Soon" indicators

### Changed

* Updated upcoming raid labels to real date ranges
* Improved clarity of raid rotation timeline
* "See raid schedule" button now leads to meaningful content

---

## [1.2.0] - Raid Page Visual Overhaul

### Added

* Type-based glow system for raid cards:

  * Water, Rock, Ground, Psychic, Electric, Ghost
* Hover glow enhancements for better feedback

### Changed

* Increased visibility of upcoming raid cards
* Stronger glow intensity for better contrast
* Consistent styling across all raid cards

### Fixed

* Missing glow on some raid cards
* Inconsistent appearance between active and upcoming cards

---

## [1.1.0] - Navigation & Anchor Fixes

### Fixed

* Navigation menu disappearing on raids page
* Anchor links jumping to wrong positions
* Counters page links now scroll correctly to selected boss

### Improved

* Smooth navigation between pages
* Better usability when jumping from raids → counters

---

## [1.0.0] - Counters Page Improvements

### Added

* Improved layout for counter cards
* Better alignment of Pokémon names and moves
* Support for legacy move indicators

### Changed

* Counter layout redesigned for readability
* Cards no longer feel clickable when they are not

---

## [0.9.0] - Contact Page Upgrade

### Added

* Support-style contact form
* Topic selection (feedback, raid request, etc.)
* Improved layout with info cards

### Changed

* Replaced "assignment-style" text with real-world wording
* Improved accessibility and structure

---

## [0.8.0] - Initial Raid System

### Added

* Raid cards for active bosses
* Summary cards at top of raids page
* Links from raids → counters

---

## [0.1.0] - Initial Project Setup

### Added

* Basic multi-page structure
* Navigation system
* Shared CSS styling