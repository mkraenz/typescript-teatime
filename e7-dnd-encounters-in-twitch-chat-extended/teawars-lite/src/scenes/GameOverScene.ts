import { Scene } from "phaser";
import { BackgroundImage } from "../components/BackgroundImage";
import { translations } from "../localizations";
import { TextConfig } from "../styles/Text";
import { Scenes } from "./Scenes";

const cfg = {
    retry: {
        relY: 0.7,
    },
    window: {
        relY: 0.4,
        scale: 0.6,
    },
    score: {
        relY: 0.47,
        scale: 0.8,
        title: {
            relY: 0.33,
        },
    },
};

export interface IGameOverSceneInitData {
    score: number;
}

export class GameOverScene extends Scene {
    constructor() {
        super(Scenes.GameOver);
    }

    public create() {
        new BackgroundImage(this, "bg");

        const halfWidth = this.scale.width / 2;
        const height = this.scale.height;
        this.add
            .image(halfWidth, this.scale.height * cfg.window.relY, "ui-window")
            .setScale(cfg.window.scale);

        this.add
            .text(
                halfWidth,
                height * cfg.score.title.relY,
                translations.finalScore,
                TextConfig.gameOverTitle
            )
            .setOrigin(0.5);
    }
}
