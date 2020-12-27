import * as actionTypes from "./actionTypes";
import axios from "axios";
import getWorkByPassword from "../../functions/getWorkByPassword";
import getWorkersByWork from "../../functions/getWorkersByWork";
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
            {
              nickname: nickname,
              userId: response.data.localId,
              rating: "0/0",
              tasks: [],
            }
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
//
//
//
export const getJobStart = () => {
  return { type: actionTypes.GET_JOB_START };
};
export const getJobFail = (error) => {
  return { type: actionTypes.GET_JOB_FAIL, error: error };
};
export const getJobSuccess = () => {
  return {
    type: actionTypes.GET_JOB_SUCCESS,
  };
};
export const getJob = (password, userId, token) => {
  return (dispatch) => {
    dispatch(getJobStart());
    if (password.length != 36) {
      dispatch(getJobFail("Ooops,password must be 36 characters long"));
    } else {
      axios
        .get(
          `https://strongmanagment-default-rtdb.firebaseio.com/works.json?auth=${token}`
        )
        .then((response) => {
          console.log(response.data);
          let allWorks = response.data;
          let findedWork = getWorkByPassword(allWorks, password);
          if (findedWork.error) {
            return Promise.reject(findedWork.error);
          } else {
            let findedWorkValue = findedWork.work;
            let updatedWorkers = [];
            console.log(findedWorkValue + "findedWork");

            if (findedWorkValue.workers) {
              console.log(findedWorkValue.workers + "findedWork.workers");
              updatedWorkers = findedWorkValue.workers;
              for (let existedWorker of updatedWorkers) {
                if (existedWorker == userId) {
                  return Promise.reject("You already work at this job");
                }
              }
              updatedWorkers.push(userId);
            } else {
              updatedWorkers.push(userId);
            }
            console.log(updatedWorkers + "updated workers");
            let updatedWork = { ...findedWorkValue, workers: updatedWorkers };
            console.log(findedWork.id);
            return axios.patch(
              `https://strongmanagment-default-rtdb.firebaseio.com/works/${findedWorkValue.id}.json?auth=${token}`,
              updatedWork
            );
          }
        })
        .then((response) => {
          console.log(response);
          dispatch(getJobSuccess());
        })
        .catch((error) => {
          console.log(error);
          dispatch(getJobFail(error));
        });
    }
  };
};
export const setRedirectWorkPath = (path) => {
  return { type: actionTypes.SET_REDIRECT_WORK_PATH, path: path };
};

export const uploadWorkersFail = (error) => {
  return { type: actionTypes.UPLOAD_WORKERS_FAIL, error: error };
};
export const uploadWorkersStart = () => {
  return { type: actionTypes.UPLOAD_WORKERS_START };
};
export const uploadWorkersSuccess = (workers) => {
  return {
    type: actionTypes.UPLOAD_WORKERS_SUCCESS,
    workers: workers,
  };
};
export const uploadWorkers = (workId, userId, token) => {
  return (dispatch) => {
    dispatch(uploadWorkersStart());
    axios
      .get(
        `https://strongmanagment-default-rtdb.firebaseio.com/works.json?auth=${token}`
      )
      .then((response) => {
        console.log(response.data);
        console.log(workId);
        let selectedWork = response.data[workId];
        console.log(selectedWork);
        if (selectedWork.ownerId != userId) {
          return Promise.reject(
            "Oooops, you dont have enough permissions to upload this page"
          );
        } else {
          return Promise.all([
            axios.get(
              `https://strongmanagment-default-rtdb.firebaseio.com/users.json?auth=${token}`
            ),
            selectedWork,
          ]);
        }
      })
      .then(([response, selectedWork]) => {
        console.log(response.data, "promose.ALL RESPONSE");
        console.log(selectedWork, "promose.ALL selectedWork");
        let allWorkersArray = getWorkersByWork(response.data, selectedWork);
        dispatch(uploadWorkersSuccess(allWorkersArray.workers));
      })
      .catch((error) => {
        if (typeof error == "string") {
          console.log(error);
          dispatch(uploadWorkersFail(error));
        } else {
          dispatch(uploadWorkersFail("Ooops, something went wrong"));
          console.log(error);
        }
      });
  };
};
export const setEmptyWorkers = () => {
  return {
    type: actionTypes.SET_EMPTY_WORKERS,
  };
};

//
//
//
export const getWorksTasksStart = () => {
  return { type: actionTypes.GET_WORKS_TASKS_START };
};
export const getWorksTasksFail = (error) => {
  return { type: actionTypes.GET_WORKS_TASKS_FAIL, error: error };
};
export const getWorksTasksSuccess = (worksTask) => {
  return { type: actionTypes.GET_WORKS_TASKS_SUCCESS, worksTask: worksTask };
};

