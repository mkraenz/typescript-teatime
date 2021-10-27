/* eslint-disable @typescript-eslint/no-misused-promises */
import { isEmpty } from "lodash";
import { Scene } from "phaser";
import { ChatUserstate, Client } from "tmi.js";
import { Adventurer } from "../domain/adventurer";
import { Battle } from "../domain/battle";
import { Scenes } from "./Scenes";

const timeBetweenAttacksInSeconds = 15;

/** example: `http://localhost:8080/?channel=typescriptteatime&moderators=maceisgrace,hcustovic` */
const getChannelAndMods = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const channel = queryParams.get("channel") || "";
    const moderatorString = queryParams.get("moderators") ?? "";
    const moderators = moderatorString
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    moderators.push(channel); // streamer is always a moderator
    return { channel, moderators };
};

const { channel, moderators } = getChannelAndMods();
const tmiConfig = {
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true,
    },
    channels: [channel],
};
const banned = ["streamelements"];
enum Command {
    Attack = "!attack",
    Join = "!join",
    Fire = "!fire",
    Ice = "!ice",
    Heal = "!heal",
}

export class LogicScene extends Scene {
    private battle?: Battle;
    private lastLogCount = 0;
    private watchBattleLogs?: number;
    private joinedAdventurers: Adventurer[] = [];
    private randomData!: { monsterIndex: number };

    constructor(key = Scenes.Logic) {
        super(key);
    }

    public init(data: { monsterIndex: number }) {
        this.randomData = data;
    }

    public create() {
        const tmiClient = new Client(tmiConfig);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        tmiClient.connect();
        tmiClient.on("message", this.handleMessage.bind(this));
    }

    private handleMessage(
        channel: string,
        tags: ChatUserstate,
        message: string,
        self: boolean
    ) {
        if (self) {
            return;
        } // Ignore message by chatbot itself

        const username = tags.username;
        if (!username || banned.includes(username)) {
            return;
        }
        const msg = message.toLowerCase();

        if (moderators.includes(username) && msg.includes("!ambush")) {
            if (this.battle) {
                return;
            }
            this.battle = new Battle(
                timeBetweenAttacksInSeconds,
                this.randomData.monsterIndex
            );
            this.watchBattleLogs = window.setInterval(
                () => this.pollBattleLogs(),
                10
            );
        }
        if (!this.battle) {
            return;
        }

        if (includesACommand(msg)) {
            const hasJoined = this.battle.hasJoined(username);
            if (!hasJoined) {
                return this.joinParty(username, this.battle);
            }
        }

        if (msg.includes(Command.Join)) {
            return this.joinParty(username, this.battle);
        }
        if (msg.includes(Command.Attack)) {
            return this.battle.attack(username);
        }
        if (msg.includes(Command.Fire)) {
            return this.battle.castFire(username);
        }
        if (msg.includes(Command.Ice)) {
            return this.battle.castIce(username);
        }
        if (msg.includes(Command.Heal)) {
            // using message to handle uppercase characters in username receiving heal
            return this.handleHeal(this.battle, message, username);
        }
        if (moderators.includes(username) && msg.includes("!flee")) {
            return this.endBattle();
        }
    }

    private endBattle() {
        window.clearInterval(this.watchBattleLogs);
        this.battle?.endBattle();
        this.watchBattleLogs = undefined;
        this.battle = undefined;
        this.lastLogCount = 0;

        this.joinedAdventurers = [];
        console.log("battle ended");
    }

    private pollBattleLogs() {
        console.log("poll battle logs called");
        const hasNewEvents = this.battle!.log.length > this.lastLogCount;
        if (hasNewEvents) {
            console.log("poll battle logs found event");
            const renderingScene = this.scene.get(Scenes.Main);
            for (let i = this.lastLogCount; i < this.battle!.log.length; i++) {
                const newEvent = this.battle!.log[i];
                renderingScene.events.emit("append log", newEvent);
                console.log("poll battle logs emitted event");
            }
            this.lastLogCount = this.battle!.log.length;
        }
        const battleEnded = this.battle?.log.find(
            (e) => e.type === "monster killed" || e.type === "party killed"
        );
        if (battleEnded) {
            this.endBattle();
        }
    }

    private joinParty(username: string, battle: Battle) {
        const adventurer = new Adventurer(username, battle.log);
        try {
            battle.join(adventurer);
            this.joinedAdventurers.push(adventurer);
        } catch (error) {
            if ((error as Error).message.includes("already in the party")) {
                console.log(`${username} can only !join once. Ignoring.`);
                // expected error. ignore
            } else {
                throw error;
            }
        }
    }

    private handleHeal(battle: Battle, msg: string, username: string) {
        // msg should be like:
        // !heal @maceisgrace
        // filter for ignoring whitespace
        const healed = msg.split(" ").filter((m) => !isEmpty(m))[1];
        const singleTargetCast = healed && healed[0] === "@";
        if (singleTargetCast) {
            const healedTargetUser = healed.substring(1);
            return battle.heal(username, healedTargetUser);
        }
        return battle.healParty(username);
    }
}

const includesACommand = (msg: string) =>
    Object.values(Command).some((cmd) => msg.includes(cmd));
