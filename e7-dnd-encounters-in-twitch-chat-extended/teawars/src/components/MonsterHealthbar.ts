import { GameObjects, Scene } from "phaser";

export class MonsterHealthbar extends GameObjects.Image {
    private emptyHealthbar: GameObjects.Image;

    constructor(
        scene: Scene,
        public readonly maxHealth: number,
        private health = maxHealth
    ) {
        super(scene, scene.scale.width / 2, 100, "red-health-bar");
        scene.add.existing(this);

        this.setScale(6, 4);

        this.emptyHealthbar = scene.add
            .image(scene.scale.width / 2, 100, "empty-health-bar")
            .setScale(6, 4);

        this.setVisible(false);
    }

    public takeDamage(damage: number) {
        this.health -= damage;
        this.setHealth(this.health);
    }

    private setHealth(health: number) {
        const factor = Math.max(health / this.maxHealth, 0);
        this.setCrop(0, 0, this.width * factor, this.height);
    }

    public setVisible(value: boolean): this {
        this.emptyHealthbar.setVisible(value);
        super.setVisible(value);
        return this;
    }
}
