import { Request, Response } from "express"
import { HttpStatus } from "../constants/http.status"
import { comparePassword, hashPassword } from "../utils/bcrypt.util"
import { toObjectId } from "../utils/toObjectId.util"
import { Types } from "mongoose"
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util"
import { deleteCookie, setCookie } from "../utils/cookie.util"
import { User } from "../models/implementations/user.model"
import { HttpResponse } from "../constants/http.response"




export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log("object",name)

 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: HttpResponse.USER_ALREADY_EXISTS });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(HttpStatus.CREATED)
      .json({ success: true, message:HttpResponse.USER_CREATED, data: newUser });
  } catch (error) {
    console.error(error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Something went wrong. Please try again later." });
  }
};








export const login=async(req:Request,res:Response)=>{
        const {email,password}= req.body
        const user=await User.findOne({email:email})    
        if(!user){
            res.status(HttpStatus.NOT_FOUND).json({success:false,message:`${email} not existing`})
            return
        }
        const isMatch=await comparePassword(password,user.password)
        if(!isMatch){
            res.status(HttpStatus.BAD_REQUEST).json({success:false,message:"wrong password"})
            return 
        }

          const verifiedId = toObjectId((user._id as Types.ObjectId).toString());
        const payload={_id:verifiedId,type:"User",email:user.email}
        const token= await generateAccessToken(payload)
     
        const refreshToken=await generateRefreshToken(payload)
        
      setCookie(res,refreshToken)

          res.status(HttpStatus.OK).json({success:true,message:"login successfylly",token:token,data:user})
}  

export const logout = async (req: Request, res: Response) => {
  try {
   
    deleteCookie(res);


    return res
      .status(HttpStatus.OK)
      .json({ success: true, message:HttpResponse.LOGOUT_SUCCESS});
  } catch (error) {
    console.error(error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Server error during logout." });
  }
};