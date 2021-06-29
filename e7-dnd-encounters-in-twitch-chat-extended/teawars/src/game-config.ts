import { Types } from "phaser";
import { LoadingScene } from "./scenes/LoadingScene";

export const gameConfig: Types.Core.GameConfig = {
    scene: LoadingScene,
    type: Phaser.AUTO,
    dom: {
        createContainer: true,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 100 },
        },
    },
    scale: {
        parent: "game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio,
    },
};