export const getWorksTasks = (userId, token) => {
  return (dispatch) => {
    dispatch(getWorksTasksStart());
    axios
      .get(
        `https://strongmanagment-default-rtdb.firebaseio.com/works.json?auth=${token}`
      )
      .then((response) => {
        let worksTasks = [];
        let allWorks = response.data;
        for (let key in allWorks) {
          if (allWorks[key].hasOwnProperty("workers")) {
            if (allWorks[key].workers.includes(userId)) {
              worksTasks.push({ ...allWorks[key], tasks: [] });
            }
          }
        }
        return Promise.all([
          axios.get(
            `https://strongmanagment-default-rtdb.firebaseio.com/tasks.json?auth=${token}`
          ),
          worksTasks,
        ]);
      })
      .then(([response, worksTasks]) => {
        let allTasks = response.data;
        console.log(allTasks);
        for (let taskId in allTasks) {
          if (allTasks[taskId].recipientId == userId) {
            for (let work of worksTasks) {
              if (work.id == allTasks[taskId].workId) {
                work = {
                  ...work,
                  tasks: work.tasks.push({ ...allTasks[taskId], id: taskId }),
                };
              }
            }
          }
        }
        dispatch(getWorksTasksSuccess(worksTasks));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getWorksTasksFail(error));
      });
  };
};
//
//
//
//
//
export const leaveWorkFail = (error) => {
  return { type: actionTypes.LEAVE_WORK_FAIL, error: error };
};
export const leaveWorkStart = () => {
  return { type: actionTypes.LEAVE_WORK_START };
};
export const leaveWorkSuccess = (updatedTasks) => {
  return {
    type: actionTypes.LEAVE_WORK_SUCCESS,
    newTasks: updatedTasks,
  };
};
export const leaveWork = (workId, userId, token) => {
  return (dispatch, getState) => {
    dispatch(leaveWorkStart());
    axios
      .get(
        `https://strongmanagment-default-rtdb.firebaseio.com/works.json?auth=${token}`
      )
      .then((response) => {
        let selectedWork = response.data[workId];
        console.log(selectedWork);
        let workersIdSelectedWork = selectedWork.workers;
        console.log(workersIdSelectedWork);
        let selfLeaveFromWork = workersIdSelectedWork.filter(
          (workerId) => workerId != userId
        );

        let updatedWork = { ...selectedWork, workers: selfLeaveFromWork };
        return axios.patch(
          `https://strongmanagment-default-rtdb.firebaseio.com/works/${workId}.json?auth=${token}`,
          updatedWork
        );
      })
      .then((response) => {
        let updatedTasks = getState().works.worksTask.filter(
          (w) => w.id != workId
        );
        console.log(updatedTasks);
        dispatch(leaveWorkSuccess(updatedTasks));
      })
      .catch((err) => {
        console.log(err);
        dispatch(leaveWorkFail(err));
      });
  };
};
//
//
//
//
export const addTaskFail = (error) => {
  return { type: actionTypes.ADD_TASK_FAIL, error: error };
};
export const addTaskStart = () => {
  return { type: actionTypes.ADD_TASK_START };
};
export const addTaskSuccess = () => {
  return {
    type: actionTypes.ADD_TASK_SUCCESS,
  };
};
export const addTask = (
  workId,
  recipientId,
  token,
  taskLabel,
  taskDescription
) => {
  return (dispatch) => {
    dispatch(addTaskStart());
    console.log(token);
    axios
      .post(
        `https://strongmanagment-default-rtdb.firebaseio.com/tasks.json?auth=${token}`,
        {
          workId: workId,
          recipientId: recipientId,
          name: taskLabel,
          description: taskDescription,
        }
      )
      .then((response) => {
        dispatch(addTaskSuccess());
      })
      .catch((err) => {
        console.log(err);
        if (typeof err == "string") {
          dispatch(addTaskFail(err));
        } else {
          dispatch(addTaskFail("Something went wrong"));
        }
      });
  };
};
//
//
//
//
export const uploadSelectedTasksStart = () => {
  return { type: actionTypes.UPLOAD_SELECTED_TASKS_START };
};
export const uploadSelectedTasksFail = (err) => {
  return { type: actionTypes.UPLOAD_SELECTED_TASKS_FAIL, error: err };
};
export const uploadSelectedTasksSuccess = (tasks) => {
  return { type: actionTypes.UPLOAD_SELECTED_TASKS_SUCCESS, tasks: tasks };
};
export const uploadSelectedTasks = (workId, userId, token) => {
  return (dispatch) => {
    dispatch(uploadSelectedTasksStart());
    axios
      .get(
        `https://strongmanagment-default-rtdb.firebaseio.com/tasks.json?auth=${token}`
      )
      .then((response) => {
        let allTasks = response.data;
        let resultTasks = [];
        for (let taskId in allTasks) {
          if (
            allTasks[taskId].workId == workId &&
            allTasks[taskId].recipientId == userId
          ) {
            resultTasks.push({ ...allTasks[taskId], id: taskId });
          }
        }
        console.log(resultTasks);
        dispatch(uploadSelectedTasksSuccess(resultTasks));
      })
      .catch((err) => {
        if (typeof err == "string") {
          dispatch(uploadSelectedTasksFail(err));
        } else {
          dispatch(uploadSelectedTasksFail("Ooops, some propblem exists"));
        }
      });
  };
};
