import { GameObjects } from "phaser";

export const setTextShadow = (text: GameObjects.Text, color = "#ffffffa0") => {
    text.setStroke(text.style.color, 1.3);
    text.setAlpha(0.7);
    text.setShadow(0, 0, color, 6, true, true);
};
