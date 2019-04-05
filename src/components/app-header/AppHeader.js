import React from "react";
import './AppHeader.css'

export default class AppHeader extends React.Component {
    render() {
        const {todo, done} = this.props;
        return (
            <div className="app-header d-flex">
                <h1> Todo List</h1>
                <h2>To do: {todo} Done: {done}</h2>
            </div>
        );
    }
}