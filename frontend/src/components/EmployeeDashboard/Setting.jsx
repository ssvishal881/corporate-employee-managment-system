import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (setting.newPassword !== setting.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/setting/change-password",
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setError("");
        navigate("/employee-dashboard");
      }
    } catch (error) {
      if (error.response) setError(error.response.data.error);
      else setError("Server not responding ⚠");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Change Password
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Secure your account credentials
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter old password"
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-teal-500 
                         transition"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-teal-500 
                         transition"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-teal-500 
                         transition"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-bold rounded-lg
                       shadow-md hover:bg-teal-700 hover:shadow-lg 
                       hover:-translate-y-0.5 transition-all duration-200"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setting;
