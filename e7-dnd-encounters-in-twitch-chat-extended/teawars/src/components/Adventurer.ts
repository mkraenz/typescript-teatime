import { random } from "lodash";
import { Curves, GameObjects, Math, Scene } from "phaser";
import { AdventurerName } from "../AdventurerName";
import { AdventurerHealthbar } from "./AdventurerHealthbar";
import { DamageText } from "./DamageText";

export class Adventurer extends GameObjects.Image {
    private path?: { t: number; vec: Math.Vector2 };
    private curve?: Curves.CubicBezier;
    private healthbar: AdventurerHealthbar;
    private nameLabel: GameObjects.Text;

    constructor(
        scene: Scene,
        public readonly username: string,
        hp: number,
        maxHp: number
    ) {
        super(scene, 0, 0, "adventurers");
        scene.add.existing(this);

        this.setRandomPosition(
            200,
            500,
            scene.scale.width / 2 - 200,
            scene.scale.height / 4
        )
            .setScale(4.5)
            .setFrame(random(21));

        this.healthbar = new AdventurerHealthbar(scene, hp, maxHp, this);
        this.nameLabel = new AdventurerName(scene, username, this);
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

        this.nameLabel.update();
        this.healthbar.update();
    }

    public takeDamage(amount: number) {
        this.healthbar.takeDamage(amount);

        new DamageText(this.scene, this, amount);

        const red = 0xff0000;
        this.setTint(red);
        this.scene.time.delayedCall(300, () => this.clearTint());
    }

    public die() {
        this.setRotation(-Phaser.Math.PI2 / 4);
    }

    public debugAttack() {
        this.attack({ x: 1000, y: this.scene.scale.height / 2 }, 1000);
    }

    public debugTakeDamage() {
        this.takeDamage(20);
    }
}
