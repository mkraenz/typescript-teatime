import { Scene } from "phaser";
import { BackgroundImage } from "../components/BackgroundImage";
import { ButtonSm } from "../components/ui/ButtonSm";
import { translations } from "../localizations";
import { Color } from "../styles/Color";
import { TextConfig } from "../styles/Text";
import { MainScene } from "./MainScene";
import { Scenes } from "./Scenes";

const cfg = {
    fadeIn: 200,
    title: {
        relY: 0.4,
    },
    playButton: {
        relY: 0.62,
    },
    copyright: {
        relY: 0.95,
    },
    version: {
        relY: 0.93,
    },
};

export class TitleScene extends Scene {
    public constructor() {
        super({
            key: Scenes.Title,
        });
    }

    public create(): void {
        this.cameras.main.fadeIn(cfg.fadeIn);
        new BackgroundImage(this, "bg");
        this.addTitle();
        this.addPlayButton();
        this.addLegals();
    }

    private addTitle() {
        this.add
            .text(
                this.scale.width / 2,
                this.scale.height * cfg.title.relY,
                translations.title,
                TextConfig.title
            )
            .setOrigin(0.5)
            .setShadow(4, 6, Color.Grey, 2, true, true)
            .setAlpha(1);
    }

    private addPlayButton() {
        const bannerStartHeight = this.scale.height * cfg.playButton.relY;
        new ButtonSm(this, bannerStartHeight, translations.play, () =>
            this.goto(Scenes.Main, MainScene)
        );
    }

    private addLegals() {
        this.add
            .text(
                this.scale.width / 2,
                this.scale.height * cfg.copyright.relY,
                translations.copyright,
                TextConfig.version
            )
            .setOrigin(0.5);
        this.add
            .text(
                this.scale.width / 2,
                this.scale.height * cfg.version.relY,
                translations.version,
                TextConfig.version
            )
            .setOrigin(0.5);
    }

    private goto(key: string, sceneClass: new (name: string) => Scene) {
        this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.add(key, sceneClass, true);
            this.scene.remove(this);
        });
        this.cameras.main.fadeOut(500);
    }
}
