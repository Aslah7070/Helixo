import express from "express";
import verrifyAuth from "../middleware/verify-token"
import { createProduct, deleteProduct, getProducts, getStats, updateProduct } from "../controllers/products.controller";
import { refreshAccessToken } from "../controllers/auth.controller";
const products=express.Router()


products.use(verrifyAuth())
products.get("/",getProducts)
products.post("/add",createProduct)
products.patch("/update/:id",updateProduct)
products.delete("/delete/:id",deleteProduct)
products.post("/refresh-token",refreshAccessToken)
products.get("/stats",getStats)






export{products} 