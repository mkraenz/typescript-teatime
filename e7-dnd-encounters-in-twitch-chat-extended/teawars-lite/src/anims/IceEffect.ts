import { GameObjects, Scene, Tweens } from "phaser";

export class IceEffect {
    private group?: GameObjects.Group;
    private tween?: Tweens.Tween;

    constructor(
        scene: Scene,
        private readonly x: number,
        private readonly y: number
    ) {
        const circle = new Phaser.Geom.Circle(x, y, 260);
        this.group = scene.add.group({
            key: "ice-crystal",
            frameQuantity: 5,
            // ts definition error on phaser3 api :(
        } as any);
        this.group.setDepth(9999);
        this.group
            .getChildren()
            .forEach((x) => (x as GameObjects.Image).setScale(1.5));

        Phaser.Actions.PlaceOnCircle(this.group.getChildren(), circle);

        const delay = 1000;
        scene.time.delayedCall(delay, () =>
            scene.sound.play("ice", { volume: 0.3, rate: 1 })
        );
        this.tween = scene.tweens.addCounter({
            from: 260,
            to: 0,
            duration: 1500,
            delay,
            ease: "Sine.easeInOut",
            onComplete: () => {
                this.group?.setVisible(false);
                this.group?.destroy();
                delete this.tween;
            },
        });
    }

    public update() {
        if (this.group && this.tween) {
            Phaser.Actions.RotateAroundDistance(
                this.group.getChildren(),
                { x: this.x, y: this.y },
                0.02,
                this.tween.getValue()
            );
        }
    }
}
