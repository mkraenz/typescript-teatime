import { GameObjects, Scene } from "phaser";
import { Color } from "../../styles/Color";
import { TextConfig } from "../../styles/Text";

const cfg = {
    scale: 0.6,
    pushedRelScale: 0.85,
    textRelOffsetY: 0.015,
    textScale: 1,
};

export class ButtonSm extends GameObjects.Sprite {
    private buttonText!: GameObjects.Text;

    public constructor(
        scene: Scene,
        y: number,
        text: string,
        onPointerup: () => void
    ) {
        const halfWidth = scene.scale.width / 2;
        super(scene, halfWidth, y, "button-sm");
        scene.add.existing(this);

        this.setInteractive({ useHandCursor: true });
        this.on("pointerup", onPointerup)
            .on("pointerdown", () => this.enterPressedState())
            .on("pointerout", () => this.enterBaseState());

        this.addText(text);
        this.enterBaseState();
    }

    private addText(text: string) {
        this.buttonText = this.scene.add
            .text(
                this.getCenter().x,
                this.getCenter().y * (1 - cfg.textRelOffsetY),
                text,
                TextConfig.buttonSm
            )
            .setOrigin(0.5)
            .setAlpha(0.8);
        this.buttonText
            .setStroke(this.buttonText.style.color, 1.3)
            .setShadow(4, 6, Color.Grey, 2, true, true);
    }

    private enterPressedState() {
        this.setScale(this.scale * cfg.pushedRelScale);
        this.buttonText.setScale(cfg.textScale * cfg.pushedRelScale);
    }

    private enterBaseState() {
        this.setScale(cfg.scale);
        this.buttonText.setScale(cfg.textScale);
    }
}
