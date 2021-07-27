import { GameObjects, Scene } from "phaser";

const anywhere = -9999;
const offset = { y: 90 };

export class AdventurerHealthbar extends GameObjects.Image {
    private emptyHealthbar: GameObjects.Image;

    constructor(
        scene: Scene,
        private hp: number,
        public readonly maxHp: number,
        private readonly followedPos: { x: number; y: number }
    ) {
        super(scene, anywhere, anywhere, "red-health-bar");
        scene.add.existing(this);

        this.setScale(1, 0.8);

        this.emptyHealthbar = scene.add
            .image(anywhere, anywhere, "empty-health-bar")
            .setScale(1, 0.8);

        this.cropRedbar(this.hp);
    }

    public takeDamage(damage: number) {
        this.hp -= damage;
        this.cropRedbar(this.hp);
    }

    private cropRedbar(hp: number) {
        const factor = Math.max(hp / this.maxHp, 0);
        this.setCrop(0, 0, this.width * factor, this.height);
    }

    public update() {
        this.x = this.followedPos.x;
        this.y = this.followedPos.y - offset.y;
        this.emptyHealthbar.x = this.x;
        this.emptyHealthbar.y = this.y;
    }
}
