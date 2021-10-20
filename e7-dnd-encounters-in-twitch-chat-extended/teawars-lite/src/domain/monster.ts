import { random } from "lodash";
import { IEvent } from "../events/Event";
import type { Adventurer } from "./adventurer";

export class Monster {
    public name: string;
    public area: string;
    public hp: number;
    private maxDamage: number;
    private log: IEvent[];

    constructor(
        log: IEvent[],
        {
            name,
            area,
            hp,
            maxDamage = 15,
        }: { name: string; area: string; hp: number; maxDamage?: number }
    ) {
        this.log = log;
        this.area = area;
        this.hp = hp;
        this.name = name;
        this.maxDamage = maxDamage;
    }

    public get isDead() {
        return this.hp <= 0;
    }

    public attack(adventurer: Adventurer) {
        const damage = random(this.maxDamage - 1) + 1;
        this.log.push({
            type: "attack",
            isMonster: true,
            attacker: this.name,
            target: adventurer.username,
        });
        adventurer.takeDamage(damage);
    }

    public takeDamage(damage: number) {
        this.hp = this.hp - damage;
        this.log.push({
            type: "damage received",
            damage,
            target: this.name,
            hpLeft: this.hp,
            isMonster: true,
        });
        if (this.isDead) {
            this.log.push({ type: "monster killed", monster: this.name });
        }
    }
}
