
import express from "express"
import { login, signup } from "../controllers/auth.controller"

const auth=express.Router()

auth

.post("/signup",signup)
.post("/login",login)



export  {auth}        