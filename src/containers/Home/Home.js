import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Home.module.css";

import AboutProjectImg from './img/AboutProject.jpg';
import developer from './img/developer.jpg';
import instagram from './img/instagram.png';

class Home extends Component {
    state = {
        lol: "null",
    };
    render() {
        return <div className={classes.About}>
            <h3>Strong Manager</h3>
            <h2>What we do</h2>
            <hr />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
            </p>
            <div className={classes.AboutProject}>
                <div className={classes.AboutProjectImg}>
                    <img src={AboutProjectImg} />
                </div>
                <div className={classes.AboutProjectText}>
                    <div className={classes.TextContainer}>
                        <h4>Organization</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                    <div className={classes.TextContainer}>
                        <h4>Team Work</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                    <div className={classes.TextContainer}>
                        <h4>Management</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </div>
            <h3 className={classes.weAre}>Who we are</h3>
            <h2>Meet our team</h2>
            <hr />
            <div className={classes.Team}>
                <div className={classes.developer}>
                    <img src={developer}/>
                    <h2>Vlad Boichuk</h2>
                    <h3>Project Manager</h3>
                    <a href='https://www.instagram.com/vla2383public/?hl=ru' target='blank'><img src={instagram}/></a>
                </div>
                <div className={classes.developer}>
                    <img src={developer}/>
                    <h2>Taras Hnatkiv</h2>
                    <h3>Project Manager</h3>
                    <a href='https://www.instagram.com/chelovek_afk/?hl=ru' target='blank'><img src={instagram}/></a>
                </div>
            </div>
        </div>;

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

export default connect(mapStateToProps, null)(Home);
