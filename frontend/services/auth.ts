import * as WebBrowser from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session/providers/google";
import { AuthSessionResult, AuthRequestPromptOptions } from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/models/User";

interface AuthService {
  getLocalUser: () => Promise<User | null>;
  getUserInfo: (token: string) => Promise<User | null>;
  useGoogleAuth: () => [() => void, AuthSessionResult | null];
}

// Helper functions
const getLocalUser = async (): Promise<User | null> => {
  const data = await AsyncStorage.getItem("@user");
  return data ? JSON.parse(data) : null;
};

const getUserInfo = async (token: string): Promise<User | null> => {
  try {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }

    const user = await response.json();
    await AsyncStorage.setItem("@user", JSON.stringify(user));
    return user;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

// Hook for Google Authentication
const useGoogleAuth = (): [() => void, AuthSessionResult | null] => {
  const [_req, res, promptAsync] = useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB,
  });

  WebBrowser.maybeCompleteAuthSession();

  return [promptAsync, res];
};

const authService: AuthService = {
  getLocalUser,
  getUserInfo,
  useGoogleAuth,
};

export default authService;
