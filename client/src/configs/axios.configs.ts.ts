import axios from "axios"
import { env } from "./env.configs"

import { store } from "../redux/store"
import { logOut, setUser } from "../redux/slices/authSlice"

const BASE_URL=env.API_URL
console.log(BASE_URL)

const axiosInstance=await axios.create({
    baseURL:BASE_URL,
     headers: {'Content-Type': 'application/json'},
     withCredentials:true
})


axiosInstance.interceptors.request.use((config)=>{
    const state=store.getState()
    console.log("axios",state)
    const {accessToken}=state.auth
    if(accessToken){
        config.headers.Authorization=`Bearer ${accessToken}`
    }
    return config
},
(error)=>Promise.reject(error)
)

// Response Interceptor: Handle Token Refresh
axiosInstance.interceptors.response.use((response)=>{return response},
         async(error)=>{
            console.log("axioserro",error)
            const originalRequest=error.config
            if(error.response?.status===401&& !originalRequest._retry){
                originalRequest._retry=true
                try {
                     const refreshToken=await axios.post(`${BASE_URL}/auth/refresh-token`,{},{withCredentials:true})
                     console.log("ioio",refreshToken)
                     const accessToken=refreshToken.data.accessToken
                      store.dispatch(setUser({accessToken}));
                     originalRequest.headers.Authorization=`Bearer ${accessToken}`
                     return axiosInstance(originalRequest)
                } catch (refreshError) {
                    console.log("axios",refreshError)
                    store.dispatch(logOut())
                    return Promise.reject(refreshError);   


                    
                }   
            }
             return Promise.reject(error);
         }
)


export {axiosInstance}