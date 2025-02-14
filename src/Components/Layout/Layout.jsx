import React from "react";
import style from "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
import loginBg from "../../assets/banner_mint.1b9b4a74ebd0c74bc4c1.jpg";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between h-screen">
        <div className="container my-5 py-16 lg:py-12 w-[80%] mx-auto">
          <Outlet />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
