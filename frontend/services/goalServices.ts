import { Goal, GoalStatusEnum } from "@/models/Goal";
import axiosInstance from "./axiosInstance";
import JsonApiResponse, {
  BaseFilters,
  ServiceDetailFn,
  ServiceListFn,
} from "@/models/Services";
import { ObjectId } from "bson";

export interface GoalsFilters extends BaseFilters {
  status?: GoalStatusEnum;
}

export const getGoal: ServiceDetailFn<Goal, {}, {}> = async (id?: ObjectId) => {
  const { data } = await axiosInstance.get<Goal>(`goals/${id}/`);
  return data;
};

export const listGoals: ServiceListFn<Goal, GoalsFilters, {}> = async (
  params: GoalsFilters = {}
) => {
  const { data } = await axiosInstance.get<JsonApiResponse<Goal>>(`goals/`, {
    params,
  });

  return data;
};

export const goalKeys = {
  all: ["goals"] as const,
  lists: () => [...goalKeys.all, "list"] as const,
  list: (filters: GoalsFilters = {}) =>
    [...goalKeys.lists(), { filters }] as const,
  details: () => [...goalKeys.all, "detail"] as const,
  detail: (id: ObjectId) => [...goalKeys.details(), id] as const,
};

//TODO add page filter
