import React, { Component } from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./containers/Login/Login";
import Auth from "./containers/Auth/Auth";
import About from "./components/About/About";
import Logout from "./containers/Logout/Logout";
import Works from "./containers/Works/Works";
import CreateWork from "./containers/Works/CreateWork/CreateWork";
import GetJob from "./containers/GetJob/GetJob";
import MyTasks from "./containers/Tasks/MyTasks";
import SelectedWorkWorkers from "./containers/SelectedWorkWorkers/SelectedWorkWorkers";
import axios from "axios";
import { connect } from "react-redux";
class App extends Component {
    componentDidMount() {
        axios
            .get("https://www.uuidgenerator.net/api/version1")
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error));
    }
    render() {
        let routes = null;
        if (this.props.token) {
            routes = (
                <Switch>
                    <Route path="/myTasks" component={MyTasks} />
                    <Route path="/getJob" component={GetJob} />
                    <Route path="/createNewJob" component={CreateWork} />
                    <Route path="/myWorks" component={Works} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/about" component={About} />
                    <Route path="/selectedWorkers" component={SelectedWorkWorkers} />
                    <Redirect to="/about" />
                </Switch>

            );
        } else {
            routes = (
                <Switch>
                    <Route path="/auth" component={Auth} />
                    <Route path="/login" component={Login} />
                    <Route path="/about" component={About} />

                    <Redirect to="/login" />
                </Switch>
            );
        }

        return <Layout>{routes}</Layout>;
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
export default connect(mapStateToProps)(App);
