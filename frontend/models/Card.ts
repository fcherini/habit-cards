export type Card = {
  id: number;
  title: string;
  rank: number;
  ratingWeekSum?: number;
  scoreDaySum?: number;
  secondsWeek: number;
  secondsDay: number;
};
