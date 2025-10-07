import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces";



const productSchema=new Schema<IProduct>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Products=mongoose.model<IProduct>('Products', productSchema); 