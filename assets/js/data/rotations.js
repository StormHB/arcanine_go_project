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

    schedule: [
      {
        date: "Apr 29 – May 5",
        time: "10:00 AM → 10:00 AM local time",
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
      },

      {
        date: "May 6 – May 12",
        time: "10:00 AM → 10:00 AM local time",
        fiveStar: "Nihilego",
        mega: "Mega Camerupt",
        icons: [
          {
            name: "Nihilego",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/793.png"
          },
          {
            name: "Mega Camerupt",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10087.png"
          }
        ]
      },

      {
        date: "May 13 – May 19",
        time: "10:00 AM → 10:00 AM local time",
        fiveStar: "Buzzwole / Pheromosa / Xurkitree",
        mega: "Mega Glalie",
        icons: [
          {
            name: "Buzzwole",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/794.png"
          },
          {
            name: "Pheromosa",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/795.png"
          },
          {
            name: "Xurkitree",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/796.png"
          },
          {
            name: "Mega Glalie",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10074.png"
          }
        ]
      },

      {
        date: "May 20 – May 26",
        time: "10:00 AM → 10:00 AM local time",
        fiveStar: "Tapu Bulu",
        mega: "Mega Altaria",
        icons: [
          {
            name: "Tapu Bulu",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/787.png"
          },
          {
            name: "Mega Altaria",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10067.png"
          }
        ]
      },

      {
        date: "May 27 – Jun 2",
        time: "10:00 AM → 10:00 AM local time",
        fiveStar: "Tapu Fini",
        mega: "Mega Medicham",
        icons: [
          {
            name: "Tapu Fini",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/788.png"
          },
          {
            name: "Mega Medicham",
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10054.png"
          }
        ]
      }
    ],

    raidCards: [
      {
        id: "tapu-lele",
        name: "Tapu Lele",
        href: "counters.html#tapu-lele",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/786.png",
        imageAlt: "Tapu Lele",
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
        badge: "Mega",
        badgeClass: "mega-badge",
        dateRange: ["2026-04-29", "2026-05-05"],
        types: ["ghost"],
        dexRank: "DialgaDex: Ghost mega attacker",
        description: "Useful Ghost-type mega with niche but valuable raid applications."
      },

      {
        id: "nihilego",
        name: "Nihilego",
        href: "counters.html#nihilego",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/793.png",
        imageAlt: "Nihilego",
        badge: "5★",
        badgeClass: "legendary-badge",
        dateRange: ["2026-05-06", "2026-05-12"],
        types: ["rock", "poison"],
        dexRank: "DialgaDex: Strong Poison/Rock raid option",
        description: "Useful Poison-type pressure with solid Rock-type coverage."
      },

      {
        id: "mega-camerupt",
        name: "Mega Camerupt",
        href: "counters.html#mega-camerupt",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10087.png",
        imageAlt: "Mega Camerupt",
        badge: "Mega",
        badgeClass: "mega-badge",
        dateRange: ["2026-05-06", "2026-05-12"],
        types: ["fire", "ground"],
        dexRank: "DialgaDex: Fire/Ground mega utility",
        description: "A niche mega with useful typing for specific raid matchups."
      },

      {
        id: "buzzwole",
        name: "Buzzwole",
        href: "counters.html#buzzwole",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/794.png",
        imageAlt: "Buzzwole",
        badge: "Regional",
        badgeClass: "legendary-badge",
        dateRange: ["2026-05-13", "2026-05-19"],
        types: ["bug", "fighting"],
        dexRank: "Regional: Americas and Greenland",
        description: "Regional Ultra Beast raid available in the Americas and Greenland."
      },

      {
        id: "pheromosa",
        name: "Pheromosa",
        href: "counters.html#pheromosa",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/795.png",
        imageAlt: "Pheromosa",
        badge: "Regional",
        badgeClass: "legendary-badge",
        dateRange: ["2026-05-13", "2026-05-19"],
        types: ["bug", "fighting"],
        dexRank: "Regional: Europe, Middle East, Africa and India",
        description: "Regional Ultra Beast raid available in Europe, the Middle East, Africa and India."
      },

      {
        id: "xurkitree",
        name: "Xurkitree",
        href: "counters.html#xurkitree",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/796.png",
        imageAlt: "Xurkitree",
        badge: "Regional",
        badgeClass: "legendary-badge",
        dateRange: ["2026-05-13", "2026-05-19"],
        types: ["electric"],
        dexRank: "Regional: Asia-Pacific",
        description: "Regional Ultra Beast raid available in the Asia-Pacific region."
      },

      {
        id: "mega-glalie",
        name: "Mega Glalie",
        href: "counters.html#mega-glalie",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10074.png",
        imageAlt: "Mega Glalie",
        badge: "Mega",
        badgeClass: "mega-badge",
        dateRange: ["2026-05-13", "2026-05-19"],
        types: ["ice"],
        dexRank: "DialgaDex: Ice mega attacker",
        description: "Useful Ice-type mega for Dragon, Flying, Grass and Ground raid matchups."
      },

      {
        id: "tapu-bulu",
        name: "Tapu Bulu",
        href: "counters.html#tapu-bulu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/787.png",
        imageAlt: "Tapu Bulu",
        badge: "5★",
        badgeClass: "legendary-badge",
        dateRange: ["2026-05-20", "2026-05-26"],
        types: ["grass", "fairy"],
        dexRank: "DialgaDex: Grass/Fairy raid option",
        description: "Useful dual typing with Grass and Fairy coverage."
      },

      {
        id: "mega-altaria",
        name: "Mega Altaria",
        href: "counters.html#mega-altaria",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10067.png",
        imageAlt: "Mega Altaria",
        badge: "Mega",
        badgeClass: "mega-badge",
        dateRange: ["2026-05-20", "2026-05-26"],
        types: ["dragon", "fairy"],
        dexRank: "DialgaDex: Dragon/Fairy mega utility",
        description: "A defensive mega with unique typing and useful support value."
      },

      {
        id: "tapu-fini",
        name: "Tapu Fini",
        href: "counters.html#tapu-fini",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/788.png",
        imageAlt: "Tapu Fini",
        badge: "5★",
        badgeClass: "legendary-badge",
        dateRange: ["2026-05-27", "2026-06-02"],
        types: ["water", "fairy"],
        dexRank: "DialgaDex: Water/Fairy utility",
        description: "Bulky dual-type legendary with useful coverage and collection value."
      },

      {
        id: "mega-medicham",
        name: "Mega Medicham",
        href: "counters.html#mega-medicham",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10054.png",
        imageAlt: "Mega Medicham",
        badge: "Mega",
        badgeClass: "mega-badge",
        dateRange: ["2026-05-27", "2026-06-02"],
        types: ["fighting", "psychic"],
        dexRank: "DialgaDex: Fighting/Psychic mega",
        description: "A niche mega with unique typing and useful matchup coverage."
      }
    ]
  }
];