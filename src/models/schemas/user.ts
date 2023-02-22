import { Document, Schema, model, Model } from "mongoose";
import { User } from "../interfaces/user.interface";

export interface UserDocument extends User, Document {
  createdAt: Date;
  deletedAt: Date;
}
const UserSchema = new Schema(
  {
    email: String,
    userName: String,
    firstName: String,
    lastName: String,
    state: String,
    country: String,
    mobile: String
  },
  {
    timestamps: true,
  }
);

// Note: OverwriteModelError: Cannot overwrite `Users` model once compiled. error
export const users: Model<UserDocument> = model<UserDocument>("users", UserSchema, "users");
