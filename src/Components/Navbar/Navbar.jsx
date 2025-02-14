import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/userContext";
import logo from "../../assets/logo.53f7a424c3aedc30a0fb46dc2278137c.svg";
import { FaBars, FaTimes } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let { UserLogin, setUserLogin } = useContext(userContext);
  let { numOfCartItems } = useContext(CartContext);

  let navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function signup() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("login");
  }

  return (
    <>
      <nav className="bg-slate-300 fixed top-0 left-0 right-0 border-gray-200 z-50">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          {/* Logo */}
          <div className="flex items-center gap-5">
            <Link className="flex items-center" to="">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          {/* أيقونة القائمة الجانبية */}
          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
            </button>
          </div>

          {/* الروابط العادية - تظهر فقط على الشاشات الكبيرة */}
          <div className="hidden lg:flex">
            {UserLogin && (
              <ul className="flex gap-4">
                <li>
                  <Link className="text-slate-600" to="">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-600" to="cart">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-600" to="wishlist">
                    Wish List
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-600" to="products">
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-600" to="categories">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-600" to="brands">
                    Brands
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* قائمة الحساب */}
          <div className="hidden lg:flex gap-3">
            <ul className="flex gap-3">
              {UserLogin ? (
                <li className="flex items-center gap-2">
                  <div className="relative me-2">
                    <Link to="cart">
                      <i className="fa-solid fa-cart-shopping text-2xl"></i>
                    </Link>
                    <div className="absolute top-[-15px] right-[-13px] size-6 bg-emerald-500 text-white rounded-lg flex justify-center p-2 items-center ">
                      {numOfCartItems}
                    </div>
                  </div>
                  <span onClick={signup} className="cursor-pointer text-xl   ">
                    Signout
                    <i className="fa-solid fa-arrow-right-to-bracket ms-1"></i>
                  </span>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="login">Login</Link>
                  </li>
                  <li>
                    <Link to="register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* القائمة الجانبية عند تصغير الشاشة */}
        {menuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white shadow-md p-4 flex flex-col">
            {/* العناصر العادية */}
            <ul className="flex flex-col gap-3 text-center">
              {UserLogin && (
                <>
                  <li>
                    <Link className="text-slate-600" to="">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-600" to="cart">
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-600" to="wishlist">
                      Wish List
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-600" to="products">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-600" to="categories">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-600" to="brands">
                      Brands
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* أيقونة الكارت و Signout في المنتصف */}
            {UserLogin && (
              <div className="flex flex-col items-center gap-2 mt-4">
                <div className="relative me-2">
                  <Link to="cart">
                    <i className="fa-solid fa-cart-shopping text-2xl"></i>
                  </Link>
                  <div className="absolute top-[-15px] right-[-13px] size-6 bg-emerald-500 text-white rounded-lg flex justify-center p-2 items-center ">
                    {numOfCartItems}
                  </div>
                </div>
                <span onClick={signup} className="cursor-pointer   text-xl">
                  Signout
                  <i className="fa-solid fa-arrow-right-to-bracket ms-1"></i>
                </span>
              </div>
            )}

            {/* إذا لم يكن المستخدم مسجل دخول */}
            {!UserLogin && (
              <div className="flex flex-col items-center gap-3 mt-4">
                <Link className="text-lg" to="login">
                  Login
                </Link>
                <Link className="text-lg" to="register">
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
