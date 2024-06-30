import { User } from "@/models/User";
import axiosInstance from "./axiosInstance";
import { ServiceDetailFn } from "@/models/Services";

export const getMe: ServiceDetailFn<User, {}, {}> = async () => {
  const { data } = await axiosInstance.get<User>(`users/me/`);
  return data;
};

export const userKeys = {
  all: ["users"] as const,
  me: () => [...userKeys.all, "me"] as const,
};
