import React from "react";
import style from "./MainSlider.module.css";
import slide1 from "../../assets/finalProject assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/finalProject assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/finalProject assets/images/slider-image-3.jpeg";
import slide4 from "../../assets/finalProject assets/images/grocery-banner.png";
import slide5 from "../../assets/finalProject assets/images/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true, // يضبط ارتفاع الـ Slider تلقائيًا بناءً على المحتوى
  };

  return (
    <>
      <div className="md:flex md:flex-wrap py-5 px-3 mb-5">
        <div className="sm:w-[90%] sm:mx-auto md:w-3/4 pb-7">
          <Slider {...settings}>
            <img
              src={slide3}
              className="w-full h-[200px] md:h-[400px] object-cover"
              alt=""
            />
            <img
              src={slide5}
              className="w-full h-[200px] md:h-[400px] object-cover"
              alt=""
            />
            <img
              src={slide1}
              className="w-full h-[200px] md:h-[400px] object-cover"
              alt=""
            />
          </Slider>
        </div>
        <div className="sm:w-[80%] sm:mx-auto md:w-1/4">
          <img
            src={slide2}
            className="w-full  h-[200px] object-cover pb-5 md:pb-0"
            alt=""
          />
          <img src={slide1} className="w-full  h-[200px] object-cover" alt="" />
        </div>
      </div>
    </>
  );
}
