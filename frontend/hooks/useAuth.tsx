import { User } from "@/models/User";
import { getMe, userKeys } from "@/services/userServices";
import { createContext, ReactNode, useContext } from "react";
import { getLocalData } from "@/utils/functions/localStorageUtils";
import useFetchDetail from "./useFetchDetail";

export interface AuthContextType {
  user?: User;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ isLoading: false });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryKey = userKeys.me();
  const { data: user, isLoading } = useFetchDetail({
    queryKey,
    service: getMe,
  });

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};
