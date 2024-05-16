export abstract class Building {
  readonly type: string;
  readonly idNumber = Math.floor(Math.random() * 1000000);
  owner: string;
  // building costs (money+resource costs) are one-time and thus can be put outside of the building data

  constructor(params: { type: string; owner: string }) {
    this.type = params.type;
    this.owner = params.owner;
  }

  get id() {
    return `${this.type}_${this.idNumber}`;
  }

  ownedBy(other: string) {
    return this.owner === other;
  }

  abstract destroy(): void;
}
