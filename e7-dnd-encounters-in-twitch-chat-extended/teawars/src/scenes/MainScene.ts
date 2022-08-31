import { GUI } from "dat.gui";
import { random, range } from "lodash";
import { Scene } from "phaser";
import io, { Socket } from "socket.io-client";
import { match } from "ts-pattern";
import { Adventurer } from "../components/Adventurer";
import { BackgroundImage } from "../components/BackgroundImage";
import { Monster } from "../components/Monster";
import { isProd } from "../dev-config";
import { Ambushed, IEvent } from "../events/Event";
import { InternalEvents } from "../events/InternalEvents";
import { translations } from "../localizations";
import { monsterMapping } from "../monsters-mapping";
import { Color } from "../styles/Color";
import { TextConfig } from "../styles/Text";
import { Scenes } from "./Scenes";

const cfg = {
    dev: {
        enabled: !isProd,
        adventurers: 3,
    },
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

export class MainScene extends Scene {
    private client!: Socket;
    private battleLog!: IEvent[];
    private party!: Adventurer[];
    private monster?: Monster;
    private gui!: GUI;
    private currentMonsterIndex = -1;
    private battleEndEventQueue: IEvent[] = [];

    public constructor() {
        super({
            key: Scenes.Main,
        });
    }

    public create(): void {
        new BackgroundImage(this, `bg${random(1, 10)}`);
        this.battleLog = [];
        this.party = [];

        this.gui = new GUI();
        this.gui.hide();
        this.createAnimFrames();
        this.maybeEnableDevMode();
        this.registerBattleEndEventListener();

        this.client = io(import.meta.env.VITE_WEBSOCKET_SERVER_URL);
        this.client.on("init", (data: IEvent[]) => {
            this.battleLog.push(...data);
        });
        this.client.on("append log", this.handleEvent.bind(this));
    }

    private handleEvent(event: IEvent) {
        console.log(JSON.stringify(event));
        this.battleLog.push(event);

        // basically a switch statement
        match(event)
            .with({ type: "monster appeared" }, (e) => {
                this.addMonster(e);
            })
            .with({ type: "join" }, (e) => {
                this.addAdventurer(e.member, e.hp, e.maxHp);
                this.monster?.startActivityBar();
            })
            .with({ type: "attack", isMonster: false }, (e) => {
                if (!this.monster) return;
                const adventurer = this.getAdventurer(e.attacker);
                adventurer?.attack(this.monster, cfg.jumpAttackDuration);
            })
            .with({ type: "attack", isMonster: true }, (e) => {
                if (!this.monster) return;
                if (!this.monster) return;
                const adventurer = this.getAdventurer(e.target);
                if (adventurer) {
                    this.monster.attack(
                        adventurer.getCenter(),
                        cfg.jumpAttackDuration
                    );
                }
            })
            .with({ type: "damage received", isMonster: true }, (e) => {
                this.onAttackImpact(() => {
                    this.monster?.receiveDamage(e.damage);
                });
            })
            .with({ type: "damage received", isMonster: false }, (e) => {
                const adventurer = this.getAdventurer(e.target);
                this.onAttackImpact(() => {
                    adventurer?.receiveDamage(e.damage);
                });
            })
            .with({ type: "fire cast" }, (e) => {
                if (!this.monster) return;
                const adventurer = this.getAdventurer(e.actor);
                if (adventurer) {
                    adventurer.castFire(this.monster.getBottomCenter());
                }
            })
            .with({ type: "ice cast" }, (e) => {
                if (!this.monster) return;
                const adventurer = this.getAdventurer(e.actor);
                if (adventurer) {
                    adventurer.castIce(this.monster.getCenter());
                }
            })
            .with({ type: "lightning cast" }, (e) => {
                if (!this.monster) return;
                const adventurer = this.getAdventurer(e.actor);
                if (adventurer) {
                    adventurer.castLightning(this.monster.getCenter());
                }
            })
            .with({ type: "adventurer killed" }, (e) => {
                const adventurer = this.getAdventurer(e.name);
                this.onAttackImpact(() => adventurer?.die());
            })
            .with(
                { type: "heal cast" },
                { type: "heal party cast" },
                // TODO own animation for protect cast
                { type: "protect cast" },
                (e) => {
                    const adventurer = this.getAdventurer(e.actor);
                    adventurer?.castHeal();
                }
            )
            .with({ type: "received heal" }, (e) => {
                const adventurer = this.getAdventurer(e.target);
                adventurer?.receiveHeal(e.currentHp, e.amount);
            })
            .with({ type: "received protect cast" }, (e) => {
                const adventurer = this.getAdventurer(e.target);
                adventurer?.receiveProtectCast();
            })
            .with({ type: "monster killed" }, (e) => {
                this.battleEndEventQueue.push(event);
                // starts processing the battle end worker queue
                this.events.emit(InternalEvents.BattleEndEventHandlerFinished);
            })
            .with({ type: "leveled up" }, (e) => {
                this.battleEndEventQueue.push(e);
            })
            .with({ type: "party killed" }, (e) => {
                // TODO show game over screen?
            })
            .exhaustive();
    }

    private createAnimFrames() {
        Adventurer.createAdventurerAnims(this);
        this.anims.create({
            key: "lightningAnim",
            frames: this.anims.generateFrameNumbers("lightning", {
                first: 0,
                end: 3,
            }),
            frameRate: 16,
            repeat: -1,
        });
    }

    private registerBattleEndEventListener() {
        this.events.on(InternalEvents.BattleEndEventHandlerFinished, () => {
            const nextEvent = this.battleEndEventQueue.shift();
            if (nextEvent) {
                this.handleEventAtBattleEnd(nextEvent);
            }
        });
    }

    private handleEventAtBattleEnd(event: IEvent) {
        if (event.type === "monster killed") {
            this.onAttackImpact(() => {
                this.monster?.die();
            });
        }

        if (event.type === "leveled up") {
            const adventurer = this.getAdventurer(event.target);
            adventurer?.levelUp(event.level, 8000);
        }
    }

    private playBgm(key: "fanfare" | "battleloop") {
        const otherKey = key === "fanfare" ? "battleloop" : "fanfare";
        this.sound.stopByKey(otherKey);
        this.sound
            .add(key, {
                loop: true,
                volume: key === "fanfare" ? 0.5 : 0.2,
            })
            .play();
    }

    private maybeEnableDevMode() {
        if (cfg.dev.enabled) {
            this.gui.show();
            this.gui.add(this, "debugAddAdventurer").name("add adventurer");
            this.gui.add(this, "debugAudioTrack").name("play battle song");
            this.gui.add(this, "debugNextMonster").name("next monster");

            range(cfg.dev.adventurers).forEach((i) =>
                this.addAdventurer(`Amazing Adventurer ${i + 1}`, 100, 300)
            );
            const monsterData = monsterMapping.find(
                (m) => m.name === "red slaad"
            )!;
            this.currentMonsterIndex = monsterMapping.indexOf(monsterData);
            this.addMonster({
                type: "monster appeared",
                monster: {
                    area: "Forest",
                    hp: 21,
                    name: monsterData.name,
                },
                turnInterval: 30000,
            });
        }
    }

    private getAdventurer(username: string) {
        return this.party.find((a) => a.username === username);
    }

    private addMonster(cfg: Ambushed) {
        this.monster = new Monster(
            this,
            cfg.monster,
            cfg.turnInterval,
            this.gui
        );
    }

    private onAttackImpact(cb: () => void) {
        this.time.delayedCall(cfg.jumpAttackDuration, cb);
    }

    private addAdventurer(username: string, hp: number, maxHp: number) {
        this.party.push(new Adventurer(this, username, hp, maxHp, this.gui));
    }

    // automatically called every 1/60th of a second
    public update(time: number, delta: number) {
        this.party.forEach((adventurer) => adventurer.update());
        this.monster?.update(time, delta);
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

    private debugAddAdventurer() {
        this.addAdventurer(
            `Amazing Adventurer ${random(100000)}`,
            random(500),
            random(300)
        );
    }

    private debugAudioTrack() {
        this.playBgm("battleloop");
    }

    private debugNextMonster() {
        if (this.monster) {
            this.monster.setActive(false);
            this.monster.setVisible(false);
            this.monster = undefined;
        }
        this.currentMonsterIndex++;
        const monsterData = monsterMapping[this.currentMonsterIndex];
        this.addMonster({
            type: "monster appeared",
            monster: {
                area: "Forest",
                hp: 21,
                name: monsterData.name,
            },
            turnInterval: 30000,
        });
    }
}
