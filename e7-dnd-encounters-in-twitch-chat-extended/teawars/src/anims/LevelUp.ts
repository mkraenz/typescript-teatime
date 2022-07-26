import { Scene } from "phaser";
import { setTextShadow } from "../styles/setTextShadow";
import { TextConfig } from "../styles/Text";

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
    scene.time.delayedCall(duration, () => arrows.destroy());
};

export const animateLevelUpText = (
    scene: Scene,
    username: string,
    level: number,
    totalDuration: number,
    onComplete: () => void
) => {
    const label = `${username}\nreached level ${level}!`;
    const text = scene.add
        .text(scene.scale.width / 2, scene.scale.height / 3, label, {
            ...TextConfig.xl,
            align: "center",
        })
        .setOrigin(0.5)
        .setDepth(99999)
        .setAlpha(0);
    setTextShadow(text);

    const timeline = scene.tweens.timeline();
    timeline.add({
        targets: text,
        duration: 100,
        alpha: 1,
    });
    timeline.add({
        targets: text,
        duration: totalDuration - 100 * 2,
        alpha: 1,
    });
    timeline.add({
        targets: text,
        duration: 100,
        alpha: 0,
    });
    timeline.play();
    scene.time.delayedCall(totalDuration, () => {
        onComplete();
        text.destroy();
    });
};
