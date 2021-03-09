import { ADD_SUBSCRIBER, GET_SUBSCRIBERS, GET_SUBSCRIBER } from '../actions/types';

const initialState = {};

const subscriberReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SUBSCRIBER:
            return state;
        case GET_SUBSCRIBERS:
            return state;
        case GET_SUBSCRIBER:
            return state;
        default:
            return state;
    }
};

export default subscriberReducer;