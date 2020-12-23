import React, { Component } from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
class NavigationItems extends Component {
    render() {
        return (
            <nav className={this.props.clicked ? [classes.active, classes.headerMenu].join(" ") : classes.headerMenu}>
                <ul className={classes.NavigationItems}>
                    <NavigationItem link="/login" {...this.props}>Sign in</NavigationItem>
                    <NavigationItem link="/auth" {...this.props}>Sign up</NavigationItem>
                </ul>
            </nav>
        );
    }
}

export default NavigationItems;
