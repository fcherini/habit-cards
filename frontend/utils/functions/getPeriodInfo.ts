import { GoalPeriodEnum } from "@/models/Goal";
import { DateTimeUnit, DurationLike } from "luxon";

export const getPeriodInfo = (period: GoalPeriodEnum) => {
  let duration: DurationLike = {};
  let unit: DateTimeUnit = "day";
  switch (period) {
    case GoalPeriodEnum.DAILY:
      duration = { day: 1 };
      break;
    case GoalPeriodEnum.WEEKLY:
      duration = { weeks: 1 };
      unit = "week";
      break;
    case GoalPeriodEnum.BIWEEKLY:
      duration = { weeks: 2 };
      unit = "week";
      break;
    case GoalPeriodEnum.MONTHLY:
      duration = { month: 1 };
      unit = "month";
    default:
      break;
  }
  return { duration, unit };
};
