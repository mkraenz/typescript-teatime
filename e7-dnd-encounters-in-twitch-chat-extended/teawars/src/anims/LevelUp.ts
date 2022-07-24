import { Scene } from "phaser";

export const animateLevelUp = (
    scene: Scene,
    x: number,
    y: number,
    duration: number
) => {
    const arrows = scene.add.particles("arrow-up", undefined, {
        gravityY: -500,
        lifespan: 2000,
        x,
        y,
        active: true,
        maxVelocityY: 500,
        timeScale: 1,
        frequency: 60,
        quantity: 2,
        maxParticles: 1000,
        emitZone: {
            quantity: 10,
            source: new Phaser.Geom.Rectangle(-100, -100, 200, 150),
            type: "random",
        },
    });
    // arrows.emitters.getAll().forEach((e) => e.explode(7, x, y));

    scene.time.delayedCall(duration, () => arrows.destroy());
};
