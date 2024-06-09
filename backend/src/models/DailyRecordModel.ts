import { Schema, model, Document } from "mongoose";

interface IDailyRecord extends Document {
  habitId: number;
  date: Date;
  seconds: number;
  score: number;
}

const dailyRecordSchema = new Schema({
  habitId: { type: Schema.Types.ObjectId, ref: "HabitCard", required: true },
  date: { type: Date, required: true },
  seconds: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
});

export default model<IDailyRecord>("DailyRecord", dailyRecordSchema);
