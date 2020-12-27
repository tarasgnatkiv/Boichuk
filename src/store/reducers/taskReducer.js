import * as actionTypes from "../actions/actionTypes";
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK_START: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case actionTypes.ADD_TASK_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actionTypes.ADD_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }

    default:
      return state;
  }
};
export default reducer;
