import { GameObjects, Scene } from "phaser";
import * as io from "socket.io-client";
import { Adventurer } from "../components/Adventurer";
import { BackgroundImage } from "../components/BackgroundImage";
import { DamageText } from "../components/DamageText";
import { Healthbar } from "../components/Healthbar";
import { Monster } from "../components/Monster";
import {
    Ambushed,
    Attacked,
    DamageReceived,
    IEvent,
    Joined,
    MonsterKilled,
} from "../events/Event";
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

type Maybe<T> = T | undefined;

export class TitleScene extends Scene {
    private client!: SocketIOClient.Socket;
    private battleLog!: IEvent[];
    private log!: GameObjects.Text;
    private healthbar!: Healthbar;
    private party!: Adventurer[];
    private monster?: Monster;
    // private adventurer!: Adventurer;

    public constructor() {
        super({
            key: Scenes.Title,
        });
    }

    public create(): void {
        new BackgroundImage(this, "bg1");
        this.log = this.add.text(50, 100, "default");

        this.battleLog = [];
        this.party = [];

        // this.adventurer = new Adventurer(this, "player1");
        // const gui = new GUI();
        // gui.add(this.adventurer, "username");
        // gui.add(this.adventurer, "x");
        // gui.add(this.adventurer, "y");
        // gui.add(this.adventurer, "attack");

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
        this.client.on("append logs", (events: IEvent[]) => {
            console.log(JSON.stringify(events));
            this.battleLog.push(...events);
            const ambush = events.find(
                (e) => e.type === "monster appeared"
            ) as Maybe<Ambushed>;
            const joined = events.find(
                (e) => e.type === "join"
            ) as Maybe<Joined>;
            const monsterReceivedDamage = events.find(
                (e) => e.type === "damage received" && e.isMonster
            ) as Maybe<DamageReceived>;
            const adventurerReceivedDamage = events.find(
                (e) => e.type === "damage received" && !e.isMonster
            ) as Maybe<DamageReceived>;
            const monsterAttacked = events.find(
                (e) => e.type === "attack" && e.isMonster
            ) as Maybe<Attacked>;
            const adventurerAttacked = events.find(
                (e) => e.type === "attack" && !e.isMonster
            ) as Maybe<Attacked>;
            const adventurersWin = events.find(
                (e) => e.type === "monster killed"
            ) as Maybe<MonsterKilled>;

            if (ambush) {
                this.monster = new Monster(this);
                this.healthbar = new Healthbar(this, ambush.monster.hp);
            }
            if (joined) {
                this.addAdventurer(joined.member);
            }

            if (adventurerAttacked && this.monster) {
                const adventurer = this.party.find(
                    (a) => a.username === adventurerAttacked.attacker
                )!;
                adventurer.attack(this.monster);
            }

            if (monsterReceivedDamage) {
                this.healthbar.setHealth(monsterReceivedDamage.hpLeft);
                if (this.monster) {
                    new DamageText(
                        this,
                        this.monster,
                        monsterReceivedDamage.damage
                    );
                    this.monster.takeDamage();
                }
            }

            if (monsterAttacked && this.monster) {
                const adventurer = this.party.find(
                    (a) => a.username === monsterAttacked.target
                )!;
                if (adventurer) {
                    this.monster.attack(adventurer);
                }
            }

            if (adventurerReceivedDamage) {
                const adventurer = this.party.find(
                    (a) => a.username === adventurerReceivedDamage.target
                )!;
                if (adventurer) {
                    new DamageText(
                        this,
                        adventurer,
                        adventurerReceivedDamage.damage
                    );
                    adventurer.takeDamage();
                }
            }

            if (adventurersWin) {
                this.monster?.die();
            }
        });
    }

    private addAdventurer(username: string) {
        this.party.push(new Adventurer(this, username));
    }

    // automatically called every 1/60th of a second
    public update() {
        const text = this.battleLog.map((x) => JSON.stringify(x)).join("\n");
        this.log.setText(text);
        this.party.forEach((a) => a.update());
        // this.adventurer.update();
        this.monster?.update();
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
