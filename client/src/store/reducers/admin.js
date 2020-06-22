import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../util';

const initialState = {
  loading: false,
  error: false,
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NEW_PRODUCT_START:
      return updateObject(state, { loading: true, error: false });
    case actionTypes.ADD_NEW_PRODUCT_SUCCESS:
      return updateObject(state, {
        loading: false,
        error: false,
      });
    case actionTypes.ADD_NEW_PRODUCT_FAIL:
      return updateObject(state, { loading: false, error: true });

    case actionTypes.EDIT_PRODUCT_START:
      return updateObject(state, { loading: true, error: false });
    case actionTypes.EDIT_PRODUCT_SUCCESS:
      return updateObject(state, {
        loading: false,
        error: false,
      });
    case actionTypes.EDIT_PRODUCT_FAIL:
      return updateObject(state, { loading: false, error: true });
    default:
      return state;
  }
};

export default home;
