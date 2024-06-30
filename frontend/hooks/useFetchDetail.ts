import { ServiceDetailFn } from "@/models/Services";
import {
  getLocalData,
  storeLocalData,
} from "@/utils/functions/localStorageUtils";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UserRolesEnum } from "@/models/User";
import handleRequests from "@/utils/functions/handleRequests";

interface UseFetchDetailOptions<T, Filters, Params>
  extends Omit<UseQueryOptions<T>, "queryFn"> {
  queryKey: QueryKey;
  service: ServiceDetailFn<T, Filters, Params>;
  userRole?: UserRolesEnum;
  mapFields?: (data: T) => Partial<T>;
}

const useFetchDetail = <T, Filters = {}, Params = {}>(
  options: UseFetchDetailOptions<T, Filters, Params>
) => {
  const { queryKey, service, userRole, mapFields, ...queryOptions } = options;

  return useQuery<T>({
    queryKey,
    queryFn: async () => {
      const localRequest = async () => {
        const localData: T = await getLocalData(queryKey);
        return localData;
      };
      const onlineRequest = async () => {
        const apiData = await service();
        const partialData = mapFields ? mapFields(apiData) : apiData;
        await storeLocalData(queryKey, partialData);
        return apiData;
      };
      return handleRequests({
        userRole,
        localRequest,
        onlineRequest,
      });
    },
    staleTime: 50000,
    ...queryOptions,
  });
};

export default useFetchDetail;
