import * as actionTypes from "../actions/actionTypes";
const initialState = {
  works: [],
  loading: false,
  error: false,
  redirectWork: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_WORKS_START: {
      return {
        ...state,
        error: false,
        loading: true,
      };
    }
    case actionTypes.UPLOAD_WORKS_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.UPLOAD_WORKS_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        works: action.works,
      };
    }
    case actionTypes.REMOVE_WORK_START: {
      return {
        ...state,
        error: false,
        loading: true,
      };
    }
    case actionTypes.REMOVE_WORK_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.REMOVE_WORK_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        works: action.works,
        redirectWork: "/myWorks",
      };
    }
    case actionTypes.GET_JOB_START: {
      return {
        ...state,
        error: false,
        loading: true,
      };
    }
    case actionTypes.GET_JOB_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.GET_JOB_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        redirectWork: "/about",
      };
    }
    case actionTypes.SET_REDIRECT_WORK_PATH: {
      if (action.path == "null") {
        return {
          ...state,
          redirectWork: null,
        };
      } else {
        return {
          ...state,
          redirectWork: action.path,
        };
      }
    }
    default:
      return state;
  }
};
export default reducer;
