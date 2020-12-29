import React, { Component } from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { connect } from "react-redux";
class NavigationItems extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let links = [];
    if (this.props.token) {
      links = [
        { link: "/workersReports", label: "Workers reports" },
        { link: "/myTasks", label: "My tasks" },
        { link: "/getJob", label: "Get job" },
        { link: "/myWorks", label: "My works" },
        { link: "/createNewJob", label: "Create work" },
        { link: "/about", label: "About" },
        { link: "/logout", label: "Log out" },
      ];
    } else {
      links = [
        { link: "/login", label: "Log in" },
        { link: "/auth", label: "Registration" },
        { link: "/about", label: "About" },
      ];
    }
    let linksElements = links.map((element, id) => {
      return (
        <NavigationItem {...this.props} link={element.link} key={id}>
          {element.label}
        </NavigationItem>
      );
    });
    return (
      <nav
        className={
          this.props.clicked
            ? [classes.active, classes.headerMenu].join(" ")
            : classes.headerMenu
        }
      >
        <ul className={classes.NavigationItems}>{linksElements}</ul>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(NavigationItems);
