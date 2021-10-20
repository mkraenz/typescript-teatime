import { GameObjects, Scene } from "phaser";

export class BackgroundImage extends GameObjects.Image {
    constructor(scene: Scene, texture: string) {
        super(scene, 0, 0, texture);
        scene.add.existing(this);
        this.setOrigin(0);
        this.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
    }
}
