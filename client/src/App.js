import React, { useState } from "react";
import * as API from "./config/apiConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  useLocation,
  Route,
  Routes,
} from "react-router-dom";
import { Navigate } from "react-router";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Navbar from "./components/Navbar/navbar2";
import Cart from "./components/Cart/cart";
import Search from "./components/Search/search";
import Checkout from "./components/Checkout/checkout";
import Product from "./components/Product/product";
import ForgotPassword from "./components/Forgot Password/forgotPassword";
import Home from "./components/Home/home";

function App() {
  const location = useLocation();
  const [state, setstate] = useState({
    status: 0,
    baseURL: "",
    data: {},
    headers: {},
    url: "",
    response: {},
  });

  const login = async () => {
    const response = await API.loginUser({
      email: "joshi77@gmail.com",
      password: "12$A!789",
    });
    console.log(response.data.data.token);
    localStorage.setItem("jwtToken", response.data.data.token);
    setstate({
      baseURL: response.config.baseURL,
      headers: response.config.headers,
      url: response.config.url,
      data: JSON.parse(response.config.data),
      response: response.data,
      status: response.status,
    });
  };

  const create = async () => {
    const response = await API.createUser({
      email: "joshi77@gmail.com",
      password: "12$A!789",
      name: "joshi",
      phone: "9999999999",
    });
    setstate({
      baseURL: response.config.baseURL,
      headers: response.config.headers,
      url: response.config.url,
      data: JSON.parse(response.config.data),
      response: response.data,
      status: response.status,
    });
  };

  const changePassword = async () => {
    const response = await API.changePassword({
      oldPassword: "12$A!789",
      newPassword: "12$A!789",
    });
    setstate({
      baseURL: response.config.baseURL,
      headers: response.config.headers,
      url: response.config.url,
      data: JSON.parse(response.config.data),
      response: response.data,
      status: response.status,
    });
  };

  const getProfile = async () => {
    const response = await API.getUserProfile();
    console.log(response);
    setstate({
      baseURL: response.config.baseURL,
      headers: response.config.headers,
      url: response.config.url,
      data: JSON.parse(response.config.data ? response.config.data : "{}"),
      response: response.data,
      status: response.status,
    });
  };

  const getCart = async () => {
    const response = await API.getCart();
    console.log(response);
    setstate({
      baseURL: response.config.baseURL,
      headers: response.config.headers,
      url: response.config.url,
      data: JSON.parse(response.config.data ? response.config.data : "{}"),
      response: response.data,
      status: response.status,
    });
  };

  const getAddresses = async () => {
    const response = await API.getAddresses();
    console.log(response);
    setstate({
      baseURL: response.config.baseURL,
      headers: response.config.headers,
      url: response.config.url,
      data: JSON.parse(response.config.data ? response.config.data : "{}"),
      response: response.data,
      status: response.status,
    });
  };

  const bySearch = async () => {
    const response = await API.bySearch({
      search: "bed",
      s: "pAsc",
      page: 3,
    });
    console.log(response);
    setstate({
      baseURL: response.config.baseURL,
      headers: response.config.headers,
      url: response.config.url,
      data: JSON.parse(response.config.data ? response.config.data : "{}"),
      response: response.data,
      status: response.status,
    });
  };
  const byCategory = async () => {
    const response = await API.byCategory({
      c: "women-casual",
      priceR: "100-5000",
      ratingR: "0-3",
      s: "pAsc",
      page: 2,
    });
    console.log(response);
    setstate({
      baseURL: response.config.baseURL,
      headers: response.config.headers,
      url: response.config.url,
      data: JSON.parse(response.config.data ? response.config.data : "{}"),
      response: response.data,
      status: response.status,
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          localStorage.getItem("jwtToken") ? <Navigate to="/home" /> : <Login />
        }
      />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/search" element={<Search />} />
      <Route path="/product/:pid" element={<Product />} />
    </Routes>
  );
}

export default App;
