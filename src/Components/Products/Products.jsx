import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import useProducts from "../../Hooks/useProducts";
import toast from "react-hot-toast";
import { WishContext } from "../../Context/WishContext";

export default function RecentProducts() {
  const [Loading, setLoading] = useState(false);
  const [currentId, setcurrentId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishListItems, setWishListItems] = useState([]);
  const [isInWishList, setIsInWishList] = useState({}); // تتبع حالة العناصر في الـ WishList
  const [isWishListLoading, setIsWishListLoading] = useState({}); // تتبع حالة التحميل لكل منتج في الـ WishList

  const { addProductToCart } = useContext(CartContext);
  const { addProductToWish, removeProductFromWish } = useContext(WishContext); // إضافة دالة لإزالة المنتج من الـ WishList

  const { data, error, isError, isLoading } = useProducts();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // دالة لتصفية المنتجات بناءً على البحث في اسم الـ category
  const filteredProducts = data?.data?.data.filter((product) =>
    product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // إضافة المنتج إلى السلة
  async function addToCart(id) {
    setcurrentId(id);
    setLoading(true);
    let res = await addProductToCart(id);

    if (res.data.status === "success") {
      toast.success(res.data.message);
      setLoading(false);
    } else {
      toast.error(res.data.message);
      setLoading(false);
    }
  }

  // دالة لإضافة أو إزالة المنتج من الـ WishList
  async function toggleWishList(id) {
    setIsWishListLoading((prev) => ({ ...prev, [id]: true })); // بدء التحميل لهذا المنتج
    try {
      if (isInWishList[id]) {
        const response = await removeProductFromWish(id); // إزالة المنتج من الـ WishList
        setIsInWishList((prev) => ({ ...prev, [id]: false }));
        toast.success("Product removed from wishlist!");
      } else {
        const response = await addProductToWish(id); // إضافة المنتج إلى الـ WishList
        setIsInWishList((prev) => ({ ...prev, [id]: true }));
        toast.success("Product added to wishlist!");
      }
    } catch (error) {
      toast.error("An error occurred while updating the wishlist.");
    } finally {
      setIsWishListLoading((prev) => ({ ...prev, [id]: false })); // إنهاء التحميل لهذا المنتج
    }
  }

  if (isError) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="parentLoader w-[80%] mx-auto py-28">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <form className="mx-auto w-[80%] mt-16">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-3 ps-10 text-sm border rounded-lg focus:border-emerald-500 focus:outline-none"
            placeholder="Search by Category..."
            required
            value={searchTerm} // قيمة البحث تتغير بناءً على المستخدم
            onChange={handleSearchChange} // تحديث قيمة البحث
          />
        </div>
      </form>

      <div className="flex flex-wrap py-5 px-3">
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="md:w-1/4 p-2 sm:w-[80%] sm:mx-auto  "
            >
              <div className="border-2 hover:border-emerald-600 rounded-lg">
                <div className="product text-left m-1  transition hover:border-emerald-500 group relative ">
                  <Link
                    to={`/productDetails/${product.id}/${product.category.name}`}
                  >
                    <div className="w-full overflow-hidden rounded-lg">
                      <img
                        className="w-full transition-transform duration-300 group-hover:scale-105"
                        src={product.imageCover}
                        alt={product.title}
                      />
                    </div>
                    <h3 className="text-emerald-400">
                      {product.category.name}
                    </h3>
                    <h3 className="font-bold mb-1">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between mb-5">
                      <p className="text-emerald-600 text-xl">
                        {product.price} EGP
                      </p>
                      <p className="me-3">
                        <i className="fas fa-star text-yellow-400 pe-1"></i>
                        {product.ratingsAverage}
                      </p>
                    </div>
                  </Link>
                  <div className="flex items-center">
                    <button
                      onClick={() => addToCart(product.id)}
                      className="bg-emerald-500 text-white py-2 px-6 rounded-lg hover:bg-emerald-600 transition w-full"
                    >
                      {Loading && currentId === product.id ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        "Add To Cart"
                      )}
                    </button>

                    <div className="size-9 opacity-0 group-hover:opacity-100 duration-300 delay-200 bg-gray-200 rounded-full flex justify-center items-center absolute top-0 right-2">
                      <i
                        onClick={() => toggleWishList(product.id)}
                        className={`fa-solid fa-heart text-2xl mx-3 cursor-pointer ${
                          isInWishList[product.id] ? "text-red-500" : ""
                        }`}
                      >
                        {isWishListLoading[product.id] ? (
                          <div className="absolute top-full left-0 right-1 flex justify-center items-center mt-2">
                            <i className="fas fa-spinner fa-spin"></i>{" "}
                            {/* spinner تحت الأيقونة */}
                          </div>
                        ) : null}
                      </i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-5">
            <p>No products found for this category!</p>
          </div>
        )}
      </div>
    </>
  );
}
