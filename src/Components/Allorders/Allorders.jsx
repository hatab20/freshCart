import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Allorders() {
  const [orders, setOrders] = useState(null);
  const userLogin = localStorage.getItem("userToken");

  const { id } = jwtDecode(userLogin);

  async function getOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    if (data) {
      setOrders(data);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Orders</title>
      </Helmet>

      {!orders ? (
        <div className="flex h-screen justify-center items-center">
          {/* <Loadimg /> */}
          <div className="parentLoader w-[80%] mx-auto py-28">
            <span className="loader"></span>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex  justify-center items-center">
          <img className="w-[50%] pt-20 pb-10" src={imagere} alt="No orders" />
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border w-3/4 mx-auto my-24 py-3 border-b hover:bg-gray-50"
          >
            <div className="flex justify-between my-1 flex-wrap">
              <div className="flex flex-col justify-center mx-3">
                <p className="text-red-400 font-semibold text-xl">Order ID</p>
                <p className="text-green-400 font-semibold text-xl">
                  #{order.id}
                </p>
              </div>
              <div className="flex flex-col justify-center mx-3">
                <p className="text-red-400 font-semibold text-xl">
                  Total Price
                </p>
                <p className="text-green-400 font-semibold text-xl">
                  {order.totalOrderPrice} EGP
                </p>
              </div>
              <div className="flex justify-between">
                {order.isDelivered ? (
                  <button className="bg-green-700 font-light text-white p-2 flex text-center justify-center items-center my-5 w-fit mx-3 rounded-md py-1">
                    Delivered
                  </button>
                ) : (
                  <button className="bg-gray-700 font-light text-white p-2 flex text-center justify-center items-center my-5 w-fit mx-3 rounded-md py-1">
                    Under delivery
                  </button>
                )}
                {order.isPaid ? (
                  <button className="bg-blue-700 font-light text-white p-2 flex text-center justify-center items-center my-5 w-fit mx-3 rounded-md py-1">
                    Paid
                  </button>
                ) : (
                  <button className="bg-red-700 font-light text-white p-2 rounded-md flex text-center justify-center items-center my-5 w-fit mx-3 py-1">
                    Unpaid
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center flex-wrap">
              {order.cartItems.map((product) => (
                <div
                  key={product._id}
                  className="p-4 w-full md:w-1/3 lg:w-1/5 mx-2 flex flex-col justify-center items-center"
                >
                  <img
                    src={product.product.imageCover}
                    className="md:w-32 w-2/3 max-h-full object-contain"
                    alt={product.product.title}
                  />
                  <p>
                    {product.product.title.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <p>{product.price} EGP</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </React.Fragment>
  );
}
