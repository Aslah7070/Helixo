import { axiosInstance } from "../configs/axios.configs.ts";
import { ADMIN_ROUTES } from "../constants/api.constant.ts";
import { handleApiError } from "../lib/utils/errorHandling.ts";
import type { AddProduct } from "../types/type.ts";

export class AdminService {
  static async getProducts(page: number, limit: number) {
    try {
      const response = await axiosInstance.get(
        `${ADMIN_ROUTES.GET_PRODUCTS}?page=${page}&limit=${limit}`
      );

      return response.data;
    } catch (error) {
      if (error) {
     
        handleApiError(error);
      }
    }
  }

  static async addingProduct(datas: AddProduct) {
    try {
      const response = await axiosInstance.post(
        ADMIN_ROUTES.ADD_PRODUCTS,
        datas
      );

      return response.data;
    } catch (error) {
      if (error) {
           console.log("adding",error)
        handleApiError(error);
      }
    }
  }

   static async findStats() {
    try {
      const response = await axiosInstance.get(ADMIN_ROUTES.GET_STATS);

      return response.data;
    } catch (error) {
      if (error) {
           console.log("adding",error)
        handleApiError(error);
      }
    }
  }


  static async updatingProduct(productId: string, datas: AddProduct) {
    try {
      const response = await axiosInstance.patch(
        `${ADMIN_ROUTES.UPDATE_PRODUCTS}/${productId}`,
        datas
      );
      return response.data;
    } catch (error) {
      if (error) {
        handleApiError(error);
      }
    }
  }
  static async removeProduct(productId: string) {
    try {
      const response = await axiosInstance.delete(
        `${ADMIN_ROUTES.DELETE_PRODUCTS}/${productId}`
      );

      return response.data;
    } catch (error) {
      if (error) {
        handleApiError(error);
      }
    }
  }
}
