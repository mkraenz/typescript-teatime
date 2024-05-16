export class InsufficientFundsError extends Error {
  constructor() {
    super('InsufficientFundsError');
  }
}

export class Treasury {
  readonly owner: string = '';
  private _balance = 0;

  constructor(owner: string = '') {
    this.owner = owner;
  }

  get balance() {
    return this._balance;
  }

  credit(amount: number) {
    if (this._balance < amount) throw new InsufficientFundsError();

    this._balance -= amount;
  }

  debit(amount: number) {
    this._balance += amount;
  }

  hasEnough(amount: number) {
    return this._balance >= amount;
  }
}
