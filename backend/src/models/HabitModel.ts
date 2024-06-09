import { Schema, model, Document } from "mongoose";

export interface IHabit extends Document {
  title: string;
  rank: number;
}

const habitCardSchema: Schema = new Schema({
  title: { type: String, required: true },
  rank: { type: Number, required: true, unique: true },
});

export default model<IHabit>("Habit", habitCardSchema);
