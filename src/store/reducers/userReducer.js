import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, RESET_PASSWORD } from "../actions/types";

const initState = {};

export default (state = initState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, payload: action.payload};
        case REGISTER_USER:
            return {...state, register: action.payload};
        case LOGOUT_USER:
            return {...state};
        case RESET_PASSWORD:
            return {...state, payload: action.payload};
        default:
            return state;
    }
};