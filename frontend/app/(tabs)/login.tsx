import { View, Text, Pressable, Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Btn } from "@/components/actions/StyledButton";

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
    <View className="flex flex-col items-center justify-center w-full h-screen">
      <View className="flex flex-col gap-4 w-48 items-center">
        <Btn type="accent" icon="person-circle">
          Create Account
        </Btn>
        <View className="h-px bg-base-50 w-[50%]" />
        <Btn icon="person-circle-outline">Continue as Guest</Btn>
        <Btn icon="logo-google">Login with Google</Btn>
        <Btn icon="logo-facebook">Login with Facebook</Btn>
        {Platform.select({
          ios: <Btn icon="logo-apple">Login with Apple</Btn>,
        })}
      </View>
    </View>
  );
}
