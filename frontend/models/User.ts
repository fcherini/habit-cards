export enum UserRolesEnum {
  FREE = "free",
  PAID = "paid",
  ADMIN = "admin",
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: UserRolesEnum;
}
