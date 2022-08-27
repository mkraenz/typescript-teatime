import { sample } from "lodash";
import { DEV } from "./dev-config";

export const monsterSprites: Array<{
    path: string; // relative to /assets/images/monsters/
    key: string;
    flip?: true;
}> = [
    {
        path: "dragons/dragon-bat.png",
        key: "batdragon",
    },
    {
        path: "dragons/dragon-brown-red.png",
        key: "earthdragon",
    },
    {
        path: "dragons/dragon-red.png",
        key: "helldragon",
    },
    {
        path: "dragons/dragon-silver.png",
        key: "silverdragon",
    },
    {
        path: "dragons/dragon-snake.png",
        key: "snakedragon",
    },
    {
        path: "dragons/dragon-zombie.png",
        key: "zombiedragon",
    },
    {
        path: "dragons/dragoran.png",
        key: "dragoran",
    },
    {
        path: "dragons/spyro.png",
        key: "spyro",
    },
    {
        path: "dragons/wyrm-medieval.png",
        key: "medievalwyrm",
    },
    {
        path: "JosephSeraph/ascent/Bird.png",
        key: "bird",
    },
    {
        path: "JosephSeraph/ascent/GreenGoo.png",
        key: "greengoo",
    },
    {
        path: "JosephSeraph/ascent/LaserDrone.png",
        key: "laserdrone",
    },
    {
        path: "JosephSeraph/ascent/Outlaw.png",
        key: "outlaw",
    },
    {
        path: "JosephSeraph/ascent/Pirate.png",
        key: "pirate",
    },
    {
        path: "JosephSeraph/ascent/Salamander.png",
        key: "salamander",
    },
    {
        path: "JosephSeraph/ascent/ScoutMachine.png",
        key: "scoutmachine",
    },
    {
        path: "JosephSeraph/ascent/Shello.png",
        key: "golemshello",
    },
    {
        path: "JosephSeraph/ascent/WailingPrince.png",
        key: "wailingprince",
    },
    {
        path: "JosephSeraph/ascent/Witch.png",
        key: "witch",
    },
    // aeon monsters 1
    {
        path: "JosephSeraph/aeon-monsters-1/goblin-violet.png",
        key: "goblinviolet",
        flip: true,
    },
    {
        path: "JosephSeraph/aeon-monsters-1/goblin.png",
        key: "goblin",
        flip: true,
    },
    {
        path: "JosephSeraph/aeon-monsters-1/mothman.png",
        key: "mothman",
        flip: true,
    },
    {
        path: "JosephSeraph/aeon-monsters-1/mothman-beige.png",
        key: "mothmanbeige",
        flip: true,
    },
    {
        path: "JosephSeraph/aeon-monsters-1/shiva.png",
        key: "shiva",
        flip: true,
    },
    {
        path: "JosephSeraph/aeon-monsters-1/shiva-beige.png",
        key: "shivabeige",
        flip: true,
    },
    {
        path: "JosephSeraph/aeon-monsters-1/wolf.png",
        key: "wolf",
        flip: true,
    },
    {
        path: "JosephSeraph/aeon-monsters-1/wolf-green.png",
        key: "wolfgreen",
        flip: true,
    },
    {
        path: "JosephSeraph/elementals1/earth.48x62.png",
        key: "earthelemental",
    },
    {
        path: "JosephSeraph/elementals1/fire.48x61.png",
        key: "fireelemental",
        flip: true,
    },
    {
        path: "JosephSeraph/elementals1/ice.48x62.png",
        key: "iceelemental",
    },
    {
        path: "JosephSeraph/elementals1/thunder.48x64.png",
        key: "thunderelemental",
    },
    {
        path: "JosephSeraph/elementals2/angel.79x80.png",
        key: "angel",
    },
    {
        path: "JosephSeraph/elementals2/death-and-angel.59x57.png",
        key: "deathandangel",
    },
    {
        path: "JosephSeraph/elementals2/devil.80x79.png",
        key: "devil",
    },
    {
        path: "JosephSeraph/elementals2/nymph.48x62.png",
        key: "nymph",
    },
    {
        path: "JosephSeraph/elementals3/cursed-armor.48x64.png",
        key: "cursedarmor",
    },
    {
        path: "JosephSeraph/elementals3/minotaur.48x64.png",
        key: "minotaur",
    },
    {
        path: "JosephSeraph/elementals3/tree-woman.47x64.png",
        key: "treewoman",
    },
    {
        path: "JosephSeraph/elementals3/wind-woman.48x61.png",
        key: "windwoman",
    },
    {
        path: "MrBeastAndRedshift/ratking.png",
        key: "ratking",
        flip: true,
    },
    {
        path: "MrBeastAndRedshift/ratman-guard.png",
        key: "ratmanguard",
    },
    {
        path: "MrBeastAndRedshift/ratman-muscle.png",
        key: "ratmanmuscle",
        flip: true,
    },
    {
        path: "MrBeastAndRedshift/ratman-thief.png",
        key: "ratmanthief",
    },
    {
        path: "MrBeastAndRedshift/ratman.42x46.png",
        key: "ratman",
    },
    {
        path: "Redshrike/3-rpg-enemy-remixes/anglerman.png",
        key: "anglerman",
    },
    {
        path: "Redshrike/3-rpg-enemy-remixes/dirg.png",
        key: "dirg",
    },
    {
        path: "Redshrike/3-rpg-enemy-remixes/naga.png",
        key: "naga",
    },
    {
        path: "Redshrike/more/bird-pikeman.png",
        key: "birdspearman",
    },
    {
        path: "Redshrike/more/blue-devil.png",
        key: "bluedevil",
    },
    {
        path: "Redshrike/more/green-abomination.png",
        key: "greenabomination",
    },
    {
        path: "Redshrike/more/harpy.png",
        key: "harpy",
    },
    {
        path: "Redshrike/more/hobgoblin.png",
        key: "hobgoblin",
    },
    {
        path: "Redshrike/more/octopus-demon.png",
        key: "mindflayer", // gedankenschinder
    },
    {
        path: "Redshrike/more/octopus.png",
        key: "octopus",
    },
    {
        path: "Redshrike/more/plump-helmet-man.png",
        key: "plumphelmetman",
    },
    {
        path: "Redshrike/more/shrimp-dragon.png",
        key: "shrimpdragon",
    },
    {
        path: "Redshrike/dark-mage.32x33.png",
        key: "darkmage",
        flip: true,
    },
    {
        path: "Redshrike/flying-eye.19x27.png",
        key: "flyingeye",
        flip: true,
    },
    {
        path: "Redshrike/goblin-warrior.33x32.png",
        key: "goblinwarrior",
        flip: true,
    },
    {
        path: "Redshrike/leocephas.png",
        key: "lionwarrior",
        flip: true,
    },
    {
        path: "Redshrike/moscito.38x34.png",
        key: "moscito",
        flip: true,
    },
    {
        path: "Redshrike/skeleton.29x35.png",
        key: "skeleton",
        flip: true,
    },
    {
        path: "Redshrike/slime.24x19.png",
        key: "slime",
        flip: true,
    },
    {
        path: "Redshrike/spider.30x24.png",
        key: "spider",
        flip: true,
    },
    {
        path: "Redshrike/turtle.41x22.png",
        key: "turtle",
        flip: true,
    },
    {
        path: "Redshrike/wyrm-green.28x45.png",
        key: "wyrmgreen",
        flip: true,
    },
    {
        path: "Redshrike/zombie-critter.26x31.png",
        key: "zombiecritter",
        flip: true,
    },
    {
        path: "var/horse.png",
        key: "horse",
    },
    {
        path: "var/pegasus.png",
        key: "pegasus",
    },
    {
        path: "var/unicorn.png",
        key: "unicorn",
    },
    {
        path: "var/wizard.50x90.png",
        key: "wizardwithstaff",
    },
];

