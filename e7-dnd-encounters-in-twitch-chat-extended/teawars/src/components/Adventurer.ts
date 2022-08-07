import { GUI } from "dat.gui";
import { random, range } from "lodash";
import { GameObjects, Scene } from "phaser";
import { AdventurerName } from "../AdventurerName";
import { IceEffect } from "../anims/IceEffect";
import { animateLevelUp, animateLevelUpText } from "../anims/LevelUp";
import { InternalEvents } from "../events/InternalEvents";
import { AdventurerHealthbar } from "./AdventurerHealthbar";
import { DamageText } from "./DamageText";
import { IPoint } from "./IPoint";

// number of different adventurer images in the spritesheet in a single row
const numOfImages = 22;

// TODO Phaser3 with Aseprite tutorial https://newdocs.phaser.io/docs/3.54.0/focus/Phaser.Loader.LoaderPlugin-aseprite

const AnimCfg: {
    [key: number]: {
        /** textureKey is used for sprites loaded separately (via Aseprite) from the large adventurer png file.
         * TODO switch to phaser@3.60.0 once released we use a beta version because of a bug with Aseprite and custom animation frame durations.
         * see https://github.com/photonstorm/phaser/discussions/5990#:~:text=Animation.createFromAseprite%20would%20calculate%20an%20incorrect%20frame%20duration%20if%20the%20frames%20didn%27t%20all%20have%20the%20same%20speed
         */
        textureKey?: string;
        idle?: { repeat?: number; frames?: number[]; frameRate?: number };
        attack?: {
            repeat?: number;
            frames?: number[];
            frameRate?: number;
            hideSlice?: boolean;
            /** how long the adventurer will stay at the monster before jumping back */
            holdDuration?: number;
            /** how long to wait before screenshake + attack sound as a duration diff from when the adventurer stands in front of the monster */
            impactDelay?: number;
        };
        run?: { repeat?: number; frames?: number[]; frameRate?: number };
    };
} = {
    0: {
        idle: {
            frames: [0, 0 + numOfImages],
            frameRate: 0.5,
        },
    },
    1: {
        textureKey: "adventurer-kendoka",
        idle: {
            repeat: -1,
        },
        attack: {
            hideSlice: true,
            holdDuration: 1200,
            impactDelay: 500,
        },
    },
    3: {
        textureKey: "adventurer-red-onehanded",
        idle: {
            repeat: -1,
        },
        attack: {
            hideSlice: true,
            impactDelay: 300,
        },
    },
    7: {
        idle: {
            frames: [7, 7 + numOfImages],
            frameRate: 0.5,
        },
    },
    12: {
        idle: {
            frames: [12, 12 + numOfImages],
            frameRate: 1,
        },
    },
    14: {
        idle: {
            frames: [14, 14 + numOfImages],
            frameRate: 0.8,
        },
        attack: {
            frames: [14],
        },
    },
    21: {
        idle: {
            frames: [21, 21 + numOfImages],
            frameRate: 1,
        },
        attack: {
            frames: [21],
        },
    },
};
type AnimCfg = typeof AnimCfg;

export class Adventurer extends GameObjects.Sprite {
    static createAdventurerAnims(scene: Scene) {
        const genFrames = (frames: number[]) =>
            scene.anims.generateFrameNumbers("adventurers", {
                frames,
            });

        range(numOfImages).forEach((index) => {
            const cfg = (AnimCfg[index] ?? {}) as Partial<AnimCfg[number]>;
            // idle
            scene.anims.create({
                key: `idle-${index}`,
                frames: genFrames(cfg.idle?.frames ?? [index]),
                repeat: -1,
                frameRate: cfg.idle?.frameRate ?? 1,
                showOnStart: true,
                yoyo: false,
            });
            scene.anims.create({
                key: `attack-${index}`,
                frames: genFrames(cfg.attack?.frames ?? [index]),
                repeat: 0,
                frameRate: cfg.attack?.frameRate ?? 1,
            });
            scene.anims.create({
                key: `run-${index}`,
                frames: genFrames(cfg.run?.frames ?? [index]),
                repeat: -1,
                frameRate: cfg.run?.frameRate ?? 1,
            });
        });
    }

    private healthbar: AdventurerHealthbar;
    private nameLabel: GameObjects.Text;
    private iceEffect?: IceEffect;

    private get isDead() {
        return this.hp < 0;
    }

