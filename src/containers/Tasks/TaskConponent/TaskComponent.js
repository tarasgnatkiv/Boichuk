import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import classes from "./TaskComponent.module.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
class TaskComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: false,
    };
  }

  cancelDelete = () => {
    this.setState({
      delete: !this.state.delete,
    });
  };
  leaveWorkClick = () => {
    this.props.onLeaveWork(
      this.props.info.id,
      this.props.userId,
      this.props.token
    );
  };

  render() {
    return (
      <li className={classes.Work}>
          <div className={classes.number}>#{this.props.index+1}</div>
        <div className={classes.TopWorkHeader}>
          <div className={classes.RemoveWork} onClick={this.cancelDelete}>
            <i className={"fas fa-door-open"}></i>
          </div>
          <div className={classes.Label}>{this.props.info.name}</div>
        </div>
        <div className={classes.Description}>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Langar&family=Pacifico&family=Questrial&display=swap');
          </style>
          {this.props.info.description}
        </div>
        <div className={classes.Task}>
          <i className={"fas fa-tasks"}></i>
          <span>{this.props.info.number}</span>
        </div>
        <div
          className={
            this.state.delete
              ? [classes.active, classes.DeleteContainer].join(" ")
              : classes.DeleteContainer
          }
        >
          <div className={classes.container}>
            <h1>Leave Work</h1>
            <p className={classes.confirm}>
              Are you sure you want to leave your work?
            </p>
            <div className={classes.clearfix}>
              <button
                type="button"
                onClick={this.cancelDelete}
                className={classes.cancelbtn}
              >
                Cancel
              </button>
              <button
                onClick={this.leaveWorkClick}
                type="button"
                className={classes.deletebtn}
              >
                Leave
              </button>
            </div>
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
    error: state.auth.error,
    redirect: state.auth.redirect,
    loading: state.auth.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLeaveWork: (workId, userId, token) =>
      dispatch(actions.leaveWork(workId, userId, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskComponent);
