import React from 'react';

import './todo-list-item.css';

const TodoListItem = ({
  important,
  completed,
  label,
  onToggleImportant,
  onToggleDone,
  onDelete,
}) => {
  let classNames = 'todo-list-item';
  if (important) {
    classNames += ' important';
  }

  if (completed) {
    classNames += ' completed';
  }

  return (
    <span className={classNames}>
      <span className="todo-list-item-label" onClick={onToggleDone}>
        {label}
      </span>

      <button
        type="button"
        className="btn btn-outline-success btn-sm float-right"
        onClick={onToggleImportant}
      >
        <i className="fa fa-exclamation"></i>
      </button>

      <button
        type="button"
        className="btn btn-outline-danger btn-sm float-right"
        onClick={onDelete}
      >
        <i className="fa fa-trash-o"></i>
      </button>
    </span>
  );
};

export default TodoListItem;
