import type { Types } from "phaser";
import { LoadingScene } from "./scenes/LoadingScene";

const gameConfig: Types.Core.GameConfig = {
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
    pixelArt: true,
    scale: {
        parent: "game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        // OBS browser overlay dimensions
        width: 1440,
        height: 1080,
    },
};

export default gameConfig;
