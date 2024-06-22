import { Goal, GoalStatusEnum } from "@/models/Goal";
import axiosInstance from "./axiosInstance";
import JsonApiResponse from "@/models/JsonApiResponse";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export interface BaseFilters {
  pageNumber?: number;
  pageSize?: number;
}

export interface GoalsFilters extends BaseFilters {
  status?: GoalStatusEnum;
}

export const getGoal = async (id: string) => {
  const { data } = await axiosInstance.get<Goal>(`goals/${id}/`);
  return data;
};

export const listGoals = async (params: GoalsFilters = {}) => {
  const { data } = await axiosInstance.get<JsonApiResponse<Goal>>(`goals/`, {
    params,
  });

  return data;
};

export const goalKeys = createQueryKeys("goals", {
  get: (id: string) => ({ queryFn: () => getGoal(id), queryKey: [id] }),
  list: (filters: GoalsFilters = {}) => ({
    queryFn: () => listGoals(filters),
    queryKey: [{ filters }],
  }),
});

//TODO add page filter
