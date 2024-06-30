export enum GoalStatusEnum {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}
export enum GoalPeriodEnum {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  BIWEEKLY = "BIWEEKLY",
  MONTHLY = "MONTHLY",
}

export type GoalGroup = {
  title: string;
  _id: string;
};

export type Goal = {
  _id: string;
  title: string;
  userId?: string;
  countTitle: string;
  goal: number;
  increment: number;
  period: GoalPeriodEnum;
  hours: number;
  energy: number;
  group?: GoalGroup;
  status: GoalStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};
