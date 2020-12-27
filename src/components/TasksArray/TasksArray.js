import React, { Component } from "react";
import classes from "./TasksArray.module.css";


class TasksArray extends React.Component {
    state = {
        TasksArray: [
            {
                name: 'TaskName1',
                description: "At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.",
            },
            {
                name: 'TaskName2',
                description: "At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.",
            },
            {
                name: 'TaskName3',
                description: "At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.",
            },
            {
                name: 'TaskName1',
                description: "At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.",
            },
            {
                name: 'TaskName2',
                description: "At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.",
            },
            {
                name: 'TaskName3',
                description: "At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.",
            },
        ]
    }

    showTask = () => {
        let Tasks;
        if (this.state.TasksArray) {
            Tasks = this.state.TasksArray.map((tasksInfo, index) => {
                // console.log(index)
                return <li key={index+1} className={classes.taskItem}>
                    <div className={classes.number}>#{index+1}</div>
                    <h2><span>Name: </span>{tasksInfo.name}</h2>
                    <p>
                        <span>Description: </span>{tasksInfo.description}
                    </p>
                    <div className={classes.LinkInput}>
                        <span>Link: </span><input />
                    </div>
                    <button className={classes.SendArticle}>
                        Send Article
                    </button>
                </li>;
            });
        } else {
            Tasks = <div>None</div>;
        }
        return Tasks;
    }

    render() {
        return (
            <div className={classes.TasksArrayContainer}>
                {this.showTask()}
            </div>
        );
    }
}

export default TasksArray;