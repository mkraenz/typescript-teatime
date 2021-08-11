import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { IEvent, Joined } from '../domain/events';

export class Battle extends TimeStamps {
  @prop({
    type: [String],
    default: [],
    set: (event: IEvent[]) => JSON.stringify(event), // store as array of strings
    // HACKY! see BattleService's `private log` for details
    get: (e: string) => JSON.parse(e), // get as IEvent[]
  })
  public log: IEvent[] = [];

  public get party() {
    return (this.log.filter((e) => e.type === 'join') as Joined[]).map(
      (e) => e.member,
    );
  }
}
