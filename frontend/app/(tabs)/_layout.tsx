import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import "../../global.css";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: colorScheme,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "home" : "home-outline"} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "add",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={"add"} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "code-slash" : "code-slash-outline"} />
          ),
        }}
      />
    </Tabs>
  );
}
