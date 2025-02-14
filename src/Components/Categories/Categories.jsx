import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";

export default function Categories() {
  const { getcategory } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [specificCateName, setSpecificCateName] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        let res = await getcategory();
        setCategories(res.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, [getcategory]);

  async function getSpecificCate(id, name) {
    setLoading(true);
    try {
      let res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/subcategories?category=${id}`
      );

      if (res.data.data.length === 0) {
        setSubcategories([]);
      } else {
        setSubcategories(res.data.data);
      }

      setSpecificCateName(name);
    } catch (error) {
      console.error("Error fetching specific category:", error);
      setSubcategories([]);
    }
    setLoading(false);
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-center mt-3 text-emerald-600 mb-6">
        Categories
      </h2>
      <div className="flex flex-wrap">
        {categories.length > 0 ? (
          categories.map((cate) => (
            <div
              onClick={() => getSpecificCate(cate._id, cate.name)}
              key={cate._id}
              className="w-full sm:w-1/2 md:w-1/3 flex flex-col cursor-pointer"
            >
              <div className="m-6 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500">
                <img
                  src={cate.image}
                  className="w-full h-72 object-cover"
                  alt={cate.name}
                />
                <h2 className="text-xl font-semibold text-center py-3">
                  {cate.name}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <div className="parentLoader w-[80%] mx-auto py-28">
            <span className="loader"></span>
          </div>
        )}
      </div>

      {subcategories.length > 0 && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-emerald-600 text-center mb-4">
            {specificCateName} Subcategories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {subcategories.map((sub, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-lg text-center font-medium bg-white shadow hover:shadow-md transition"
              >
                {sub.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
