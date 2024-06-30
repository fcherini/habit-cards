import { Pressable, View } from "react-native";
import { GoalCard } from "@/components/GoalCard";
import { useQuery } from "@tanstack/react-query";
import { goalKeys, listGoals } from "@/services/goalServices";
import { DateTime, Interval } from "luxon";
import { Txt } from "@/components/StyledText";
import { twMerge } from "tailwind-merge";
import { Ionicons } from "@expo/vector-icons";
import { Goal } from "@/models/Goal";
import { TextInput } from "react-native-gesture-handler";
import { Fragment, useState } from "react";
import { Colors } from "@/constants/Colors";
import { goalGenerator } from "@/utils/functions/generators";

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

  const [isVisible, setIsVisible] = useState(false);
  let today = DateTime.local();
  let start = today.minus({ days: 5 });
  let interval = Interval.fromDateTimes(start, today.plus({ day: 1 }))
    .splitBy({ day: 1 })
    .map((date: Interval) => date.start);

  //TODO apply translation
  //TODO fix responsive grid
  //TODO apply backgrounds globally
  return (
    <View className="flex h-screen flex-col w-full justify-center items-center self-center relative md:max-w-2xl">
      <View className="w-full flex flex-row items-center gap-2 text-base">
        {interval.map((day, i) => (
          <DateCard key={i} date={day} />
        ))}
      </View>
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

const DateCard = ({ date }: { date: DateTime<true> | null }) => {
  const todayDiff = date?.diff(DateTime.local(), "days").toObject().days || 0;
  const isToday = todayDiff >= -1;
  const txtClassName = isToday ? "text-base-100" : "";
  return (
    <Pressable
      className={`${
        isToday ? "bg-primary" : "bg-primary-content"
      } transition-all border items-center border-base-content rounded-lg shadow-box hover:shadow-box-sm py-4 px-5`}
    >
      <Txt type="small" className={twMerge(txtClassName, "lowercase")}>
        {date?.monthShort}
      </Txt>
      <Txt className={txtClassName} type="subtitle">
        {date?.day}
      </Txt>
      <Txt type="small" className={twMerge(txtClassName, "uppercase")}>
        {date?.weekdayShort}
      </Txt>
    </Pressable>
  );
};

const GoalDragItem = ({ goal }: { goal: Goal }) => {
  return (
    <Pressable className="flex flex-row items-center gap-3">
      <View className="flex flex-row gap-0">
        <Ionicons name="ellipsis-vertical" />
        <Ionicons name="ellipsis-vertical" />
      </View>
      <Txt className="shadow-box-sm border border-base-content bg-base-100 py-2 px-3 rounded-md w-full lowercase">
        {goal.title}
      </Txt>
    </Pressable>
  );
};
const GoalDragList = ({ goals }: { goals?: Goal[] }) => {
  return (
    <View className="gap-1.5">
      {goals?.map((goal) => (
        <GoalDragItem key={goal._id.toString()} goal={goal} />
      ))}
    </View>
  );
};

const GoalModal = ({
  goals,
  isVisible,
}: {
  goals?: Goal[];
  isVisible: boolean;
}) => {
  // const { mutate: create, isLoading: isCreating } = useMutation(onCreate, {
  //   onSuccess: () => {
  //     setHasAlter(false);
  //     alert.success(t("addSuccess"));
  //     queryClient.invalidateQueries([klassessQueryKey]);
  //     onCancel?.();
  //   },
  //   onError: (error: any) => {
  //     const apiError = new ApiError(error);
  //     alert.error(apiError.getErrorMessage());
  //   },
  // });

  return isVisible ? (
    <View
      className="flex gap-4 absolute h-[80vh] py-6 px-7
    8 w-full bottom-0 self-center max-w-screen-sm bg-primary-content rounded-t-xl border border-base-content"
    >
      <TextInput
        className="border border-base-content rounded-md py-3 px-4 bg-base-100 shadow-box-sm"
        placeholderTextColor={Colors.baseContent}
        placeholder="name of your goal or habit"
      />
      <GoalDragList goals={goals} />
    </View>
  ) : (
    <Fragment />
  );
};
