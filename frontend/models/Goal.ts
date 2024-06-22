export enum GoalStatusEnum {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export type Goal = {
  id: number;
  title: string;
  rank: number;
  userId: number;
  status: GoalStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};
