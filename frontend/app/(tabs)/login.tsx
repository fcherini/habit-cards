import { Platform, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Btn } from "@/components/actions/StyledButton";
import { storeLocalData } from "@/utils/functions/localStorageUtils";
import { userKeys } from "@/services/userServices";
import { User, UserRolesEnum } from "@/models/User";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const createGuestUser = () => {
    const newUser: User = {
      _id: "string",
      role: UserRolesEnum.GUEST,
    };
    storeLocalData(userKeys.me(), newUser);
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
        <Btn onPress={() => createGuestUser()} icon="person-circle-outline">
          Continue as Guest
        </Btn>
        <Btn icon="logo-google">Login with Google</Btn>
        <Btn icon="logo-facebook">Login with Facebook</Btn>
        {Platform.select({
          ios: <Btn icon="logo-apple">Login with Apple</Btn>,
        })}
      </View>
    </View>
  );
}
