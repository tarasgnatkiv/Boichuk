import React, { Component } from "react";
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import classes from "./User.module.css";
import femaleUser from "./femaleUser.png";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import InputElement from "../../components/UI/Input/Input";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";

class User extends Component {
  state = {
    delete: false,
    addTask: false,
    controls: {
      TaskName: {
        elementType: "input",
        elementConfig: {
          type: "",
          placeholder: "make coffe",
        },
        label: "Task name",
        touched: false,
        value: "",
        validation: {
          required: true,
          valid: false,
          minLength: 1,
          maxLength: 20,
          isEmail: false,
        },
      },
      TaskDescription: {
        elementType: "textarea",
        elementConfig: {
          type: "",
          placeholder:
            "At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.",
        },
        label: "Description",
        touched: false,
        value: "",
        validation: {
          required: true,
          valid: false,
          minLength: 3,
          maxLength: 500,
        },
      },
    },
    signUp: true,
  };
  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      console.log(value);
      isValid = pattern.test(value) && isValid;
      console.log(isValid);
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        validation: {
          ...this.state.controls[controlName].validation,
          valid: this.checkValidity(
            event.target.value,
            this.state.controls[controlName].validation
          ),
        },
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  cancelDelete = () => {
    if (this.state.addTask) {
      this.setState({
        addTask: !this.state.addTask,
      });
    }
    this.setState({
      delete: !this.state.delete,
    });
  };

  addTaskFunc = () => {
    if (this.state.delete) {
      this.setState({
        delete: !this.state.delete,
      });
    }
    this.setState({
      addTask: !this.state.addTask,
    });
  };
  startCreatingTask = () => {
    this.addTaskFunc();
    this.props.onAddTask(
      this.props.workId,
      this.props.selectedUserId,
      this.props.token,
      this.state.controls.TaskName.value,
      this.state.controls.TaskDescription.value
    );
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementsArray.map((element) => {
      return (
        <InputElement
          key={element.id}
          changed={(event) => this.inputChangedHandler(event, element.id)}
          elementType={element.config.elementType}
          elementConfig={element.config.elementConfig}
          invalid={!element.config.validation.valid}
          value={element.config.value}
          shouldValidate={element.config.validation.required}
          touched={element.config.touched}
          label={element.config.label}
        />
      );
    });
    let error = null;
    if (this.props.error) {
      error = (
        <React.Fragment>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
          </style>
          <div className={classes.errorMessage}>{this.props.error}</div>
        </React.Fragment>
      );
      console.log("fefef");
    }
    let spinner = null;
    if (this.props.loading) {
      spinner = <Spinner />;
    }
    let redirect = null;
    if (this.props.redirect) {
      redirect = <Redirect to={this.props.redirect} />;
    }
    if (this.props.redirect == null || this.props.redirect == "null") {
      redirect = null;
    }

    return (
      <li className={classes.User}>
        <div className={classes.UserMainPart}>
          <div className={classes.LeftPart}>
            <div className={classes.DeleteUser} onClick={this.cancelDelete}>
              <i class="fas fa-user-minus"></i>
            </div>
            <img className={classes.Avatar} src={femaleUser} />
          </div>
          <div className={classes.RightPart}>
            <div className={classes.TopUserHeader}>
              <div className={classes.Label}>{this.props.userName}</div>
            </div>
            <div className={classes.TaskGroup}>
              <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Langar&family=Pacifico&family=Questrial&display=swap');
              </style>
              <div>Tasks:</div>
              <div className={classes.TaskGroupValue}>
                <i class="fas fa-tasks"></i>
              </div>
              <div className={classes.TaskGroupValue}>
                {this.props.userTasks}
              </div>
            </div>
            <div className={classes.RatingGroup}>
              <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Langar&family=Pacifico&family=Questrial&display=swap');
              </style>
              <div>Rating:</div>
              <div className={classes.RatingGroupValue}>
                <i class="far fa-smile"></i>
              </div>
              <div className={classes.TaskGroupValue}>{"88/100"}</div>
            </div>
            <button
              className={classes.ButtonAddTask}
              onClick={this.addTaskFunc}
            >
              Add task
            </button>
          </div>
        </div>
        <div
          className={
            this.state.delete
              ? [classes.active, classes.DeleteContainer].join(" ")
              : classes.DeleteContainer
          }
        >
          <div className={classes.container}>
            <h1>Delete User</h1>
            <p>Are you sure you want to delete your user?</p>

            <div className={classes.clearfix}>
              <button
                type="button"
                onClick={this.cancelDelete}
                className={classes.cancelbtn}
              >
                Cancel
              </button>
              <button type="button" className={classes.deletebtn}>
                Delete
              </button>
            </div>
          </div>
        </div>

        <div
          className={
            this.state.addTask
              ? [classes.active, classes.addTaskContainer].join(" ")
              : classes.addTaskContainer
          }
        >
          <div className={classes.addTask}>
            <h1>Add task</h1>
            <form className={classes.form}>
              {form}
              {error}
              <div className={classes.clearfix}>
                <button
                  type="button"
                  onClick={this.addTaskFunc}
                  className={classes.cancelbtn}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={this.startCreatingTask}
                  className={classes.deletebtn}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </li>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddTask: (workId, recipientId, token, taskLabel, taskDescription) =>
      dispatch(
        actions.addTask(workId, recipientId, token, taskLabel, taskDescription)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
