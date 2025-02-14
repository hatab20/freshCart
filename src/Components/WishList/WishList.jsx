import React, { useContext, useEffect, useState } from "react";
import { WishContext } from "../../Context/WishContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function WishList() {
  const { getWishList, getDeleteWishList } = useContext(WishContext);
  const { addProductToCart, setnumOfCartItems, numOfCartItems } =
    useContext(CartContext);
  const [wishListItems, setWishListItems] = useState([]);
  const [deletewishListItems, setDeleteWishListItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  async function getWishItems() {
    try {
      setLoading(true);
      const response = await getWishList();
      setWishListItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching wish list:", error);
      setError("Failed to fetch wish list.");
      setLoading(false);
    }
  }

  async function getDeleteWishItems(id) {
    try {
      setLoadingId(id);
      const response = await getDeleteWishList(id);
      setDeleteWishListItems(response.data);
      setLoadingId(null);
    } catch (error) {
      console.error("Error deleting wish list item:", error);
      setError("Failed to delete wish list item.");
      setLoadingId(null);
    }
  }

  async function addToCart(id) {
    setCurrentId(id);
    try {
      let res = await addProductToCart(id);
      if (res.data.status === "success") {
        setnumOfCartItems(numOfCartItems + 1);

        toast.success(res.data.message);

        await getDeleteWishList(id);

        setWishListItems((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to add product to cart.");
    }
    setCurrentId(null);
  }

  useEffect(() => {
    getWishItems();
  }, [deletewishListItems]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">My Wish List</h2>
      {wishListItems?.length > 0 ? (
        <div className="flex flex-col gap-6">
          {wishListItems.map(
            (
              wish // ✅ تغيير `product.id` إلى `wish.id`
            ) => (
              <div
                key={wish.id}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col sm:flex-row items-center sm:items-start"
              >
                <img
                  src={wish.imageCover}
                  className="w-full sm:w-32 sm:h-32 object-cover rounded-lg"
                  alt={wish.title}
                />
                <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-gray-900">
                    {wish.title}
                  </h3>
                  <p className="text-green-600 text-lg font-semibold">
                    {wish.price} EGP
                  </p>
                  <button
                    onClick={() => getDeleteWishItems(wish.id)}
                    className="text-red-600 font-medium flex items-center justify-center sm:justify-start gap-1 mt-2"
                    disabled={loadingId === wish.id}
                  >
                    {loadingId === wish.id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      <>
                        <i className="fas fa-trash"></i> Remove
                      </>
                    )}
                  </button>
                </div>
                <button
                  onClick={() => addToCart(wish.id)} // ✅ إصلاح `product.id` إلى `wish.id`
                  className="mt-4 sm:mt-0 sm:ml-auto border border-green-500 text-green-600 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition"
                  disabled={currentId === wish.id} // ✅ تعطيل الزر عند إضافة العنصر
                >
                  {currentId === wish.id ? ( // ✅ إصلاح `Loading` إلى `loading`
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
              </div>
            )
          )}
        </div>
      ) : loading ? (
        <div className="parentLoader w-[80%] mx-auto py-28">
          <span className="loader"></span>
        </div>
      ) : (
        <p>No items in your wish list.</p>
      )}
    </div>
  );
}
