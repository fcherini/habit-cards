import { GoalPeriodEnum } from "@/models/Goal";
import { getPeriodInfo } from "@/utils/functions/getPeriodInfo";
import { Ionicons } from "@expo/vector-icons";
import { DateTime } from "luxon";
import { useState } from "react";
import { View } from "react-native";
import { Card } from "../actions/StyledCard";
import { Txt } from "../StyledText";
import { TotalEnergy } from "../goals/GoalCard";

export const DateSlider = ({
  periodView,
  date,
}: {
  periodView: GoalPeriodEnum;
  date: DateTime;
}) => {
  const periodInfo = getPeriodInfo(periodView);
  const [currentDate, setCurrentDate] = useState(date);
  // const [interval, setInterval] = useState(
  //   Interval.before(currentDate.endOf(periodInfo.unit), periodInfo.duration)
  // );

  type DateInfo = { title: string | number; subtitle: string | number };

  const format = "MMM dd";

  const getDateInfo = (period: GoalPeriodEnum) => {
    let dateInfo: DateInfo = { title: "", subtitle: "" };
    switch (period) {
      case GoalPeriodEnum.DAILY:
        dateInfo.title = `${currentDate.toFormat(format)}`;
        dateInfo.subtitle = `${currentDate.weekdayLong}`;
        break;
      case GoalPeriodEnum.WEEKLY:
        dateInfo.title = `Week ${currentDate.weekNumber}`;
        dateInfo.subtitle = `${currentDate
          .startOf(periodInfo.unit)
          .toFormat(format)} - ${currentDate
          .endOf(periodInfo.unit)
          .toFormat(format)}`;
        break;
      case GoalPeriodEnum.BIWEEKLY:
        dateInfo.title = `Weeks ${currentDate.weekNumber - 1}-${
          currentDate.weekNumber
        }`;
        dateInfo.subtitle = `${currentDate
          .endOf(periodInfo.unit)
          .minus(periodInfo.duration)
          .toFormat("MMM dd")} - ${currentDate
          .endOf(periodInfo.unit)
          .toFormat("MMM dd")}`;
        break;
      case GoalPeriodEnum.MONTHLY:
        dateInfo.title = `${currentDate.monthLong}`;
        dateInfo.subtitle = `${currentDate.year}`;
    }
    return dateInfo;
  };

  const dateInfo = getDateInfo(periodView);

  const handleDecrease = () => {
    setCurrentDate(currentDate.minus(periodInfo.duration));
  };

  const handleIncrease = () => {
    setCurrentDate(currentDate.plus(periodInfo.duration));
  };

  return (
    <View className="flex flex-row items-center w-full justify-between">
      <Ionicons
        onPress={handleDecrease}
        size={24}
        name="chevron-back-outline"
      />
      <Card className="shadow-box-sm flex-row gap-3.5 rounded-12">
        <View className="flex flex-col items-center">
          <Txt type="detail">{dateInfo.title}</Txt>
          <Txt>{dateInfo.subtitle}</Txt>
        </View>
        <TotalEnergy className="flex-col items-center gap-0" count={5} />
      </Card>
      <Ionicons
        onPress={handleIncrease}
        size={24}
        name="chevron-forward-outline"
      />
    </View>
  );
};

// const DateCard = ({ date }: { date: DateTime<true> | null }) => {
//   const todayDiff = date?.diff(DateTime.local(), "days").toObject().days || 0;
//   const isToday = todayDiff >= -1;
//   const txtClassName = isToday ? "text-base-100" : "";
//   return (
//     <Pressable
//       className={`${
//         isToday ? "bg-primary" : "bg-primary-content"
//       } transition-all border items-center border-base-content rounded-lg shadow-box hover:shadow-box-sm py-4 px-5`}
//     >
//       <Txt type="small" className={twMerge(txtClassName, "lowercase")}>
//         {date?.monthShort}
//       </Txt>
//       <Txt className={txtClassName} type="subtitle">
//         {date?.day}
//       </Txt>
//       <Txt type="small" className={twMerge(txtClassName, "uppercase")}>
//         {date?.weekdayShort}
//       </Txt>
//     </Pressable>
//   );
// };
