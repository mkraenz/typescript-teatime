import { GameObjects, Scene } from "phaser";

export class Healthbar extends GameObjects.Image {
    public maxHealth: number;

    constructor(scene: Scene, maxHealth: number) {
        super(scene, scene.scale.width / 2, 100, "red-health-bar");
        scene.add.existing(this);

        this.maxHealth = maxHealth;

        this.setScale(6, 4);

        const emptyHealthbar = scene.add
            .image(scene.scale.width / 2, 100, "empty-health-bar")
            .setScale(6, 4);
    }

    public setHealth(health: number) {
        const factor = health / this.maxHealth;
        this.setCrop(0, 0, this.width * factor, this.height);
    }
}
