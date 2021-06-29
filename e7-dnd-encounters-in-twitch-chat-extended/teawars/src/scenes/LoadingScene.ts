import { GameObjects, Scene } from "phaser";
import { DEV } from "../dev-config";
import { GRegistry } from "../gRegistry";
import { translations } from "../localizations";
import { Color, toHex } from "../styles/Color";
import { setDefaultTextStyle, TextConfig } from "../styles/Text";
import { GameOverScene } from "./GameOverScene";
import { MainScene } from "./MainScene";
import { Scenes } from "./Scenes";
import { TitleScene } from "./TitleScene";

export class LoadingScene extends Scene {
    private halfWidth!: number;
    private halfHeight!: number;

    constructor() {
        super({ key: Scenes.Loading });
    }

    public preload() {
        this.halfWidth = this.scale.width / 2;
        this.halfHeight = this.scale.height / 2;

        this.preloadAssets();
        this.addTitles();
        this.makeLoadingBar();
    }

    private preloadAssets() {
        const img = (filename: string) => `./assets/images/${filename}`;
        const sound = (filename: string) => `./assets/sounds/${filename}`;
        this.load
            .image("button-sm", img("button-sm.png"))
            .image("ui-field", img("ui-field.png"))
            .image("ui-window", img("ui-window.png"))
            .image("bg", img("space_rt.png"))
            .image("star", img("star.png"))
            .image("thermometer", img("thermometer.png"))
            .image("sun", img("sun_shiny.png"))
            .audio("hot", sound("rise01.mp3"))
            .audio("too-hot", sound("rise02.mp3"))
            .audio("boiling", sound("boiling.mp3"))
            .audio("coin", sound("sfx_coin_double1.wav"));
    }

    private makeLoadingBar() {
        const loadingText = this.make.text({
            x: this.halfWidth,
            y: this.halfHeight - 50,
            text: translations.loading,
            style: {
                font: "30px Baloo",
            },
        });
        loadingText.setOrigin(0.5);

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(toHex(Color.DarkGrey), 0.8);
        progressBox.fillRect(
            this.halfWidth - 320 / 2,
            this.halfHeight,
            320,
            50
        );

        const assetText = this.make.text({
            x: this.halfWidth,
            y: this.halfHeight + 65,
            text: "",
            style: {
                font: "18px Baloo",
            },
        });
        assetText.setOrigin(0.5);

        this.load.on("progress", this.getProgressBarFiller(progressBar));
        this.load.on("fileprogress", this.getAssetTextWriter(assetText));
        this.load.on("complete", () => {
            if (DEV.startInGameOverScene) {
                GRegistry.setScore(this, 13650);
                this.scene.add(Scenes.GameOver, GameOverScene, true);
            } else if (DEV.skipTitle) {
                this.scene.add(Scenes.Main, MainScene, true);
            } else {
                this.scene.add(Scenes.Title, TitleScene, true);
            }
            this.scene.remove(this);
        });
    }

    private getAssetTextWriter(
        assetText: GameObjects.Text
    ): (file: { key: string }) => void {
        return (file: { key: string }) => {
            assetText.setText(`${translations.loadingAsset}${file.key}`);
        };
    }

    private getProgressBarFiller(
        progressBar: GameObjects.Graphics
    ): (count: number) => void {
        return (count: number) => {
            progressBar.clear();
            progressBar.fillStyle(toHex(Color.White));
            progressBar.fillRect(
                this.halfWidth + 10 - 320 / 2,
                this.halfHeight + 10,
                300 * count,
                30
            );
        };
    }

    private addTitles() {
        this.add
            .text(
                this.halfWidth,
                this.halfHeight - 200,
                translations.title,
                TextConfig.title
            )
            .setOrigin(0.5);

        const subtitle = this.add
            .text(
                this.halfWidth,
                this.halfHeight - 120,
                translations.loadingSubtitle
            )
            .setOrigin(0.5);
        setDefaultTextStyle(subtitle);
        subtitle.setColor(Color.White);
    }
}
