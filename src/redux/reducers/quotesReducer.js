import * as actionTypes from '../constants/quotesConstants';

export const quotesReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_QUOTES_REQUEST:
      return {
        loading: true,
        quotes: [],
      };
    case actionTypes.GET_QUOTES_SUCCESS:
      return {
        quotes: action.payload,
        loading: false,
      };
    case actionTypes.GET_QUOTES_FAIL:
      return {
        quotes: false,
        error: action.payload,
      };
    default:
      return state;
  }
};