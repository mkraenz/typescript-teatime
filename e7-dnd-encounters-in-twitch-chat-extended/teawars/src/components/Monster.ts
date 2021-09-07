import { GUI } from "dat.gui";
import { startCase } from "lodash";
import { GameObjects, Scene } from "phaser";
import {
    monsterMapping,
    monsterSprites,
} from "../../assets/images/monsters/monsters";
import { Color, toHex } from "../styles/Color";
import { setTextShadow } from "../styles/setTextShadow";
import { DamageText } from "./DamageText";
import { MonsterActivityBar } from "./MonsterActivityBar";
import { MonsterHealthbar } from "./MonsterHealthbar";

const devCfg = { tint: 0x44ffff, clearTint: true, alpha: 1 };

const cfg = {
    initY: -300,
    y: 600,
    dustLandingOffsetY: -20,
};

interface IPoint {
    x: number;
    y: number;
}

export class Monster extends GameObjects.Image {
    private healthbar: MonsterHealthbar;
    private activityBar: MonsterActivityBar;

    constructor(
        scene: Scene,
        { hp, name }: { hp: number; name: string },
        turnInterval: number,
        gui: GUI
    ) {
        super(scene, 1100, cfg.initY, getSpriteKey(name));
        scene.add.existing(this);
        this.name = name;

        this.setDepth(cfg.y);
        const spriteCfg = monsterSprites.find(
            (s) => s.key === this.texture.key
        );
        if (spriteCfg?.flip) {
            this.setFlipX(true);
        }

        const renderProps = monsterMapping.find((cfg) => cfg.name === name);
        if (!renderProps) {
            throw new Error("Monster mapping not found");
        }
        this.setTint(renderProps.tint);
        this.setNormalizedSize(renderProps.scale);
        this.setAlpha(renderProps.alpha);

        this.healthbar = new MonsterHealthbar(scene, hp);
        this.activityBar = new MonsterActivityBar(scene, turnInterval);
        const label = this.scene.add
            .text(scene.scale.width / 2, 84, startCase(name), {
                fontSize: "bold 60px",
                align: "center",
                color: "rgb(255,255,255,0.7)",
            })
            .setOrigin(0.5);
        setTextShadow(label);

        this.ambush();

        this.setupDevMode(gui, name);
    }

    public update(time: number, delta: number) {
        this.activityBar.update(time, delta);
    }

    private setupDevMode(gui: GUI, name: string) {
        const folder = gui.addFolder(`Monster ${name}`);
        folder.addColor(devCfg, "tint");
        folder.add(devCfg, "clearTint");
        folder.add(devCfg, "alpha", 0, 1);
        folder.add(this, "debugReceiveDamage").name("receive Damage");
        folder.add(this, "debugAttack").name("attack");
    }

    private ambush() {
        let landingDustStarted = false;
        const animateLandingDust: Phaser.Types.Tweens.TweenOnUpdateCallback = (
            tween
        ) => {
            if (tween.progress > 0.5 && !landingDustStarted) {
                landingDustStarted = true;
                this.scene.cameras.main.shake(500, 0.02, true);
                const groundshake = this.scene.sound.add("groundshake", {
                    volume: 0.3,
                });
                const scream = this.scene.sound.add("monster-scream", {
                    volume: 0.1,
                });

                const aura = this.scene.add.particles(
                    "shapes",
                    // eslint-disable-next-line @typescript-eslint/no-implied-eval
                    new Function(
                        `return ${
                            this.scene.cache.text.get(
                                "dark-aura-effect"
                            ) as string
                        }`
                    )()
                );
                const { x, y } = this.getCenter();
                aura.setDepth(cfg.y - 1)
                    .setX(x)
                    .setY(y);
                aura.pause();

                groundshake.play();
                groundshake.once("complete", () => {
                    this.scene.cameras.main.shake(2500, 0.02, true);
                    scream.play();
                    aura.resume();
                    this.scene.time.delayedCall(1800, () => {
                        aura.emitters.getAll().forEach((e) => e.stop());
                    });
                });
                scream.once("complete", () => {
                    this.playBgm("battleloop");
                });

                const emitter = this.scene.add.particles(
                    "shapes",
                    // eslint-disable-next-line @typescript-eslint/no-implied-eval
                    new Function(
                        `return ${
                            this.scene.cache.text.get(
                                "dust-landing-effect"
                            ) as string
                        }`
                    )()
                );
                const bottom = this.getBottomCenter();
                emitter.setX(bottom.x);
                emitter.setY(bottom.y + cfg.dustLandingOffsetY);
            }
        };
        this.scene.tweens.add({
            targets: this,
            duration: 1000,
            ease: "Elastic",
            easeParams: [1, 0.8],
            y: cfg.y,
            onUpdate: animateLandingDust,
        });
    }

