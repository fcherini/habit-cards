import { View, Text, Pressable } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [token, setToken] = useState<string>("");
  const [userInfo, setUserInfo] = useState(null);
  const [req, res, promptAsync] = useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB,
  });

  useEffect(() => {
    handleEffect();
  }, [res, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user", user);
    if (!user) {
      if (res?.type === "success") {
        // setToken(response.authentication.accessToken);
        getUserInfo(res.authentication?.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token?: string) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };
  return (
    //TODO apply translation
    //TODO fix responsive grid
    <View className="flex flex-col">
      <View className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
        <Pressable onPress={() => promptAsync()}>
          <Text>Sign with Google</Text>
        </Pressable>
      </View>
    </View>
  );
}
