export type IEvent =
    | DamageReceived
    | Attacked
    | Joined
    | Ambushed
    | AdventurerKilled
    | MonsterKilled
    | PartyKilled;

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
}

export interface Ambushed {
    type: "monster appeared";
    monster: {
        name: string;
        hp: number;
        area: string;
    };
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
