import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import CounterContextProvider from "./Context/CounterContext";
import UserContextProvider from "./Context/userContext";
import ProtectedRoute from "./Components/protectedRoute/protectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import ProductDetails2 from "./Components/ProductDetails2/ProductDetails2";
import WishList from "./Components/WishList/WishList";
import WishContextProvider from "./Context/WishContext";
import ForgetPass from "./Components/ForgetPass/ForgetPass";
import Verifypass from "./Components/Verifypass/Verifypass";
import ResetPassword from "./Components/Resetpassword/Resetpassword";
import CheckOut from "./Components/CheckOut/CheckOut";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Allorders from "./Components/Allorders/Allorders";

let query = new QueryClient();

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <HelmetProvider>
            <ProtectedRoute>
              <Helmet>
                <title>Home Component</title>
              </Helmet>
              <Home />
            </ProtectedRoute>
          </HelmetProvider>
        ),
      },
      {
        path: "cart",
        element: (
          <HelmetProvider>
            <ProtectedRoute>
              <Helmet>
                <title>Home Component</title>
              </Helmet>
              <Cart />
            </ProtectedRoute>
          </HelmetProvider>
        ),
      },
      {
        path: "allorders",
        element: (
          <HelmetProvider>
            <ProtectedRoute>
              <Helmet>
                <title>Home Component</title>
              </Helmet>
              <Allorders />
            </ProtectedRoute>
          </HelmetProvider>
        ),
      },
      {
        path: "wishlist",
        element: (
          <HelmetProvider>
            <ProtectedRoute>
              <Helmet>
                <title>Home Component</title>
              </Helmet>
              <WishList />
            </ProtectedRoute>
          </HelmetProvider>
        ),
      },
      {
        path: "checkout",
        element: (
          <HelmetProvider>
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          </HelmetProvider>
        ),
      },
      {
        path: "products",
        element: (
          <HelmetProvider>
            <ProtectedRoute>
              <Helmet>
                <title>Products Component</title>
              </Helmet>
              <Products />
            </ProtectedRoute>
          </HelmetProvider>
        ),
      },
      {
        path: "productDetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails2/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails2 />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <HelmetProvider>
            <ProtectedRoute>
              <Helmet>
                <title>Brands Component</title>
              </Helmet>
              <Brands />
            </ProtectedRoute>
          </HelmetProvider>
        ),
      },
      {
        path: "categories",
        element: (
          <HelmetProvider>
            <ProtectedRoute>
              <Helmet>
                <title>Categories Component</title>
              </Helmet>
              <Categories />
            </ProtectedRoute>
          </HelmetProvider>
        ),
      },
      {
        path: "register",
        element: (
          <>
            <HelmetProvider>
              <Helmet>
                <title> Register</title>
              </Helmet>
              <Register />
            </HelmetProvider>
          </>
        ),
      },

      {
        path: "login",
        element: (
          <>
            <HelmetProvider>
              <Helmet>
                <title> Login</title>
              </Helmet>
              <Login />
            </HelmetProvider>
          </>
        ),
      },
      { path: "forgetpass", element: <ForgetPass /> },
      { path: "verifypass", element: <Verifypass /> },
      { path: "resetpassword", element: <ResetPassword /> },
      {
        path: "*",
        element: (
          <>
            <HelmetProvider>
              <Helmet>
                <title> Page NotFound</title>
              </Helmet>
              <Notfound />
            </HelmetProvider>
          </>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <CounterContextProvider>
          <QueryClientProvider client={query}>
            <CartContextProvider>
              <WishContextProvider>
                <RouterProvider router={x}></RouterProvider>
                <Toaster />
              </WishContextProvider>
            </CartContextProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </CounterContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
