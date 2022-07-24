import { GameObjects } from "phaser";
import { Color } from "./Color";

type Style = Partial<GameObjects.TextStyle>;

export const TextConfig: Record<string, Style> = {
    title: {
        fontFamily: "PressStart2P",
        fontSize: "10rem",
        color: Color.WhiteSilver,
    },
    gameOverTitle: {
        fontFamily: "PressStart2P",
        fontSize: "10rem",
        color: Color.Orange,
    },
    buttonSm: {
        fontFamily: "PressStart2P",
        fontSize: "7rem",
        color: Color.WhiteSilver,
    },
    version: {
        fontFamily: "PressStart2P",
        color: Color.WhiteSilver,
        fontSize: "2rem",
    },
    xl: {
        fontFamily: "PressStart2P",
        fontSize: "60px",
        color: Color.WhiteSilver,
    },
    lg: {
        fontFamily: "PressStart2P",
        fontSize: "20px",
        color: Color.WhiteSilver,
    },
    md: {
        fontFamily: "PressStart2P",
        fontSize: "16px",
        color: Color.WhiteSilver,
    },
    sm: {
        fontFamily: "PressStart2P",
        fontSize: "12px",
        color: Color.WhiteSilver,
    },
    debug: {
        fontFamily: "Courier",
        fontSize: "12px",
        color: Color.HackerGreen,
    },
    monsterHealthBar: {
        fontFamily: "PressStart2P",
        fontSize: "bold 50px",
        align: "center",
        color: "rgb(255,255,255,0.7)",
    },
    adventurerHealthBar: {
        fontFamily: "PressStart2P",
        fontSize: `12px`,
        color: "rgb(255,255,255,0.9)",
    },
};

export const setDefaultTextStyle = (text: GameObjects.Text) =>
    text.setStyle(TextConfig.lg).setColor(Color.White);
