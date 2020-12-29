import classes from "./Task.module.css";
import React, { Component } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
class Task extends Component {
  state = {
    inputReport: "",
  };
  sendReport = () => {
    this.props.onSendArticle(
      this.props.token,
      this.props.taskId,
      this.state.inputReport,
      this.props.name,
      this.props.description,
      this.props.ownerId
    );
  };
  inputHandler = (event) => {
    this.setState({ inputReport: event.target.value });
    console.log(this.state.inputReport)
  };
  render() {
    return (
      <li key={this.props.index + 1} className={classes.taskItem}>
        <div className={classes.number}>#{this.props.index + 1}</div>
        <h2>
          <span>Name: </span>
          {this.props.name}
        </h2>
        <p>
          <span>Description: </span>
          {this.props.description}
        </p>
        <div className={classes.LinkInput}>
          <span>Link: </span>
          <input
            value={this.state.inputReport}
            onChange={(event) => this.inputHandler(event)}
            placeholder="https://docs.google.com/document/u/0/"
          />
        </div>
        <button onClick={this.sendReport} className={classes.SendArticle}>
          Send Report
        </button>
      </li>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.tasks.error,
    loading: state.tasks.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSendArticle: (token, taskId, googleLink, name, description, ownerId) =>
      dispatch(
        actions.sendArticle(
          token,
          taskId,
          googleLink,
          name,
          description,
          ownerId
        )
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Task);
