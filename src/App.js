import React, { Component } from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./containers/Login/Login";
import Auth from "./containers/Auth/Auth";
import Home from "./containers/Home/Home";
import { connect } from "react-redux";
class App extends Component {
  render() {
    let routes = null;
    if (this.props.token) {
      console.log("hear")
      routes = (
        <Switch> 
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/login" component={Login} />
          <Redirect to="/login" />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.token,
    userId: state.userId,
    error: state.error,
    redirect: state.redirect,
    loading: state.loading,
  };
};
export default connect(mapStateToProps)(App);
