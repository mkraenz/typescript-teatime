import { Scene } from "phaser";
import * as io from "socket.io-client";
import { IEvent } from "../events/Event";
import { Scenes } from "./Scenes";

export class LogicScene extends Scene {
    constructor(key = Scenes.Logic) {
        super(key);
    }

    public create() {
        const client = io("http://localhost:3000");
        const renderingScene = this.scene.get(Scenes.Main);

        client.on("init", (data: IEvent[]) => {
            renderingScene.events.emit("init", data);
        });

        client.on("append log", (data: IEvent) => {
            renderingScene.events.emit("append log", data);
        });
        // http://localhost:8080/?channel=typescriptteatime&moderators=maceisgrace,hcustovic
    }
}
