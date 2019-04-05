import React from "react";
import './AppHeader.css'

const AppHeader = ({todo, done}) => {
    return (
        <div className="app-header d-flex">
            <h1> Todo List</h1>
            <h2>To do: {todo} Done: {done}</h2>
        </div>
    );
};

export default AppHeader;