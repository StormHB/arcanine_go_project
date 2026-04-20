# Changelog

All notable changes to this project are documented here.

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
  * Extreme weather
  * No friendship bonus
  * No party power
  * Hardest boss moveset
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