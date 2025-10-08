
import express from "express"
import { login, logout, me, refreshAccessToken, signup, verifyingToken } from "../controllers/auth.controller"
import verrifyAuth from "../middleware/verify-token"
const auth=express.Router()

auth

.post("/signup",signup)
.post("/login",login)
.post("/logout",logout)
.get('/verify-token',verifyingToken)
.get("/me",verrifyAuth(),me)
.post("/refresh-token",refreshAccessToken)



export  {auth}        