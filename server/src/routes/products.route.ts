import express from "express";
import verrifyAuth from "../middleware/verify-token"
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/products.controller";
const products=express.Router()


products.use(verrifyAuth())

products.post("/create",createProduct)
products.patch("/update/:id",updateProduct)
products.delete("/delete/:id",deleteProduct)
products.get("/",getAllProducts)





export{products}