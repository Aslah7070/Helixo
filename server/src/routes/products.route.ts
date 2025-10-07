import express from "express";
import verrifyAuth from "../middleware/verify-token"
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/products.controller";
const products=express.Router()


products.use(verrifyAuth())
products.get("/",getProducts)
products.post("/add",createProduct)
products.patch("/update/:id",updateProduct)
products.delete("/delete/:id",deleteProduct)






export{products} 