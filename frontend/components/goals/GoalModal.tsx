import { Colors } from "@/constants/Colors";
import { Goal } from "@/models/Goal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fragment } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Txt } from "../StyledText";

export const GoalModal = ({
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
