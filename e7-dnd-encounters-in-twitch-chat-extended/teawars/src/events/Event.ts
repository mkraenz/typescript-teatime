export type IEvent =
    | DamageReceived
    | Attacked
    | Joined
    | Ambushed
    | AdventurerKilled
    | MonsterKilled
    | PartyKilled
    | ReceivedHeal
    | HealCast;

export interface DamageReceived {
    type: "damage received";
    damage: number;
    target: string;
    isMonster: boolean;
    hpLeft: number;
}

export interface Attacked {
    type: "attack";
    target: string;
    attacker: string;
    isMonster: boolean;
}

export interface Joined {
    type: "join";
    member: string;
    maxHp: number;
    hp: number;
}

export interface Ambushed {
    type: "monster appeared";
    monster: {
        name: string;
        hp: number;
        area: string;
    };
    turnInterval: number;
}

export interface AdventurerKilled {
    type: "adventurer killed";
    name: string;
}

export interface MonsterKilled {
    type: "monster killed";
    monster: string;
}

export interface PartyKilled {
    type: "party killed";
    monster: string;
}

export interface HealCast {
    type: "heal cast";
    actor: string;
    amount: number;
    receiver: string;
}

export interface ReceivedHeal {
    type: "received heal";
    target: string;
    amount: number;
    currentHp: number;
}
