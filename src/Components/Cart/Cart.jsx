import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    getLoggedUserCart,
    updateCartProduct,
    delateCartProduct,
    clearCart,
    setnumOfCartItems,
    numOfCartItems,
  } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [currentId, setcurrentId] = useState(0);

  async function getCartItem() {
    let res = await getLoggedUserCart();

    if (res.data.status === "success") {
      setCartDetails(res.data.data);
    }
  }

  async function updateCart(id, count) {
    if (count == 0) {
      delateCart(id);
    } else {
      let res = await updateCartProduct(id, count);
      if (res.data.status === "success") {
        setCartDetails(res.data.data);
      }
    }
  }

  async function delateCart(proId) {
    setcurrentId(proId);
    setLoading(true);
    let res = await delateCartProduct(proId);
    if (res.data.status === "success") {
      setnumOfCartItems(numOfCartItems - 1);
      setCartDetails(res.data.data);
      toast.success("The product has been deleted");
      setLoading(false);
    }
  }

  async function clearCartProduct() {
    let res = await clearCart();
    if (res.data.message === "success") {
      setnumOfCartItems(0);
      setCartDetails(null);
    }
  }

  useEffect(() => {
    getCartItem();
  }, []);

  return (
    <>
      {cartDetails?.products.length > 0 ? (
        <>
          <div className="w-[80%]">
            <h2 className="text-3xl text-emerald-500 font-bold mt-6">
              Cart Shop
            </h2>
            <h1 className=" capitalize my-4 text-2xl">
              Total Price:
              <span className="text-emerald-400 text-2xl font-bold">
                {cartDetails?.totalCartPrice} EGP
              </span>
            </h1>
          </div>

          {/* 🔴 عرض المنتجات كـ "بطاقات" في شاشات الموبايل */}
          <div className="sm:hidden flex flex-col gap-6 px-4">
            {cartDetails?.products.map((product) => (
              <div
                key={product.product.id}
                className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden"
              >
                {/* ✅ الصورة تأخذ كامل عرض الشاشة */}
                <img
                  src={product.product.imageCover}
                  className="w-full h-64 object-cover"
                  alt={product.product.title}
                />

                {/* ✅ باقي البيانات تحت الصورة */}
                <div className="p-4 w-full text-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    {product.product.title}
                  </h3>
                  <p className="text-gray-700 text-lg font-semibold my-2">
                    {product.price}EGP
                  </p>

                  {/* ✅ التحكم في الكمية */}
                  <div className="flex justify-center items-center space-x-3 my-3">
                    <button
                      onClick={() =>
                        updateCart(product.product.id, product.count - 1)
                      }
                      className="p-2 w-8 h-8 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 18 2">
                        <path
                          stroke="currentColor"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <span className="text-lg font-semibold">
                      {product.count}
                    </span>
                    <button
                      onClick={() =>
                        updateCart(product.product.id, product.count + 1)
                      }
                      className="p-2 w-8 h-8 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 18 18">
                        <path
                          stroke="currentColor"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* ✅ زر الحذف */}
                  <button
                    onClick={() => delateCart(product.product.id)}
                    className="text-red-600 font-medium hover:underline"
                  >
                    {Loading && currentId === product.product.id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      `Remove`
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 🔵 عرض الجدول في الشاشات الكبيرة */}
          <div className="hidden sm:block relative overflow-x-auto shadow-md sm:rounded-lg mx-auto max-w-5xl mt-6">
            <table className="w-full text-sm md:text-base text-gray-500">
              <thead className="text-xs md:text-sm text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-center">Image</th>
                  <th className="px-4 py-3 text-center">Product</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-center">Price</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.products.map((product) => (
                  <tr key={product.product.id} className="text-center">
                    <td className="p-2">
                      <img
                        src={product.product.imageCover}
                        className="w-20 md:w-24 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-900">
                      {product.product.title}
                    </td>
                    <td className="px-4 py-4">
                      {/* أزرار تعديل الكمية */}
                      <div className="flex justify-center items-center space-x-3">
                        <button
                          onClick={() =>
                            updateCart(product.product.id, product.count - 1)
                          }
                          className="p-2 w-8 h-8 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                        >
                          <svg className="w-3 h-3" viewBox="0 0 18 2">
                            <path
                              stroke="currentColor"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <span className="text-lg font-semibold">
                          {product.count}
                        </span>
                        <button
                          onClick={() =>
                            updateCart(product.product.id, product.count + 1)
                          }
                          className="p-2 w-8 h-8 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                        >
                          <svg className="w-3 h-3" viewBox="0 0 18 18">
                            <path
                              stroke="currentColor"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-900">
                      {product.price}EGP
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => delateCart(product.product.id)}
                        className="text-red-600 font-medium hover:underline"
                      >
                        {Loading && currentId === product.product.id ? (
                          <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                          `Remove`
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔴 زر تفريغ السلة */}

          <div className="text-center my-4 w-[80%] mx-auto ">
            <Link to="/checkout">
              <button className=" bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition w-full ">
                Check Out
              </button>
            </Link>
          </div>
          <div className="text-center w-[80%] mx-auto">
            <button
              onClick={() => clearCartProduct()}
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition w-full "
            >
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <h1 className="text-center text-2xl font-bold text-emerald-600 my-8">
          Your cart is empty.
          <Link to="/" className="text-blue-500 underline">
            Go to Store
          </Link>
        </h1>
      )}
    </>
  );
}
