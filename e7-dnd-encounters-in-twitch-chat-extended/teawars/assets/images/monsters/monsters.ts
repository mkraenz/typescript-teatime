export const monsterSprites: Array<{
    path: string; // relative to /assets/images/monsters/
    width: number;
    height: number; // max(width, height) -> scale that max dim is 300px
    flip?: true;
    key: string;
}> = [
    {
        path: "JosephSeraph/ascent/Bird.png",
        width: 64,
        height: 64,
        key: "bird",
    },
    {
        path: "JosephSeraph/ascent/GreenGoo.png",
        width: 64,
        height: 64,
        key: "greengoo",
    },
    {
        path: "JosephSeraph/ascent/LaserDrone.png",
        width: 64,
        height: 64,
        key: "laserdrone",
    },
    {
        path: "JosephSeraph/ascent/Outlaw.png",
        width: 64,
        height: 96,
        key: "outlaw",
    },
    {
        path: "JosephSeraph/ascent/Pirate.png",
        width: 64,
        height: 96,
        key: "pirate",
    },
    {
        path: "JosephSeraph/ascent/Salamander.png",
        width: 96,
        height: 64,
        key: "salamander",
    },
    {
        path: "JosephSeraph/ascent/ScoutMachine.png",
        width: 96,
        height: 64,
        key: "scoutmachine",
    },
    {
        path: "JosephSeraph/ascent/Shello.png",
        width: 64,
        height: 64,
        key: "golemshello",
    },
    {
        path: "JosephSeraph/ascent/WailingPrince.png",
        width: 128,
        height: 128,
        key: "wailingprince",
    },
    {
        path: "JosephSeraph/ascent/Witch.png",
        width: 96,
        height: 96,
        key: "witch",
    },
    // aeon monsters 1
    {
        path: "JosephSeraph/aeon-monsters-1/goblin-violet.png",
        width: 46,
        height: 48,
        flip: true,
        key: "goblinviolet",
    },
    {
        path: "JosephSeraph/aeon-monsters-1/goblin.png",
        width: 46,
        height: 48,
        flip: true,
        key: "goblin",
    },
    {
        path: "JosephSeraph/aeon-monsters-1/mothman.png",
        width: 58,
        height: 61,
        flip: true,
        key: "mothman",
    },
    {
        path: "JosephSeraph/aeon-monsters-1/mothman-beige.png",
        width: 58,
        height: 61,
        flip: true,
        key: "mothmanbeige",
    },
    {
        path: "JosephSeraph/aeon-monsters-1/shiva.png",
        width: 47,
        height: 47,
        flip: true,
        key: "shiva",
    },
    {
        path: "JosephSeraph/aeon-monsters-1/shiva-beige.png",
        width: 47,
        height: 47,
        flip: true,
        key: "shivabeige",
    },
    {
        path: "JosephSeraph/aeon-monsters-1/wolf.png",
        width: 44,
        height: 48,
        flip: true,
        key: "wolf",
    },
    {
        path: "JosephSeraph/aeon-monsters-1/wolf-green.png",
        width: 44,
        height: 48,
        flip: true,
        key: "wolfgreen",
    },
    {
        path: "JosephSeraph/elementals1/earth.48x62.png",
        width: 48,
        height: 62,
        key: "earthelemental",
    },
    {
        path: "JosephSeraph/elementals1/fire.48x61.png",
        width: 48,
        height: 61,
        flip: true,
        key: "fireelemental",
    },
    {
        path: "JosephSeraph/elementals1/ice.48x62.png",
        width: 48,
        height: 62,
        key: "iceelemental",
    },
    {
        path: "JosephSeraph/elementals1/thunder.48x64.png",
        width: 48,
        height: 64,
        key: "thunderelemental",
    },
    {
        path: "JosephSeraph/elementals2/angel.79x80.png",
        width: 79,
        height: 80,
        key: "angel",
    },
    {
        path: "JosephSeraph/elementals2/death-and-angel.59x57.png",
        width: 59,
        height: 57,
        key: "deathandangel",
    },
    {
        path: "JosephSeraph/elementals2/devil.80x79.png",
        width: 80,
        height: 79,
        key: "devil",
    },
    {
        path: "JosephSeraph/elementals2/nymph.48x62.png",
        width: 48,
        height: 62,
        key: "nymph",
    },
    {
        path: "JosephSeraph/elementals3/cursed-armor.48x64.png",
        width: 48,
        height: 64,
        key: "cursedarmor",
    },
    {
        path: "JosephSeraph/elementals3/minotaur.48x64.png",
        width: 48,
        height: 64,
        key: "minotaur",
    },
    {
        path: "JosephSeraph/elementals3/tree-woman.47x64.png",
        width: 47,
        height: 64,
        key: "treewoman",
    },
    {
        path: "JosephSeraph/elementals3/wind-woman.48x61.png",
        width: 48,
        height: 61,
        key: "windwoman",
    },
    {
        path: "Redshrike/dark-mage.32x33.png",
        width: 32,
        height: 33,
        flip: true,
        key: "darkmage",
    },
    {
        path: "Redshrike/flying-eye.19x27.png",
        width: 19,
        height: 27,
        flip: true,
        key: "flyingeye",
    },
    {
        path: "Redshrike/goblin-warrior.33x32.png",
        width: 33,
        height: 32,
        flip: true,
        key: "goblinwarrior",
    },
    {
        path: "Redshrike/moscito.38x34.png",
        width: 38,
        height: 34,
        flip: true,
        key: "moscito",
    },
    {
        path: "Redshrike/skeleton.29x35.png",
        width: 29,
        height: 35,
        flip: true,
        key: "skeleton",
    },
    {
        path: "Redshrike/slime.24x19.png",
        width: 24,
        height: 19,
        flip: true,
        key: "slime",
    },
    {
        path: "Redshrike/spider.30x24.png",
        width: 30,
        height: 24,
        flip: true,
        key: "spider",
    },
    {
        path: "Redshrike/turtle.41x22.png",
        width: 31,
        height: 22,
        flip: true,
        key: "turtle",
    },
    {
        path: "Redshrike/wyrm-green.28x45.png",
        width: 28,
        height: 45,
        flip: true,
        key: "wyrmgreen",
    },
    {
        path: "Redshrike/zombie-critter.26x31.png",
        width: 26,
        height: 31,
        flip: true,
        key: "zombiecritter",
    },
    {
        path: "var/ratman.42x46.png",
        width: 42,
        height: 46,
        key: "ratman",
    },
    {
        path: "var/wizard.50x90.png",
        width: 50,
        height: 90,
        key: "wizardwithstaff",
    },
];

