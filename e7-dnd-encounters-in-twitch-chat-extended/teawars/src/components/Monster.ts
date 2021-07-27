import { Curves, GameObjects, Math, Scene } from "phaser";
import { DamageText } from "./DamageText";
import { MonsterHealthbar } from "./MonsterHealthbar";

export class Monster extends GameObjects.Image {
    private path?: { t: number; vec: Math.Vector2 };
    private curve?: Curves.CubicBezier;
    private healthbar!: MonsterHealthbar;

    constructor(scene: Scene, { hp }: { hp: number }) {
        super(scene, 1100, 620, "monster");
        scene.add.existing(this);

        // TODO fixed display size only working for sqare images
        this.setDisplaySize(300, 300);

        this.healthbar = new MonsterHealthbar(scene, hp);
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

    public attack(target: GameObjects.Image, jumpDuration: number) {
        const { path, curve } = this.addAttackCurve(target);
        this.path = path;
        this.curve = curve;

        this.scene.tweens.add({
            targets: this.path,
            t: 0.8,
            ease: "Sine.easeInOut",
            duration: jumpDuration,
            yoyo: true,
        });
    }

    public update() {
        // if is attacking
        if (this.curve && this.path) {
            const newPos = this.curve.getPoint(this.path.t, this.path.vec);
            this.x = newPos.x;
            this.y = newPos.y;
        }
    }

    public takeDamage(amount: number) {
        this.healthbar.takeDamage(amount);

        new DamageText(this.scene, this, amount);

        const red = 0xff0000;
        this.setTint(red);
        this.scene.time.delayedCall(300, () => this.clearTint());
    }

    public die() {
        this.setVisible(false);
    }
}
