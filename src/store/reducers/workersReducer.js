import * as actionTypes from "../actions/actionTypes";
const initialState = {
  workers: [],
  loading: false,
  error: null,

};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_WORKERS_START: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case actionTypes.UPLOAD_WORKERS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actionTypes.SET_EMPTY_WORKERS: {
      return {
        ...state,
        loading: false,
        error: null,
        workers: [],
      };
    }
    case actionTypes.UPLOAD_WORKERS_SUCCESS: {
      return {
        ...state,
        workers: action.workers,
        error: null,
        loading: false,
      };
    }
  
    default:
      return state;
  }
};
export default reducer;
