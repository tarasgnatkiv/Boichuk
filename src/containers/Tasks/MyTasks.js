import React, { Component } from "react";
// import classes from "./MyTasks.module.css";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import TaskComponent from './TaskConponent/TaskComponent'
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";


class MyTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            works: [
                {
                    description: "aaaaaaaaaaaaaaaaaaa",
                    name: "aaaaaa",
                    ownerId: "RVgsz2FKqiQqEF0lijGySmI0EQ13",
                    password: "6ab95fa8-4547-11eb-b378-0242ac130002",
                    number: 11
                },
                {
                    description: "bbbbbbbbb",
                    name: "aaaaaa",
                    ownerId: "RVgsz2FKqiQqEF0lijGySmI0EQ13",
                    password: "6ab95fa8-4547-11eb-b378-0242ac130002",
                    number: 11
                }, 
                {
                    description: "qqqqqqq",
                    name: "qqqqqqqqqqqqqqqqqqq",
                    ownerId: "RVgsz2FKqiQqEF0lijGySmI0EQ13",
                    password: "6ab95fa8-4547-11eb-b378-0242ac130002",
                    number: 11
                },
                {
                    description: "taras",
                    name: "qqqqqqqqqqqqqqqqqqq",
                    ownerId: "RVgsz2FKqiQqEF0lijGySmI0EQ13",
                    password: "6ab95fa8-4547-11eb-b378-0242ac130002",
                    number: 11

                }
            ],
        }
    }

    showWorks = () => {
        let MyWorks
        if (this.state.works.length > 0) {
            MyWorks = this.state.works.map(i => {
                return  <TaskComponent info={i}/>
            })
        } else {
            MyWorks = <div>None</div>
        }

        return MyWorks
    };

    render() {
        return (
            <>
                {this.showWorks()}
            </>
        );
    }
}

export default MyTasks;

// const mapStateToProps = (state) => {
//     return {
//       token: state.auth.token,
//       userId: state.auth.userId,
//       error: state.auth.error,
//       redirect: state.auth.redirect,
//       loading: state.auth.loading,
//       works: state.works.works,
//       loadingWork: state.works.loading,
//     };
//   };
//   const mapDispatchToProps = (dispatch) => {
//     return {
//       onUploadWorks: (userId, token) =>
//         dispatch(actions.uploadWorks(userId, token)),
//       setRedirectPath: (path) => dispatch(actions.setRedirectPath(path)),
//     };
//   };
//   export default connect(mapStateToProps, mapDispatchToProps)(MyTasks);