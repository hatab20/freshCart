import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [category, setCategory] = useState([]);

  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 7,
  //   slidesToScroll: 2,
  //   autoplay: true,
  //   autoplaySpeed: 1000,
  // };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024, // عرض الشاشة أقل من 1024px
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // عرض الشاشة أقل من 768px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // عرض الشاشة أقل من 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <h2 className="text-left text-gray-600 font-semibold my-4 capitalize">
        shop popular categories
      </h2>
      <Slider {...settings}>
        {category.map((cate) => (
          <div key={cate._id || cate.id}>
            <img
              src={cate.image}
              className="w-full h-[200px] object-cover mb-2 "
              alt=""
            />
            <h4 className="mb-4">{cate.name}</h4>
          </div>
        ))}
      </Slider>
    </>
  );
}
