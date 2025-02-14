import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetPassword = () => {
    if (!email || !newPassword) {
      alert("Please enter both email and new password.");
      return;
    }

    setLoading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        email: email,
        newPassword: newPassword,
      })
      .then((response) => {
        setLoading(false);
        toast.success("Password reset successfully!");
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          toast.error(
            "Error resetting password: " + error.response.data.message
          );
          console.error(error.response.data);
        } else {
          toast.error("Error resetting password. Please try again.");
        }
      });
  };

  return (
    <>
      <h1 className="mt-6 text-2xl font-bold capitalize">
        Enter your new password
      </h1>

      <div>
        <input
          type="email"
          className="w-[80%] p-2 border my-3 focus:border-emerald-500 focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // تحديث البريد الإلكتروني المدخل
        />
      </div>

      <div>
        <input
          type="password"
          className="w-[80%] p-2 border my-3 focus:border-emerald-500 focus:outline-none"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} // تحديث كلمة المرور المدخلة
        />
      </div>

      <button
        onClick={resetPassword}
        className="py-2 px-3 rounded-lg border border-emerald-600 text-emerald-500 mt-4 hover:text-white hover:bg-emerald-600"
      >
        {loading ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          "Reset Password"
        )}
      </button>
    </>
  );
}
