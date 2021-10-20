import { Scene } from "phaser";

export class GRegistry {
    public static getScore(scene: Scene) {
        return scene.registry.get("score") as number;
    }

    public static setScore(scene: Scene, score: number) {
        scene.registry.set("score", score);
    }

    public static clear(scene: Scene) {
        this.setScore(scene, 0);
    }
}
