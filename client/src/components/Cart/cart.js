import './cart.css';
import * as API from "../../config/apiConfig";
import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Cart(){
    const [state, setstate] = useState({
        status: 0,
        baseURL: "",
        data: {},
        headers: {},
        url: "",
        response: {},
    });

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
    return(
        <>
            <div className="btn btn-primary col-2 m-1" onClick={getCart}>
                CART
            </div>
            <textarea
                className="form-control"
                rows={20}
                value={JSON.stringify(state, undefined, 4)}
            />

        </>
    )
}

export default Cart
