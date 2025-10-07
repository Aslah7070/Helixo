import { Lock, Mail } from "lucide-react"
import { Link } from "react-router-dom"


const SignUp = () => {
  return (
 <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">SIGN UP</h2>

        <form className="space-y-5">
     
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <Mail className="text-gray-400 mr-2 w-4 h-4" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <Lock className="text-gray-400 mr-2 w-4 h-4" />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#0B132B] text-white font-semibold py-2 rounded-md hover:bg-[#1C2541] transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#0B132B] font-medium hover:underline hover:text-[#1C2541]"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
