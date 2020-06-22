import * as actionTypes from './actionTypes';
import axios from 'axios';

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
      .post('/addproduct', data)
      .then((result) => {
        if (result.status === 200) {
          window.location.reload(true);
          dispatch(sentNewProductSuccess());
        } else if (result.status === 204) {
          alert('Product already exits');
          dispatch(sentNewProductFail());
        } else {
          alert('error');
          dispatch(sentNewProductFail());
        }
      })
      .catch((err) => {
        alert(err);
        dispatch(sentNewProductFail());
      });
  };
};

export const editProductStart = () => {
  return { type: actionTypes.ADD_NEW_PRODUCT_START };
};
export const editProductSuccess = (products) => {
  return { type: actionTypes.ADD_NEW_PRODUCT_SUCCESS, products };
};
export const editProductFail = () => {
  return { type: actionTypes.ADD_NEW_PRODUCT_FAIL };
};
export const initEditProduct = (data) => {
  return (dispatch) => {
    dispatch(editProductStart());
    axios
      .post('/editproduct', data)
      .then((result) => {
        if (result.status === 200) {
          window.location.reload(true);
          alert('product is updated');
          dispatch(editProductSuccess());
        } else if (result.status === 204) {
          alert('product not exits');
          dispatch(editProductFail());
        }
      })
      .catch((err) => {
        alert(err);
        dispatch(editProductFail());
      });
  };
};
