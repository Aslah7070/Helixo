import { createSlice } from "@reduxjs/toolkit";
import type { DecodedToken } from "../../types/type";
import { decodeToken, TokenUtils } from "../../lib/token.utils";
import Cookies from "js-cookie"

export interface AuthState {
  user: DecodedToken;
  accessToken:string|null
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: decodeToken(),
  accessToken:TokenUtils.getToken()||null,
  isAuthenticated:!!TokenUtils.getToken(),
  loading: false,
};
console.log("tok",TokenUtils.getToken())
export const authSlice=createSlice({
        name:"auth",
        initialState,

        reducers:{
            setUser:(state,action)=>{
              console.log("A",action)
                state.user=action.payload.user
                if(action.payload?.accessToken){
              state.accessToken=action.payload?.accessToken
                }
               
                state.isAuthenticated=!!action.payload
                TokenUtils.setToken(action.payload?.accessToken)

            },
            logOut:(state)=>{
                state.user={ _id: '', name: '', role: '' };
                state.isAuthenticated=false
                TokenUtils.removeToken()
                // window.location.href = '/'; 
            },
             rehydrate: (state) => {
      if(typeof window !== 'undefined') {
        const token = Cookies.get('accessToken');
        const user = Cookies.get('user');
        if (token) {
          state.accessToken = token;
          state.user = user ? JSON.parse(user) : null;
        } else {
          state.accessToken  = null;
          state.user = { _id: '', name: '', role: '' };
        }
      }else{
        return state; 
      }
    },
        }
        
})

export const {setUser,logOut,rehydrate}=authSlice.actions
export default authSlice.reducer