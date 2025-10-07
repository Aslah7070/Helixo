

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthController } from "../../controllers/index.controller";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";
import { AlertDialogBox } from "../re-usable/AlertModal";
import { Menu, X } from "lucide-react";
import { type IUser } from "../../types/type";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [active,setActive]=useState<IUser>()


  useEffect(()=>{
    if(!user._id) return
const find=async()=>{
    console.log("useEffect")
       const user= await AuthController.findActiveUser()
       console.log("active",user)
       setActive(user)

}

find()
  },[user._id])

  return (
    <header className="bg-white text-black shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo / Title */}
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-gray-600">{active?.email}</span>

          <AlertDialogBox
            triggerLabel={<>Sign out</>}
            title="Confirm logOut?"
            description="You will be logged out of your account. Are you sure you want to continue?"
            actionText="Yes,LogOut"
            cancelText="Cancel"
            triggerVariant="destructive"
            onAction={async () => {
              await AuthController.logout(dispatch, navigate);
            }}
            onCancel={() => console.log("Logout cancelled")}
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl text-gray-700"
          >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2">
          <span className="block text-gray-600">{active?.email}</span>

          <AlertDialogBox
            triggerLabel={<>Sign out</>}
            title="Confirm logOut?"
            description="You will be logged out of your account. Are you sure you want to continue?"
            actionText="Yes,LogOut"
            cancelText="Cancel"
            triggerVariant="destructive"
            onAction={async () => {
              await AuthController.logout(dispatch, navigate);
            }}
            onCancel={() => console.log("Logout cancelled")}
          />
        </div>
      )}
    </header>
  );
};

export default NavBar;
