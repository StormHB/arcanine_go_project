export const counterDrafts = [
  {
    id: "mega-glalie",
    name: "Mega Glalie",
    source: "Pokebattler",
    sourceUrl: "https://www.pokebattler.com/raids/defenders/GLALIE_MEGA/...",

    settings: {
      attackerLevel: 40,
      weather: "No weather",
      friendship: "Not friends",
      partyPower: false,
      strategy: "Cinematic attack when possible",
      defense: "Pokebattler default/random movesets",
      sort: "Estimator"
    },

    bestCountersRaw: [
      {
        rank: 1,
        name: "Zamazenta Crowned Shield",
        moves: [
          { name: "Metal Claw", type: "steel" },
          { name: "Behemoth Bash", type: "steel" }
        ],
        ttw: "216.4s",
        estimator: "0.74",
        power: "145%"
      }
    ],

    budgetCountersRaw: [
      {
        rank: 1,
        name: "Lucario",
        moves: [
          { name: "Force Palm", type: "fighting" },
          { name: "Aura Sphere", type: "fighting" }
        ],
        ttw: "???",
        estimator: "???",
        power: "???"
      }
    ],

    reviewStatus: "needs-check"
  }
];