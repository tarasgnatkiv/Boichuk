import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
export default class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Toolbar />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}
