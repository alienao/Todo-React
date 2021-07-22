import React, { Component } from 'react';

import AppHeader from '../app-header/app-header';
import TodoList from '../todo-list/todo-list';
import SearchPanel from '../search-panel/search-panel';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from '../item-add-form/item-add-form';

import './app.css';

export default class App extends Component {
  maxId = 4;

  state = {
    items: [
      { id: 1, label: 'To read ReactJs', important: false, completed: false },
      {
        id: 2,
        label: 'To learn how to code',
        important: true,
        completed: false,
      },
      { id: 3, label: 'Listen music', important: false, completed: false },
    ],
    filter: 'all',
    search: '',
  };

  handleItemAdded = (label) => {
    this.setState((state) => {
      const item = this.createItem(label);
      return { items: [...state.items, item] };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value };
    return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
  };

  handleToggleComplete = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.items, id, 'completed');
      return { items };
    });
  };

  handleToggleImportant = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.items, id, 'important');
      return { items };
    });
  };

  handleDelete = (id) => {
    this.setState((state) => {
      const items = state.items.filter((item) => item.id !== id);
      return { items };
    });
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  handleSearchChange = (search) => {
    this.setState({ search });
  };

  createItem(label) {
    return {
      id: ++this.maxId,
      label,
      important: false,
      completed: false,
    };
  }

  filterItems(items, filter) {
    if (filter === 'all') {
      return items;
    } else if (filter === 'active') {
      return items.filter((item) => !item.completed);
    } else if (filter === 'completed') {
      return items.filter((item) => item.completed);
    }
  }

  searchItems(items, search) {
    if (search.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }

  render() {
    const { items, filter, search } = this.state;
    const completedCount = items.filter((item) => item.completed).length;
    const toDoCount = items.length - completedCount;
    const visibleItems = this.searchItems(
      this.filterItems(items, filter),
      search
    );

    return (
      <div className="todo-app">
        <AppHeader toDo={toDoCount} completed={completedCount} />

        <div className="search-panel d-flex">
          <SearchPanel onSearchChange={this.handleSearchChange} />

          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.handleFilterChange}
          />
        </div>

        <TodoList
          items={visibleItems}
          onToggleImportant={this.handleToggleImportant}
          onToggleDone={this.handleToggleComplete}
          onDelete={this.handleDelete}
        />

        <ItemAddForm onItemAdded={this.handleItemAdded} />
      </div>
    );
  }
}
