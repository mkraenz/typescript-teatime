import { random } from "lodash";
import { GameObjects, Scene } from "phaser";
import {
    monsterMapping,
    monsterSprites,
} from "../../assets/images/monsters/monsters";
import { DEV } from "../dev-config";
import { monsters } from "../domain/monsters";
import { translations } from "../localizations";
import { Color, toHex } from "../styles/Color";
import { setDefaultTextStyle, TextConfig } from "../styles/Text";
import { GameOverScene } from "./GameOverScene";
import { LogicScene } from "./LogicScene";
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
            .audio("battleloop", sound("8BitBattleLoop.ogg"))
            .audio("ice", sound("freeze.mp3"))
            .audio("level-up", sound("level-up.mp3"));
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
                this.scene.add(Scenes.GameOver, GameOverScene, true);
            } else {
                const seed = {
                    monsterIndex: random(monsters.length - 1),
                    backgroundTextureIndex: random(1, 10),
                };

                const monster = monsters[seed.monsterIndex];
                const mappedMonster = monsterMapping.find(
                    (map) => map.name === monster.name
                );
                const monsterSprite = monsterSprites.find(
                    (sprite) => sprite.key === mappedMonster?.key
                );

                this.scene.add(Scenes.Logic, LogicScene, true, {
                    monsterIndex: seed.monsterIndex,
                });
                this.scene.add(Scenes.Main, MainScene, true, {
                    backgroundTextureIndex: seed.backgroundTextureIndex,
                    monsterSprite,
                });
            }
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
