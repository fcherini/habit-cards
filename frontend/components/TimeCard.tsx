import { Card } from "@/models/Card";
import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export const TimeCard = ({ card }: { card: Card }) => {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(card.secondsDay);
  const rotationAnimation = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: rotationAnimation.value }],
  }));
  const onPressAnimation = () => {
    rotationAnimation.value = withTiming(isActive ? 1 : -1, { duration: 250 });
  };

  const updateSeconds = () => {
    //TODO Patch seconds to backend here
    console.log("Patching seconds to backend:", seconds);
  };

  //TODO: update on unmount

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (isActive) {
      timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      timerId ? clearInterval(timerId) : () => {};
      updateSeconds();
    }

    return () => {
      timerId ? clearInterval(timerId) : () => {};
    };
  }, [isActive]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateSeconds();
    }, 60000); //TODO separate into constant

    return () => clearInterval(intervalId);
  }, [seconds]);

  return (
    //TODO: parse seconds as hours
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={() => {
          setIsActive(!isActive);
          onPressAnimation();
        }}
        className="bg-emerald-200 text-emerald-950 p-4 h-auto w-full font-bold rounded-xl items-center flex flex-col shadow-md"
      >
        <Text>{card.title}</Text>
        <Text>{seconds}</Text>
      </Pressable>
    </Animated.View>
  );
};
