import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../util";

const initialState = {
  products: [],
  loading: false,
  error: false,
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return updateObject(state, { loading: true, error: false });
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return updateObject(state, {
        products: action.products,
        loading: false,
        error: false,
      });
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return updateObject(state, { loading: false, error: true });
    default:
      return state;
  }
};

export default home;
