import { env } from "../configs/env.configs";
import { Response } from "express";

export function setCookie(res: Response, refreshToken: string) {
console.log("cookie secure",env.NODE_ENV==="production")
console.log("cookie ",env.NODE_ENV=="production")
    res.cookie("refreshToken", refreshToken, {
       httpOnly: true,
            secure:true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite:"none"
    });
}

export function deleteCookie(res: Response) { 
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
}           

   