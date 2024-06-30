import { ObjectId } from "bson";

export enum GoalStatusEnum {
  ACTIVE = "active",
  ARCHIVED = "archived",
}
export enum GoalPeriodEnum {
  DAILY = "daily",
  WEEKLY = "weekly",
  BIWEEKLY = "biweekly",
  MONTHLY = "monthly",
}

export type GoalGroup = {
  title: string;
  _id: string;
};

export type Goal = {
  _id: ObjectId;
  title: string;
  userId?: ObjectId;
  countTitle: string;
  increment: number;
  period: GoalPeriodEnum;
  hours: number;
  energy: number;
  group?: GoalGroup;
  status: GoalStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};