export const monsterMapping: Array<{
    name: string;
    key: string;
    alpha?: number;
    scale?: number;
    tint?: number;
    effect?: "fire" | "wind" | "water" | "thunder";
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
        key: "hobgoblin",
        scale: 0.5,
    },
    {
        name: "cultist",
        key: "darkmage", // todo
        scale: 0.7,
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
        key: "anglerman",
    },
    {
        name: "death tyrant",
        key: "flyingeye",
        tint: 0x2ac337,
    },
    {
        name: "spectator",
        key: "flyingeye",
        scale: 0.5,
    },
    {
        name: "crawling claw",
        key: "turtle",
    },
    {
        name: "death knight",
        key: "bluedevil",
        tint: 0x898989,
    },
    {
        name: "demilich",
        key: "windwoman",
    },
    {
        name: "flameskull",
        key: "anglerman",
        tint: 0xf75050,
    },
    {
        name: "ghost",
        key: "windwoman",
        tint: 0x9f9fcd,
    },
    {
        name: "ghast",
        key: "greenabomination",
        tint: 0x9ed9f7,
    },
    {
        name: "ghoul",
        key: "greenabomination",
    },
    {
        name: "gibbering mouther",
        key: "slime",
        tint: 0xff00a5,
    },
    // 30
    {
        name: "clay golem",
        key: "dirg",
    },
    {
        name: "flesh golem",
        key: "dirg",
        tint: 0xe65870,
    },
    {
        name: "iron golem",
        key: "dirg",
        tint: 0x9c94de,
    },
    {
        name: "stone golem",
        key: "golemshello",
        tint: 0xf0bfac,
    },
    {
        name: "gorgon",
        key: "minotaur",
    },
    {
        name: "grell",
        key: "mindflayer",
        scale: 0.5,
    },
    {
        name: "helmed horror",
        key: "cursedarmor",
    },
    {
        name: "homunculus",
        key: "ratking",
    },
    {
        name: "intellect devourer",
        key: "zombiecritter",
        tint: 0xe3647b,
        scale: 0.5,
    },
    {
        name: "invisible stalker",
        key: "windwoman",
    },
    // 40
    {
        name: "lamia",
        key: "naga",
    },
    {
        name: "lich",
        key: "deathandangel",
    },
    {
        name: "medusa",
        key: "octopus",
    },
    {
        name: "dust mephit",
        key: "thunderelemental",
        scale: 0.7,
    },
    {
        name: "ice mephit",
        key: "iceelemental",
        scale: 0.7,
    },
    {
        name: "magma mephit",
        key: "fireelemental",
        scale: 0.7,
    },
    {
        name: "mud mephit",
        key: "earthelemental",
        scale: 0.7,
    },
    {
        name: "smoke mephit",
        key: "windwoman",
        alpha: 0.7,
        tint: 0x827f82,
    },
    {
        name: "steam mephit",
        key: "iceelemental",
        scale: 0.5,
        alpha: 0.7,
    },
    {
        name: "mimic",
        key: "spider",
        scale: 0.8,
    },
    // 50
    {
        name: "mind flayer",
        key: "mindflayer",
    },
    {
        name: "minotaur",
        key: "minotaur",
    },
    {
        name: "monodrone",
        key: "laserdrone",
        scale: 0.3,
    },
    {
        name: "duodrone",
        key: "laserdrone",
        scale: 0.5,
    },
    {
        name: "tridrone",
        key: "laserdrone",
        scale: 0.7,
    },
    {
        name: "quadrone",
        key: "laserdrone",
        scale: 0.9,
    },
    {
        name: "pentadrone",
        key: "laserdrone",
        scale: 1.3,
    },
    {
        name: "mummy",
        key: "skeleton",
        scale: 0.6,
    },
    {
        name: "mummy lord",
        key: "skeleton",
    },
    {
        name: "bone naga",
        key: "naga",
        tint: 0xada0c0,
    },
    // 60
    {
        name: "spirit naga",
        key: "naga",
        tint: 0x23d2d2,
        alpha: 0.6,
    },
    {
        name: "guardian naga",
        key: "naga",
        scale: 1.3,
    },
    {
        name: "black pudding",
        key: "greengoo",
        tint: 0x232450,
    },
    {
        name: "gelatinous cube",
        key: "slime",
        scale: 0.8,
    },
    {
        name: "gray ooze",
        key: "slime",
        tint: 0x343434,
        scale: 0.4,
    },
    {
        name: "ochre jelly",
        key: "greengoo",
        tint: 0xc5620a,
        scale: 0.7,
    },
    {
        name: "shadow",
        key: "deathandangel",
    },
    {
        name: "shield guardian",
        key: "golemshello",
        scale: 1.2,
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
    // 70
    {
        name: "warhorse skeleton",
        key: "skeleton",
        scale: 1.3,
    },
    {
        name: "specter",
        key: "deathandangel",
    },
    {
        name: "wight",
        key: "mothman",
    },
    {
        name: "wraith",
        key: "deathandangel",
    },
    {
        name: "zombie",
        key: "plumphelmetman",
    },
    {
        name: "beholder zombie",
        key: "plumphelmetman",
    },
    {
        name: "ogre zombie",
        key: "goblin",
    },
    {
        name: "aarakocra",
        key: "harpy",
    },
    {
        name: "azer",
        key: "fireelemental",
    },
    {
        name: "cambion",
        key: "bluedevil",
    },
    // 80
    {
        name: "couatl",
        key: "naga",
        tint: 0x8e9dfa,
    },
    {
        name: "balor",
        key: "minotaur",
        tint: 0xff742a,
    },
    {
        name: "barlgura",
        key: "ratmanmuscle",
        scale: 1.4,
    },
    {
        name: "chasme",
        key: "spider",
    },
    {
        name: "dretch",
        key: "dirg",
    },
    {
        name: "glabrezu",
        key: "minotaur",
        scale: 1.2,
    },
    {
        name: "goristo",
        key: "minotaur",
    },
    {
        name: "hezrou",
        key: "minotaur",
    },
    {
        name: "manes",
        key: "greenabomination",
    },
    {
        name: "marilith",
        key: "naga",
        scale: 1.2,
        tint: 0x39d7ff,
    },
    // 90
    {
        name: "nalfeshnee",
        key: "ratmanmuscle",
        scale: 1.5,
        tint: 0xe8aa89,
    },
    {
        name: "quasit",
        key: "wyrmgreen",
    },
    {
        name: "shadow demon",
        key: "deathandangel",
        alpha: 0.7,
        tint: 0x484848,
    },
    {
        name: "vrock",
        key: "birdspearman",
    },
    {
        name: "yochlol",
        key: "treewoman",
        tint: 0xff9126,
    },
    {
        name: "barbed devil",
        key: "shrimpdragon",
    },
    {
        name: "bearded devil",
        key: "devil",
        tint: 0xde3b3b,
    },
    {
        name: "bone devil",
        key: "shrimpdragon",
        tint: 0xffef98,
        scale: 1.2,
    },
    {
        name: "chain devil",
        key: "cursedarmor",
        tint: 0xf24c4c,
    },
    // 100
    {
        name: "erinyes",
        key: "angel",
    },
    {
        name: "horned devil",
        key: "devil",
    },
    {
        name: "ice devil",
        key: "devil",
        tint: 0x3c99e3, // todo check
    },
    {
        name: "imp",
        key: "bluedevil",
        scale: 0.3,
    },
    {
        name: "lemure",
        key: "plumphelmetman",
    },
    {
        name: "pit fiend",
        key: "minotaur",
        scale: 1.2,
    },
    {
        name: "spined devil",
        key: "greenabomination",
        tint: 0xff2d2d,
    },
    {
        name: "air elemental",
        key: "thunderelemental",
    },
    {
        name: "earth elemental",
        key: "earthelemental",
    },
    // 110
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
        key: "ratmanmuscle",
    },
    {
        name: "djinni",
        key: "windwoman",
    },
    {
        name: "efreeti",
        key: "goblin",
    },
    {
        name: "marid",
        key: "shiva",
    },
    {
        name: "hell hound",
        key: "wolfgreen",
    },
    {
        name: "needle blight",
        key: "treewoman",
        tint: 0xb28df0,
        scale: 0.8,
    },
    {
        name: "twig blight",
        key: "treewoman",
        tint: 0x44bdff,
        scale: 0.6,
    },
    // 120
    {
        name: "vine blight",
        key: "treewoman",
        tint: 0x44ffff,
        scale: 0.9,
    },
    {
        name: "driad",
        key: "treewoman",
    },
    {
        name: "pixie",
        key: "shivabeige",
    },
    {
        name: "bugbear",
        key: "ratman",
    },
    {
        name: "bugbear chief",
        key: "ratking",
    },
    {
        name: "bulette",
        key: "turtle",
        tint: 0xffc844,
    },
    {
        name: "bullywug",
        key: "zombiecritter",
        scale: 0.7,
    },
    {
        name: "centaur",
        key: "minotaur",
    },
    {
        name: "chimera",
        key: "shrimpdragon",
    },
    // 130
    {
        name: "cockatrice",
        key: "bird",
        scale: 0.6,
    },
    {
        name: "cyclops",
        key: "dirg",
        scale: 1.5,
        tint: 0xe3c126,
    },
    {
        name: "displacer beast",
        key: "snakedragon",
    },
    {
        name: "dracolich",
        key: "zombiedragon",
        scale: 2,
    },
    {
        name: "ettin",
        key: "hobgoblin",
        scale: 2.2,
    },
    {
        name: "yellow faerie dragon",
        key: "batdragon",
        tint: 0xc2e328,
    },
    {
        name: "violet faerie dragon",
        key: "batdragon",
        tint: 0xff48d4,
    },
    {
        name: "galeb duhr",
        key: "dirg",
    },
    {
        name: "cloud giant",
        key: "mothmanbeige",
    },
    // 140
    {
        name: "fire giant",
        key: "fireelemental",
        scale: 1.8,
    },
    {
        name: "frost giant",
        key: "iceelemental",
        scale: 1.8,
    },
    {
        name: "hill giant",
        key: "golemshello",
        scale: 1.8,
    },
    {
        name: "stone giant",
        key: "earthelemental",
    },
    {
        name: "storm giant",
        key: "thunderelemental",
        scale: 1.8,
    },
    {
        name: "gnoll",
        key: "ratmanguard",
        scale: 0.8,
    },
    {
        name: "gnoll pack lord",
        key: "ratmanthief",
    },
    {
        name: "gnoll fang of yeenoghu",
        key: "ratman",
        scale: 1.2,
    },
    {
        name: "goblin",
        key: "goblin",
        scale: 0.4,
    },
    // 150
    {
        name: "goblin boss",
        key: "goblinwarrior",
        scale: 0.7,
    },
    {
        name: "griffon",
        key: "birdspearman",
    },
    {
        name: "night hag",
        key: "witch",
    },
    {
        name: "half-dragon",
        key: "shrimpdragon",
    },
    {
        name: "harpy",
        key: "harpy",
    },
    {
        name: "hippogriff",
        key: "harpy",
    },
    {
        name: "hobgoblin",
        key: "goblinviolet",
        scale: 0.6,
    },
    {
        name: "hobgoblin captain",
        key: "goblinviolet",
        scale: 1,
    },
    {
        name: "hobgoblin warlord",
        key: "goblinwarrior",
        scale: 1,
    },
    // 160
    {
        name: "hydra",
        key: "silverdragon",
    },
    {
        name: "jackalwere",
        key: "wolf",
        scale: 0.8,
        tint: 0xe8dbdd,
    },
    {
        name: "kenku",
        key: "ratmanthief",
        tint: 0x94d8e1,
    },
    {
        name: "winged kobold",
        key: "mothmanbeige",
        scale: 0.4,
    },
    {
        name: "kobold",
        key: "goblin",
        scale: 0.4,
    },
    {
        name: "kraken",
        key: "mindflayer",
    },
    {
        name: "lizardfolk",
        key: "zombiecritter",
    },
    {
        name: "lizardfolk shaman",
        key: "wyrmgreen",
    },
    {
        name: "lizardfolk royal",
        key: "greenabomination",
    },
    {
        name: "werebear",
        key: "dragoran",
        scale: 1.2,
    },
    // 170
    {
        name: "wereboar",
        key: "zombiecritter",
        scale: 0.5,
        tint: 0xff901e,
    },
    {
        name: "weretiger",
        key: "wolfgreen",
    },
    {
        name: "werewolf",
        key: "wolf",
        scale: 1.1,
        tint: 0x8e7b7b,
    },
    {
        name: "manticore",
        key: "moscito",
    },
    {
        name: "merfolk",
        key: "nymph",
        tint: 0x5384f2,
    },
    {
        name: "merrow",
        key: "windwoman",
        scale: 0.8,
        tint: 0x5384f2,
    },
    {
        name: "nightmare",
        key: "helldragon",
    },
    {
        name: "ogre",
        key: "dirg",
        scale: 1.2,
    },
    {
        name: "half-ogre",
        key: "dirg",
        scale: 0.6,
    },
    {
        name: "oni",
        key: "minotaur",
    },
    // 180
    {
        name: "orc",
        key: "ratmanmuscle",
        scale: 1.2,
        tint: 0xafedaf,
    },
    {
        name: "orc war chief",
        key: "ratking",
        scale: 1.2,
        tint: 0xafedaf,
    },
    {
        name: "orc eye of gruumsh",
        key: "goblinwarrior",
        scale: 1.2,
        tint: 0xafedaf,
    },
    {
        name: "orog",
        key: "ratmanmuscle",
        scale: 1.2,
        tint: 0xafb9ed,
    },
    {
        name: "owlbear",
        key: "dragoran",
        scale: 0.9,
        tint: 0x82ffe7,
    },
    {
        name: "pegasus",
        key: "pegasus",
    },
    {
        name: "peryton",
        key: "birdspearman",
    },
    {
        name: "pseudodragon",
        key: "batdragon",
        scale: 1.7,
    },
    {
        name: "purple worm",
        key: "wyrmgreen",
        tint: 0xaf26f2,
    },
    {
        name: "remorhaz",
        key: "snakedragon",
        scale: 2,
        tint: 0x44ffff,
    },
    // 190
    {
        name: "young remorhaz",
        key: "snakedragon",
        tint: 0x44ffff,
    },
    {
        name: "roc",
        key: "bird",
        scale: 2,
    },
    {
        name: "sahuagin",
        key: "zombiecritter",
        tint: 0xa4ffa4,
    },
    {
        name: "sahuagin priestess",
        key: "zombiecritter",
        tint: 0xf77d00,
        scale: 1.2,
    },
    {
        name: "sahuagin baron",
        key: "zombiecritter",
        tint: 0xc843fe,
        scale: 1.3,
    },
    {
        name: "satyr",
        key: "horse",
    },
    {
        name: "scarecrow",
        key: "wizardwithstaff",
        tint: 0xf28e04,
        scale: 1.3,
    },
    {
        name: "shambling mound",
        key: "earthelemental",
        scale: 1.5,
        tint: 0x86ae75,
    },
    {
        name: "androsphinx",
        key: "lionwarrior",
        scale: 1.2,
    },
    {
        name: "gynosphinx",
        key: "lionwarrior",
        scale: 1.4,
        tint: 0xfffebb,
    },
    {
        name: "sprite",
        key: "mothmanbeige",
        alpha: 0.8,
        scale: 0.7,
    },
    {
        name: "stirge",
        key: "moscito",
        tint: 0xef78e1,
    },
    {
        name: "tarrasque",
        key: "earthdragon",
    },
    {
        name: "thri-kreen",
        key: "spider",
        tint: 0xff5353,
    },
    {
        name: "treant",
        key: "treewoman",
        scale: 1.8,
        tint: 0xc2e2b0,
    },
    {
        name: "troll",
        key: "dirg",
        scale: 1.3,
        tint: 0x928d80,
    },
    {
        name: "unicorn",
        key: "unicorn",
    },
    {
        name: "water weird",
        key: "windwoman",
        tint: 0x40ede1,
        alpha: 0.9,
    },
    {
        name: "will-o-wisp",
        key: "slime",
        tint: 0xf91f1f,
        alpha: 0.7,
    },
    {
        name: "wyvern",
        key: "medievalwyrm",
    },
    {
        name: "yeti",
        key: "minotaur",
        tint: 0x7ef9e2,
    },
    {
        name: "abominable yeti",
        key: "minotaur",
        tint: 0x7ef9e2,
        scale: 1.4,
    },
    {
        name: "yuan-ti abomination",
        key: "naga",
        tint: 0xff4fbd,
        scale: 0.8,
    },
    {
        name: "yuan-ti malison",
        key: "naga",
        tint: 0xff4fbd,
    },
    {
        name: "yuan-ti pureblood",
        key: "naga",
        tint: 0xff4fbd,
        scale: 1.4,
    },
    {
        name: "bandit",
        key: "outlaw",
        scale: 0.8,
    },
    {
        name: "bandit captain",
        key: "outlaw",
        scale: 1.1,
    },
    {
        name: "scout",
        key: "ratmanthief",
    },
    {
        name: "magmin",
        key: "zombiecritter",
        tint: 0xff3900,
        effect: "fire" as const,
    },
    {
        name: "fire snake",
        key: "spyro",
    },
    {
        name: "salamander",
        key: "salamander",
    },
    {
        name: "red slaad",
        key: "ratmanmuscle",
        tint: 0xde2d2d,
    },
    {
        name: "slaad tadpole",
        key: "ratmanmuscle",
        tint: 0x46e5da,
    },
    {
        name: "blue slaad",
        key: "ratmanmuscle",
        tint: 0x5486ea,
    },
    {
        name: "green slaad",
        key: "ratmanmuscle",
        tint: 0x4bff27,
    },
    {
        name: "grey slaad",
        key: "ratmanmuscle",
        tint: 0x7f7f7f,
    },
    {
        name: "death slaad",
        key: "ratmanmuscle",
        tint: 0xc239ed,
    },
    {
        name: "succubus",
        key: "witch",
    },
    {
        name: "xorn",
        key: "dragoran",
    },
    {
        name: "arcanaloth",
        key: "ratking",
    },
    {
        name: "mezzoloth",
        key: "zombiecritter",
        tint: 0x1462b8,
    },
    {
        name: "nycaloth",
        key: "helldragon",
        tint: 0x41e833,
    },
    {
        name: "ultroloth",
        key: "mindflayer",
        scale: 1.5,
    },
    {
        name: "ankheg",
        key: "",
    },
    {
        name: "basilisk",
        key: "wyrmgreen",
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
        key: "outlaw",
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
        key: "plumphelmetman",
    },
    {
        name: "shrieker",
        key: "",
    },
    {
        name: "violet fungus",
        key: "plumphelmetman",
        tint: 0xc37ee6,
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
        key: "witch",
        tint: 0xbe3de8,
    },
].map((m) => Object.freeze(m));

const validateMonsterKeysExistAsTextures = () => {
    const missingKeys = monsterMapping.filter((m) => {
        if (!m.key) {
            // no key, no problem. We fallback to default texture.
            return false;
        }
        return !monsterSprites.find((s) => s.key === m.key);
    });
    if (missingKeys.length > 0) {
        throw new Error(
            `The following monsters are missing keys or textures: ${missingKeys
                .map((m) => m.name)
                .join(", ")}`
        );
    }
};
if (DEV.validateMonsterTextures) {
    validateMonsterKeysExistAsTextures();
}

export const randomMonsterCfg = () => sample(monsterMapping)!;
