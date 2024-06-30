import { Goal } from "@/models/Goal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";
import { Txt } from "./StyledText";

export const GoalCard = ({ goal }: { goal: Goal }) => {
  return (
    <Pressable
      onPress={() => {}} //TODO open goal stats
      onLongPress={() => {}} //TODO open quick menu like edit and delete
      className="transition-all flex flex-col shadow-box-md hover:shadow-box bg-primary-content hover:bg-primary-content/50 rounded-xl aspect-[4/3] border border-base-content h-auto w-full items-center justify-center p-4 gap-4 relative"
    >
      <Txt className="rounded-full flex items-center justify-center absolute -top-1 -left-1 bg-base-content text-base-100 aspect-square w-8 h-auto">
        {goal.rank}
      </Txt>
      <Txt type="title" className="lowercase">
        {goal.title}
      </Txt>
      <EnergyIcons length={5} value={1} />
    </Pressable>
  );
};

interface EnergyIconProps {
  length: number;
  value: number;
  className?: string;
}

const EnergyIcons = ({
  length,
  value,
  className,
  ...rest
}: EnergyIconProps) => {
  return (
    <View className="flex flex-row gap-0.5">
      {Array.from({ length }, (_, index) => index + 1).map((current) => (
        <Pressable
          key={current}
          className="transition-all py-2 hover:mb-0.5 hover:py-0"
        >
          <Ionicons
            className="text-base-content"
            name={Number(value) >= current ? "flash" : "flash-outline"}
            {...rest}
            size={32}
          />
        </Pressable>
      ))}
    </View>
  );
};