export const monsterMapping: Array<{
    name: string;
    key: string;
    alpha?: number;
    scale?: number;
}> = [
    {
        name: "doppelganger",
        key: "mothman",
    },
    {
        name: "gargoyle",
        key: "golemshello",
    },
    {
        name: "wererat",
        key: "ratman",
    },
    {
        name: "rakshasa",
        key: "outlaw",
    },
    {
        name: "revenant",
        key: "wailingprince",
        alpha: 0.7,
    },
    {
        name: "vampire",
        key: "wailingprince",
        tint: 0x44fffff,
    },
    {
        name: "vampire spawn",
        key: "wailingprince",
        scale: 0.8,
    },
    {
        name: "blink dog",
        key: "wolf",
    },
    {
        name: "acolyte",
        key: "wizardwithstaff",
        scale: 0.9,
    },
    {
        name: "assassin",
        key: "pirate",
    },
    {
        name: "commoner",
        key: "pirate",
        tint: 0xf7f7af,
        scale: 0.5,
    },
    {
        name: "cultist",
        key: "darkmage", // todo
        scale: 0.8,
    },
    {
        name: "guard",
        key: "outlaw",
        tint: 0x50ffff,
        scale: 0.7,
    },
    {
        name: "thug",
        key: "pirate",
    },
    {
        name: "animated armor",
        key: "cursedarmor",
    },
    {
        name: "flying sword",
        key: "scoutmachine",
    },
    {
        name: "rug of smothering",
        key: "laserdrone",
    },
    {
        name: "banshee",
        key: "skeleton", // todo
    },
    {
        name: "beholder",
        key: "flyingeye",
    },
    {
        name: "death tyrant",
        key: "flyingeye",
        tint: 0x2ac337,
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
        key: "flyingeye",
        tint: 0xff4b4b,
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
        key: "minotaur",
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
        key: "skeleton",
    },
    {
        name: "minotaur skeleton",
        key: "minotaur",
        tint: 0x888888,
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
        key: "devil",
    },
    {
        name: "ice devil",
        key: "devil",
        tint: 0x44ffff, // todo check
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
        key: "thunderelemental",
    },
    {
        name: "earth elemental",
        key: "earthelemental",
    },
    {
        name: "fire elemental",
        key: "fireelemental",
    },
    {
        name: "water elemental",
        key: "iceelemental",
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
        key: "wolfgreen",
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
        key: "treewoman",
    },
    {
        name: "pixie",
        key: "nymph",
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
        key: "salamander",
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
