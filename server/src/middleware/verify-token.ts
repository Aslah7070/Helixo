import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.util"
import { HttpResponse } from "../constants/http.response";
import { HttpStatus } from "../constants/http.status";
import { createHttpError } from "../utils/http-error.util"

export default function (): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers.authorization;
      console.log("authHeaderssssssss",authHeader)

      if (!authHeader || !authHeader.startsWith("Bearer")) {
        console.log("dsf")
        // throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.TOKEN_MISSING)
          return next(createHttpError(HttpStatus.UNAUTHORIZED, "poyi monee"));
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
      return next(createHttpError(HttpStatus.UNAUTHORIZED, "entho aavo"));
      }

      const payload = verifyAccessToken(token) as {
        _id: string;
        email: string;
        password: string
      };
         console.log(payload,"verificatio failed")
         if(!payload){
            res.status(HttpStatus.UNAUTHORIZED).json({success:false,message:"padachonariya"})
            return
         
         }


      req.headers["x-user-payload"] = JSON.stringify(payload);
      next();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
          console.log("else",err)
          return next(createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.TOKEN_INVALID));
      } else {
        console.log("ifelse",err)
         return next(createHttpError(HttpStatus.FORBIDDEN, HttpResponse.INVALID_CREDENTIALS));
      }
    }
  };
}