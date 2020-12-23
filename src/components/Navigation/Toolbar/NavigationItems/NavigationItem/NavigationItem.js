import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";
const NavigationItem = (props) => (
  <li  onClick={props.myRef} className={classes.NavigationItem}>
   <style>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
</style>
    <NavLink to={props.link}  exact activeClassName={classes.active}>
      {props.children}
    </NavLink>
  </li>
);
export default NavigationItem;