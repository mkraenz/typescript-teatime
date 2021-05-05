import { Schema, SchemaTypeOptions } from 'mongoose';
import type { Adventurer } from '../../adventurer/adventurer.interface';

export const AdventurerSchema = new Schema<Adventurer>({
  username: {
    type: String,
    unique: true,
    required: true,
  } as SchemaTypeOptions<string>,
  level: {
    type: Number,
    default: 1,
  } as SchemaTypeOptions<number>,
  experience: {
    type: Number,
    default: 0,
  } as SchemaTypeOptions<number>,
});
