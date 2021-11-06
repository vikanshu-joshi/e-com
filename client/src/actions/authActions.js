import * as api from '../api';
import {LOGIN, SIGNUP, ERROR} from '../types';
import setAuthToken from "../util/setAuthToken";

//Login
export const loginUser = (email, password) => async (dispatch) => {
    try {
        const {data} = await api.loginUser(email, password);
        const token = data ? data.token : null;
        localStorage.setItem("jwtToken", token);

        // SETTING AUTH HEADER
        setAuthToken(token);
        console.log(data)
        dispatch({
            type: LOGIN,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: ERROR,
            payload: e.response.data
        })
    }
}
