import { Scene } from "phaser";
import { BackgroundImage } from "../components/BackgroundImage";
import { GRegistry } from "../gRegistry";
import { GameOverScene, IGameOverSceneInitData } from "./GameOverScene";
import { ScoreHud } from "./hud/ScoreHud";
import { Scenes } from "./Scenes";

export class MainScene extends Scene {
    private subScenes: string[] = [];
    private gotoPendingDirtyFlag = false;

    public constructor() {
        super({ key: Scenes.Main });
    }

    public create(): void {
        new BackgroundImage(this, "bg");
        this.addSubScene(Scenes.Score, ScoreHud);
        this.input.keyboard.on("keydown-R", () => this.restart());
    }

    public update() {
        // bla
    }

    private gameOver() {
        this.sound.stopAll();
        const data: IGameOverSceneInitData = {
            score: GRegistry.getScore(this),
        };
        this.goto(Scenes.GameOver, GameOverScene, data);
    }

    private restart() {
        console.log("restarted");
        this.tearDown();
        this.scene.restart();
    }

    private addSubScene<T extends {}>(
        key: string,
        scene: new () => Scene,
        initData?: T
    ) {
        this.scene.add(key, scene, true, initData);
        this.subScenes.push(key);
    }

    private goto(
        key: string,
        sceneClass: new (name: string) => Scene,
        data?: { [key: string]: any }
    ) {
        // consider removing the fadeOut
        if (this.gotoPendingDirtyFlag) {
            // do not trigger scene change twice
            return;
        }
        this.cameras.main.once("camerafadeoutcomplete", () => {
            this.tearDown();
            this.scene.add(key, sceneClass, true, data);
            this.scene.remove(this);
        });
        this.gotoPendingDirtyFlag = true;
        this.cameras.main.fadeOut(50);
    }

    private tearDown() {
        this.input.removeAllListeners();
        this.children.getAll().forEach((c) => c.destroy());
        this.subScenes.forEach((key) => {
            this.scene.remove(key);
        });
        this.subScenes = [];
        // prevent "cannot read property 'cut' of null" on scene.events.emit(Event.Type)
        // Object.values(Event).forEach(event => this.events.off(event));
    }
}
