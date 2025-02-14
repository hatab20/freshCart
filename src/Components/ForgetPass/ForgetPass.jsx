import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function forgetpass() {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        email: email,
      })
      .then((response) => {
        setLoading(false);

        toast.success("A verification code has been sent to your email!");
        navigate("/verifypass");
      })
      .catch((error) => {
        setLoading(false);

        toast.error("There was an error. Please try again.");
        console.error(error);
      });
  }

  return (
    <>
      <h1 className="mt-6 text-2xl font-bold capitalize">
        Please enter your email to receive a verification code
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

      <button
        onClick={() => forgetpass()}
        className="py-2 px-3 rounded-lg border border-emerald-600 text-emerald-500 mt-4 hover:text-white hover:bg-emerald-600"
      >
        {loading ? <i className="fas fa-spinner fa-spin"></i> : "Verify"}
      </button>
    </>
  );
}
