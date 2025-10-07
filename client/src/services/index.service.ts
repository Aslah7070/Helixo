import { axiosInstance } from "../configs/axios.configs.ts";
import { AUTH_ROUTES } from "../constants/api.constant.ts";
import { handleApiError } from "../lib/utils/errorHandling.ts";




export class AuthService{
    static async login(email:string,password:string){
        try {
            const response=await axiosInstance.post(AUTH_ROUTES.LOGIN,{email,password})
            return response.data


        } catch (error) {
             if(error){
                handleApiError(error)
             }
        }
    }


    static async logOut(){
        try {
             const response=await axiosInstance.post(AUTH_ROUTES.LOGOUT)
             return response.data
        } catch (error) {
               if(error){
                handleApiError(error)
             }
        }
    }
        static async getActiveUser(){
        try {
             const response=await axiosInstance.get(AUTH_ROUTES.ME)
             console.log("re",response)
             return response.data
        } catch (error) {
               if(error){
                console.log(error)
                handleApiError(error)
             }
        }
    }
}