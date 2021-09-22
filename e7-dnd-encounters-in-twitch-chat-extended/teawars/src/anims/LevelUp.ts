import { Scene } from "phaser";

export const animateLevelUp = (scene: Scene, x: number, y: number) => {
    const arrows = scene.add.particles("arrow-up", undefined, {
        gravityY: -500,
        lifespan: 1000,
        x,
        y,
        active: true,
        maxVelocityY: 500,
        timeScale: 1,
        frequency: -1,
        quantity: 8,
        emitZone: {
            quantity: 10,
            source: new Phaser.Geom.Rectangle(-50, -100, 100, 150),
            type: "random",
        },
    });
    arrows.emitters.getAll().forEach((e) => e.explode(7, x, y));

    scene.time.delayedCall(3000, () => arrows.destroy());
};
