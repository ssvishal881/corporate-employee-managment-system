import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    // Later → connect backend email API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        {sent ? (
          <p className="text-green-600">
            Password reset link will be sent to your email.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <button className="w-full bg-teal-600 text-white py-2 rounded">
              Send Reset Link
            </button>
          </form>
        )}

        <Link to="/login" className="block text-center mt-4 text-teal-600">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
