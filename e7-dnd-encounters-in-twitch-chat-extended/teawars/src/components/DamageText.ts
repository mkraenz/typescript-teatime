import { GameObjects, Scene } from "phaser";
import { Color } from "../styles/Color";
import { setTextShadow } from "../styles/setTextShadow";

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

        this.setTextColor(damage < 0);
        // this.setDestroyTimeout();
        scene.add.tween({
            targets: [this],
            y: this.y - 200,
            duration: 1500,
            alpha: 0,
            onComplete: () => this.destroy(),
        });
        setTextShadow(this);
    }

    private setTextColor(isHeal: boolean) {
        if (isHeal) {
            this.setColor(Color.LawnGreen);
        } else {
            this.setColor(Color.Red);
        }
    }

    private setDestroyTimeout() {
        this.scene.time.delayedCall(1500, () => this.destroy());
    }
}
