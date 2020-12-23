import * as actionTypes from "./actionTypes";
import axios from "axios";
export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};
export const authFail = (error) => {
  return { type: actionTypes.AUTH_FAIL, error: error };
};
export const auth = (login, password, repeatPassword, nickname) => {
  return (dispatch) => {
    dispatch(authStart());
    if (nickname.length < 4 || nickname.length > 25) {
      dispatch(
        authFail("Ooops, nickname has to be between 4 and 25 characters!")
      );
    } else if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        login
      ) == false
    ) {
      dispatch(authFail("Ooops, it seems that email isn't correct!"));
    } else if (password.length < 6 || password.length > 20) {
      dispatch(
        authFail("Ooops, password has to be between 6 and 20 characters!")
      );
    } else if (repeatPassword !== password) {
      dispatch(authFail("Ooops, passwords do not match!"));
    } else {
      const authData = {
        email: login,
        password: password,
        returnSecureToken: true,
      };
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyByJGBJ1ZfClAOLx6PR3391TK2f7bZM6bs",
          authData
        )
        .then((response) => {
          console.log(response);
          dispatch(
            authSuccess(response.data.idToken, response.data.localId, nickname)
          );
          return axios.post(
            `https://strongmanagment-default-rtdb.firebaseio.com/users.json?auth=${response.data.idToken}`,
            { nickname: nickname, userId: response.data.localId }
          );
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          if (typeof error == "string") {
            dispatch(authFail(error));
          } else {
            // if error.response "ooips email already exists"
            dispatch(authFail("Ooops user with this email already exists"));
          }
        });
    }
  };
};
export const loginStart = () => {
  return { type: actionTypes.LOGIN_START };
};
export const loginSuccess = (token, userId) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
    userId: userId,
  };
};
export const loginFail = (error) => {
  return { type: actionTypes.LOGIN_FAIL, error: error };
};
export const login = (login, password) => {
  return (dispatch) => {
    dispatch(loginStart());
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        login
      ) == false
    ) {
      dispatch(loginFail("Ooops, it seems that email isn't correct!"));
    } else if (password.length < 6 || password.length > 20) {
      dispatch(
        loginFail("Ooops, password has to be between 6 and 20 characters!")
      );
    } else {
      const authData = {
        email: login,
        password: password,
        returnSecureToken: true,
      };
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByJGBJ1ZfClAOLx6PR3391TK2f7bZM6bs",
          authData
        )
        .then((response) => {
          console.log(response);
          dispatch(loginSuccess(response.data.idToken, response.data.localId));
        })
        .catch((error) => {
          console.log(error);
          if (typeof error == "string") {
            dispatch(loginFail(error));
          } else {
            // if error.response "ooips email already exists"
            dispatch(loginFail("Ooops, login or password is incorrect"));
          }
        });
    }
  };
};
export const setPath = (path) => {
  return { type: actionTypes.SET_PATH, path: path };
};
export const setRedirectPath = (path) => {
  return (dispatch) => {
    if (path == "null") {
      dispatch(setPath("null"));
    } else {
      dispatch(setPath(path));
    }
  };
};
export const logout = () => {
  return { type: actionTypes.LOGOUT };
};
//
//
//
export const createWorkFail = (error) => {
  return { type: actionTypes.CREATE_WORK_FAIL, error: error };
};
export const createWorkStart = () => {
  return { type: actionTypes.CREATE_WORK_START };
};
export const createWorkSuccess = () => {
  return {
    type: actionTypes.CREATE_WORK_SUCCESS,
  };
};
export const createWork = (name, description, userId, token) => {
  return (dispatch) => {
    dispatch(createWorkStart());

    if (name.length < 1 || name.length > 50) {
      dispatch(
        createWorkFail("Ooops, name has to be between 1 and 20 characters!")
      );
    } else if (description.length < 3 || description.length > 500) {
      dispatch(
        createWorkFail(
          "Ooops, description has to be between 3 and 500 characters!"
        )
      );
    } else {
      let work = {
        name: name,
        description: description,
        ownerId: userId,
        workers: [],
      };

      axios
        .get("https://www.uuidgenerator.net/api/version1")
        .then((response) => {
          console.log(response);
          work = { ...work, password: response.data };
          return axios.post(
            `https://strongmanagment-default-rtdb.firebaseio.com/works.json?auth=${token}`,
            work
          );
        })
        .then((response) => {
          dispatch(createWorkSuccess());
        })
        .catch((error) => {
          console.log(error);
          if (typeof error == "string") {
            dispatch(createWorkFail(error));
          } else {
            console.log(error);
            // if error.response "ooips email already exists"
            dispatch(createWorkFail("Ooops, some propblem exists"));
          }
        });
    }
  };
};
export const uploadWorksStart = () => {
  return { type: actionTypes.UPLOAD_WORKS_START };
};
export const uploadWorksFail = (error) => {
  return { type: actionTypes.UPLOAD_WORKS_FAIL, error: error };
};
export const uploadWorksSuccess = (works) => {
  return {
    type: actionTypes.UPLOAD_WORKS_SUCCESS,
    works: works,
  };
};
function getUserWorks(userId, worksObject) {
  let worksArray = [];
  Object.keys(worksObject).map((key) => {
    if (worksObject[key].ownerId == userId) {
      worksArray.push({ ...worksObject[key], id: key });
    }
  });
  return worksArray;
}
export const uploadWorks = (userId, token) => {
  return (dispatch) => {
    dispatch(uploadWorksStart());
    axios
      .get(
        `https://strongmanagment-default-rtdb.firebaseio.com/works.json?auth=${token}`
      )
      .then((response) => {
        console.log(response.data);
        dispatch(uploadWorksSuccess(getUserWorks(userId, response.data)));
      })
      .catch((error) => {
        console.log(error);
        if (typeof error == "string") {
          dispatch(uploadWorksFail(error));
        } else {
          console.log(error);
          // if error.response "ooips email already exists"
          dispatch(uploadWorksFail("Ooops, some propblem exists"));
        }
      });
  };
};
//
//
//
//
//

export const removeWorkStart = () => {
  return { type: actionTypes.REMOVE_WORK_START };
};
export const removeWorkFail = (error) => {
  return { type: actionTypes.REMOVE_WORK_FAIL, error: error };
};
export const removeWorkSuccess = (works) => {
  return {
    type: actionTypes.REMOVE_WORK_SUCCESS,
    works: works,
  };
};
export const removeWork = (workId, token, prevWorks) => {
  return (dispatch) => {
    dispatch(removeWorkStart());
    axios
      .delete(
        `https://strongmanagment-default-rtdb.firebaseio.com/works/${workId}.json?auth=${token}`
      )
      .then((response) => {
        console.log(response.data);
        let newWorks = [];
        for (let i = 0; i < prevWorks.length; i++) {
          if (prevWorks[i].id != workId) {
            newWorks.push(prevWorks[i]);
          }
        }
        dispatch(removeWorkSuccess(newWorks));
      })
      .catch((error) => {
        dispatch(removeWorkFail(error));
      });
  };
};
