export const counterBosses = [
    {
        id: "kyogre",
        name: "Kyogre",
        themeClass: "water-theme",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/382.png",
        imageAlt: "Official artwork of Kyogre",
        subtitle: "Tier 5 • April 8 to April 14",
        types: ["water"],
        weaknesses: "Grass, Electric",
        difficulty: "Strong legendary raid, not built for solo play",

        bestCounters: [
            {
                name: "Shadow Raikou",
                moves: [
                    { name: "Thunder Shock" },
                    { name: "Wild Charge" }
                ],
                ttw: "606s",
                diff: "Best"
            },
            {
                name: "Shadow Regigigas",
                moves: [
                    { name: "Hidden Power", type: "grass" },
                    { name: "Crush Grip" }
                ],
                ttw: "628s",
                diff: "+4%"
            },
            {
                name: "Xurkitree",
                moves: [
                    { name: "Thunder Shock" },
                    { name: "Power Whip" }
                ],
                ttw: "634s",
                diff: "+5%"
            },
            {
                name: "Zekrom",
                moves: [
                    { name: "Charge Beam" },
                    { name: "Fusion Bolt", legacy: true }
                ],
                ttw: "637s",
                diff: "+5%"
            },
            {
                name: "Magnezone",
                moves: [
                    { name: "Thunder Fang" },
                    { name: "Wild Charge" }
                ],
                ttw: "644s",
                diff: "+6%"
            },
            {
                name: "Electivire",
                moves: [
                    { name: "Thunder Shock" },
                    { name: "Wild Charge" }
                ],
                ttw: "650s",
                diff: "+7%"
            }
        ],

        budgetCounters: [
            {
                name: "Electivire",
                moves: [
                    { name: "Thunder Shock" },
                    { name: "Wild Charge" }
                ],
                ttw: "714s",
                diff: "Best"
            },
            {
                name: "Rillaboom",
                moves: [
                    { name: "Razor Leaf" },
                    { name: "Frenzy Plant", legacy: true }
                ],
                ttw: "735s",
                diff: "+3%"
            },
            {
                name: "Chesnaught",
                moves: [
                    { name: "Vine Whip" },
                    { name: "Frenzy Plant", legacy: true }
                ],
                ttw: "777s",
                diff: "+9%"
            },
            {
                name: "Magnezone",
                moves: [
                    { name: "Volt Switch" },
                    { name: "Wild Charge" }
                ],
                ttw: "791s",
                diff: "+11%"
            },
            {
                name: "Luxray",
                moves: [
                    { name: "Spark" },
                    { name: "Wild Charge" }
                ],
                ttw: "815s",
                diff: "+14%"
            },
            {
                name: "Tangrowth",
                moves: [
                    { name: "Vine Whip" },
                    { name: "Power Whip" }
                ],
                ttw: "819s",
                diff: "+15%"
            }
        ]
    },

    {
        id: "mega-aerodactyl",
        name: "Mega Aerodactyl",
        themeClass: "rock-theme",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10042.png",
        imageAlt: "Official artwork of Mega Aerodactyl",
        subtitle: "Mega Raid • April 8 to April 14",
        types: ["rock", "flying"],
        weaknesses: "Rock, Steel, Water, Electric, Ice",
        difficultyLabel: "Focus",
        difficulty: "Strong Steel, Water and Rock attackers",

        bestCounters: [
            {
                name: "Zamazenta (Crowned Shield)",
                moves: [
                    { name: "Metal Claw" },
                    { name: "Behemoth Bash", legacy: true }
                ],
                ttw: "275s",
                diff: "Best"
            },
            {
                name: "Zacian (Crowned Sword)",
                moves: [
                    { name: "Metal Claw" },
                    { name: "Behemoth Blade", legacy: true }
                ],
                ttw: "284s",
                diff: "+3%"
            },
            {
                name: "Necrozma (Dusk Mane)",
                moves: [
                    { name: "Metal Claw" },
                    { name: "Sunsteel Strike", legacy: true }
                ],
                ttw: "286s",
                diff: "+4%"
            },
            {
                name: "White Kyurem",
                moves: [
                    { name: "Ice Fang" },
                    { name: "Ice Burn", legacy: true }
                ],
                ttw: "299s",
                diff: "+9%"
            },
            {
                name: "Primal Kyogre",
                moves: [
                    { name: "Waterfall" },
                    { name: "Origin Pulse", legacy: true }
                ],
                ttw: "300s",
                diff: "+9%"
            },
            {
                name: "Shadow Metagross",
                moves: [
                    { name: "Bullet Punch" },
                    { name: "Meteor Mash", legacy: true }
                ],
                ttw: "316s",
                diff: "+15%"
            }
        ],

        budgetCounters: [
            {
                name: "Metagross",
                moves: [
                    { name: "Bullet Punch" },
                    { name: "Meteor Mash", legacy: true }
                ],
                ttw: "388s",
                diff: "Best"
            },
            {
                name: "Greninja",
                moves: [
                    { name: "Water Shuriken" },
                    { name: "Hydro Cannon", legacy: true }
                ],
                ttw: "404s",
                diff: "+4%"
            },
            {
                name: "Quaquaval",
                moves: [
                    { name: "Water Gun" },
                    { name: "Hydro Cannon", legacy: true }
                ],
                ttw: "408s",
                diff: "+5%"
            },
            {
                name: "Kingler",
                moves: [
                    { name: "Bubble" },
                    { name: "Crabhammer" }
                ],
                ttw: "413s",
                diff: "+6%"
            },
            {
                name: "Galarian Darmanitan",
                moves: [
                    { name: "Ice Fang" },
                    { name: "Avalanche" }
                ],
                ttw: "417s",
                diff: "+7%"
            },
            {
                name: "Empoleon",
                moves: [
                    { name: "Steel Wing" },
                    { name: "Hydro Cannon", legacy: true }
                ],
                ttw: "424s",
                diff: "+9%"
            }
        ]
    },

    {
        id: "groudon",
        name: "Groudon",
        themeClass: "ground-theme",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/383.png",
        imageAlt: "Official artwork of Groudon",
        subtitle: "Tier 5 • April 15 to April 21",
        types: ["ground"],
        weaknesses: "Water, Electric, Ice",
        difficulty: "Legendary raid with strong offensive pressure",

        bestCounters: [
            {
                name: "White Kyurem",
                moves: [
                    { name: "Ice Fang" },
                    { name: "Ice Burn" }
                ],
                ttw: "559s",
                diff: "Best"
            },
            {
                name: "Primal Kyogre",
                moves: [
                    { name: "Waterfall" },
                    { name: "Origin Pulse", legacy: true }
                ],
                ttw: "562s",
                diff: "+1%"
            },
            {
                name: "Shadow Kyogre",
                moves: [
                    { name: "Waterfall" },
                    { name: "Origin Pulse", legacy: true }
                ],
                ttw: "589s",
                diff: "+5%"
            },
            {
                name: "Black Kyurem",
                moves: [
                    { name: "Dragon Tail" },
                    { name: "Freeze Shock" }
                ],
                ttw: "614s",
                diff: "+10%"
            },
            {
                name: "Shadow Swampert",
                moves: [
                    { name: "Water Gun" },
                    { name: "Hydro Cannon", legacy: true }
                ],
                ttw: "628s",
                diff: "+12%"
            },
            {
                name: "Shadow Regigigas",
                moves: [
                    { name: "Hidden Power", type: "grass" },
                    { name: "Crush Grip" }
                ],
                ttw: "636s",
                diff: "+14%"
            }
        ],

        budgetCounters: [
            {
                name: "Rillaboom",
                moves: [
                    { name: "Razor Leaf" },
                    { name: "Frenzy Plant", legacy: true }
                ],
                ttw: "688s",
                diff: "Best"
            },
            {
                name: "Quaquaval",
                moves: [
                    { name: "Water Gun" },
                    { name: "Hydro Cannon", legacy: true }
                ],
                ttw: "744s",
                diff: "+8%"
            },
            {
                name: "Primarina",
                moves: [
                    { name: "Waterfall" },
                    { name: "Hydro Cannon", legacy: true }
                ],
                ttw: "749s",
                diff: "+9%"
            },
            {
                name: "Meowscarada",
                moves: [
                    { name: "Leafage" },
                    { name: "Frenzy Plant", legacy: true }
                ],
                ttw: "755s",
                diff: "+10%"
            },
            {
                name: "Chesnaught",
                moves: [
                    { name: "Vine Whip" },
                    { name: "Frenzy Plant", legacy: true }
                ],
                ttw: "757s",
                diff: "+10%"
            },
            {
                name: "Breloom",
                moves: [
                    { name: "Force Palm" },
                    { name: "Grass Knot" }
                ],
                ttw: "771s",
                diff: "+12%"
            }
        ]
    },

    {
        id: "mega-alakazam",
        name: "Mega Alakazam",
        themeClass: "psychic-theme",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10037.png",
        imageAlt: "Official artwork of Mega Alakazam",
        subtitle: "Mega Raid • April 15 to April 21",
        types: ["psychic"],
        weaknesses: "Bug, Ghost, Dark",
        difficultyLabel: "Focus",
        difficulty: "Dark and Ghost attackers",

        bestCounters: [
            {
                name: "Dawn Wings Necrozma",
                moves: [
                    { name: "Shadow Claw" },
                    { name: "Moongeist Beam", legacy: true }
                ],
                ttw: "286s",
                diff: "Best"
            },
            {
                name: "Mega Gengar",
                moves: [
                    { name: "Shadow Claw" },
                    { name: "Shadow Ball" }
                ],
                ttw: "298s",
                diff: "+4%"
            },
            {
                name: "Shadow Chandelure",
                moves: [
                    { name: "Hex" },
                    { name: "Shadow Ball" }
                ],
                ttw: "359s",
                diff: "+26%"
            },
            {
                name: "Shadow Salamence",
                moves: [
                    { name: "Bite" },
                    { name: "Brutal Swing", legacy: true }
                ],
                ttw: "364s",
                diff: "+27%"
            },
            {
                name: "Lunala",
                moves: [
                    { name: "Shadow Claw" },
                    { name: "Shadow Ball" }
                ],
                ttw: "373s",
                diff: "+30%"
            },
            {
                name: "Shadow Mewtwo",
                moves: [
                    { name: "Psycho Cut" },
                    { name: "Shadow Ball" }
                ],
                ttw: "374s",
                diff: "+31%"
            }
        ],

        budgetCounters: [
            {
                name: "Gengar",
                moves: [
                    { name: "Shadow Claw" },
                    { name: "Shadow Ball" }
                ],
                ttw: "389s",
                diff: "Best"
            },
            {
                name: "Dragapult",
                moves: [
                    { name: "Astonish" },
                    { name: "Shadow Ball" }
                ],
                ttw: "393s",
                diff: "+1%"
            },
            {
                name: "Gholdengo",
                moves: [
                    { name: "Hex" },
                    { name: "Shadow Ball" }
                ],
                ttw: "405s",
                diff: "+4%"
            },
            {
                name: "Chandelure",
                moves: [
                    { name: "Hex" },
                    { name: "Shadow Ball" }
                ],
                ttw: "407s",
                diff: "+5%"
            },
            {
                name: "Salamence",
                moves: [
                    { name: "Bite" },
                    { name: "Brutal Swing", legacy: true }
                ],
                ttw: "421s",
                diff: "+8%"
            },
            {
                name: "Dhelmise",
                moves: [
                    { name: "Shadow Claw" },
                    { name: "Shadow Ball" }
                ],
                ttw: "424s",
                diff: "+9%"
            }
        ]
    },

    {
        id: "tapu-koko",
        name: "Tapu Koko",
        themeClass: "electric-theme",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/785.png",
        imageAlt: "Official artwork of Tapu Koko",
        subtitle: "Tier 5 • April 22 to April 28",
        types: ["electric", "fairy"],
        weaknesses: "Poison, Ground",
        difficulty: "Ground attackers are the most natural answer",

        bestCounters: [
            {
                name: "Primal Groudon",
                moves: [
                    { name: "Mud Shot" },
                    { name: "Precipice Blades", legacy: true }
                ],
                ttw: "432s",
                diff: "Best"
            },
            {
                name: "Shadow Groudon",
                moves: [
                    { name: "Mud Shot" },
                    { name: "Precipice Blades", legacy: true }
                ],
                ttw: "495s",
                diff: "+15%"
            },
            {
                name: "Shadow Excadrill",
                moves: [
                    { name: "Mud-Slap" },
                    { name: "Scorching Sands" }
                ],
                ttw: "512s",
                diff: "+19%"
            },
            {
                name: "Eternatus",
                moves: [
                    { name: "Poison Jab" },
                    { name: "Sludge Bomb" }
                ],
                ttw: "513s",
                diff: "+19%"
            },
            {
                name: "Shadow Mamoswine",
                moves: [
                    { name: "Mud-Slap" },
                    { name: "High Horsepower" }
                ],
                ttw: "524s",
                diff: "+21%"
            },
            {
                name: "Shadow Rhyperior",
                moves: [
                    { name: "Mud-Slap" },
                    { name: "Earthquake" }
                ],
                ttw: "534s",
                diff: "+24%"
            }
        ],

        budgetCounters: [
            {
                name: "Excadrill",
                moves: [
                    { name: "Mud-Slap" },
                    { name: "Scorching Sands" }
                ],
                ttw: "599s",
                diff: "Best"
            },
            {
                name: "Garchomp",
                moves: [
                    { name: "Mud Shot" },
                    { name: "Earth Power", legacy: true }
                ],
                ttw: "615s",
                diff: "+3%"
            },
            {
                name: "Mamoswine",
                moves: [
                    { name: "Mud-Slap" },
                    { name: "High Horsepower" }
                ],
                ttw: "635s",
                diff: "+6%"
            },
            {
                name: "Rhyperior",
                moves: [
                    { name: "Mud-Slap" },
                    { name: "Earthquake" }
                ],
                ttw: "658s",
                diff: "+10%"
            },
            {
                name: "Overqwil",
                moves: [
                    { name: "Poison Jab" },
                    { name: "Sludge Bomb" }
                ],
                ttw: "661s",
                diff: "+10%"
            },
            {
                name: "Rhydon",
                moves: [
                    { name: "Mud-Slap" },
                    { name: "Earthquake" }
                ],
                ttw: "685s",
                diff: "+14%"
            }
        ]
    },

    {
        id: "mega-sharpedo",
        name: "Mega Sharpedo",
        themeClass: "water-theme",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10070.png",
        imageAlt: "Official artwork of Mega Sharpedo",
        subtitle: "Mega Raid • April 22 to April 28",
        types: ["water", "dark"],
        weaknesses: "Fighting, Bug, Grass, Electric, Fairy",
        difficultyLabel: "Focus",
        difficulty: "Fighting attackers are especially strong",

        bestCounters: [
            {
                name: "Mega Lucario",
                moves: [
                    { name: "Force Palm", legacy: true },
                    { name: "Aura Sphere" }
                ],
                ttw: "201s",
                diff: "Best"
            },
            {
                name: "Keldeo (Resolute)",
                moves: [
                    { name: "Low Kick" },
                    { name: "Sacred Sword" }
                ],
                ttw: "211s",
                diff: "+5%"
            },
            {
                name: "Kartana",
                moves: [
                    { name: "Razor Leaf" },
                    { name: "Sacred Sword" }
                ],
                ttw: "244s",
                diff: "+21%"
            },
            {
                name: "Shadow Raikou",
                moves: [
                    { name: "Thunder Shock" },
                    { name: "Aura Sphere", legacy: true }
                ],
                ttw: "249s",
                diff: "+24%"
            },
            {
                name: "Shadow Regigigas",
                moves: [
                    { name: "Hidden Power", type: "grass" },
                    { name: "Crush Grip" }
                ],
                ttw: "253s",
                diff: "+26%"
            },
            {
                name: "Zekrom",
                moves: [
                    { name: "Charge Beam" },
                    { name: "Fusion Bolt", legacy: true }
                ],
                ttw: "270s",
                diff: "+34%"
            }
        ],

        budgetCounters: [
            {
                name: "Hisuian Decidueye",
                moves: [
                    { name: "Magical Leaf" },
                    { name: "Aura Sphere" }
                ],
                ttw: "283s",
                diff: "Best"
            },
            {
                name: "Lucario",
                moves: [
                    { name: "Force Palm", legacy: true },
                    { name: "Aura Sphere" }
                ],
                ttw: "285s",
                diff: "+1%"
            },
            {
                name: "Rillaboom",
                moves: [
                    { name: "Razor Leaf" },
                    { name: "Frenzy Plant", legacy: true }
                ],
                ttw: "286s",
                diff: "+1%"
            },
            {
                name: "Breloom",
                moves: [
                    { name: "Force Palm" },
                    { name: "Grass Knot" }
                ],
                ttw: "291s",
                diff: "+3%"
            },
            {
                name: "Meowscarada",
                moves: [
                    { name: "Leafage" },
                    { name: "Frenzy Plant", legacy: true }
                ],
                ttw: "300s",
                diff: "+6%"
            },
            {
                name: "Conkeldurr",
                moves: [
                    { name: "Counter" },
                    { name: "Dynamic Punch" }
                ],
                ttw: "302s",
                diff: "+7%"
            }
        ]
    },

    {
        id: "tapu-lele",
        name: "Tapu Lele",
        themeClass: "psychic-theme",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/786.png",
        imageAlt: "Official artwork of Tapu Lele",
        subtitle: "Tier 5 • April 29 to May 5",
        types: ["psychic", "fairy"],
        weaknesses: "Poison, Ghost, Steel",
        difficulty: "Steel and Ghost attackers work especially well",

        bestCounters: [
            {
                name: "Zamazenta (Crowned Shield)",
                moves: [
                    { name: "Metal Claw" },
                    { name: "Behemoth Bash", legacy: true }
                ],
                ttw: "442s",
                diff: "Best"
            },
            {
                name: "Zacian (Crowned Sword)",
                moves: [
                    { name: "Metal Claw" },
                    { name: "Behemoth Blade", legacy: true }
                ],
                ttw: "445s",
                diff: "+1%"
            },
            {
                name: "Necrozma (Dusk Mane)",
                moves: [
                    { name: "Metal Claw" },
                    { name: "Sunsteel Strike", legacy: true }
                ],
                ttw: "460s",
                diff: "+4%"
            },
            {
                name: "Necrozma (Dawn Wings)",
                moves: [
                    { name: "Metal Claw" },
                    { name: "Moongeist Beam", legacy: true }
                ],
                ttw: "487s",
                diff: "+10%"
            },
            {
                name: "Shadow Metagross",
                moves: [
                    { name: "Bullet Punch" },
                    { name: "Meteor Mash", legacy: true }
                ],
                ttw: "508s",
                diff: "+15%"
            },
            {
                name: "Mega Gengar",
                moves: [
                    { name: "Lick" },
                    { name: "Shadow Ball" }
                ],
                ttw: "511s",
                diff: "+16%"
            }
        ],

        budgetCounters: [
            {
                name: "Metagross",
                moves: [
                    { name: "Bullet Punch" },
                    { name: "Meteor Mash", legacy: true }
                ],
                ttw: "611s",
                diff: "Best"
            },
            {
                name: "Gholdengo",
                moves: [
                    { name: "Hex" },
                    { name: "Shadow Ball" }
                ],
                ttw: "678s",
                diff: "+11%"
            },
            {
                name: "Dragapult",
                moves: [
                    { name: "Astonish" },
                    { name: "Shadow Ball" }
                ],
                ttw: "685s",
                diff: "+12%"
            },
            {
                name: "Chandelure",
                moves: [
                    { name: "Hex" },
                    { name: "Shadow Ball" }
                ],
                ttw: "736s",
                diff: "+20%"
            },
            {
                name: "Excadrill",
                moves: [
                    { name: "Metal Claw" },
                    { name: "Iron Head" }
                ],
                ttw: "740s",
                diff: "+21%"
            },
            {
                name: "Overqwil",
                moves: [
                    { name: "Poison Jab" },
                    { name: "Sludge Bomb" }
                ],
                ttw: "742s",
                diff: "+21%"
            }
        ]
    },

    {
        id: "mega-banette",
        name: "Mega Banette",
        themeClass: "ghost-theme",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10056.png",
        imageAlt: "Official artwork of Mega Banette",
        subtitle: "Mega Raid • April 29 to May 5",
        types: ["ghost"],
        weaknesses: "Ghost, Dark",
        difficultyLabel: "Focus",
        difficulty: "Dark attackers are very easy to build",

        bestCounters: [
            {
                name: "Mega Absol",
                moves: [
                    { name: "Snarl" },
                    { name: "Brutal Swing", legacy: true }
                ],
                ttw: "252s",
                diff: "Best"
            },
            {
                name: "Shadow Hydreigon",
                moves: [
                    { name: "Bite" },
                    { name: "Brutal Swing", legacy: true }
                ],
                ttw: "255s",
                diff: "+1%"
            },
            {
                name: "Shadow Tyranitar",
                moves: [
                    { name: "Bite" },
                    { name: "Brutal Swing", legacy: true }
                ],
                ttw: "260s",
                diff: "+3%"
            },
            {
                name: "Shadow Absol",
                moves: [
                    { name: "Snarl" },
                    { name: "Brutal Swing", legacy: true }
                ],
                ttw: "269s",
                diff: "+7%"
            },
            {
                name: "Shadow Darkrai",
                moves: [
                    { name: "Snarl" },
                    { name: "Shadow Ball" }
                ],
                ttw: "270s",
                diff: "+7%"
            },
            {
                name: "Shadow Weavile",
                moves: [
                    { name: "Snarl" },
                    { name: "Foul Play" }
                ],
                ttw: "291s",
                diff: "+15%"
            }
        ],

        budgetCounters: [
            {
                name: "Hydreigon",
                moves: [
                    { name: "Bite" },
                    { name: "Brutal Swing", legacy: true }
                ],
                ttw: "313s",
                diff: "Best"
            },
            {
                name: "Tyranitar",
                moves: [
                    { name: "Bite" },
                    { name: "Brutal Swing", legacy: true }
                ],
                ttw: "316s",
                diff: "+1%"
            },
            {
                name: "Absol",
                moves: [
                    { name: "Snarl" },
                    { name: "Brutal Swing", legacy: true }
                ],
                ttw: "316s",
                diff: "+1%"
            },
            {
                name: "Zoroark",
                moves: [
                    { name: "Shadow Claw" },
                    { name: "Shadow Ball" }
                ],
                ttw: "317s",
                diff: "+1%"
            },
            {
                name: "Kingambit",
                moves: [
                    { name: "Snarl" },
                    { name: "Foul Play" }
                ],
                ttw: "333s",
                diff: "+6%"
            },
            {
                name: "Incineroar",
                moves: [
                    { name: "Snarl" },
                    { name: "Darkest Lariat" }
                ],
                ttw: "341s",
                diff: "+9%"
            }
        ]
    },
];