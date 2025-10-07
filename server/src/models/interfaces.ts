import { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}


export interface IProduct extends Document {
  userId: Types.ObjectId;
  name: string;
  price: number;
  category: string;
  stock: number;
}