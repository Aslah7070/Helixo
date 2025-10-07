import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { AuthController } from "../controllers/index.controller";
import { useDispatch } from "react-redux";
import { loginSchema } from "../schemas/validations";

const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema:loginSchema,
    onSubmit: async(values) => {
      console.log("Form data", values);
      const {email,password}=values
        await AuthController.login(email,password,dispatch,navigate)
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          LOGIN
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div
              className={`flex items-center border rounded-md px-3 py-2 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <Mail className="text-gray-400 mr-2 w-4 h-4" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div
              className={`flex items-center border rounded-md px-3 py-2 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <Lock className="text-gray-400 mr-2 w-4 h-4" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#0B132B] text-white font-semibold py-2 rounded-md hover:bg-[#1C2541] transition duration-200"
          >
            Login
          </button>
        </form>

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
  );
};

export default Login;
