import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Verifypass() {
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const verifyResetCode = () => {
    if (!resetCode) {
      alert("Please enter the reset code.");
      return;
    }

    setLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode: resetCode,
      })
      .then((response) => {
        setLoading(false);
        toast.success("Reset code verified successfully!");
        navigate("/resetPassword");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Invalid reset code. Please try again.");
        console.error(error);
      });
  };

  return (
    <>
      <h1 className="mt-6 text-2xl font-bold capitalize">
        Enter your verification code
      </h1>

      <div>
        <input
          type="text"
          className="w-[80%] p-2 border my-3 focus:border-emerald-500 focus:outline-none"
          placeholder="Enter reset code"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)} // تحديث قيمة رمز التحقق
        />
      </div>

      <button
        onClick={verifyResetCode}
        className="py-2 px-3 rounded-lg border border-emerald-600 text-emerald-500 mt-4 hover:text-white hover:bg-emerald-600"
      >
        {loading ? <i className="fas fa-spinner fa-spin"></i> : "Verify"}
      </button>
    </>
  );
}
