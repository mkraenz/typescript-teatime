import { GameObjects, Scene } from "phaser";

const Cfg = {
    styles: {},
};

export class MonsterActivityBar extends GameObjects.Image {
    private timePassed = 0;
    private enabled = false;
    private emptyBar: GameObjects.Image;

    constructor(scene: Scene, private readonly cooldown: number) {
        super(scene, scene.scale.width / 2, 156, "green-bar");
        scene.add.existing(this);
        this.emptyBar = scene.add.image(
            scene.scale.width / 2,
            156,
            "empty-health-bar"
        );
        this.setVisible(false);
    }

    public update(time: number, delta: number) {
        if (!this.enabled) {
            return;
        }
        this.timePassed += delta;
        const factor = (this.timePassed % this.cooldown) / this.cooldown;
        this.setCrop(0, 0, this.width * factor, this.height);
    }

    public start() {
        this.enabled = true;
    }

    public stop() {
        this.enabled = false;
    }

    public setVisible(value: boolean): this {
        this.emptyBar.setVisible(value);
        super.setVisible(value);
        return this;
    }
}
