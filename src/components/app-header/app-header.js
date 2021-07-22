import React from 'react';
import './app-header.css';

const AppHeader = ({ toDo, completed }) => {
  return (
    <div className="app-header d-flex">
      <h1>Ami's ToDo List</h1>
      <h2>
        {toDo} more to do, {completed} completed
      </h2>
    </div>
  );
};

export default AppHeader;
