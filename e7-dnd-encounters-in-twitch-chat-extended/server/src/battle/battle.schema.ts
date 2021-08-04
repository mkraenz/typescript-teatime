import { prop } from '@typegoose/typegoose';
import { IEvent } from '../domain/events';

export class Battle {
  @prop({ default: [] })
  @prop({
    type: [String],
    default: [],
    set: (event: IEvent[]) => JSON.stringify(event), // store as array of strings
    get: (e: string) => JSON.parse(e), // get as IEvent[]
  })
  public log: IEvent[] = [];

  public get party() {
    return this.log.filter((e) => e.type === 'join');
  }
}
