import { Types } from "mongoose";

export const toObjectId = (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    const error = new Error(`Invalid ObjectId format: '${id}'`);
    error.name = "InvalidObjectIdError";
    throw error;
  }
  return new Types.ObjectId(id);
};