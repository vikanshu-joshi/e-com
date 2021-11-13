import './login.css';
import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as API from "../../config/apiConfig";

function Login(){
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

    return(
        <>
            <div className="btn btn-primary col-2 m-1" onClick={login}>
                LOGIN
            </div>
            <textarea
                    className="form-control"
                    rows={20}
                    value={JSON.stringify(state, undefined, 4)}
            />

        </>
    )
}

export default Login;
