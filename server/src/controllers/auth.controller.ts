import { Request, Response } from "express"
import { HttpStatus } from "../constants/http.status"
import { comparePassword, hashPassword } from "../utils/bcrypt.util"
import { toObjectId } from "../utils/toObjectId.util"
import { Types } from "mongoose"
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/jwt.util"
import { deleteCookie, setCookie } from "../utils/cookie.util"
import { User } from "../models/implementations/user.model"
import { HttpResponse } from "../constants/http.response"
import { createHttpError } from "../utils/http-error.util"
import { IPayload } from "../interfaces/jwt.interface"
import { IUser } from "../models/interfaces"




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

          res.status(HttpStatus.OK).json({success:true,message:"login successfylly",accessToken:token,data:user})
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

export const me = async (req: Request, res: Response) => {
  try {
    
     const payloadHeader = req.headers["x-user-payload"] as string |undefined
     console.log("adfsf",payloadHeader)
   if (!payloadHeader) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

        const payload = JSON.parse(payloadHeader);
        const userId=payload._id

        const user=await User.findById(userId)

         if(!user){
          res.status(HttpStatus.NOT_FOUND).json({success:false,message:HttpResponse.USER_NOT_FOUND})
          return
         }
         res.status(HttpStatus.OK).json({success:true,message:"userFound",data:user})
  } catch (error) {
    console.error(error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Server error during logout." });
  }
};

export const verifyingToken = async (req: Request, res: Response) => {
  try {
    const accessToken: string | undefined = req.cookies?.accessToken;
    const refreshToken: string | undefined = req.cookies?.refreshToken;

    if (!accessToken && !refreshToken) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: HttpResponse.TOKEN_MISSING,
      });
    }

    let decodedToken: IPayload | null = null
    let newAccessToken: string | null = null;
    if (accessToken) {
      try {
        decodedToken = verifyAccessToken(accessToken)as IPayload
      } catch (err) {
        console.log("Access token invalid or expired");
      }
    }

    if (!decodedToken && refreshToken) {
      try {
        const refreshDecoded = verifyRefreshToken(refreshToken) as IPayload;
        newAccessToken = generateAccessToken(refreshDecoded); 
        decodedToken = refreshDecoded;
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });
      } catch {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: HttpResponse.TOKEN_INVALID,
        });
      }
    }
    if (!decodedToken) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: HttpResponse.USER_NOT_FOUND,
      });
    }
    let userData: IUser  | null = null;

      userData=await User.findOne({email:decodedToken.email})

    if (!userData) {
      return res.status(HttpStatus.NOT_FOUND).json({ success: false, message:HttpResponse.USER_NOT_FOUND});
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      user: userData,
      newAccessToken,
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }



};