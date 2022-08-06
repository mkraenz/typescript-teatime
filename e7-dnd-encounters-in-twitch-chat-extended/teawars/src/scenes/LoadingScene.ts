import { range } from "lodash";
import { GameObjects, Scene } from "phaser";
import { monsterSprites } from "../../assets/images/monsters/monsters";
import { DEV } from "../dev-config";
import { GRegistry } from "../gRegistry";
import { translations } from "../localizations";
import { Color, toHex } from "../styles/Color";
import { setDefaultTextStyle, TextConfig } from "../styles/Text";
import { GameOverScene } from "./GameOverScene";
import { MainScene } from "./MainScene";
import { Scenes } from "./Scenes";

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
        const monsterImg = (filename: string) => img(`monsters/${filename}`);
        const sound = (filename: string) => `./assets/sounds/${filename}`;
        range(1, 11).forEach((i) =>
            this.load.image(`bg${i}`, img(`bg/battleback${i}.png`))
        );
        this.load
            .image("empty-health-bar", img("empty-health-bar.png"))
            .image("red-health-bar", img("red-health-bar.png"))
            .image("green-bar", img("green-bar.png"))
            .image("arrow-up", img("animation_1-8.png"))
            .image("ice-crystal", img("ice-crystal.png"))
            .spritesheet(
                "adventurers",
                img("adventurers/adventurers.sprite.32x32.png"),
                {
                    frameWidth: 32,
                    frameHeight: 32,
                }
            )
            .spritesheet("lightning", img("lightning.sprite.png"), {
                frameWidth: 256 / 4,
                frameHeight: 512 / 8,
            })
            .atlas(
                "shapes",
                "assets/particles/shapes.png",
                "assets/particles/shapes.json"
            )
            .text("heal-effect", "assets/particles/heal.json")
            .text("dark-aura-effect", "assets/particles/darkaura.json")
            .text("dust-landing-effect", "assets/particles/dust.json")
            .text("fire-magic-effect", "assets/particles/fire-magic.json")
            .audio("fanfare", sound("teawars-fanfare.mp3"))
            .audio("sword0", sound("sword-1b.mp3"))
            .audio("sword1", sound("sword-1a.mp3"))
            .audio("footsteps", sound("Footstep_Dirt_00-repeat.mp3"))
            .audio("groundshake", sound("deathflash.mp3"))
            .audio("fleshy-punch", sound("gun-1a.mp3"))
            .audio("heal", sound("magical_5.ogg"))
            .audio("fire", sound("Fire.mp3"))
            .audio("monster-scream", sound("scream_horror1.mp3"))
            .audio("battleloop", sound("8BitBattleLoop.mp3"))
            .audio("ice", sound("freeze.mp3"))
            .audio("protect", sound("level-up.mp3"))
            .audio("lightning", sound("electricity.mp3"))
            .audio("level-up", sound("snare.mp3"));
        monsterSprites.forEach((sprite) => {
            this.load.image(sprite.key, monsterImg(sprite.path));
        });
    }

    private makeLoadingBar() {
        const loadingText = this.make.text({
            x: this.halfWidth,
            y: this.halfHeight - 50,
            text: translations.loading,
            style: {
                font: "30px PressStart2P",
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
                font: "18px PressStart2P",
            },
        });
        assetText.setOrigin(0.5);

        this.load.on("progress", this.getProgressBarFiller(progressBar));
        this.load.on("fileprogress", this.getAssetTextWriter(assetText));
        this.load.on("complete", () => {
            if (DEV.startInGameOverScene) {
                GRegistry.setScore(this, 13650);
                this.scene.add(Scenes.GameOver, GameOverScene, true);
            } else {
                this.scene.add(Scenes.Main, MainScene, true);
            }
            // this.scene.remove(this);
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
