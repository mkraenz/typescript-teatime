import { GUI } from "dat.gui";
import { random } from "lodash";
import { GameObjects, Scene } from "phaser";
import { AdventurerName } from "../AdventurerName";
import { AdventurerHealthbar } from "./AdventurerHealthbar";
import { DamageText } from "./DamageText";

export class Adventurer extends GameObjects.Image {
    private healthbar: AdventurerHealthbar;
    private nameLabel: GameObjects.Text;

    private get isDead() {
        return this.hp < 0;
    }

    constructor(
        scene: Scene,
        public readonly username: string,
        private hp: number,
        maxHp: number,
        gui: GUI
    ) {
        super(scene, 0, 0, "adventurers");
        scene.add.existing(this);

        this.setRandomPosition(
            150,
            400,
            scene.scale.width / 2 - 50,
            scene.scale.height * (2 / 5)
        )
            .setScale(4.5)
            .setFrame(random(21));
        this.setDepth(this.y);

        if (this.isDead) {
            this.die();
        }

        this.healthbar = new AdventurerHealthbar(scene, hp, maxHp, this);
        this.nameLabel = new AdventurerName(scene, username, this);

        this.join();

        this.setupDevMode(gui);
    }

    private setupDevMode(gui: GUI) {
        const folder = gui.addFolder(this.username);
        folder.add(this, "debugAttack").name("attack");
        folder.add(this, "debugReceiveDamage").name("receive Damage");
        folder.add(this, "die");
        folder.add(this, "castHeal").name("cast Heal");
        folder.add(this, "debugReceiveHeal").name("receive Heal");
        folder.add(this, "animateSlice").name("slice");
        // folder.open();
    }

    private join() {
        const x = this.x;
        this.x = -100;
        this.scene.sound.play("footsteps", {
            volume: 0.2,
        });
        this.scene.tweens.add({
            targets: this,
            x,
            duration: 2100,
            ease: "Expo.easeOut",
        });
    }

    private addAttackCurve({ x: x2, y: y2 }: { x: number; y: number }) {
        const x = this.x;
        const y = this.y;
        const startPoint = new Phaser.Math.Vector2(x, y);
        const controlPoint1 = new Phaser.Math.Vector2(x, y - 100);
        const controlPoint2 = new Phaser.Math.Vector2(
            x2,
            0.8 * y2 + 0.2 * this.y
        );
        const endPoint = new Phaser.Math.Vector2(x2, y2);

        return {
            path: { t: 0, vec: new Phaser.Math.Vector2() },
            curve: new Phaser.Curves.CubicBezier(
                startPoint,
                controlPoint1,
                controlPoint2,
                endPoint
            ),
        };
    }

    public attack(target: { x: number; y: number }, jumpDuration: number) {
        const { path, curve } = this.addAttackCurve(target);
        const setPlayerToCurvePosition = () => {
            const newPos = curve.getPoint(path.t, path.vec);
            this.x = newPos.x;
            this.y = newPos.y;
        };
        const maxT = 0.8;
        this.scene.tweens.add({
            targets: path,
            t: maxT,
            ease: "Sine.easeInOut",
            duration: jumpDuration,
            yoyo: true,
            hold: 600,
            onUpdate: () => {
                setPlayerToCurvePosition();
                if (path.t === maxT) {
                    this.animateSlice();
                }
            },
        });
    }

    private animateSlice() {
        this.playAttackSound();

        const screenHeight = this.scene.scale.height;
        const currentX = this.x;
        const currentY = this.y;
        const slice = this.scene.add
            .image(currentX + 150, currentY, "shapes", "slash_03")
            .setScale(3)
            .setRotation(Phaser.Math.TAU / 2)
            .setDepth(9000);
        const shape = this.scene.make.graphics({});
        shape.fillRect(0, -screenHeight, screenHeight * 2, screenHeight);
        const mask = shape.createGeometryMask();
        slice.setMask(mask);

        const timeline = this.scene.tweens.timeline();
        timeline.add({
            targets: shape,
            y: 0,
            duration: 250,
            onComplete: () => this.scene.cameras.main.shake(300, 0.02, true),
        });
        timeline.add({
            targets: shape,
            y: screenHeight,
            duration: 250,
        });
        timeline.add({
            delay: 300,
            targets: shape,
            y: 2000,
            duration: 500,
            onComplete: () => {
                slice.destroy();
                mask.destroy();
                shape.destroy();
            },
        });

        timeline.play();
    }

    private playAttackSound() {
        const zeroOrOne = random(1);
        this.scene.sound.play(`sword${zeroOrOne}`, {
            volume: 0.5,
        });
    }

    public update() {
        this.nameLabel.update();
        this.healthbar.update();
    }

    public castHeal() {
        // ignore: might look weird if somebody heals themselves.
        // Reason: eventually disallow healing yourself
        this.scene.tweens.add({
            targets: this,
            x: this.x + 80,
            duration: 200,
            ease: "Sine.easeInOut",
            yoyo: true,
            hold: 1000,
        });
    }

    public receiveHeal(currentHp: number, amountHealed: number) {
        this.healthbar.receiveHeal(currentHp);

        const emitter = this.scene.add.particles(
            "shapes",
            // eslint-disable-next-line @typescript-eslint/no-implied-eval
            new Function(
                `return ${this.scene.cache.text.get("heal-effect") as string}`
            )()
        );
        emitter.setX(this.x);
        emitter.setY(this.y);
        emitter.setDepth(this.depth + 1);

        new DamageText(this.scene, this, -amountHealed);
        this.scene.time.delayedCall(2000, () => emitter.destroy());
    }

    public receiveDamage(amount: number) {
        this.healthbar.takeDamage(amount);

        new DamageText(this.scene, this, amount);

        const red = 0xff0000;
        this.setTint(red);
        this.scene.cameras.main.flash(100, 128, 0, 0);
        this.scene.time.delayedCall(300, () => this.clearTint());

        if (this.isDead) {
            this.die();
        }
    }

    public die() {
        this.scene.tweens.add({
            targets: this,
            rotation: -Phaser.Math.PI2 / 4,
            duration: 150,
        });
    }

    public debugAttack() {
        this.attack({ x: 1000, y: this.scene.scale.height / 2 }, 1000);
    }

    public debugReceiveDamage() {
        this.receiveDamage(20);
    }

    public debugReceiveHeal() {
        this.receiveHeal(130, 14);
    }
}
