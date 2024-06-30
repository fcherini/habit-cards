import { Pressable, View } from "react-native";
import { GoalCard } from "@/components/goals/GoalCard";
import { DateTime } from "luxon";
import { Txt } from "@/components/StyledText";
import { Ionicons } from "@expo/vector-icons";
import { Goal, GoalPeriodEnum } from "@/models/Goal";
import { useState } from "react";
import { goalGenerator } from "@/utils/functions/generators";
import { PeriodSlider } from "@/components/navigation/PeriodSlider";
import { DateSlider } from "@/components/navigation/DateSlider";
import { GoalModal } from "@/components/goals/GoalModal";

export default function HomeScreen() {
  // const { data: goalsList } = useFetchData(
  //   UserRolesEnum.GUEST,
  //   goalKey,
  //   listGoals //TODO: how to use queryfn from factory
  // );

  const goalsList: Goal[] = [
    goalGenerator(),
    goalGenerator({ _id: "2", title: "drawing" }),
  ];

  let today = DateTime.local();
  const [isVisible, setIsVisible] = useState(false);
  const [period, setPeriod] = useState(GoalPeriodEnum.WEEKLY);

  //TODO apply translation
  //TODO fix responsive grid
  //TODO apply backgrounds globally
  return (
    <View className="flex h-screen flex-col w-full justify-center items-center self-center relative md:max-w-2xl bg-base-0">
      <PeriodSlider period={period} setPeriod={setPeriod} />

      <DateSlider date={today} periodView={period} />

      <Txt>How much energy did you dedicate today to your goals?</Txt>
      <View className="flex items-center justify-center flex-row flex-wrap gap-2 w-full">
        {goalsList?.map((goal) => (
          <GoalCard key={goal._id} goal={goal} />
        ))}
      </View>
      <Pressable
        onPress={() => setIsVisible(true)}
        className="bg-primary rounded-full aspect-square w-14 h-auto flex self-center items-center justify-center"
      >
        <Ionicons className="text-base-100" name="add" size={32} />
      </Pressable>
      <GoalModal isVisible={isVisible} goals={goalsList} />
    </View>
  );
}
