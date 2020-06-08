import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../util";

const initialState = {
  isAuthenticated: false,
  error: false,
  errorMsg: "",
  loading: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { error: false, loading: true });
    case actionTypes.AUTH_SUCCESS:
      localStorage.setItem("username", action.username);
      return updateObject(state, {
        loading: false,
        isAuthenticated: true,
      });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, {
        loading: false,
        error: true,
        errorMsg: action.errorMsg,
      });
    case actionTypes.AUTH_LOGOUT:
      localStorage.removeItem("username");
      window.location.reload(true);
      return updateObject(state, { loading: false, isAuthenticated: false });

    default:
      return state;
  }
};

export default auth;
