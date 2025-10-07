import { Request, Response } from "express";
import { Products } from "../models/implementations/products.model";
import { HttpStatus } from "../constants/http.status";
import { HttpResponse } from "../constants/http.response";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, category, stock } = req.body;
 const payloadHeader = req.headers["x-user-payload"] as string |undefined
   if (!payloadHeader) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

        const payload = JSON.parse(payloadHeader);
        const userId=payload._id
    const newProduct = new Products({
      userId, 
      name,
      price,
      category,
      stock,
    });

    await newProduct.save();

    res.status(HttpStatus.CREATED).json({ success: true, message:HttpResponse.PRODUCT_CREATED, data: "" });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Server error" });
  }
};



export const getProducts = async (req: Request, res: Response) => {
  
  try {
     const payloadHeader = req.headers["x-user-payload"] as string |undefined
   if (!payloadHeader) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

        const payload = JSON.parse(payloadHeader);
        const userId=payload._id
    const products = await Products.find({ userId:userId});
    res.status(HttpStatus.OK).json({ success: true, data:products });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
     const payloadHeader = req.headers["x-user-payload"] as string |undefined
   if (!payloadHeader) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
console.log( req.params.id)
        const payload = JSON.parse(payloadHeader);
        const userId=payload._id
    const product = await Products.findOneAndUpdate(
      { _id: req.params.id, userId: userId},
      req.body,
      { new: true }
    );

    if (!product) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message:HttpResponse.PRODUCT_NOT_FOUND });

    res.status(HttpStatus.OK).json({ success: true, message:HttpResponse.PRODUCT_UPDATED, data:product });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Server error" });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {

  try {
     const payloadHeader = req.headers["x-user-payload"] as string |undefined
   if (!payloadHeader) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

        const payload = JSON.parse(payloadHeader);
        const userId=payload._id
    const product = await Products.findOneAndDelete({ _id: req.params.id, userId:userId });

    if (!product) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message:HttpResponse.PRODUCT_NOT_FOUND});

    res.status(HttpStatus.OK).json({ success: true, message:HttpResponse.PRODUCT_DELETED });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Server error" });
  }
}


export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Products.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ success: false, message:HttpResponse.PRODUCT_NOT_FOUND});
    }

    res.status(200).json({ success: true, message:HttpResponse.PRODUCT_FETCH_SUCCESS,data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
