import React from "react";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className=" bg-gray-300 text-black  font-bold  p-4 ">
        <div className="md:w-[80%] mx-auto">
          <h1 className="font-bold text-3xl my-3">Get the FreshCart App</h1>
          <h3 className="text-gray-600">
            We will send you a link, open it on your phone to download the app
          </h3>
          <div className="flex items-center p-4 rounded-lg justify-center flex-col md:flex-row ">
            <input
              type="email"
              placeholder="Enter your email"
              className="md:flex-grow w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button className="w-full md:w-96 my-3 md:my-0 md:ml-2 md:px-4  py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Share App link
            </button>
          </div>
          <p className="text-center mt-5 font-bold">
            © freshCart, All Right Reserved. Made By{" "}
            <span className="text-emerald-700">Basem Said</span>
          </p>
        </div>
      </footer>
    </>
  );
}