    constructor(
        scene: Scene,
        public readonly username: string,
        private hp: number,
        maxHp: number,
        gui: GUI,
        private imageIndex: number = random(numOfImages - 1)
    ) {
        super(scene, 0, 0, AnimCfg[imageIndex]?.textureKey ?? "adventurers");
        scene.add.existing(this);

        this.setRandomPosition(
            150,
            400,
            scene.scale.width / 2 - 50,
            scene.scale.height * (2 / 5)
        ).setScale(4.5);
        this.setDepth(this.y);

        if (this.isDead) {
            this.die();
        }

        this.healthbar = new AdventurerHealthbar(scene, hp, maxHp, this);
        this.nameLabel = new AdventurerName(scene, username, this);

        const customTextureKey = AnimCfg[imageIndex]?.textureKey;
        if (customTextureKey) {
            scene.anims.createFromAseprite(
                customTextureKey,
                undefined,
                this // creates animation names for only this sprite https://github.com/photonstorm/phaser/commit/8a38f04ef233cab163d2d80d3bb458233198c5d4
            );
        }
        this.play("idle");

        this.join();

        this.setupDevMode(gui);
    }

    public play(key: "idle" | "attack" | "run") {
        const currentCfg = AnimCfg[this.imageIndex];
        if (currentCfg.textureKey) {
            const repeat = currentCfg ? currentCfg[key]?.repeat : 0;
            return super.play({ key, repeat });
        }
        return super.play(`${key}-${this.imageIndex}`);
    }

    private setupDevMode(gui: GUI) {
        const folder = gui.addFolder(this.username);
        folder.add(this, "debugAttack").name("attack");
        folder.add(this, "debugReceiveDamage").name("receive Damage");
        folder.add(this, "die");
        folder.add(this, "castHeal").name("cast Heal");
        folder.add(this, "debugReceiveHeal").name("receive Heal");
        folder.add(this, "receiveProtectCast").name("receive Protect");
        folder.add(this, "animateSlice").name("slice");
        folder.add(this, "debugCastFire").name("cast Fire");
        folder.add(this, "debugCastIce").name("cast Ice");
        folder.add(this, "debugCastLightning").name("cast Lightning");
        folder.add(this, "debugLevelUp").name("level up");
        folder.open();
    }

    private join() {
        const x = this.x;
        this.x = -100;
        this.scene.sound.play("footsteps", {
            volume: 1,
        });
        // NOTE: this tween causes a weird warp jump if a user joins and immediately attacks.
        // That's because the attack anim will be played but this tween is still running (with separate x position)
        this.scene.tweens.add({
            targets: this,
            x,
            duration: 2100,
            ease: "Expo.easeOut",
        });
    }

