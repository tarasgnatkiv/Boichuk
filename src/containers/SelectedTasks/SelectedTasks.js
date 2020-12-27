import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class SelectedTasks extends Component {
  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const workId = params.get("workId");
    this.props.onUploadSelectedTasks(
      workId,
      this.props.userId,
      this.props.token
    );
  }
  render() {
    return <div>LOLOLOL</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    tasks: state.tasks.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUploadSelectedTasks: (workId, userId, token) =>
      dispatch(actions.uploadSelectedTasks(workId, userId, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedTasks);
