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
