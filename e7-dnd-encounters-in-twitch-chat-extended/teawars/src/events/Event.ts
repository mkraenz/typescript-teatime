export type IEvent =
    | DamageReceived
    | Attacked
    | Joined
    | Ambushed
    | AdventurerKilled
    | MonsterKilled
    | PartyKilled;

interface DamageReceived {
    type: "damage received";
    damage: number;
    target: string;
    hpLeft: number;
}

interface Attacked {
    type: "attack";
    target: string;
    attacker: string;
    isMonster: boolean;
}

interface Joined {
    type: "join";
    member: string;
}

interface Ambushed {
    type: "monster appeared";
    monster: {
        name: string;
        hp: number;
        area: string;
    };
}

interface AdventurerKilled {
    type: "adventurer killed";
    name: string;
}

interface MonsterKilled {
    type: "monster killed";
    monster: string;
}

interface PartyKilled {
    type: "party killed";
    monster: string;
}
