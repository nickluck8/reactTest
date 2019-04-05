import React from "react";
import '../todo-list/TodoListItem.css'


export default class TodoListItem extends React.Component {

    render() {
        const {
            label,
            onDeleted,
            onToggleImportant,
            onToggleDone,
            done,
            important
        } = this.props;

        let classNames = done ? "todo-list-item done" : "todo-list-item";
        let todoListItemClassNames = important ? "todo-list-item-label important" : "todo-list-item-label";
        return (
            <span className={classNames}>
      <span
          className={todoListItemClassNames}
          onClick={onToggleDone}>
        {label}
      </span>

      <button type="button"
              className="btn btn-outline-success btn-sm float-right"
              onClick={onToggleImportant}>
        <i className="fa fa-exclamation"/>
      </button>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right"
              onClick={onDeleted}>
        <i className="fa fa-trash-o"/>
      </button>
    </span>
        );
    }
}