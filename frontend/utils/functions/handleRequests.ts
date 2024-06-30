import NetInfo from "@react-native-community/netinfo";
import { UserRolesEnum } from "@/models/User";

type HandleRequestsProps<T> = {
  onlineRequest: () => Promise<T>;
  localRequest: () => Promise<T>;
  userRole?: UserRolesEnum;
};

const handleRequests = async <T>({
  onlineRequest: online,
  localRequest: local,
  userRole,
}: HandleRequestsProps<T>): Promise<T> => {
  const netInfo = await NetInfo.fetch();
  const isOnline = netInfo.isConnected ?? false;
  const isGuest = userRole === UserRolesEnum.GUEST;

  if (!isOnline || isGuest) {
    return local();
  } else {
    return online();
  }
};

export default handleRequests;
