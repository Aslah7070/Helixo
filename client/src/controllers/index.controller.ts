import type { NavigateFunction } from "react-router-dom";
import type { AppDispatch } from "../redux/store";
import { AuthService } from "../services/index.service";
import { logOut, setUser } from "../redux/slices/authSlice";
import toast from "react-hot-toast";


export class AuthController {
  static async login(
    email: string,
    password: string,
    dispatch: AppDispatch,
    navigate: NavigateFunction
  ) {
    try {
      const response = await AuthService.login(email, password);
      if (response.success) {
           
        const { accessToken,data} = response;
       toast.success("login successfully")
  
        
        dispatch(setUser({accessToken,data}));
 
        navigate("/admin/");
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }


  static async logout(dispatch: AppDispatch,navigate: NavigateFunction){
    const response=await AuthService.logOut()
    if(response.success){
 
        
        dispatch(logOut())
        navigate("/")

       }
  }

    static async findActiveUser(){
      console.log("tuouo")
    const response=await AuthService.getActiveUser()
    console.log("tuouo",response)
    if(response.success){
 
return response.data
       }
  }
}