    public attack(target: { x: number; y: number }, jumpDuration: number) {
        const { path, curve } = this.addAttackCurve(target);
        const setPlayerToCurvePosition = () => {
            const newPos = curve.getPoint(path.t, path.vec);
            this.x = newPos.x;
            this.y = newPos.y;
        };
        const maxT = 0.8;
        this.scene.tweens.add({
            targets: path,
            t: maxT,
            ease: "Sine.easeInOut",
            duration: jumpDuration,
            yoyo: true,
            hold: AnimCfg[this.imageIndex]?.attack?.holdDuration ?? 800,
            onUpdate: () => {
                setPlayerToCurvePosition();
                if (path.t === maxT) {
                    if (!AnimCfg[this.imageIndex]?.attack?.hideSlice) {
                        this.animateSlice();
                    }
                    this.scene.time.delayedCall(
                        AnimCfg[this.imageIndex]?.attack?.impactDelay ?? 250,
                        () => {
                            this.scene.cameras.main.shake(100, 0.01, true);
                            this.playAttackSound();
                        }
                    );
                    this.play("attack");
                }
            },
            onStart: () => this.play("run"),
            onComplete: () => this.play("idle"),
        });
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

    private animateSlice() {
        const screenHeight = this.scene.scale.height;
        const currentX = this.x;
        const currentY = this.y;
        const slice = this.scene.add
            .image(currentX + 120, currentY, "shapes", "slash_03")
            .setScale(3)
            .setRotation(Phaser.Math.TAU / 2)
            .setDepth(9000);
        const shape = this.scene.make.graphics({});
        shape.fillRect(0, -screenHeight, screenHeight * 2, screenHeight);
        const mask = shape.createGeometryMask();
        slice.setMask(mask);

        const timeline = this.scene.tweens.timeline();
        timeline.add({
            targets: shape,
            y: 0,
            duration: 250,
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

    private playAttackSound() {
        const zeroOrOne = random(1);
        this.scene.sound.play(`sword${zeroOrOne}`, {
            volume: 0.5,
        });
    }

    public update() {
        this.nameLabel.update();
        this.healthbar.update();
        this.iceEffect?.update();
    }

    public castHeal() {
        // ignore: might look weird if somebody heals themselves.
        // Reason: eventually disallow healing yourself
        this.scene.tweens.add({
            targets: this,
            x: this.x + 80,
            duration: 200,
            ease: "Sine.easeInOut",
            yoyo: true,
            hold: 1000,
        });
    }

    // TODO add backend commands bolt lightning blitz thunder
    public castLightning(target: IPoint) {
        const sfx = this.scene.sound.add("lightning", {
            volume: 0.2,
            loop: true,
        });
        sfx.play();

        const angle = Phaser.Math.Angle.Between(
            this.x,
            this.y,
            target.x,
            target.y
        );
        const lightning = this.scene.add
            .sprite(this.x + 50, this.y, "lightning")
            .setOrigin(0, 0.5)
            .setDepth(99999)
            .setRotation(angle);
        const diffX = target.x - this.x;
        const curb = 0.95; // we want to target slightly before the center of the monster
        const scaleX = (diffX / (256 / 4)) * curb;
        lightning.setScale(scaleX, 3);
        lightning.play("lightningAnim");

        this.scene.time.delayedCall(1000, () => {
            sfx.stop();
            lightning.destroy();
        });
    }

    public receiveHeal(currentHp: number, amountHealed: number) {
        this.scene.sound.play("heal", { volume: 0.5 });
        this.healthbar.receiveHeal(currentHp);

        const emitter = this.scene.add.particles(
            "shapes",
            // eslint-disable-next-line @typescript-eslint/no-implied-eval
            new Function(
                `return ${this.scene.cache.text.get("heal-effect") as string}`
            )()
        );
        emitter.setX(this.x);
        emitter.setY(this.y);
        emitter.setDepth(this.depth + 1);

        new DamageText(this.scene, this, -amountHealed);
        this.scene.time.delayedCall(2000, () => emitter.destroy());
    }

    public receiveProtectCast() {
        this.scene.sound.play("protect", { volume: 0.5 });

        const emitter = this.scene.add.particles(
            "shapes",
            // eslint-disable-next-line @typescript-eslint/no-implied-eval
            new Function(
                `return ${this.scene.cache.text.get("heal-effect") as string}`
            )()
        );
        emitter.setX(this.x);
        emitter.setY(this.y);
        emitter.setDepth(this.depth + 1);

        this.scene.time.delayedCall(2000, () => emitter.destroy());
    }

    public castFire({ x, y }: IPoint) {
        const emitFire = () => {
            this.scene.sound.play("fire", { volume: 0.3, rate: 1.2 });
            const emitter = this.scene.add.particles(
                "shapes",
                // eslint-disable-next-line @typescript-eslint/no-implied-eval
                new Function(
                    `return ${
                        this.scene.cache.text.get("fire-magic-effect") as string
                    }`
                )()
            );
            emitter.setX(x);
            emitter.setY(y);
            emitter.setDepth(99999);

            // new DamageText(this.scene, this, -amountHealed);
            this.scene.time.delayedCall(200, () =>
                emitter.emitters.getAll().forEach((e) => e.stop())
            );
        };

        const stepAnimDuration = 200;
        this.scene.tweens.add({
            targets: this,
            x: this.x + 80,
            duration: stepAnimDuration,
            ease: "Sine.easeInOut",
            yoyo: true,
            hold: 1000,
        });
        this.scene.time.delayedCall(stepAnimDuration + 300, emitFire);
    }

    public castIce({ x, y }: IPoint) {
        this.iceEffect = new IceEffect(this.scene, x, y);
    }

    public receiveDamage(amount: number) {
        this.healthbar.takeDamage(amount);

        new DamageText(this.scene, this, amount);

        const red = 0xff0000;
        this.setTint(red);
        this.scene.cameras.main.flash(100, 128, 0, 0);
        this.scene.time.delayedCall(300, () => this.clearTint());

        if (this.isDead) {
            this.die();
        }
    }

    public die() {
        this.scene.tweens.add({
            targets: this,
            rotation: -Phaser.Math.PI2 / 4,
            duration: 150,
        });
    }

    public levelUp(newLevel: number, duration: number) {
        const onComplete = () => {
            this.scene.events.emit(
                InternalEvents.BattleEndEventHandlerFinished
            );
        };

        const { x, y } = this.getBottomCenter();
        animateLevelUp(this.scene, x, y, duration);
        animateLevelUpText(
            this.scene,
            this.username,
            newLevel,
            duration,
            onComplete
        );
        this.scene.time.delayedCall(100, () =>
            this.scene.sound.play("level-up", {
                volume: 0.8,
            })
        );
    }

    private debugAttack() {
        this.attack({ x: 1000, y: this.scene.scale.height / 2 }, 1000);
    }

    private debugReceiveDamage() {
        this.receiveDamage(20);
    }

    private debugReceiveHeal() {
        this.receiveHeal(130, 14);
    }

    private debugCastFire() {
        this.castFire({ x: 1100, y: 750 });
    }

    private debugCastIce() {
        this.castIce({ x: 1100, y: 600 });
    }

    private debugLevelUp() {
        this.levelUp(99, 5000);
    }

    private debugCastLightning() {
        this.castLightning({ x: 1100, y: 600 });
    }
}
