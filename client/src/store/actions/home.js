import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchProductsStart = () => {
  return { type: actionTypes.FETCH_PRODUCTS_START };
};
export const fetchProducts = (products) => {
  return { type: actionTypes.FETCH_PRODUCTS_SUCCESS, products };
};
export const fetchProductsFail = () => {
  return { type: actionTypes.FETCH_PRODUCTS_FAIL };
};
export const initFetchProducts = () => {
  return (dispatch) => {
    dispatch(fetchProductsStart());
    axios
      .get("api/product")
      .then((response) => {
        if (response.data.length === 0) {
          dispatch(fetchProductsFail());
        } else {
          dispatch(fetchProducts(response.data.reverse()));
        }
      })
      .catch((error) => {
        dispatch(fetchProductsFail(error));
      });
  };
};
