import { Scene } from "phaser";
export class BgmScene extends Scene {
    constructor() {
        super({
            key: "BgmScene",
        });
    }

    public create() {
        this.sound.add("background").play("", { loop: true, volume: 0.5 });
    }
}
