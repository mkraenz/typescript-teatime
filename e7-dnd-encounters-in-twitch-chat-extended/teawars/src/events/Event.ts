export type IEvent =
    | DamageReceived
    | Attacked
    | Joined
    | Ambushed
    | AdventurerKilled
    | MonsterKilled
    | PartyKilled
    | ReceivedHeal
    | HealPartyCast
    | HealCast
    | FireCast
    | IceCast
    | LightningCast
    | LeveledUp
    | ReceivedProtectCasted
    | ProtectCast;

interface ReceivedProtectCasted {
    type: "received protect cast";
    target: string;
}

interface ProtectCast {
    type: "protect cast";
    actor: string;
    target: string;
}

interface HealPartyCast {
    type: "heal party cast";
    actor: string;
    amount: number;
}

export interface DamageReceived {
    type: "damage received";
    damage: number;
    target: string;
    isMonster: boolean;
    hpLeft: number;
}

interface LeveledUp {
    type: "leveled up";
    target: string;
    level: number;
}

export interface Attacked {
    type: "attack";
    target: string;
    attacker: string;
    isMonster: boolean;
}

export interface FireCast {
    type: "fire cast";
    target: string;
    actor: string;
}

export interface IceCast {
    type: "ice cast";
    target: string;
    actor: string;
}

export interface LightningCast {
    type: "lightning cast";
    target: string;
    actor: string;
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
