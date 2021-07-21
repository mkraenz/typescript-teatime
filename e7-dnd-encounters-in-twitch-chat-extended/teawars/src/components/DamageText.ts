import { GameObjects, Scene } from "phaser";

const Cfg = {
    styles: {
        fontSize: "48px",
    },
};

export class DamageText extends GameObjects.Text {
    constructor(scene: Scene, receiver: GameObjects.Image, damage: number) {
        super(
            scene,
            receiver.x,
            receiver.y - 200,
            damage.toString(),
            Cfg.styles
        );
        scene.add.existing(this);

        this.setDestroyTimeout();
    }

    private setDestroyTimeout() {
        this.scene.time.delayedCall(1500, () => this.destroy());
    }
}
