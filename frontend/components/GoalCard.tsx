import { Goal } from "@/models/Goal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";
import { Txt } from "./StyledText";
import { Card } from "./actions/StyledCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const GoalCard = ({ goal }: { goal: Goal }) => {
  const goalCurrent = 1;
  const currentHours = Math.round(goalCurrent * goal.hours);
  const goalHours = Math.round(goal.goal * goal.hours);
  const goalPercentage = Math.round((goalCurrent / goal.goal) * 100);

  return (
    <Card
      onPress={() => {}} //TODO open goal stats
      onLongPress={() => {}} //TODO open quick menu like edit and delete
      className="w-full max-w-80 px-4 py-3 relative overflow-hidden pb-8"
      type={goal.group ? "blank" : "default"}
    >
      <View className="flex w-full flex-row justify-between">
        <View>
          <Txt type="title" className="uppercase">
            {goal.title}
          </Txt>
          <View className="flex flex-row gap-1.5">
            <Txt type="small">Total</Txt>
            <View className="flex flex-row">
              <Txt type="small" className="font-bold">
                {Math.round(goalCurrent * goal.energy)}
              </Txt>
              <Ionicons name="flash" size={12} />
            </View>
          </View>
        </View>
        <View className="flex items-center">
          <Txt className="font-semibold">{goal.countTitle}</Txt>
          <Counter
            increment={goal.increment}
            value={goalCurrent}
            baseValue={goal.goal}
          />
        </View>
      </View>
      <View className="absolute bottom-0 bg-base-25 border border-base-100 w-[101%] h-6">
        <Txt className="absolute bottom-1 italic text-base-5 text-[length:0.75rem] z-10 pl-4">
          {currentHours}/{goalHours} hours
        </Txt>
        <View
          className="transition-all bg-base-50 h-full border-r rounded-r-6 border-base-100"
          style={{ width: `${goalPercentage}%` }}
        ></View>
      </View>
    </Card>
  );
};

const Counter = ({
  value,
  baseValue,
  increment,
}: {
  value: number;
  increment: number;
  baseValue?: number;
}) => {
  const [count, setCount] = useState(value);

  const handleIncrement = () => {
    setCount(count + increment);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - increment);
    }
  };

  return (
    <View className="flex flex-row items-center gap-2.5">
      <Ionicons
        onPress={handleDecrement}
        name="remove-circle"
        size={24}
        disabled={count <= 0}
      />
      <View className="bg-base-0 min-w-14 justify-center rounded-full flex flex-row px-2 py-0.5 items-center">
        <Txt className="text-14 font-semibold">{count}</Txt>
        <Txt className="text-10 font-semibold">/{baseValue}</Txt>
      </View>
      <Ionicons onPress={handleIncrement} name="add-circle" size={24} />
    </View>
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
