import React from "react";
import classes from "./Toolbar.module.css";
import NavigationItems from "./NavigationItems/NavigationItems";
import Logo from "./Logo/Logo";


class toolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
        this.myRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.setState({
            clicked: !this.state.clicked
        })
        if (!this.state.clicked) {
            document.body.classList.add('lock');
        } else {
            document.body.classList.remove('lock');
        }
    }

    render() {
        return (
            <header className={classes.Toolbar}>
                <Logo />
                <NavigationItems myRef={this.handleClick}  clicked={this.state.clicked}/>
                <div
                    className={this.state.clicked ? [classes.active, classes.headerBurger].join(" ") : classes.headerBurger}
                    onClick={this.handleClick}>
                    <span></span>
                </div>
            </header>
        );
    }
};
export default toolbar;
