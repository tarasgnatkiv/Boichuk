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
    case actionTypes.UPLOAD_SELECTED_TASKS_START: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case actionTypes.UPLOAD_SELECTED_TASKS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actionTypes.UPLOAD_SELECTED_TASKS_SUCCESS: {
      return {
        ...state,
        loading: false,
        tasks: action.tasks,
      };
    }

    default:
      return state;
  }
};
export default reducer;
