import { GameObjects, Scene } from "phaser";

enum State {
    pointerover,
    pointerout,
}

const MsPerSec = 1000;

/** NOTE: The target's scale must be set before initializing the plugin. */
export class GrowShrinkAnimPlugin extends GameObjects.GameObject {
    public state = State.pointerout;
    private baseScale: number;
    private maxScale: number;
    private enabled = true;
    private speed = 2.3;
    private debug = false;

    constructor(
        scene: Scene,
        private target: GameObjects.Image | GameObjects.Text,
        cfg?: {
            maxRelativeScale?: number;
            speed?: number;
            debug?: boolean;
            parent?: GameObjects.Image;
        }
    ) {
        super(scene, "GrowShrinkAnimPlugin");
        scene.add.existing(this);
        const maxRelativeScale = cfg?.maxRelativeScale || 1.25;
        this.speed = cfg?.speed || 2.3;
        this.debug = cfg?.debug || false;

        this.baseScale = this.target.scale;
        this.maxScale = this.baseScale * maxRelativeScale;
        if (cfg?.parent) {
            cfg.parent.on("pointerout", () => this.setPointerOutState());
            cfg.parent.on("pointerover", () => this.setPointerOverState());
        } else {
            this.target.on("pointerout", () => this.setPointerOutState());
            this.target.on("pointerover", () => this.setPointerOverState());
        }
    }

    public setEnabled() {
        this.enabled = true;
    }

    public setDisabled() {
        this.target.setScale(this.baseScale);
        this.enabled = false;
    }

    public preUpdate(time: number, delta: number) {
        if (!this.enabled) {
            return;
        }
        if (
            this.state === State.pointerout &&
            this.target.scale > this.baseScale
        ) {
            this.shrink(delta);
        }
        if (
            this.state === State.pointerover &&
            this.target.scale < this.maxScale
        ) {
            this.grow(delta);
        }
    }

    private grow(delta: number) {
        this.target.setScale(
            this.target.scaleX + this.speed * (delta / MsPerSec),
            this.target.scaleY + this.speed * (delta / MsPerSec)
        );
    }

    private setPointerOutState() {
        this.state = State.pointerout;
        if (this.debug) {
            // tslint:disable-next-line: no-console
            console.log("pointerout");
        }
    }

    private shrink(delta: number) {
        this.target.setScale(
            this.target.scaleX - this.speed * (delta / MsPerSec),
            this.target.scaleY - this.speed * (delta / MsPerSec)
        );
    }

    private setPointerOverState() {
        this.state = State.pointerover;

        if (this.debug) {
            // tslint:disable-next-line: no-console
            console.log("pointerover");
        }
    }
}
