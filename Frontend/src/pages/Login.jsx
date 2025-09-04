import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loginAnimation from "../assets/animation/login.json";
import { useState, useContext } from 'react';
import { FcGoogle } from "react-icons/fc";
import bgImage from "../assets/background2.png";
import { UserContext } from "../components/userContext";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState(''); // ✅ NEW: error message
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLoginError(''); // ✅ clear error as user types
  };

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:5000/auth/login",
      formData,
      { withCredentials: true } // ✅ cookie stored in browser
    );

    // Backend should send { user: ... }
    setUser(response.data.user);
    navigate("/");
  } catch (error) {
    console.error("Login error:", error);

    if (error.response && error.response.data) {
      setLoginError(error.response.data.error || "Login failed. Please try again.");
    } else {
      setLoginError("Something went wrong. Please try again.");
    }
  }
};

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <motion.div
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Link to="/">
        <button className="absolute top-6 left-6 px-4 py-2 bg-yellow-200 text-black rounded-xl hover:bg-red-800 hover:text-white transition">
          ← Back to Home
        </button>
      </Link>

      <div className="flex flex-col md:flex-row items-center gap-12 bg-yellow-50 p-8 rounded-xl shadow-xl max-w-5xl w-full">
        <div className="w-full md:w-1/2">
          <Lottie animationData={loginAnimation} loop className="w-full max-h-[400px]" />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-orange-800 mb-6 text-center">Welcome Back!</h1>
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
<div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="Password"
    required
    className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none"
  />
  <div
    className="absolute top-3.5 right-3 text-xl text-orange-700 cursor-pointer"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
  </div>
</div>

            {/* ✅ Error message below inputs */}
            {loginError && (
              <p className="text-red-600 text-sm text-center -mt-2">{loginError}</p>
            )}

            <button
              className="bg-orange-800 text-white py-3 rounded-md hover:bg-orange-500 transition"
              type="submit"
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 w-full py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
            >
              <FcGoogle className="w-5 h-5" />
              Login using Google
            </button>

            <p className="text-sm mt-6 text-center text-gray-700">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
