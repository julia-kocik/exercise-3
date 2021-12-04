import * as actionTypes from '../constants/quotesConstants';
import axios from 'axios';


export const getQuotes = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_QUOTES_REQUEST });

    const { data } = await axios.get(`https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json`);

    dispatch({
      type: actionTypes.GET_QUOTES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_QUOTES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};