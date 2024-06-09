import { Schema, model, Document } from "mongoose";

export enum GoalStatusEnum {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export interface IGoal extends Document {
  title: string;
  rank: number;
  status: GoalStatusEnum;
}

const GoalSchema: Schema = new Schema({
  title: { type: String, required: true },
  rank: { type: Number, required: true },
  status: {
    type: String,
    enum: Object.values(GoalStatusEnum),
    default: GoalStatusEnum.ACTIVE,
    required: true,
  },
});

export default model<IGoal>("Goal", GoalSchema);
