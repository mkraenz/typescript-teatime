import { GUI } from "dat.gui";
import { random } from "lodash";
import { Curves, GameObjects, Math, Scene } from "phaser";
import { AdventurerName } from "../AdventurerName";
import { AdventurerHealthbar } from "./AdventurerHealthbar";
import { DamageText } from "./DamageText";

export class Adventurer extends GameObjects.Image {
    private path?: { t: number; vec: Math.Vector2 };
    private curve?: Curves.CubicBezier;
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
            500,
            scene.scale.width / 2 - 200,
            scene.scale.height / 3
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
        folder.add(this, "debugReceiveHeal");
        folder.add(this, "heal");
    }

    private join() {
        const x = this.x;
        this.x = -100;
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
        this.path = path;
        this.curve = curve;

        this.scene.tweens.add({
            targets: this.path,
            t: 0.8,
            ease: "Sine.easeInOut",
            duration: jumpDuration,
            yoyo: true,
        });
    }

    public update() {
        // if is attacking
        if (this.curve && this.path) {
            const newPos = this.curve.getPoint(this.path.t, this.path.vec);
            this.x = newPos.x;
            this.y = newPos.y;
        }

        this.nameLabel.update();
        this.healthbar.update();
    }

    public heal() {
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
        emitter.setDepth(9999999);

        new DamageText(this.scene, this, -amountHealed);
    }

    public takeDamage(amount: number) {
        this.healthbar.takeDamage(amount);

        new DamageText(this.scene, this, amount);

        const red = 0xff0000;
        this.setTint(red);
        this.scene.time.delayedCall(300, () => this.clearTint());

        if (this.isDead) {
            this.die();
        }
    }

    public die() {
        this.setRotation(-Phaser.Math.PI2 / 4);
    }

    public debugAttack() {
        this.attack({ x: 1000, y: this.scene.scale.height / 2 }, 1000);
    }

    public debugTakeDamage() {
        this.takeDamage(20);
    }

    public debugReceiveHeal() {
        this.receiveHeal(130, 14);
    }
}
