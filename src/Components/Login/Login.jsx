import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/userContext";
import style from "./Login.module.css";

export default function Login() {
  let { UserLogin, setUserLogin } = useContext(userContext);
  let navigate = useNavigate();
  const [ApiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // دي بتخليني لو سجلت فعلا معرفش ارجع لل  login

  // إذا كان المستخدم مسجل دخوله بالفعل، وجهه مباشرة للصفحة الرئيسية
  useEffect(() => {
    if (UserLogin) {
      navigate("/"); // إذا كان يوجد توكن مستخدم، انتقل للصفحة الرئيسية
    }
  }, [UserLogin, navigate]);

  function handleLogin(values) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setIsLoading(false);
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          setUserLogin(res.data.token);
          navigate("/"); // انتقل للصفحة الرئيسية بعد تسجيل الدخول
        }
      })
      .catch((res) => {
        setIsLoading(false);
        setApiError(res.response.data.message);
      });
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email("not valid email").required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "password min length is 6"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      {ApiError ? (
        <div className="w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3 ">
          {ApiError}
        </div>
      ) : null}
      <section className={style.bg}>
        <h2 className="font-bold text-2xl text-center my-4 text-emerald-700">
          Login Now
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border-2 rounded focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 focus:outline-none"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border-2 rounded focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 focus:outline-none"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <div className="flex justify-between items-center mb-4">
            <Link
              to="/forgetpass"
              className="text-green-600 hover:underline text-sm"
            >
              Forget your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>

          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}
