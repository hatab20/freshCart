import { createContext, useEffect, useState } from "react";
import axios from "axios";
export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartId, setcartId] = useState(0);
  const [numOfCartItems, setnumOfCartItems] = useState(0);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          // headers: {
          //   token: localStorage.getItem("userToken"),
          // },
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => {
        setnumOfCartItems(res.data.numOfCartItems);

        setcartId(res.data.data._id);

        return res;
      })
      .catch((err) => err);
  }
  function updateCartProduct(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function delateCartProduct(proId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${proId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function getcategory() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => res)
      .catch((err) => err);
  }
  function getbrands() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => res)
      .catch((err) => err);
  }

  function checkout(cardid, url, formdata) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardid}?url=${url}`,
        {
          shippingAddress: formdata,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []); //setnumOfCartItems

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCart,
        updateCartProduct,
        delateCartProduct,
        clearCart,
        getcategory,
        getbrands,
        checkout,
        cartId,
        setnumOfCartItems,
        numOfCartItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
