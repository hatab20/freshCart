import React from "react";
import style from "./Notfound.module.css";
import err from "../../assets/error.084f5f5b0eb10d3216cb7c939108e1f6.svg";

export default function Notfound() {
  return (
    <>
      <div className="my-20 flex flex-col  items-center">
        <img src={err} alt="error" className="w-[50%]" />
        <h2 className="text-red-600 text-2xl">Sorry, This Page Not Found</h2>
      </div>
    </>
  );
}
