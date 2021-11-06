import {LOGIN, SIGNUP, ERROR} from '../types';

const isEmpty = require("is-empty");
const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };

        case SIGNUP:
            return;
        default:
            return state;
    }
}
export default authReducer;
