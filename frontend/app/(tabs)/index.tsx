import { View, Text } from "react-native";
import { TimeCard } from "@/components/TimeCard";
import { Goal } from "@/models/Goal";
import { useQuery } from "@tanstack/react-query";
import { goalKeys } from "@/services/goalServices";

export default function HomeScreen() {
  const { data: goalsList } = useQuery({
    ...goalKeys.list(),
    staleTime: 1000000,
  });

  return (
    //TODO apply translation
    //TODO fix responsive grid
    <View className="flex flex-col">
      <Text>Manage your!</Text>
      <View className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
        {goalsList?.data
          .sort((a, b) => a.rank - b.rank)
          .map((card) => (
            <TimeCard key={card.id} card={card} />
          ))}
      </View>
    </View>
  );
}
