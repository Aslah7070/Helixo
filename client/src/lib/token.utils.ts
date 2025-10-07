
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import  { type DecodedToken } from "../types/type";
import { env } from "../configs/env.configs";

const TOKEN_KEY="accessToken"
const a=Cookies.get(TOKEN_KEY)
console.log(a,"ddd")


export const TokenUtils = {
    setToken: (token: string, days: number = 7) => {

        if(!token)return
        Cookies.set(TOKEN_KEY, token, {
            expires: days,
            secure:env.NODE_ENV==="PRODUCTION",
            sameSite:env.NODE_ENV === "PRODUCTION" ? "none" : "lax",
        });
    },

    getToken: (): string | undefined => {
        
        return Cookies.get(TOKEN_KEY);
    },

    removeToken: () => {
        console.log("chck")
        Cookies.remove(TOKEN_KEY);
    }
};

export const decodeToken = (): DecodedToken => {
    const token = TokenUtils.getToken();
    let user: DecodedToken = { _id: '', name: '', role: '' };
    if (token) {
        try {
            user = jwtDecode(token);
        } catch (err) {
            console.error("Invalid token", err);
        }
    }
    return user
}