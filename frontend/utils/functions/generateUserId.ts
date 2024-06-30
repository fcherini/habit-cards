import { ObjectId } from "bson";

export const generateLocalObjectId = (): ObjectId => {
  return new ObjectId();
};
