
import { Route, Routes } from "react-router-dom"


import AdminLayout from "../components/admin/AdminLayOut"
import NotFound from "../pages/NotFound"
import Dashboard from "../components/admin/dashboard/Layout"




const AdminRoute = () => {
  return (
 <Routes>
   <Route element={<AdminLayout/>} >

   <Route path="/"  element={<Dashboard/>}/>
         <Route path="*" element={<NotFound/>} />
   </Route>
 
 </Routes>
  )
}

export default AdminRoute
