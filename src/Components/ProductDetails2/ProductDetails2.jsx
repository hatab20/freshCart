import React, { useEffect, useState } from "react";
import style from "./ProductDetails2.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

export default function ProductDetails2() {
  const [productDetails, setproductDetails] = useState(null);
  const [allCategory, setAllCategory] = useState([]);
  let { id, category } = useParams();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setproductDetails(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function getAllProduct() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter(
          (product) => product.category.name == category
        );
        setAllCategory(related);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getProductDetails(id);
    getAllProduct();
  }, [id, allCategory]);

  return (
    <>
      <div className="md:flex md:flex-wrap py-5 px-3 items-center">
        <div className="sm:w-[80%] sm:mx-auto  md:w-1/4 pb-5 md:pb-0">
          <Slider {...settings}>
            {productDetails?.images.map((src) => (
              <img src={src} className="w-full" alt="" />
            ))}
            {/* <img src={productDetails?.images.} className="w-full" alt="" /> */}
          </Slider>
        </div>
        <div className="sm:w-[80%] sm:mx-auto md:w-3/4 text-start p-4">
          <h3 className="font-semibold capitalize text-2xl">
            {productDetails?.title}
          </h3>
          <h4 className="text-gray-700 my-4">{productDetails?.description}</h4>
          <h4>{productDetails?.category.name}</h4>
          <div className="flex justify-between  my-3">
            <p className="text-gray-600 text-sm">{productDetails?.price}EGP</p>
            <p className=" me-3">
              <i className="fas fa-star text-yellow-400 pe-1"></i>
              {productDetails?.ratingsAverage}
            </p>
          </div>
          <div className="flex items-center">
            <button className="btn">Add To Cart</button>
            <i className="fa-solid fa-heart text-2xl mx-3"></i>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap py-5 px-3">
        {allCategory.length > 0 ? (
          allCategory.map((product) => (
            <>
              <div
                key={product.id}
                className="sm:w-[80%] sm:mx-auto md:w-1/6 p-2"
              >
                <div className="product text-start">
                  <Link
                    to={`/productDetails/${product.id}/${product.category.name}`}
                  >
                    <img className="w-full" src={product.imageCover} alt="" />
                    <h3 className="text-emerald-400">
                      {product.category.name}
                    </h3>
                    <h3 className="font-semibold  mb-1">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between  mb-5">
                      <p className="text-gray-600 text-sm">
                        {product.price}EGP
                      </p>
                      <p className=" me-3">
                        <i className="fas fa-star text-yellow-400 pe-1"></i>
                        {product.ratingsAverage}
                      </p>
                    </div>
                  </Link>
                  <div className="flex items-center">
                    <button className="btn">Add To Cart</button>
                    <i className="fa-solid fa-heart text-2xl mx-3"></i>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <div className=" w-[80%] mx-auto py-28">
            <span className="loader"></span>
          </div>
        )}
      </div>
    </>
  );
}
