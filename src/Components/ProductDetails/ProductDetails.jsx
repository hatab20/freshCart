import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { WishContext } from "../../Context/WishContext";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  const [currentId, setcurrentId] = useState(0);
  const [productDetails, setProductDetails] = useState(null);
  const [allCategory, setAllCategory] = useState([]);
  const { id, category } = useParams();
  const { addProductToWish, removeProductFromWish } = useContext(WishContext);
  const { addProductToCart, setnumOfCartItems, numOfCartItems } =
    useContext(CartContext);

  const [isInWishList, setIsInWishList] = useState({});
  const [isWishListLoading, setIsWishListLoading] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  // Fetch product details
  const getProductDetails = (id) => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProductDetails(res.data.data);
      })
      .catch((error) => console.log(error));
  };

  // Fetch all products and filter by category
  const getAllProduct = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        const relatedProducts = res.data.data.filter(
          (product) => product.category.name === category
        );
        setAllCategory(relatedProducts);
      })
      .catch((error) => console.log(error));
  };

  // Toggle Wishlist
  const toggleWishList = async (id) => {
    setIsWishListLoading((prev) => ({ ...prev, [id]: true }));
    try {
      if (isInWishList[id]) {
        await removeProductFromWish(id);
        setIsInWishList((prev) => ({ ...prev, [id]: false }));
        toast.success("Product removed from wishlist!");
      } else {
        await addProductToWish(id);
        setIsInWishList((prev) => ({ ...prev, [id]: true }));
        toast.success("Product added to wishlist!");
      }
    } catch (error) {
      toast.error("An error occurred while updating the wishlist.");
    } finally {
      setIsWishListLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Add product to cart
  const addToCart = async (id) => {
    setIsLoading(true);
    try {
      const res = await addProductToCart(id);
      if (res.data.status === "success") {
        setnumOfCartItems(numOfCartItems + 1);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error adding to cart");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails(id);
    getAllProduct();
  }, [id, category]); // Adding category as dependency

  return (
    <>
      <div className="md:flex md:flex-wrap py-5 px-3 items-center">
        <div className="sm:w-[80%] sm:mx-auto md:w-1/4 pb-5 md:pb-0">
          <Slider {...settings}>
            {productDetails?.images?.map((src, index) => (
              <img key={index} src={src} className="w-full" alt="" />
            ))}
          </Slider>
        </div>
        <div className="sm:w-[80%] sm:mx-auto md:w-3/4 text-start p-4">
          <h3 className="font-semibold capitalize text-2xl">
            {productDetails?.title}
          </h3>
          <h4 className="text-gray-700 my-4">{productDetails?.description}</h4>
          <h4>{productDetails?.category.name}</h4>
          <div className="flex justify-between my-3">
            <p className="text-gray-600 text-sm">{productDetails?.price} EGP</p>
            <p className="me-3">
              <i className="fas fa-star text-yellow-400 pe-1"></i>
              {productDetails?.ratingsAverage}
            </p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => addToCart(productDetails?.id)}
              className="bg-emerald-500 text-white py-2 px-6 rounded-lg hover:bg-emerald-600 transition w-full"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Add To Cart"
              )}
            </button>
            <i
              onClick={() => toggleWishList(productDetails?.id)}
              className={`fa-solid fa-heart text-2xl mx-3 cursor-pointer ${
                isInWishList[productDetails?.id] ? "text-red-500" : ""
              }`}
            >
              {isWishListLoading[productDetails?.id] ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : null}
            </i>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap py-5 px-3">
        {allCategory.length > 0 ? (
          allCategory.map((product) => (
            <div
              key={product.id}
              className="sm:w-[80%] sm:mx-auto md:w-1/4 p-2"
            >
              <div className="product text-start">
                <Link
                  to={`/productDetails/${product.id}/${product.category.name}`}
                >
                  <img className="w-full" src={product.imageCover} alt="" />
                  <h3 className="text-emerald-400">{product.category.name}</h3>
                  <h3 className="font-semibold mb-1">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between mb-5">
                    <p className="text-gray-600 text-sm">{product.price} EGP</p>
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
                    {isLoading && currentId === product.id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      "Add To Cart"
                    )}
                  </button>
                  <i
                    onClick={() => toggleWishList(product.id)}
                    className={`fa-solid fa-heart text-2xl mx-3 cursor-pointer ${
                      isInWishList[product.id] ? "text-red-500" : ""
                    }`}
                  >
                    {isWishListLoading[product.id] ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : null}
                  </i>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-[80%] mx-auto py-28">
            <span className="loader"></span>
          </div>
        )}
      </div>
    </>
  );
}
