import React, { useContext, useState } from "react";
import style from "./CheckOut.module.css";
import axios from "axios";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";

export default function CheckOut() {
  let { checkout, cartId } = useContext(CartContext);
  const [Loading, setLoading] = useState(false);

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () => handleCheckout(cartId, `http://localhost:5173`),
  });

  async function handleCheckout(cartid, url) {
    setLoading(true);
    let { data } = await checkout(cartid, url, formik.values);

    if (data.status == "success") {
      window.location.href = data.session.url;
    }
  }

  return (
    <>
      <div className="flex flex-col items-center mt-7  w-[100%]  min-h-screen">
        <h1 className="text-center font-bold text-2xl text-emerald-500">
          Checkout Now
        </h1>
        <form onSubmit={formik.handleSubmit} className="w-full ">
          <div>
            <label htmlFor="details" className="block text-gray-700">
              Enter Your Details
            </label>
            <input
              required
              type="text"
              id="details"
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label htmlFor="phone" className="block mt-4 text-gray-700">
              Enter Your Phone
            </label>
            <input
              required
              type="tel"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label htmlFor="city" className="block mt-4 text-gray-700">
              Enter Your City
            </label>
            <input
              required
              type="text"
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button className="w-full mt-6 p-3 text-blue-400 border border-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition">
              {Loading ? <span className="loader"></span> : " Pay now"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
