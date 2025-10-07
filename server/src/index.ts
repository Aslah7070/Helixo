//* libraries and packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { env } from "./configs/env.configs";
import { connectDb } from "./configs/db.configs";
import { auth } from "./routes/index.route";
import { errorHandler } from "./middleware/http-error";
import { products } from "./routes/products.route";

const app = express();
app.use(
  cors({
    origin: env.CLIENT_ORIGIN_LOCAL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
   
  })
);

app.use(cookieParser()); 
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",auth)
app.use("/api/products",products)

connectDb()
   
app.use(errorHandler)

app.listen(env.PORT, () => console.log(`Server started at ${env.PORT} `));

  