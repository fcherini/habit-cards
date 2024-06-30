import { GoalPeriodEnum } from "@/models/Goal";
import { Dispatch, SetStateAction } from "react";
import { Pressable, View } from "react-native";
import { Txt } from "../StyledText";

export const PeriodSlider = ({
  period,
  setPeriod,
}: {
  period: GoalPeriodEnum;
  setPeriod: Dispatch<SetStateAction<GoalPeriodEnum>>;
}) => {
  return (
    <View className="flex flex-row bg-base-5 px-2.5 justify-between rounded-8">
      {Object.keys(GoalPeriodEnum).map((key) => {
        const isActive = (key as GoalPeriodEnum) === period;
        return (
          <Pressable
            onPress={() => setPeriod(key as GoalPeriodEnum)}
            className={`px-2 py-1 rounded-8 ${
              isActive ? "bg-base-100 text-base-0" : "text-base-content"
            }`}
            key={key}
          >
            <Txt type="detail" className="text-inherit">
              {key}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
};
