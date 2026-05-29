const CPM = {
    level20: 0.5974,
    level25: 0.667934
};

function calculateCp(attack, defense, stamina, level) {
    const cpm = level === 20 ? CPM.level20 : CPM.level25;

    return Math.floor(
        ((attack + 15) *
            Math.sqrt(defense + 15) *
            Math.sqrt(stamina + 15) *
            cpm ** 2) /
        10
    );
}

const tests = [
    {
        name: "Articuno",
        stats: { attack: 192, defense: 236, stamina: 207 },
        expected: { level20: 1743, level25: 2179 }
    },
    {
        name: "Groudon",
        stats: { attack: 270, defense: 228, stamina: 205 },
        expected: { level20: 2351, level25: 2939 }
    },
    {
        name: "Arcanine",
        stats: { attack: 227, defense: 166, stamina: 207 }
    }
];

tests.forEach((test) => {
    const level20 = calculateCp(
        test.stats.attack,
        test.stats.defense,
        test.stats.stamina,
        20
    );

    const level25 = calculateCp(
        test.stats.attack,
        test.stats.defense,
        test.stats.stamina,
        25
    );

    console.log(`${test.name}`);
    console.log("L20:", level20);
    console.log("L25:", level25);
    console.log("----------------");
    console.log(`${test.name} L20:`, level20, level20 === test.expected.level20 ? "✅" : "❌");
    console.log(`${test.name} L25:`, level25, level25 === test.expected.level25 ? "✅" : "❌");
});