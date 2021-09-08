export type IEvent =
  | DamageReceived
  | Attacked
  | Joined
  | Ambushed
  | AdventurerKilled
  | MonsterKilled
  | PartyKilled
  | ReceivedHeal
  | HealCast
  | FireCast;

interface HealCast {
  type: 'heal cast';
  actor: string;
  amount: number;
  receiver: string;
}

export interface FireCast {
  type: 'fire cast';
  target: string;
  actor: string;
}

interface ReceivedHeal {
  type: 'received heal';
  target: string;
  amount: number;
  currentHp: number;
}

interface DamageReceived {
  type: 'damage received';
  damage: number;
  target: string;
  isMonster: boolean;
  hpLeft: number;
}

interface Attacked {
  type: 'attack';
  target: string;
  attacker: string;
  isMonster: boolean;
}

export interface Joined {
  type: 'join';
  member: string;
  maxHp: number;
  hp: number;
}

interface Ambushed {
  type: 'monster appeared';
  monster: {
    name: string;
    hp: number;
    area: string;
  };
  turnInterval: number;
}

interface AdventurerKilled {
  type: 'adventurer killed';
  name: string;
}

interface MonsterKilled {
  type: 'monster killed';
  monster: string;
}

interface PartyKilled {
  type: 'party killed';
  monster: string;
}
