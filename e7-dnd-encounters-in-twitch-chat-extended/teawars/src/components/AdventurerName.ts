import { GameObjects, Scene } from "phaser";
import { setTextShadow } from "../styles/setTextShadow";
import { TextConfig } from "../styles/Text";

const Cfg = {
    yOffset: 114,
};
const anywhere = -9999;

export class AdventurerName extends GameObjects.Text {
    constructor(
        scene: Scene,
        name: string,
        public readonly followed: { x: number; y: number }
    ) {
        super(scene, anywhere, anywhere, name, TextConfig.adventurerHealthBar);
        scene.add.existing(this);

        this.setOrigin(0.5);
        this.setDepth(followed.y);
        setTextShadow(this);
    }

    public update() {
        this.x = this.followed.x;
        this.y = this.followed.y - Cfg.yOffset;
    }
}
