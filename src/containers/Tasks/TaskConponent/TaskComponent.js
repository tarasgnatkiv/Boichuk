import React from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import classes from "./TaskComponent.module.css";

class TaskComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            delete: false,
        }
    }


    cancelDelete = () => {
        this.setState({
            delete: !this.state.delete,
        });
    };

    render() {
        return (
            <li className={classes.Work}>
                <div className={classes.TopWorkHeader}>
                    <div className={classes.RemoveWork} onClick={this.cancelDelete}>
                        <i class="fas fa-door-open"></i>
                    </div>
                    <div className={classes.Label}>{this.props.info.name}</div>
                </div>
                <div className={classes.Description}>
                    {this.props.info.description}
                </div>
                <div className={classes.Task}>
                    <i class="fas fa-tasks"></i>
                    <span>{this.props.info.number}</span>
                </div>
                <div
                    className={this.state.delete ? [classes.active, classes.DeleteContainer].join(" ") : classes.DeleteContainer}>
                    <div className={classes.container}>
                        <h1>Leave Work</h1>
                        <p>Are you sure you want to leave your work?</p>
                        <div className={classes.clearfix}>
                            <button
                                type="button"
                                onClick={this.cancelDelete}
                                className={classes.cancelbtn}
                            >Cancel</button>
                            <button
                                type="button"
                                className={classes.deletebtn}
                            >Leave</button>
                        </div>
                    </div>
                </div>
            </li>
        );
    }

}

export default TaskComponent;