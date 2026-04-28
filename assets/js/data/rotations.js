export const raidRotations = [
  {
    id: "2026-04",
    label: "April 2026",
    status: "current",
    schedule: [
      {
        date: "Apr 8 – Apr 14",
        time: "6:00 AM → 10:00 PM local time",
        fiveStar: "Kyogre",
        mega: "Mega Aerodactyl",
        icons: [
          {
            name: "Kyogre",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/382.png"
          },
          {
            name: "Mega Aerodactyl",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10042.png"
          }
        ]
      },
      {
        date: "Apr 15 – Apr 21",
        time: "6:00 AM → 10:00 PM local time",
        fiveStar: "Groudon",
        mega: "Mega Alakazam",
        icons: [
          {
            name: "Groudon",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/383.png"
          },
          {
            name: "Mega Alakazam",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10037.png"
          }
        ]
      },
      {
        date: "Apr 22 – Apr 28",
        time: "6:00 AM → 10:00 PM local time",
        fiveStar: "Tapu Koko",
        mega: "Mega Sharpedo",
        icons: [
          {
            name: "Tapu Koko",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/785.png"
          },
          {
            name: "Mega Sharpedo",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10070.png"
          }
        ]
      },
      {
        date: "Apr 29 – May 5",
        time: "6:00 AM → 10:00 PM local time",
        fiveStar: "Tapu Lele",
        mega: "Mega Banette",
        icons: [
          {
            name: "Tapu Lele",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/786.png"
          },
          {
            name: "Mega Banette",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10056.png"
          }
        ]
      }
    ],

    raidCards: [
      {
        id: "kyogre",
        name: "Kyogre",
        href: "counters.html#kyogre",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/382.png",
        imageAlt: "Kyogre",
        cardClass: "water-glow",
        badge: "5★",
        badgeClass: "legendary-badge",
        dateRange: ["2026-04-08", "2026-04-14"],
        types: ["water"],
        dexRank: "DialgaDex: #1 Primal Water / #2 Shadow Water",
        description: "One of the most valuable Water raid lines in the game. Excellent long-term PvE target."
      },

      {
        id: "mega-aerodactyl",
        name: "Mega Aerodactyl",
        href: "counters.html#mega-aerodactyl",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10042.png",
        imageAlt: "Mega Aerodactyl",
        cardClass: "rock-glow",
        badge: "Mega",
        badgeClass: "mega-badge",
        dateRange: ["2026-04-08", "2026-04-14"],
        types: ["rock", "flying"],
        dexRank: "DialgaDex: Top-end Rock mega",
        description: "Strong Rock mega for raid teams. Best when you want both solid Rock damage and a team mega boost."
      },

      {
        id: "groudon",
        name: "Groudon",
        href: "counters.html#groudon",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/383.png",
        imageAlt: "Groudon",
        cardClass: "ground-glow",
        badge: "5★",
        badgeClass: "legendary-badge",
        dateRange: ["2026-04-15", "2026-04-21"],
        types: ["ground"],
        dexRank: "DialgaDex: #1 Primal Ground",
        description: "One of the best Ground investments in the game and a very high-priority future raid."
      },

      {
        id: "mega-alakazam",
        name: "Mega Alakazam",
        href: "counters.html#mega-alakazam",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10037.png",
        imageAlt: "Mega Alakazam",
        cardClass: "psychic-glow",
        badge: "Mega",
        badgeClass: "mega-badge",
        dateRange: ["2026-04-15", "2026-04-21"],
        types: ["psychic"],
        dexRank: "DialgaDex: #2 Psychic attacker",
        description: "Premium Psychic mega with real raid value and great offensive upside."
      },

      {
        id: "tapu-koko",
        name: "Tapu Koko",
        href: "counters.html#tapu-koko",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/785.png",
        imageAlt: "Tapu Koko",
        cardClass: "electric-glow",
        badge: "5★",
        badgeClass: "legendary-badge",
        dateRange: ["2026-04-22", "2026-04-28"],
        types: ["electric", "fairy"],
        dexRank: "DialgaDex: Fast Electric/Fairy pressure",
        description: "Strong typing and useful offensive coverage make it a solid raid target for collectors and specialists."
      },

      {
        id: "mega-sharpedo",
        name: "Mega Sharpedo",
        href: "counters.html#mega-sharpedo",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10070.png",
        imageAlt: "Mega Sharpedo",
        cardClass: "water-glow",
        badge: "Mega",
        badgeClass: "mega-badge",
        dateRange: ["2026-04-22", "2026-04-28"],
        types: ["water", "dark"],
        dexRank: "DialgaDex: Water / Dark mega utility",
        description: "Valuable for players looking for a Water-aligned mega with extra Dark-type flexibility."
      },

      {
        id: "tapu-lele",
        name: "Tapu Lele",
        href: "counters.html#tapu-lele",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/786.png",
        imageAlt: "Tapu Lele",
        cardClass: "psychic-glow",
        badge: "5★",
        badgeClass: "legendary-badge",
        dateRange: ["2026-04-29", "2026-05-05"],
        types: ["psychic", "fairy"],
        dexRank: "DialgaDex: Strong Fairy/Psychic option",
        description: "Solid dual typing and raid utility make it a worthwhile addition to many teams."
      },

      {
        id: "mega-banette",
        name: "Mega Banette",
        href: "counters.html#mega-banette",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10056.png",
        imageAlt: "Mega Banette",
        cardClass: "ghost-glow",
        badge: "Mega",
        badgeClass: "mega-badge",
        dateRange: ["2026-04-29", "2026-05-05"],
        types: ["ghost"],
        dexRank: "DialgaDex: Ghost mega attacker",
        description: "Useful Ghost-type mega with niche but valuable raid applications."
      }
    ]
  },

  {
    id: "2026-05",
    label: "May 2026",
    status: "upcoming",
    schedule: []
  }
];