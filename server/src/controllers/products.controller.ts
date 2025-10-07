import { Request, Response } from "express";
import { Products } from "../models/implementations/products.model";
import { HttpStatus } from "../constants/http.status";
import { HttpResponse } from "../constants/http.response";
import { toObjectId } from "../utils/toObjectId.util";

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
    const payloadHeader = req.headers["x-user-payload"] as string | undefined;
    if (!payloadHeader) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const payload = JSON.parse(payloadHeader);
    const userId = toObjectId(payload._id);

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

 
    const [products, total] = await Promise.all([
      Products.find({ userId }).skip(skip).limit(limit),
      Products.countDocuments({ userId }),
    ]);


    const stats = await Products.aggregate([
      { $match: { userId } },

      {
        $facet: {
         
          summary: [
            {
              $group: {
                _id: null,
                totalProducts: { $sum: 1 },
                totalValue: { $sum: "$price" },
                categories: { $addToSet: "$category" },
              },
            },
            {
              $project: {
                _id: 0,
                totalProducts: 1,
                totalValue: 1,
                totalCategories: { $size: "$categories" },
              },
            },
          ],

    
          categories: [
            {
              $group: {
                _id: "$category",
                total: { $sum: "$price" },
                items: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                name: "$_id",
                total: 1,
                items: 1,
              },
            },
            { $sort: { total: -1 } },
          ],
        },
      },
    ]);

    const summary = stats[0]?.summary?.[0] || {
      totalProducts: 0,
      totalValue: 0,
      totalCategories: 0,
    };

    const categoryBreakdown = stats[0]?.categories || [];

    res.status(HttpStatus.OK).json({
      success: true,
      data: products,
      summary,
      categories: categoryBreakdown,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Server error",
    });
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


// export const getAllProducts = async (req: Request, res: Response) => {
//   try {
//     const products = await Products.find();

//     if (!products || products.length === 0) {
//       return res.status(404).json({ success: false, message:HttpResponse.PRODUCT_NOT_FOUND});
//     }

//     res.status(200).json({ success: true, message:HttpResponse.PRODUCT_FETCH_SUCCESS,data: products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
