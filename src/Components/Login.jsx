import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const responseGet = await axios.get(`https://backend-of-femhack-production.up.railway.app/api/signup`);
      const user = responseGet.data.find(user => user.email === data.email);
      if (!user) {
        alert("User not found, please create an account 🥺");
        navigate("/");
      } else if (user.password !== data.password) {
        alert("Incorrect credentials 😭");
      } else {
        alert("Login successful! 🥰");
        localStorage.setItem("token", user.token);
        navigate("/dashboard");
      }
    } catch (e) {
      setLoading(false);
      if (e.response?.status === 400) {
        alert(e.response.data.message);
        navigate("/login");
      } else {
        console.error(e);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="flex flex-col items-center w-full max-w-md p-6 bg-gray-900/90 rounded-3xl border border-red-600 shadow-[0_4px_20px_rgba(255,0,0,0.5)]">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-red-500">Welcome Back!</h1>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center my-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-500"></div>
            <p className="mt-4 text-red-400 font-semibold">Please wait... Redirecting you 🥹</p>
          </div>
        ) : (
          <div className="w-full space-y-6">
            <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-gray-100">
              Sign in
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-400">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 text-sm bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="name@company.com"
                  {...register("email", {
                    required: { value: true, message: "This field is required" },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address"
                    },
                  })}
                />
                {errors.email && <div className="text-xs text-red-400 mt-1">{errors.email.message}</div>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-red-400">
                  Password
                </label>
                <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full px-4 py-2 text-sm bg-transparent text-white focus:outline-none"
                    placeholder="••••••••"
                    {...register("password", {
                      required: { value: true, message: "Password is required" },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-4 py-2 text-gray-400 hover:text-red-400"
                  >
                    {showPassword ?  "👁️":"😌" }
                  </button>
                </div>
                {errors.password && <div className="text-xs text-red-400 mt-1">{errors.password.message}</div>}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold rounded-lg hover:scale-105 transition-all"
              >
                Sign In
              </button>

              <p className="text-center text-sm text-gray-400 mt-4">
                Doesn't have an account?{" "}
                <Link to="/" className="text-red-400 font-semibold hover:underline">
                  Signup
                </Link>
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;

