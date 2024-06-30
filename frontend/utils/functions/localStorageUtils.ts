import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryKey } from "@tanstack/react-query";

export const getLocalData = async (key: QueryKey) => {
  try {
    const data = await AsyncStorage.getItem(key.toString());
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting data", error);
    return null;
  }
};

export const storeLocalData = async (key: QueryKey, data: Object) => {
  try {
    await AsyncStorage.setItem(key.toString(), JSON.stringify(data));
  } catch (error) {
    console.error("Error storing data", error);
  }
};
