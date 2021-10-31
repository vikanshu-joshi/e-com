import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const body = {
    email: "vikanshu2016@gmail.com",
    password: "1234567890",
    phone: "+918375082256",
    name: "vikanshu",
  };
  const [state, setstate] = useState({
    loginInfo: undefined,
  });

  useEffect(() => {
    fetch(
      "auth/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
      []
    )
      .then((res) => res.json())
      .then((data) =>
        setstate({
          loginInfo: data.data,
        })
      );
  });

  return (
    <div className="App">
      <h1>login</h1>
      <div className="App">{JSON.stringify(state)}</div>
    </div>
  );
}

export default App;
