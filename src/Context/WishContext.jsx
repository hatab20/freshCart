import { createContext } from "react";
import axios from "axios";

export let WishContext = createContext();

export default function WishContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  // دالة لإضافة منتج إلى قائمة الرغبات
  function addProductToWish(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        { headers }
      )
      .then((res) => res.data) // إرجاع البيانات فقط
      .catch((err) => err);
  }

  // دالة لجلب قائمة المنتجات المضافة إلى قائمة الرغبات
  function getWishList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => res.data) // إرجاع البيانات فقط
      .catch((err) => err);
  }
  function getDeleteWishList(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      })
      .then((res) => res) // إرجاع البيانات فقط
      .catch((err) => err);
  }

  return (
    <WishContext.Provider
      value={{ addProductToWish, getWishList, getDeleteWishList }}
    >
      {props.children}
    </WishContext.Provider>
  );
}
