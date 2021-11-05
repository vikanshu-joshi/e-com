import "./App.css";
import * as api from './api';
import React, {useEffect} from "react";
import {loginUser} from './actions/authActions'
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        api.getCategories().then((res) => {
            console.log(res);
        });
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser("adam.7@gmail.com", "12$A!789"))

    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <h1>login</h1>
                <button type="submit">CLICK</button>
            </form>
        </div>
    );
}

export default App;
