import { Goal, GoalGroup, GoalPeriodEnum, GoalStatusEnum } from "@/models/Goal";

export function goalGenerator(goal?: Partial<Goal>): Goal {
  return {
    _id: "1",
    title: "writing",
    countTitle: "chapters",
    status: GoalStatusEnum.ACTIVE,
    increment: 0.25,
    period: GoalPeriodEnum.WEEKLY,
    energy: 5,
    hours: 1.5,
    goal: 7,
    updatedAt: new Date(),
    createdAt: new Date(),
    ...goal,
  };
}
export function goalGroupGenerator(goalGroup?: Partial<GoalGroup>): GoalGroup {
  return {
    _id: "1",
    title: "writing",
    ...goalGroup,
  };
}
