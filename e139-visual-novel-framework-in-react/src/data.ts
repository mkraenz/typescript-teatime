import { CSSProperties } from "react";
import { ShakeTypes } from "reshake/dist/types/shakes";

export type ServiceLocator = {
  audio: {
    playBgm: (src: string) => void;
    pauseBgm: () => void;
  };
  screenShake: {
    shake: (type: ShakeTypes) => void;
    stop: () => void;
  };
};

export type Option = {
  text: string;
  next: string;
  onConfirm?: (serviceLocator: ServiceLocator) => Promise<void> | void;
  expire?: boolean;
  customStyle?: CSSProperties;
};

export type PageData = {
  text: string;
  options: Option[];
  onEnter?: (serviceLocator: ServiceLocator) => Promise<void> | void;
};

const end_of_game = {
  text: "Congratulations. You have reached the <span style='color: green;'>End of the Game.</span>. Play again.",
  next: "init",
};

export const data = {
  init: {
    text: "As you awake from your deep sleep, a tall figure stands before you.",
    options: [
      {
        text: "Greet.",
        next: "hi",
        onConfirm: (serviceLocator) => {
          serviceLocator.audio.playBgm("Lament_for_a_Warriors_Soul.mp3");
        },
      },
      {
        text: "Let's just skip to the part where we do monster slaying!",
        next: "skip to monster slaying",
        customStyle: { color: "#aaaaaa" },
      },
    ],
    onEnter: (serviceLocator) => {
      serviceLocator.audio.pauseBgm();
      serviceLocator.screenShake.stop();
    },
  },
  hi: {
    text: '"Greetings," you say as you notice the scars on his face.',
    options: [
      {
        text: "Who are you?",
        next: "i am Baldow",
      },
      { text: "Where are we?", next: "in the depth" },
    ],
  },
  "skip to monster slaying": {
    text: "You really think I'd be able to put in a battle system in this little dev time? Just continue reading the novel and be satisfied.",
    options: [
      { text: "Okay... No need to be so harsh.", next: "init" },
      {
        text: "I expected more of you, <span style='color: #208036;'>TypeScriptTeatime</span>.",
        next: "you are right",
      },
      { text: "You're right. That's impossible to pull of.", next: "init" },
    ],
  },
  "you are right": {
    text: "Alright, alright. I'll let you skip to the battle scene. But it's still just reading, okay? Anyway, here goes.",
    options: [
      { text: "Thanks!", next: "venture forth" },
      {
        text: "MONSTER SLAYING, MONSTER SLAYING, MONSTER SLAYING!",
        next: "venture forth",
      },
    ],
  },
  "i am Baldow": {
    text: "I am Baldow, the Monster Hunter of Lokath. But more importantly, who are you and what brings you to this godforsaken land?",
    options: [
      {
        text: "My name is <span style='color: #FF69AF;'>Gorachan</span>.",
        next: "i am gorachan",
        expire: true,
      },
    ],
  },
  "in the depth": {
    text: "We are in the depth of Malchron, the lair of the <span style='color: red;'>Demon Lord Shedim Zer'il, the Shadow of Eternal Fire.</span>",
    options: [{ text: "Who are you?", next: "i am Baldow" }],
  },
  "i am gorachan": {
    text: "My name is <span style='color: #FF69AF;'>Gorachan</span>. I was on a cruise ship to Florida for my vacation but now I am here. Seems like I got teleported into a badly written text adventure. I guess this is my vacation now.",
    options: [
      { text: "Continue", next: "i am gorachan - baldow answers" },
      { text: "Where are we?", next: "in the depth" },
    ],
  },
  "i am gorachan - baldow answers": {
    text: "So it appears... Anyway, you must help me <span style='color: red;'>slay this evil fiend.</span>",
    options: [
      { text: "What evil fiend?", next: "explain evil fiend" },
      { text: "Where are we?", next: "in the depth" },
    ],
  },
  "explain evil fiend": {
    text: "The <span style='color: red;'>Demon Lord Shedim Zer'il, the Shadow of Eternal Fire.</span> It has been terrorizing our realm for centuries now. And <b><i>I</i></b> will finally end its tyranny!",
    options: [
      { text: "I will help you on your quest.", next: "receive sword" },
      { text: "Let me join you.", next: "receive sword" },
    ],
  },
  "receive sword": {
    text: "Such valor! Here, take this. Its name is <span style='color: green;'>Arel Dastot Shithath, the Greatsword of The Flood of Perish</span>. It has been a long companion of my dear friend. Alas, now I am on my own and seek your help.",
    options: [
      {
        text: "Then let us <span style='color: green;'>venture forth</span>.",
        next: "venture forth",
      },
    ],
  },
  "venture forth": {
    text: "As you wander along the desolate canyon, you hear the sound of stones and dirt falling down.",
    options: [
      {
        text: "It's probably nothing.",
        next: "an ambush",
        onConfirm: (serviceLocator) => {
          serviceLocator.audio.playBgm("Battle.mp3");
          serviceLocator.screenShake.shake("hard");
        },
      },
      {
        text: "Investigate.",
        next: "investigate",
        onConfirm: (serviceLocator) => {
          serviceLocator.audio.playBgm("Battle.mp3");
          serviceLocator.screenShake.shake("slow");
        },
      },
      {
        text: "Draw your sword.",
        next: "draw your sword",
        onConfirm: (serviceLocator) => {
          serviceLocator.audio.playBgm("Battle.mp3");
          serviceLocator.screenShake.shake("little");
        },
      },
    ],
  },
  "an ambush": {
    text: "In your thoughtless ignorance, an arrow strikes your left flank. Dark red is the blood that streams from your waist down your leg. And so, darkness engulfes you.",
    options: [
      { text: "This is not the end!", next: "not the end" },
      { text: "Alas, your story ends here.", next: "init" },
    ],
  },
  "not the end": {
    text: "Oh yes it absolutely is.",
    options: [{ text: "Okay... Play again.", next: "init" }],
  },
  investigate: {
    text: "As you head towards the direction from where the sound came, a creature heads towards you. While in humanoid form, it has dark scales composed of mud and it squirms and fidgets. Now you will know why you fear the night.",
    options: [
      {
        text: "Draw your sword and hold the position.",
        next: "monster on floor",
        onConfirm: (services) => {
          services.screenShake.shake("slow");
        },
      },
      {
        text: "Draw your sword and dash towards the creature.",
        next: "monster on floor",
        onConfirm: (services) => {
          services.screenShake.shake("hard");
        },
      },
    ],
  },
  "draw your sword": {
    text: "A moment of silence. But only few seconds later you see a creature heading towards you. While in humanoid form, it has dark scales composed of mud and it squirms and fidgets. Now you will know why you fear the night.",
    options: [
      {
        text: "Hold the position.",
        next: "monster on floor",
        onConfirm: (services) => {
          services.screenShake.shake("slow");
        },
      },
      {
        text: "Dash towards the creature.",
        next: "monster on floor",
        onConfirm: (services) => {
          services.screenShake.shake("horizontal");
        },
      },
    ],
  },
  "monster on floor": {
    text: "The monster tumbles and falls on the rocky ground. This is your chance! Thrust your sword into the monsters trunk?",
    options: [
      {
        text: "Just the Tip",
        next: "just the tip",
        onConfirm: (services) => {
          services.screenShake.shake("little");
        },
      },
      {
        text: "FOR JUSTICE!",
        next: "for justice",
        onConfirm: (services) => {
          services.screenShake.shake("crazy");
        },
      },
    ],
  },
  "just the tip": {
    text: "The monster squeaks and struggles as your sword's tip penetrates its backside. After a few more desperate attempts to free itself, silence embraces you. The creatures has perished.",
    options: [end_of_game],
  },
  "for justice": {
    text: "Blood splashes as you thrust your sword into the flesh. Your fiend has been struck down and silence embraces you. The creature has perished.",
    options: [end_of_game],
  },
} satisfies Record<string, PageData>;
