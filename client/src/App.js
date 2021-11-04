import "./App.css";
import React, { useEffect } from "react";
import * as api from "./api";

function App() {
  useEffect(() => {
    api.getCategories().then((res) => {
      console.log(res);
    });
  });

  return (
    <div className="App">
      <h1>login</h1>
    </div>
  );
}

export default App;
