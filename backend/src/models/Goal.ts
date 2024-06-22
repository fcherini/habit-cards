import { Schema, model, Document } from "mongoose";

export enum GoalStatusEnum {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export interface IGoal extends Document {
  title: string;
  rank: number;
  userId: number; //TODO change to string once there's user auth and validate
  status: GoalStatusEnum;
}

const GoalSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    rank: { type: Number, required: true },
    userId: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(GoalStatusEnum),
      default: GoalStatusEnum.ACTIVE,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IGoal>("Goal", GoalSchema);
