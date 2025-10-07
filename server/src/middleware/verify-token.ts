import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.util"
import { HttpResponse } from "../constants/http.response";
import { HttpStatus } from "../constants/http.status";
import { createHttpError } from "../utils/http-error.util"

export default function (): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers.authorization;
      console.log("authHeader",authHeader)

      if (!authHeader || !authHeader.startsWith("Bearer")) {
        console.log("dsf")
        throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.TOKEN_MISSING)
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.TOKEN_MISSING)
      }

      const payload = verifyAccessToken(token) as {
        _id: string;
        email: string;
        password: string
      };
         console.log(payload,"erer")
         if(!payload){
           throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.TOKEN_INVALID)
         }


      req.headers["x-user-payload"] = JSON.stringify(payload);
      next();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.INVALID_CREDENTIALS)
      } else {
        console.log("rere",err)
        throw createHttpError(HttpStatus.FORBIDDEN, HttpResponse.TOKEN_MISSING)
      }
    }
  };
}