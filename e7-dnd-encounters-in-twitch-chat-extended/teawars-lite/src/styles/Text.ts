import { GameObjects } from "phaser";
import { Color } from "./Color";

type Style = Partial<GameObjects.TextStyle>;

export const TextConfig: { [key: string]: Style } = {
    title: {
        fontFamily: "Baloo",
        fontSize: "10rem",
        color: Color.WhiteSilver,
    },
    gameOverTitle: {
        fontFamily: "Baloo",
        fontSize: "10rem",
        color: Color.Orange,
    },
    buttonSm: {
        fontFamily: "Baloo",
        fontSize: "7rem",
        color: Color.WhiteSilver,
    },
    version: {
        fontFamily: "Baloo",
        color: Color.WhiteSilver,
        fontSize: "2rem",
    },
    xl: {
        fontFamily: "Baloo",
        fontSize: "118px",
        color: Color.WhiteSilver,
    },
    lg: {
        fontFamily: "Baloo",
        fontSize: "20px",
        color: Color.WhiteSilver,
    },
    md: {
        fontFamily: "Baloo",
        fontSize: "16px",
        color: Color.WhiteSilver,
    },
    sm: {
        fontFamily: "Baloo",
        fontSize: "12px",
        color: Color.WhiteSilver,
    },
    debug: {
        fontFamily: "Courier",
        fontSize: "12px",
        color: Color.HackerGreen,
    },
};

export const setDefaultTextStyle = (text: GameObjects.Text) =>
    text.setStyle(TextConfig.lg).setColor(Color.White);
