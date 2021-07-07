import { random } from "lodash";
import { GameObjects, Scene } from "phaser";
import * as io from "socket.io-client";
import { BackgroundImage } from "../components/BackgroundImage";
import { Healthbar } from "../components/Healthbar";
import { Ambushed, DamageReceived, IEvent, Joined } from "../events/Event";
import { translations } from "../localizations";
import { Color } from "../styles/Color";
import { TextConfig } from "../styles/Text";
import { Scenes } from "./Scenes";

const cfg = {
    fadeIn: 200,
    title: {
        relY: 0.4,
    },
    playButton: {
        relY: 0.62,
    },
    copyright: {
        relY: 0.95,
    },
    version: {
        relY: 0.93,
    },
};

export class TitleScene extends Scene {
    private client!: SocketIOClient.Socket;
    private battleLog: IEvent[] = [];
    private log!: GameObjects.Text;
    private healthbar!: Healthbar;

    public constructor() {
        super({
            key: Scenes.Title,
        });
    }

    public create(): void {
        new BackgroundImage(this, "bg1");
        this.log = this.add.text(50, 100, "default");

        // this.add.image(1100, 620, "monster").setDisplaySize(300, 300); // TODO fixed display size only working for sqare images

        // times(4, () => {
        //     const adventurer = this.add
        //         .image(0, 0, "adventurers")
        //         .setRandomPosition(
        //             200,
        //             500,
        //             this.scale.width / 2 - 200,
        //             this.scale.height / 4
        //         )
        //         .setScale(4.5)
        //         .setFrame(random(7));
        // });

        // const gui = new GUI();
        // gui.add(emptyHealthbar, "x", 0, this.scale.width);
        // gui.add(emptyHealthbar, "y", 0, this.scale.height);
        // gui.add(emptyHealthbar, "scale", 1, 10);
        // const obj = {
        //     frame: 0,
        //     nextFrame: () => {
        //         obj.frame++;
        //         adventurer.setFrame(obj.frame);
        //     },
        // };
        // gui.add(obj, "nextFrame");

        this.client = io("http://localhost:3000");

        this.client.on("init", (data: IEvent[]) => {
            this.battleLog.push(...data);
        });
        this.client.on("append logs", (data: IEvent[]) => {
            console.log(JSON.stringify(data));
            this.battleLog.push(...data);
            const ambush: Ambushed = data.find(
                (e) => e.type === "monster appeared"
            ) as Ambushed;
            const joined: Joined = data.find(
                (e) => e.type === "join"
            ) as Joined;
            const monsterReceivedDamage: DamageReceived = data.find(
                (e) => e.type === "damage received" && e.isMonster
            ) as DamageReceived;

            if (ambush) {
                // TODO fixed display size only working for sqare images
                this.add.image(1100, 620, "monster").setDisplaySize(300, 300);
                this.healthbar = new Healthbar(this, ambush.monster.hp);
            }
            if (joined) {
                this.addAdventurer();
            }
            if (monsterReceivedDamage) {
                this.healthbar.setHealth(monsterReceivedDamage.hpLeft);
            }
        });
    }

    private addAdventurer() {
        this.add
            .image(0, 0, "adventurers")
            .setRandomPosition(
                200,
                500,
                this.scale.width / 2 - 200,
                this.scale.height / 4
            )
            .setScale(4.5)
            .setFrame(random(7));
    }

    public update() {
        const text = this.battleLog.map((x) => JSON.stringify(x)).join("\n");
        this.log.setText(text);
    }

    private addTitle() {
        this.add
            .text(
                this.scale.width / 2,
                this.scale.height * cfg.title.relY,
                translations.title,
                TextConfig.title
            )
            .setOrigin(0.5)
            .setShadow(4, 6, Color.Grey, 2, true, true)
            .setAlpha(1);
    }

    private goto(key: string, sceneClass: new (name: string) => Scene) {
        this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.add(key, sceneClass, true);
            this.scene.remove(this);
        });
        this.cameras.main.fadeOut(500);
    }
}
