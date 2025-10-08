/* eslint-disable react-hooks/exhaustive-deps */
import type React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hook";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../configs/axios.configs.ts";
import { logOut, setUser } from "../redux/slices/authSlice";
import Loader from "../components/re-usable/Loader.tsx";


interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children, 
  allowedRoles,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  console.log(user,"worked");
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
 
  const verifyToken = async () => {
  const start = Date.now();
  try {
    const response = await axiosInstance.get(`/auth/verify-token`);
    if (response.data.success) {
      const { user } = response.data;
      dispatch(setUser({ user }));
      console.log("nsdnmds,mds")
    } else {
      dispatch(logOut());
      navigate("/");
    }
  } catch (error) {
    console.error("Token verification failed:", error);    
    console.log("noteeeeeeeeee,mds")

    dispatch(logOut());
    navigate("/");
  } finally {
    const elapsed = Date.now() - start;
    const minDelay = 0; 
    const remaining = minDelay - elapsed;
    console.log("remaining",remaining)

    if (remaining > 0) {
      setTimeout(() => setIsLoading(false), remaining);
    } else {
      setIsLoading(false);
    }
  }
};

  useEffect(() => {
    
    verifyToken();
  }, [dispatch, navigate]);


  if (isLoading) {
    return (
      <div className="w-full h-screen flex bg-black items-center justify-center">

    <Loader/>

  
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }


  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    console.log("not")
    verifyToken()
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
