import type { NavigateFunction } from "react-router-dom";
import type { AppDispatch } from "../redux/store";
import { AuthService } from "../services/index.service";
import { logOut } from "../redux/slices/authSlice";
import { AdminService } from "../services/admin.service";
import type { AddProduct } from "../types/type";

export class adminController {

  static async findProducts(page:number,limit:number  ) {
    try {
      const response = await AdminService.getProducts(page, limit);
      if (response.success) {


  return {data:response.data,summary:response.summary,pagination:response.pagination,categories:response.categories}
        

      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

    static async addProduct(datas:AddProduct) {
    try {
      const response = await AdminService.addingProduct(datas);
      if (response.success) {


  return {data:response.data,summary:response.summary,pagination:response.pagination,categories:response.categories}
        

      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }


  static async updateProduct(productId:string,datas:AddProduct) {
    try {
      const response = await AdminService.updatingProduct(productId,datas);
      if (response.success) {
  return {data:response.data,summary:response.summary,pagination:response.pagination,categories:response.categories}  
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
      static async deleteProduct(prodcutId:string) {
    try {
      const response = await AdminService.removeProduct(prodcutId);
      if (response.success) {
           
       

  return {data:response.data,summary:response.summary,pagination:response.pagination,categories:response.categories}
        

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

   static async getStats() {
    try {
      const response = await AdminService.findStats();
      if (response.success) {


  return {months:response.months,productsSold:response.productsSold,categories:response.categories}
        

      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
