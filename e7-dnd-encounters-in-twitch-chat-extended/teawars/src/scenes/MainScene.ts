import { Scene } from "phaser";
import * as io from "socket.io-client";
import { Adventurer } from "../components/Adventurer";
import { BackgroundImage } from "../components/BackgroundImage";
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
    debug: false,
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
    jumpAttackDuration: 1000,
};

type Maybe<T> = T | undefined;

export class MainScene extends Scene {
    private client!: SocketIOClient.Socket;
    private battleLog!: IEvent[];
    private party!: Adventurer[];
    private monster?: Monster;

    public constructor() {
        super({
            key: Scenes.Main,
        });
    }

    public create(): void {
        new BackgroundImage(this, "bg1");
        this.battleLog = [];
        this.party = [];

        // TODO add debug config
        if (cfg.debug) {
            this.addAdventurer("Amazing Adventurer", 100, 300);
            this.addMonster({ area: "Forest", hp: 21, name: "Sephiroth" });
            // const gui = new GUI();
            // gui.add(this.party[0], "username");
            // gui.add(this.party[0], "x");
            // gui.add(this.party[0], "y");
            // gui.add(this.party[0], "debugTakeDamage");
            // gui.add(this.party[0], "die");
        }

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
                this.addMonster(ambush.monster);
            }
            if (joined) {
                this.addAdventurer(joined.member, joined.hp, joined.maxHp);
            }

            if (adventurerAttacked && this.monster) {
                const adventurer = this.party.find(
                    (a) => a.username === adventurerAttacked.attacker
                )!;
                adventurer.attack(this.monster, cfg.jumpAttackDuration);
            }

            if (monsterReceivedDamage) {
                this.onAttackImpact(() => {
                    this.monster?.takeDamage(monsterReceivedDamage.damage);
                });
            }

            if (monsterAttacked && this.monster) {
                const adventurer = this.party.find(
                    (a) => a.username === monsterAttacked.target
                )!;
                if (adventurer) {
                    this.monster.attack(adventurer, cfg.jumpAttackDuration);
                }
            }

            if (adventurerReceivedDamage) {
                this.onAttackImpact(() => {
                    const adventurer = this.party.find(
                        (a) => a.username === adventurerReceivedDamage.target
                    );
                    adventurer?.takeDamage(adventurerReceivedDamage.damage);
                });
            }

            if (adventurersWin) {
                this.onAttackImpact(() => this.monster?.die());
            }
        });
    }

    private addMonster(cfg: Ambushed["monster"]) {
        this.monster = new Monster(this, cfg);
    }

    private onAttackImpact(cb: () => void) {
        this.time.delayedCall(cfg.jumpAttackDuration, cb);
    }

    private addAdventurer(username: string, hp: number, maxHp: number) {
        this.party.push(new Adventurer(this, username, hp, maxHp));
    }

    // automatically called every 1/60th of a second
    public update() {
        this.party.forEach((adventurer) => adventurer.update());
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
