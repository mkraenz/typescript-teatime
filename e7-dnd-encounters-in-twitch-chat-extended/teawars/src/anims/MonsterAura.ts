import { GameObjects, Scene } from "phaser";

export class MonsterAura {
    private readonly aura: GameObjects.Particles.ParticleEmitterManager;
    constructor(
        private readonly scene: Scene,
        x: number,
        y: number,
        depth: number
    ) {
        this.aura = this.scene.add.particles(
            "shapes",
            // eslint-disable-next-line @typescript-eslint/no-implied-eval
            new Function(
                `return ${
                    this.scene.cache.text.get("dark-aura-effect") as string
                }`
            )()
        );
        this.aura.setDepth(depth).setX(x).setY(y);
        this.aura.pause();
    }

    public stopEmittingNewParticles() {
        this.aura.emitters.getAll().forEach((e) => e.stop());
    }

    /** Do not use the Aura after calling this function. The object state is totally broken. */
    public finalExplodeAuraAnim() {
        this.aura.emitters.getAll().forEach((e) => {
            e.setSpeed(1000);
            e.setLifespan(600);
            e.setQuantity(50);
            e.start();
        });
        this.scene.time.delayedCall(300, () => this.stopEmittingNewParticles());
    }

    public resume() {
        this.aura.resume();
    }
}
