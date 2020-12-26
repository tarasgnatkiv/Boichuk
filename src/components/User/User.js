import React, { Component } from "react";
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import classes from "./User.module.css";
import femaleUser from "./femaleUser.png";
import ButtonComponent from "../UI/Button/Button";
class User extends Component {
  state = {};
  render() {
    return (
      <li className={classes.User}>
        <div className={classes.UserMainPart}>
          <div className={classes.LeftPart}>
            <div className={classes.DeleteUser}>
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
            <button className={classes.ButtonAddTask}>Add task</button>
          </div>
        </div>
        <div className={classes.BottomRemove}>
          <div className={classes.container}>
            <h1>Delete User</h1>
            <p>Are you sure you want to delete your worker?</p>
            <div className={classes.clearfix}>
              <button type="button" className={classes.cancelbtn}>
                Cancel
              </button>
              <button type="button" className={classes.deletebtn}>
                Delete
              </button>
            </div>
          </div>
        </div>

  
      </li>
    );
  }
}
export default User;
