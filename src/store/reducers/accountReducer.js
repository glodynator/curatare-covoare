import { ADD_ACCOUNT_SUCCESS, ADD_ACCOUNT_ERROR } from '../actions/types';

const initialState = {};

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACCOUNT_SUCCESS:
      return state;
    case ADD_ACCOUNT_ERROR:
      return state;
    default:
      return state;
  }
};

export default memberReducer;