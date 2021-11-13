import './signup.css';
import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as API from "../../config/apiConfig";

function Signup(){
    const [state, setstate] = useState({
        status: 0,
        baseURL: "",
        data: {},
        headers: {},
        url: "",
        response: {},
    });
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


    return(
        <>
            <div className="btn btn-primary col-2 m-1" onClick={create}>
                SIGNUP
            </div>
            <textarea
                className="form-control"
                rows={20}
                value={JSON.stringify(state, undefined, 4)}
            />

        </>
    )
}

export default Signup;
