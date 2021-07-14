import { random } from "lodash";
import { Curves, GameObjects, Math, Scene } from "phaser";

export class Adventurer extends GameObjects.Image {
    private path: { t: 0; vec: Math.Vector2 };
    private curve: Curves.CubicBezier;

    constructor(scene: Scene, public readonly username: string) {
        super(scene, 0, 0, "adventurers");
        scene.add.existing(this);

        this.setRandomPosition(
            200,
            500,
            scene.scale.width / 2 - 200,
            scene.scale.height / 4
        )
            .setScale(4.5)
            .setFrame(random(7));

        // TODO next stream: use this to jump on attack
        const x = this.x;
        const y = this.y;
        const startPoint = new Phaser.Math.Vector2(x, y);
        const controlPoint1 = new Phaser.Math.Vector2(x, y - 100);
        const controlPoint2 = new Phaser.Math.Vector2(
            1000,
            0.8 * 620 + 0.2 * this.y
        );
        const endPoint = new Phaser.Math.Vector2(1100, 620); // TODO extract monster class

        this.path = { t: 0, vec: new Phaser.Math.Vector2() };
        this.curve = new Phaser.Curves.CubicBezier(
            startPoint,
            controlPoint1,
            controlPoint2,
            endPoint
        );

        scene.tweens.add({
            targets: this.path,
            t: 0.8,
            ease: "Sine.easeInOut",
            duration: 1000,
            yoyo: true,
            repeat: -1,
        });
    }

    public update() {
        const newPos = this.curve.getPoint(this.path.t, this.path.vec);
        this.x = newPos.x;
        this.y = newPos.y;
    }
}
