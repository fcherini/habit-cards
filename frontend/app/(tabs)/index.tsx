import { View, Text } from "react-native";
import { TimeCard } from "@/components/TimeCard";
import { Card } from "@/models/Card";

const listCards: Card[] = [
  { id: 1, title: "writing", rank: 1, secondsDay: 0, secondsWeek: 0 },
  { id: 2, title: "career", rank: 2, secondsDay: 0, secondsWeek: 0 },
];

export default function HomeScreen() {
  return (
    //TODO apply translation
    //TODO fix responsive grid
    <View className="flex flex-col">
      <Text>Manage your!</Text>
      <View className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
        {listCards
          .sort((a, b) => a.rank - b.rank)
          .map((card) => (
            <TimeCard key={card.id} card={card} />
          ))}
      </View>
    </View>
  );
}
