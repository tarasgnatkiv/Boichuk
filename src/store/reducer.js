import * as actionTypes from "../store/actions/actionTypes";
const initialState = {
  token: null,
  userId: null,
  error: null,
  redirect: null,
  loading: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: {
      return {
        token: null,
        userId: null,
        error: null,
        redirect: "/login",
        loading: false,
      };
    }
    case actionTypes.AUTH_FAIL: {
      return {
        token: null,
        userId: null,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.AUTH_START: {
      return {
        token: null,
        userId: null,
        error: null,
        loading: true,
      };
    }
    case actionTypes.LOGIN_START: {
      return {
        token: null,
        userId: null,
        error: null,
        loading: true,
        redirect: null,
      };
      return;
    }
    case actionTypes.LOGIN_FAIL: {
      return {
        token: null,
        userId: null,
        error: action.error,
        loading: null,
        redirect: null,
      };
    }
    case actionTypes.LOGIN_SUCCESS: {
      return {
        token: action.token,
        userId: action.userId,
        error: null,
        redirect: "/",
        loading: false,
      };
    }
    case actionTypes.SET_PATH: {
      if (action.path == "null") {
        return {
          ...state,
          redirect: null,
        };
      } else {
        return {
          ...state,
          redirect: action.path,
        };
      }
    }
    default:
      return state;
  }
};
export default reducer;
