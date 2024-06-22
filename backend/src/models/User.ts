import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

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
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

// UserSchema.pre("save", async function (next) {
//   const user = this as IUser;
//   if (!user.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
//   next();
// });

// UserSchema.methods.comparePassword = function (
//   password: string
// ): Promise<boolean> {
//   return bcrypt.compare(password, this.password);
// };

export default mongoose.model<IUser>("User", UserSchema);
