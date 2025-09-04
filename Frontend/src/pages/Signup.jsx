import { Link, useNavigate } from "react-router-dom"; // add useNavigate
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import SignUpAnimation from "../assets/animation/signup.json";
import { useState, useContext } from 'react';
import { FcGoogle } from "react-icons/fc";
import bgImage from "../assets/background3.png";
import { UserContext } from "../components/userContext";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate(); // initialize
  const [errorMsg, setErrorMsg] = useState("");

const handleSignup = async (e) => {
  e.preventDefault();
  setErrorMsg(""); // Reset previous errors

  try {
    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, full_name: fullName }),
    });

    const data = await response.json();

    if (response.ok) {
      setUser(data.user);
      navigate("/");
    } else {
      setErrorMsg(data.error || "Signup failed.");
    }
  } catch (error) {
    console.error("Signup error:", error);
    setErrorMsg("Something went wrong. Please try again.");
  }
};

  const handleGoogleSignUp = () => {
    // ✅ open backend Google OAuth route in a new window
    window.open("http://localhost:5000/auth/google", "_self");
  };
  return (
    <motion.div
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Link to="/">
        <button className="absolute top-6 left-6 px-4 py-2 bg-yellow-400 text-black rounded-xl hover:bg-red-800 hover:text-white transition">
          ← Back to Home
        </button>
      </Link>

      <div className="flex flex-col md:flex-row items-center gap-12 bg-yellow-50 p-8 rounded-xl shadow-xl max-w-5xl w-full">
        <div className="w-full md:w-1/2">
          <Lottie animationData={SignUpAnimation} loop={true} className="w-full max-h-[400px]" />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-center text-orange-800 mb-6">Create Account</h1>
            {/* 👇 Add this block here */}
            {errorMsg && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm text-center mb-4">
                {errorMsg}
            </div>
  )}

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
<div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10 appearance-none"
  />
  <div
    className="absolute top-3.5 right-3 cursor-pointer text-orange-700 text-xl"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
  </div>
</div>
            <button
              type="submit"
              className="bg-orange-800 text-white py-3 rounded-md hover:bg-orange-500 transition"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="flex items-center justify-center gap-3 w-full py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
            >
              <FcGoogle className="w-5 h-5" />
              Sign In using Google
            </button>
          </form>

          <p className="text-sm mt-6 text-center text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Signup;
