import { GameObjects, Scene } from "phaser";
import * as io from "socket.io-client";
import { BackgroundImage } from "../components/BackgroundImage";
import { IEvent } from "../events/Event";
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

    public constructor() {
        super({
            key: Scenes.Title,
        });
    }

    public create(): void {
        new BackgroundImage(this, "bg");
        this.log = this.add.text(this.scale.width / 2, 100, "default");
        this.client = io("http://localhost:3000");

        this.client.on("init", (data: IEvent[]) => {
            this.battleLog.push(...data);
        });
        this.client.on("append logs", (data: IEvent[]) => {
            console.log(JSON.stringify(data));
            this.battleLog.push(...data);
            if (data.find((e) => e.type === "monster appeared")) {
                this.add
                    .image(800, this.scale.height / 2, "monster")
                    .setDisplaySize(300, 300);
            }
        });
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
