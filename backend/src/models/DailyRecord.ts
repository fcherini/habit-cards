import { Schema, model, Document } from "mongoose";

export interface IDailyRecord extends Document {
  goalId: number;
  date: Date;
  score: number;
}

const dailyRecordSchema = new Schema(
  {
    goalId: { type: Schema.Types.ObjectId, ref: "Goal", required: true },
    date: { type: Date, required: true },
    score: {
      type: Number,
      required: true,
      score: {
        type: Number,
        min: [1, "Score must be at least 1"],
        max: [5, "Score must be at most 5"],
      },
    },
  },
  {
    timestamps: true,
  }
);

export default model<IDailyRecord>("DailyRecord", dailyRecordSchema);
