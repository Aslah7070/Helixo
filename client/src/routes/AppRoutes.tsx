
import { Route, Routes } from 'react-router-dom'

// import { useAppSelector } from '../redux/hooks/hook'
import { AuthHydrator } from '../redux/hooks/hydrator';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

const AppRoutes = () => {
  // const { user,isAuthenticated } = useAppSelector((state) => state.auth);
  <AuthHydrator/>

  return (
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route  path='/admin/*' element={
      <ProtectedRoute  allowedRoles={["admin"]} >
             <AdminRoute/>
      </ProtectedRoute>
    } />
    </Routes>
  )
}

export default AppRoutes