    private playBgm(key: "fanfare" | "battleloop") {
        const otherKey = key === "fanfare" ? "battleloop" : "fanfare";
        this.scene.sound.stopByKey(otherKey);
        this.scene.sound
            .add(key, {
                loop: true,
                volume: key === "fanfare" ? 0.2 : 0.1,
            })
            .play();
    }

    /** normalizes sprite to fit the greater of height and width to 300px */
    private setNormalizedSize(scale = 1) {
        const normalizedSize = 300 * scale;
        const texture = this.scene.textures.get(this.texture.key);
        const image = texture.getSourceImage();
        const max = Math.max(image.width, image.height);
        const factor = normalizedSize / max;
        this.setScale(factor);
    }

    private addAttackCurve({ x: x2, y: y2 }: { x: number; y: number }) {
        const x = this.x;
        const y = this.y;
        const startPoint = new Phaser.Math.Vector2(x, y);
        const controlPoint1 = new Phaser.Math.Vector2(x, y - 100);
        const controlPoint2 = new Phaser.Math.Vector2(
            x2,
            0.8 * y2 + 0.2 * this.y
        );
        const endPoint = new Phaser.Math.Vector2(x2, y2);

        return {
            path: { t: 0, vec: new Phaser.Math.Vector2() },
            curve: new Phaser.Curves.CubicBezier(
                startPoint,
                controlPoint1,
                controlPoint2,
                endPoint
            ),
        };
    }

    public attack(target: IPoint, jumpDuration: number) {
        const { path, curve } = this.addAttackCurve(target);
        const setToCurvePosition = () => {
            const newPos = curve.getPoint(path.t, path.vec);
            this.x = newPos.x;
            this.y = newPos.y;
        };

        const maxT = 0.7;

        this.scene.tweens.add({
            targets: path,
            t: maxT,
            ease: "Sine.easeInOut",
            duration: jumpDuration,
            yoyo: true,
            hold: 900,
            onUpdate: () => {
                setToCurvePosition();
                if (path.t === maxT) {
                    this.animateSlice(target);
                }
            },
        });
    }

    private animateSlice(target: IPoint) {
        const screenHeight = this.scene.scale.height;
        const slice = this.scene.add
            .image(target.x, target.y, "shapes", "scratch_01")
            .setScale(4)
            .setDepth(9000)
            .setTint(toHex(Color.LightRed));
        const shape = this.scene.make.graphics({});
        shape.fillRect(0, -screenHeight, screenHeight * 2, screenHeight);
        const mask = shape.createGeometryMask();
        slice.setMask(mask);

        const timeline = this.scene.tweens.timeline();
        timeline.add({
            targets: shape,
            y: 0,
            duration: 250,
            onComplete: () => {
                this.scene.sound.play("fleshy-punch", {
                    volume: 0.3,
                });
                this.scene.cameras.main.shake(300, 0.03, true);
            },
        });
        timeline.add({
            targets: shape,
            y: screenHeight,
            duration: 250,
        });
        timeline.add({
            delay: 300,
            targets: shape,
            y: 2000,
            duration: 500,
            onComplete: () => {
                slice.destroy();
                mask.destroy();
                shape.destroy();
            },
        });

        timeline.play();
    }

    public receiveDamage(amount: number) {
        this.healthbar.takeDamage(amount);

        new DamageText(this.scene, this, amount);

        const red = 0xff0000;
        this.setTint(red);
        this.scene.time.delayedCall(300, () => this.clearTint());
    }

    public die() {
        this.setVisible(false);
    }

    public debugAttack() {
        this.attack({ x: 200, y: this.scene.scale.height / 2 + 50 }, 1000);
    }

    public debugReceiveDamage() {
        this.receiveDamage(14);
    }
}

const getSpriteKey = (_name: string) => {
    const mapping = monsterMapping.find(({ name }) => name === _name);
    return mapping && mapping.key ? mapping.key : "greengoo";
};
