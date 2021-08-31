import { GUI } from "dat.gui";
import { startCase } from "lodash";
import { GameObjects, Scene } from "phaser";
import {
    monsterMapping,
    monsterSprites,
} from "../../assets/images/monsters/monsters";
import { setTextShadow } from "../styles/setTextShadow";
import { DamageText } from "./DamageText";
import { MonsterHealthbar } from "./MonsterHealthbar";

const devCfg = { tint: 0x44ffff, clearTint: true, alpha: 1 };

const cfg = {
    initY: -300,
    y: 600,
    dustLandingOffsetY: -20,
};

export class Monster extends GameObjects.Image {
    private healthbar!: MonsterHealthbar;

    constructor(
        scene: Scene,
        { hp, name }: { hp: number; name: string },
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

    public attack(target: { x: number; y: number }, jumpDuration: number) {
        const { path, curve } = this.addAttackCurve(target);
        const setToCurvePosition = () => {
            const newPos = curve.getPoint(path.t, path.vec);
            this.x = newPos.x;
            this.y = newPos.y;
        };

        this.scene.tweens.add({
            targets: path,
            t: 0.7,
            ease: "Sine.easeInOut",
            duration: jumpDuration,
            yoyo: true,
            onUpdate: setToCurvePosition,
            onYoyo: () => this.scene.cameras.main.shake(500, 0.02, true),
        });
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
