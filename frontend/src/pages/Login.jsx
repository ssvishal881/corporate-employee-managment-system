import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dark, setDark] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "https://corporate-employee-managment-system-sandy.vercel.app/api/auth/login",
        { email, password },
      );

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);

        response.data.user.role === "admin"
          ? navigate("/admin-dashboard")
          : navigate("/employee-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Server error. Try again later.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center 
      transition-colors duration-500
      ${
        dark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-500"
      }`}
    >
      {/* Login Card */}
      <div
        className={`relative w-[360px] rounded-2xl shadow-2xl p-8 
        transition-all duration-500 animate-fadeInUp
        ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
      >
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="absolute top-4 right-4 text-sm opacity-70 hover:opacity-100"
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>

        <h2 className="text-2xl font-bold text-center">
          Employee Management System
        </h2>
        <p
          className={`text-center text-sm mb-6 ${
            dark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Sign in to your account
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-100/10 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              autoComplete="off"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className={`w-full px-4 py-2 rounded-lg border 
              transition focus:ring-2 focus:ring-teal-500
              ${
                dark
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300"
              }`}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-2 rounded-lg border 
                transition focus:ring-2 focus:ring-teal-500
                ${
                  dark
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 
                text-sm text-teal-500 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2 accent-teal-600" />
              Remember me
            </label>

            <button
              type="button"
              onClick={() =>
                alert("Password reset link will be sent to your email.")
              }
              className="text-sm text-teal-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg font-semibold tracking-wide
            bg-teal-600 text-white
            hover:bg-teal-700 hover:scale-[1.02]
            active:scale-[0.98]
            transition-all duration-200"
          >
            Login
          </button>
        </form>
      </div>

      {/* Animation styles */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
