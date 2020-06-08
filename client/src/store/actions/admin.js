import * as actionTypes from "./actionTypes";
import axios from "axios";

export const sentNewProductStart = () => {
  return { type: actionTypes.ADD_NEW_PRODUCT_START };
};
export const sentNewProductSuccess = (products) => {
  return { type: actionTypes.ADD_NEW_PRODUCT_SUCCESS, products };
};
export const sentNewProductFail = () => {
  return { type: actionTypes.ADD_NEW_PRODUCT_FAIL };
};
export const initSentNewProduct = (data) => {
  return (dispatch) => {
    dispatch(sentNewProductStart());
    axios
      .post("/addproduct", data)
      .then((result) => {
        if (result.status === 200) {
          window.location.reload(true);
          dispatch(sentNewProductSuccess());
        } else if (result.status === 204) {
          alert("Product already exits");
          dispatch(sentNewProductFail());
        } else {
          alert("error");
          dispatch(sentNewProductFail());
        }
      })
      .catch((err) => {
        alert(err);
        dispatch(sentNewProductFail());
      });
  };
};
