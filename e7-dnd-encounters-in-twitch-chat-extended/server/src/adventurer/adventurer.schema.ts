import { prop } from '@typegoose/typegoose';

export class Adventurer {
  @prop({ unique: true, required: true })
  public username!: string;

  @prop({ default: 1 })
  public level: number = 1;

  @prop({ default: 0 })
  public experience: number = 0;
}
