import "./App.css";
import * as API from "./config/apiConfig";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
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
    console.log(response.data.data.token)
    localStorage.setItem("jwtToken",response.data.data.token)
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

  const bySearch = async ()=>{
    const response = await API.bySearch({
      search:"bed",
      s:"pAsc",
      page:3
    })
    console.log(response);
    setstate({
      baseURL: response.config.baseURL,
      headers: response.config.headers,
      url: response.config.url,
      data: JSON.parse(response.config.data ? response.config.data : "{}"),
      response: response.data,
      status: response.status,
    });
  }
  const byCategory = async ()=>{
    const response = await API.byCategory({
      c:"women-casual",
      priceR:'100-5000',
      ratingR:'0-3',
      s:"pAsc",
      page:2
    })
    console.log(response);
    setstate({
      baseURL: response.config.baseURL,
      headers: response.config.headers,
      url: response.config.url,
      data: JSON.parse(response.config.data ? response.config.data : "{}"),
      response: response.data,
      status: response.status,
    });
  }

  return (
    <div className="form-group">
      <h1>API</h1>
      <div className="row mb-4">
        <div className="btn btn-primary col-2 m-1" onClick={login}>
          LOGIN
        </div>
        <div className="btn btn-primary col-2 m-1" onClick={create}>
          SIGNUP
        </div>
        <div className="btn btn-primary col-3 m-1" onClick={changePassword}>
          CHANGE PASSWORD
        </div>
      </div>
      <div className="row mb-4">
        <div className="btn btn-primary col-2 m-1" onClick={getProfile}>
          GET PROFILE
        </div>
        <div className="btn btn-primary col-2 m-1" onClick={getCart}>
          GET CART
        </div>
        <div className="btn btn-primary col-3 m-1" onClick={getAddresses}>
          GET ADDRESSES
        </div>
      </div>
      <div className="row mb-4">
        <div className="btn btn-primary col-2 m-1" onClick={bySearch}>
          GET PRODUCTS BY SEARCH
        </div>
        <div className="btn btn-primary col-2 m-1" onClick={byCategory}>
          GET PRODUCTS BY CATEGORY
        </div>
      </div>
      <textarea
        className="form-control"
        rows={20}
        value={JSON.stringify(state, undefined, 4)}
      />
    </div>
  );
}

export default App;
