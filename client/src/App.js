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
      email: "vikanshu2016@gmail.com",
      password: "1234567890",
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

  const create = async () => {
    const response = await API.createUser({
      email: "vikanshu@gmail.com",
      password: "1234567890",
      name: "vikanshu joshi",
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
      oldPassword: "1234567890",
      newPassword: "1234567890",
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
      <textarea
        className="form-control"
        rows={20}
        value={JSON.stringify(state, undefined, 4)}
      />
    </div>
  );
}

export default App;
