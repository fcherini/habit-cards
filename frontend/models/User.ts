import { ObjectId } from "bson";

export enum UserRolesEnum {
  GUEST = "guest",
  FREE = "free",
  PAID = "paid",
  ADMIN = "admin",
}

export interface User {
  _id: ObjectId;
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  role: UserRolesEnum;
}
