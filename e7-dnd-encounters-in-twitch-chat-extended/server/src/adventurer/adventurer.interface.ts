import { Document } from 'mongoose';

export interface Adventurer extends Document {
  username: string;
  level: number;
  experience: number;
}
