import { Scene } from "phaser";
import { translations } from "../../localizations";
import { TextConfig } from "../../styles/Text";
import { Scenes } from "../Scenes";

const cfg = {
    bonusMultiplier: 5,
};

export class ScoreHud extends Scene {
    private score = 0;
    private idealTempOnPreviousCollect = false; // fixes one-off issue when switching from ideal to non-ideal
    private bonus = false;

    public constructor(key = Scenes.Score) {
        super(key);
    }

    public create() {
        const scoreText = this.add
            .text(
                this.scale.width / 2,
                (this.scale.height * 1) / 24,
                this.getScoreText(),
                TextConfig.xl
            )
            .setOrigin(0.5);
        const mainScene = this.scene.get(Scenes.Main);
        // mainScene.events.on(Event.Example, (data: IBlaBlaEvent) => {
        // do stuff
        // });
    }

    private getScoreText() {
        const bonusMultText = this.bonus ? `x${cfg.bonusMultiplier}` : "";
        return `${translations.score}${this.score}${bonusMultText}`;
    }
}
