import React, { useContext, useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/userContext";

export default function Register() {
  let { UserLogin, setUserLogin } = useContext(userContext);
  let navigate = useNavigate();
  const [ApiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleRegister(values) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        setIsLoading(false);
        if (res.data.message == "success") {
          localStorage.setItem("userToken", res.data.token);
          setUserLogin(res.data.token);
          navigate("/");
        }
      })
      .catch((res) => {
        setIsLoading(false);
        setApiError(res.response.data.message);
      });
  }
  // custom validation  مش هعملها تاني
  // function myValidation(data) {
  //   let errors = {};
  //   if (data.name == "") {
  //     errors.name = "name is required";
  //   } else if (!/^[a-zA-Z]{3,10}$/.test(data.name)) {
  //     errors.name = "not valid name";
  //   }
  //   if (data.phone == "") {
  //     errors.phone = "phone is required";
  //   } else if (!/^01[0125][0-9]{8}$/.test(data.phone)) {
  //     errors.phone = "not valid phone number";
  //   }

  //   return errors;
  // }

  //

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "min length is 3")
      .max(10, "max length is 10")
      .required("name is required"),
    email: yup.string().email("not valid email").required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "password min length is 6"),
    rePassword: yup
      .string()
      .required("rePassword is required")
      .oneOf([yup.ref("password")], "not matched with password"),
    phone: yup
      .string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "phone not valid"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    // validate: myValidation,
    // validationSchema: validationSchema,  في قانون في  js  بيقول بدل ال  property  زي ال  value  نقدر نستغني عن واحده
    validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <>
      {ApiError ? (
        <div className="w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3 ">
          {ApiError}
        </div>
      ) : null}
      <h2 className="font-bold text-2xl text-center my-4 text-emerald-700">
        Register Now
      </h2>
      <form onSubmit={formik.handleSubmit} className="w-full mx-auto">
        <div className="relative z-0 w-full my-3 group">
          <label htmlFor="floating_name" className="block text-gray-700">
            Enter Your Name
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="floating_name"
            className="w-full p-2 border-2 rounded focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 focus:outline-none"
            placeholder=""
            required
          />

          {formik.errors.name && formik.touched.name ? (
            <div className="p-4 mb-4 text-sm text-red-800 " role="alert">
              <span className="font-medium ">{formik.errors.name}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full my-3 group">
          <label htmlFor="floating_email" className="block text-gray-700">
            Enter Your Email
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="floating_email"
            className="w-full p-2 border-2 rounded focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 focus:outline-none"
            placeholder=""
            required
          />

          {formik.errors.email && formik.touched.email ? (
            <div className="p-4 mb-4 text-sm text-red-800 " role="alert">
              <span className="font-medium ">{formik.errors.email}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full my-3 group">
          <label htmlFor="floating_password" className="block text-gray-700">
            Enter Your Password
          </label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="floating_password"
            className="w-full p-2 border-2 rounded focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 focus:outline-none"
            placeholder=""
            required
          />

          {formik.errors.password && formik.touched.password ? (
            <div className="p-4 mb-4 text-sm text-red-800 " role="alert">
              <span className="font-medium ">{formik.errors.password}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full my-3 group">
          <label htmlFor="floating_rePassword" className="block text-gray-700">
            Enter Your rePassword
          </label>
          <input
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="floating_rePassword"
            className="w-full p-2 border-2 rounded focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 focus:outline-none"
            placeholder=""
            required
          />

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="p-4 mb-4 text-sm text-red-800 " role="alert">
              <span className="font-medium ">{formik.errors.rePassword}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full my-3 group">
          <label htmlFor="floating_phone" className="block text-gray-700">
            Enter Your phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="floating_phone"
            className="w-full p-2 border-2 rounded focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 focus:outline-none"
            placeholder=""
            required
          />

          {formik.errors.phone && formik.touched.phone ? (
            <div className="p-4 mb-4 text-sm text-red-800 " role="alert">
              <span className="font-medium ">{formik.errors.phone}</span>
            </div>
          ) : null}
        </div>
        <div className="text-left ">
          <button
            type="submit"
            className="text-white bg-emerald-700 hover:bg-emerald-800 foucs:ring-4 focus:outline-none 
          foucs:ring-emerald-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center "
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
          <div className="pt-3">
            <span>
              Have an account?
              <Link className="text-emerald-500 ps-1" to="/login">
                Login
              </Link>
            </span>
          </div>
        </div>
      </form>
    </>
  );
}
