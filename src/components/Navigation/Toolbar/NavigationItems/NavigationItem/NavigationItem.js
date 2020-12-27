import React, { Component } from "react";
import classes from "./NavigationItem.module.css";
import { connect } from "react-redux";
import * as actions from "../../../../../store/actions/index";
import { NavLink } from "react-router-dom";
class NavigationItem extends Component {

    componentDidMount() {
        if (this.props.token && this.props.link == "/myTasks") {
            this.props.getTasksNumber(this.props.token, this.props.userId)
        }
    }
    componentDidUpdate() {
        if (this.props.token && this.props.link == "/myTasks") {
            this.props.getTasksNumber(this.props.token, this.props.userId)
        }
    }

    render() {
        let notification = null;
        if (this.props.link == "/myTasks" && this.props.countTasks > 0) {
            notification = <span className={classes.number}>{this.props.countTasks}</span>
        }
        return (
            <li onClick={this.props.myRef} className={classes.NavigationItem}>
                <style>@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');</style>
                <NavLink to={this.props.link} exact activeClassName={classes.active}>
                    {this.props.children}
                    {notification}


                </NavLink>
            </li>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        countTasks: state.tasks.countTasks,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getTasksNumber: (token, userId) =>
            dispatch(actions.getTasksNumber(token, userId)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavigationItem);

// export default NavigationItem;
