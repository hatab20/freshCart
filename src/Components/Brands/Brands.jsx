import React, { useContext, useEffect, useState } from "react";
import style from "./Brands.module.css";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";

export default function Brands() {
  const { getbrands } = useContext(CartContext);
  const [brands, setBrands] = useState([]);
  const [specialbrands, setspecialbrands] = useState(null);

  useEffect(() => {
    async function fetchbrands() {
      try {
        let res = await getbrands();
        setBrands(res.data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    }

    fetchbrands();
  }, [getbrands]);

  function getspecialbrands(id) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => {
        console.log(res.data.data._id);
        setspecialbrands(res.data.data);
      })
      .catch((err) => err);
  }

  // إغلاق الـ specialbrands
  const closeSpecialBrand = () => {
    setspecialbrands(null);
  };

  // إغلاق الـ specialbrands عند الضغط خارج العنصر
  const handleOutsideClick = (e) => {
    if (e.target.closest(".specialbrand-container")) return; // إذا كان الضغط داخل العنصر
    closeSpecialBrand();
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold text-center mt-3 text-emerald-600 mb-6">
        All Brands
      </h2>
      <div className="flex flex-wrap relative ">
        {brands.length > 0 ? (
          brands?.map((brand) => (
            <div
              onClick={() => {
                getspecialbrands(brand._id);
              }}
              key={brand._id}
              className="w-full sm:w-1/2 md:w-1/4 flex flex-col "
            >
              <div className="m-6 rounded-lg  shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500">
                <img
                  src={brand.image}
                  className="w-full object-cover"
                  alt={brand.name}
                />
                <h2 className="text-xl font-semibold text-center py-3">
                  {brand.name}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <div className="parentLoader w-[80%] mx-auto py-28">
            <span className="loader"></span>
          </div>
        )}
        {/* {specialbrands && (
          <div className="fixed top-[70px] left-[50%] transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg z-10 w-[80%] sm:w-[60%] md:w-[40%]">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl text-emerald-500 font-semibold ml-4">
                  {specialbrands.name}
                </h2>
                <h2 className=" font-semibold ml-4">{specialbrands.slug}</h2>
              </div>
              <div>
                <img
                  src={specialbrands.image}
                  alt={specialbrands.name}
                  className="w-full h-32 object-cover rounded-full ml-4"
                />
              </div>
            </div>
          </div>
        )} */}
        {specialbrands && (
          <div className="fixed top-[70px] left-[50%] transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg z-10 w-[80%] sm:w-[60%] md:w-[40%] specialbrand-container">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl text-emerald-500 font-semibold ml-4">
                  {specialbrands.name}
                </h2>
                <h2 className=" font-semibold ml-4">{specialbrands.slug}</h2>
              </div>
              <div>
                <img
                  src={specialbrands.image}
                  alt={specialbrands.name}
                  className="w-full h-32 object-cover rounded-full ml-4"
                />
              </div>
            </div>
            {/* زر إغلاق */}
            <button
              onClick={closeSpecialBrand}
              className="absolute top-0 right-0 p-2 text-lg font-bold text-red-500"
            >
              ×
            </button>
            {/* زر "Close" */}
            <div className="mt-4 text-center">
              <button
                onClick={closeSpecialBrand}
                className="bg-emerald-500 text-white px-4 py-2 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
