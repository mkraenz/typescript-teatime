export const monsterSprites: Array<{
    path: string; // relative to /assets/images/monsters/
    width: number;
    height: number; // max(width, height) -> scale that max dim is 300px
    key: string;
}> = [
    {
        path: "JosephSeraph/Witch.png",
        width: 96,
        height: 96,
        key: "witch",
    },
    {
        path: "JosephSeraph/Outlaw.png",
        width: 64,
        height: 96,
        key: "outlaw",
    },
    {
        path: "JosephSeraph/WailingPrince.png",
        width: 128,
        height: 128,
        key: "wailingprince",
    },
    {
        path: "JosephSeraph/Salamander.png",
        width: 96,
        height: 64,
        key: "salamander",
    },
    {
        path: "JosephSeraph/GreenGoo.png",
        width: 64,
        height: 64,
        key: "greengoo",
    },
    {
        path: "JosephSeraph/Pirate.png",
        width: 64,
        height: 96,
        key: "pirate",
    },
];

export const monsterMapping: Array<{ name: string; key: string }> = [
    {
        name: "doppelganger",
        key: "wailingprince",
    },
    {
        name: "gargoyle",
        key: "witch",
    },
    {
        name: "wererat",
        key: "salamander",
    },
    {
        name: "rakshasa",
        key: "outlaw",
    },
    {
        name: "revenant",
        key: "",
    },
    {
        name: "vampire",
        key: "wailingprince",
    },
    {
        name: "vampire spawn",
        key: "wailingprince",
    },
    {
        name: "blink dog",
        key: "",
    },
    {
        name: "acolyte",
        key: "wailingprince",
    },
    {
        name: "assassin",
        key: "pirate",
    },
    {
        name: "commoner",
        key: "",
    },
    {
        name: "cultist",
        key: "",
    },
    {
        name: "guard",
        key: "",
    },
    {
        name: "thug",
        key: "",
    },
    {
        name: "animated armor",
        key: "",
    },
    {
        name: "flying sword",
        key: "",
    },
    {
        name: "rug of smothering",
        key: "",
    },
    {
        name: "banshee",
        key: "",
    },
    {
        name: "beholder",
        key: "",
    },
    {
        name: "death tyrant",
        key: "",
    },
    {
        name: "spectator",
        key: "",
    },
    {
        name: "crawling claw",
        key: "",
    },
    {
        name: "death knight",
        key: "",
    },
    {
        name: "demilich",
        key: "",
    },
    {
        name: "flameskull",
        key: "",
    },
    {
        name: "ghost",
        key: "",
    },
    {
        name: "ghast",
        key: "",
    },
    {
        name: "ghoul",
        key: "",
    },
    {
        name: "gibbering mouther",
        key: "",
    },
    {
        name: "clay golem",
        key: "",
    },
    {
        name: "flesh golem",
        key: "",
    },
    {
        name: "iron golem",
        key: "",
    },
    {
        name: "stone golem",
        key: "",
    },
    {
        name: "gorgon",
        key: "",
    },
    {
        name: "grell",
        key: "",
    },
    {
        name: "helmed horror",
        key: "",
    },
    {
        name: "homunculus",
        key: "",
    },
    {
        name: "intellect devourer",
        key: "",
    },
    {
        name: "invisible stalker",
        key: "",
    },
    {
        name: "lamia",
        key: "",
    },
    {
        name: "lich",
        key: "",
    },
    {
        name: "medusa",
        key: "",
    },
    {
        name: "dust mephit",
        key: "",
    },
    {
        name: "ice mephit",
        key: "",
    },
    {
        name: "magma mephit",
        key: "",
    },
    {
        name: "mud mephit",
        key: "",
    },
    {
        name: "smoke mephit",
        key: "",
    },
    {
        name: "steam mephit",
        key: "",
    },
    {
        name: "mimic",
        key: "",
    },
    {
        name: "mind flayer",
        key: "",
    },
    {
        name: "minotaur",
        key: "",
    },
    {
        name: "monodrone",
        key: "",
    },
    {
        name: "duodrone",
        key: "",
    },
    {
        name: "tridrone",
        key: "",
    },
    {
        name: "quadrone",
        key: "",
    },
    {
        name: "pentadrone",
        key: "",
    },
    {
        name: "mummy",
        key: "",
    },
    {
        name: "mummy lord",
        key: "",
    },
    {
        name: "bone naga",
        key: "",
    },
    {
        name: "spirit naga",
        key: "",
    },
    {
        name: "guardian naga",
        key: "",
    },
    {
        name: "black pudding",
        key: "",
    },
    {
        name: "gelatinous cube",
        key: "",
    },
    {
        name: "gray ooze",
        key: "",
    },
    {
        name: "ochre jelly",
        key: "",
    },
    {
        name: "shadow",
        key: "",
    },
    {
        name: "shield guardian",
        key: "",
    },
    {
        name: "skeleton",
        key: "",
    },
    {
        name: "minotaur skeleton",
        key: "",
    },
    {
        name: "warhorse skeleton",
        key: "",
    },
    {
        name: "specter",
        key: "",
    },
    {
        name: "wight",
        key: "",
    },
    {
        name: "wraith",
        key: "",
    },
    {
        name: "zombie",
        key: "",
    },
    {
        name: "beholder zombie",
        key: "",
    },
    {
        name: "ogre zombie",
        key: "",
    },
    {
        name: "aarakocra",
        key: "",
    },
    {
        name: "azer",
        key: "",
    },
    {
        name: "cambion",
        key: "",
    },
    {
        name: "couatl",
        key: "",
    },
    {
        name: "balor",
        key: "",
    },
    {
        name: "barlgura",
        key: "",
    },
    {
        name: "chasme",
        key: "",
    },
    {
        name: "dretch",
        key: "",
    },
    {
        name: "glabrezu",
        key: "",
    },
    {
        name: "goristo",
        key: "",
    },
    {
        name: "hezrou",
        key: "",
    },
    {
        name: "manes",
        key: "",
    },
    {
        name: "marilith",
        key: "",
    },
    {
        name: "nalfeshnee",
        key: "",
    },
    {
        name: "quasit",
        key: "",
    },
    {
        name: "shadow demon",
        key: "",
    },
    {
        name: "vrock",
        key: "",
    },
    {
        name: "yochlol",
        key: "",
    },
    {
        name: "barbed devil",
        key: "",
    },
    {
        name: "bearded devil",
        key: "",
    },
    {
        name: "bone devil",
        key: "",
    },
    {
        name: "chain devil",
        key: "",
    },
    {
        name: "erinyes",
        key: "",
    },
    {
        name: "horned devil",
        key: "",
    },
    {
        name: "ice devil",
        key: "",
    },
    {
        name: "imp",
        key: "",
    },
    {
        name: "lemure",
        key: "",
    },
    {
        name: "pit fiend",
        key: "",
    },
    {
        name: "spined devil",
        key: "",
    },
    {
        name: "air elemental",
        key: "",
    },
    {
        name: "earth elemental",
        key: "",
    },
    {
        name: "fire elemental",
        key: "",
    },
    {
        name: "water elemental",
        key: "",
    },
    {
        name: "dao",
        key: "",
    },
    {
        name: "djinni",
        key: "",
    },
    {
        name: "efreeti",
        key: "",
    },
    {
        name: "marid",
        key: "",
    },
    {
        name: "hell hound",
        key: "",
    },
    {
        name: "needle blight",
        key: "",
    },
    {
        name: "twig blight",
        key: "",
    },
    {
        name: "vine blight",
        key: "",
    },
    {
        name: "driad",
        key: "",
    },
    {
        name: "pixie",
        key: "",
    },
    {
        name: "bugbear",
        key: "",
    },
    {
        name: "bugbear chief",
        key: "",
    },
    {
        name: "bulette",
        key: "",
    },
    {
        name: "bullywug",
        key: "",
    },
    {
        name: "centaur",
        key: "",
    },
    {
        name: "chimera",
        key: "",
    },
    {
        name: "cockatrice",
        key: "",
    },
    {
        name: "cyclops",
        key: "",
    },
    {
        name: "displacer beast",
        key: "",
    },
    {
        name: "dracolich",
        key: "",
    },
    {
        name: "ettin",
        key: "",
    },
    {
        name: "faerie dragon r/o/y",
        key: "",
    },
    {
        name: "faerie dragon g/b/i/v",
        key: "",
    },
    {
        name: "galeb duhr",
        key: "",
    },
    {
        name: "cloud giant",
        key: "",
    },
    {
        name: "fire giant",
        key: "",
    },
    {
        name: "frost giant",
        key: "",
    },
    {
        name: "hill giant",
        key: "",
    },
    {
        name: "stone giant",
        key: "",
    },
    {
        name: "storm giant",
        key: "",
    },
    {
        name: "gnoll",
        key: "",
    },
    {
        name: "gnoll pack lord",
        key: "",
    },
    {
        name: "gnoll fang of yeenoghu",
        key: "",
    },
    {
        name: "goblin",
        key: "",
    },
    {
        name: "goblin boss",
        key: "",
    },
    {
        name: "griffon",
        key: "",
    },
    {
        name: "night hag",
        key: "",
    },
    {
        name: "half-dragon",
        key: "",
    },
    {
        name: "harpy",
        key: "",
    },
    {
        name: "hippogriff",
        key: "",
    },
    {
        name: "hobgoblin",
        key: "",
    },
    {
        name: "hobgoblin captain",
        key: "",
    },
    {
        name: "hobgoblin warlord",
        key: "",
    },
    {
        name: "hydra",
        key: "",
    },
    {
        name: "jackalwere",
        key: "",
    },
    {
        name: "kenku",
        key: "",
    },
    {
        name: "winged kobold",
        key: "",
    },
    {
        name: "kobold",
        key: "",
    },
    {
        name: "kraken",
        key: "",
    },
    {
        name: "lizardfolk",
        key: "",
    },
    {
        name: "lizardfolk shaman",
        key: "",
    },
    {
        name: "lizardfolk royal",
        key: "",
    },
    {
        name: "werebear",
        key: "",
    },
    {
        name: "wereboar",
        key: "",
    },
    {
        name: "weretiger",
        key: "",
    },
    {
        name: "werewolf",
        key: "",
    },
    {
        name: "manticore",
        key: "",
    },
    {
        name: "merfolk",
        key: "",
    },
    {
        name: "merrow",
        key: "",
    },
    {
        name: "nightmare",
        key: "",
    },
    {
        name: "ogre",
        key: "",
    },
    {
        name: "half-ogre",
        key: "",
    },
    {
        name: "oni",
        key: "",
    },
    {
        name: "orc",
        key: "",
    },
    {
        name: "orc war chief",
        key: "",
    },
    {
        name: "orc eye of gruumsh",
        key: "",
    },
    {
        name: "orog",
        key: "",
    },
    {
        name: "owlbear",
        key: "",
    },
    {
        name: "pegasus",
        key: "",
    },
    {
        name: "peryton",
        key: "",
    },
    {
        name: "pseudodragon",
        key: "",
    },
    {
        name: "purple worm",
        key: "",
    },
    {
        name: "remorhaz",
        key: "",
    },
    {
        name: "young remorhaz",
        key: "",
    },
    {
        name: "roc",
        key: "",
    },
    {
        name: "sahuagin",
        key: "",
    },
    {
        name: "sahuagin priestess",
        key: "",
    },
    {
        name: "sahuagin baron",
        key: "",
    },
    {
        name: "satyr",
        key: "",
    },
    {
        name: "scarecrow",
        key: "",
    },
    {
        name: "shambling mound",
        key: "",
    },
    {
        name: "androsphinx",
        key: "",
    },
    {
        name: "gynosphinx",
        key: "",
    },
    {
        name: "sprite",
        key: "",
    },
    {
        name: "stirge",
        key: "",
    },
    {
        name: "tarrasque",
        key: "",
    },
    {
        name: "thri-kreen",
        key: "",
    },
    {
        name: "treant",
        key: "",
    },
    {
        name: "troll",
        key: "",
    },
    {
        name: "unicorn",
        key: "",
    },
    {
        name: "water weird",
        key: "",
    },
    {
        name: "will-o-wisp",
        key: "",
    },
    {
        name: "wyvern",
        key: "",
    },
    {
        name: "yeti",
        key: "",
    },
    {
        name: "abominable yeti",
        key: "",
    },
    {
        name: "yuan-ti abomination",
        key: "",
    },
    {
        name: "yuan-ti malison",
        key: "",
    },
    {
        name: "yuan-ti pureblood",
        key: "",
    },
    {
        name: "bandit",
        key: "",
    },
    {
        name: "bandit captain",
        key: "",
    },
    {
        name: "scout",
        key: "",
    },
    {
        name: "magmin",
        key: "",
    },
    {
        name: "fire snake",
        key: "",
    },
    {
        name: "salamander",
        key: "",
    },
    {
        name: "red slaad",
        key: "",
    },
    {
        name: "slaad tadpole",
        key: "",
    },
    {
        name: "blue slaad",
        key: "",
    },
    {
        name: "green slaad",
        key: "",
    },
    {
        name: "grey slaad",
        key: "",
    },
    {
        name: "death slaad",
        key: "",
    },
    {
        name: "succubus",
        key: "",
    },
    {
        name: "xorn",
        key: "",
    },
    {
        name: "arcanaloth",
        key: "",
    },
    {
        name: "mezzoloth",
        key: "",
    },
    {
        name: "nycaloth",
        key: "",
    },
    {
        name: "ultroloth",
        key: "",
    },
    {
        name: "ankheg",
        key: "",
    },
    {
        name: "basilisk",
        key: "",
    },
    {
        name: "behir",
        key: "",
    },
    {
        name: "carrion crawler",
        key: "",
    },
    {
        name: "cloaker",
        key: "",
    },
    {
        name: "darkmantle",
        key: "",
    },
    {
        name: "drider",
        key: "",
    },
    {
        name: "duergar",
        key: "",
    },
    {
        name: "drow",
        key: "",
    },
    {
        name: "drow elite warrior",
        key: "",
    },
    {
        name: "drow mage",
        key: "",
    },
    {
        name: "drow priestess",
        key: "",
    },
    {
        name: "ettercap",
        key: "",
    },
    {
        name: "flumph",
        key: "",
    },
    {
        name: "fomorian",
        key: "",
    },
    {
        name: "gas spore",
        key: "",
    },
    {
        name: "shrieker",
        key: "",
    },
    {
        name: "violet fungus",
        key: "",
    },
    {
        name: "deep gnome",
        key: "",
    },
    {
        name: "grick",
        key: "",
    },
    {
        name: "grick alpha",
        key: "",
    },
    {
        name: "grimlock",
        key: "",
    },
    {
        name: "hook horror",
        key: "",
    },
    {
        name: "kuo-toa",
        key: "",
    },
    {
        name: "kuo-toa archpriest",
        key: "",
    },
    {
        name: "kuo-toa whip",
        key: "",
    },
    {
        name: "myconid sprout",
        key: "",
    },
    {
        name: "spore servant",
        key: "",
    },
    {
        name: "myconid adult",
        key: "",
    },
    {
        name: "myconid sovereign",
        key: "",
    },
    {
        name: "nothic",
        key: "",
    },
    {
        name: "otyugh",
        key: "",
    },
    {
        name: "piercer",
        key: "",
    },
    {
        name: "quaggoth",
        key: "",
    },
    {
        name: "roper",
        key: "",
    },
    {
        name: "rust name",
        key: "",
    },
    {
        name: "troglodyte",
        key: "",
    },
    {
        name: "umber hulk",
        key: "",
    },
    {
        name: "aboleth",
        key: "",
    },
    {
        name: "chuul",
        key: "",
    },
    {
        name: "sea hag",
        key: "",
    },
].map((m) => Object.freeze(m));
