import mongoose, { Schema, Document } from "mongoose";

export enum UserRolesEnum {
  FREE = "free",
  PAID = "paid",
  ADMIN = "admin",
}

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: UserRolesEnum;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(UserRolesEnum),
    default: UserRolesEnum.FREE,
    required: true,
  },
});

export default mongoose.model<IUser>("User", UserSchema);
