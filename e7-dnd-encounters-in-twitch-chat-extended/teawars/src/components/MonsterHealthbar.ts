import { GameObjects, Scene } from "phaser";

export class MonsterHealthbar extends GameObjects.Image {
    constructor(
        scene: Scene,
        public readonly maxHealth: number,
        private health = maxHealth
    ) {
        super(scene, scene.scale.width / 2, 100, "red-health-bar");
        scene.add.existing(this);

        this.setScale(6, 4);

        const emptyHealthbar = scene.add
            .image(scene.scale.width / 2, 100, "empty-health-bar")
            .setScale(6, 4);
    }

    public takeDamage(damage: number) {
        this.health -= damage;
        this.setHealth(this.health);
    }

    private setHealth(health: number) {
        const factor = Math.max(health / this.maxHealth, 0);
        this.setCrop(0, 0, this.width * factor, this.height);
    }
}
