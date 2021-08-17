import { GameObjects } from "phaser";
import { Color } from "./Color";

export const setTextShadow = (text: GameObjects.Text, color = Color.Black) => {
    text.setStroke(text.style.color, 1.3);
    text.setShadow(2, 2, color, 2, true, true);
};
