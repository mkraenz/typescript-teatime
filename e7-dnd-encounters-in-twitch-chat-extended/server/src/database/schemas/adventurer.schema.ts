import { Schema } from 'mongoose';

export const AdventurerSchema = new Schema({
  username: String,
  level: Number,
  experience: Number,
});
