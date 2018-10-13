import React, { Component } from 'react';
import './App.css';

class Todo {
  constructor(name, completed) {
    this.name = name;
    this.completed = completed;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      filter: 'all',
      todoCollection: [
        new Todo("todo 1", false),
        new Todo("todo 12", false)
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.removeCompleted = this.removeCompleted.bind(this);
    this.filterChange = this.filterChange.bind(this);
  }

  handleChange(event) {
    this.setState({ newTodo: event.target.value });
  }

  todoChange(event, index) {
    this.setState({
      todoCollection: [
        ...this.state.todoCollection.slice(0, index),
        new Todo(this.state.todoCollection[index].name, !this.state.todoCollection[index].completed),
        ...this.state.todoCollection.slice(index + 1, this.state.todoCollection.length)
      ]
    })
  }

  filterChange(state) {
    this.setState({
      filter: state
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.setState({
        todoCollection: [...this.state.todoCollection, new Todo(this.state.newTodo, false)],
        newTodo: ''
      });
    }
  }

  removeCompleted() {
    this.setState({
      todoCollection: this.state.todoCollection.filter(todo => !todo.completed)
    });
  }

  checkAll() {
    this.setState({
      todoCollection: this.state.todoCollection.map(todo => new Todo(todo.name, true))
    });
  }

  renderTodoList(todos) {
    return (
      <ul className="list-group">
        {todos.map((todo, i) => (
          <li key={i} className="list-group-item">
            <input type="checkbox" checked={todo.completed} onChange={e => this.todoChange(e, i)} /> {todo.name}
          </li>
        ))}
      </ul>
    )
  }

  render() {
    let todoCount = this.state.todoCollection.filter(todo => !todo.completed).length;
    let todos = [];
    switch (this.state.filter) {
      case 'all': todos = this.state.todoCollection; break;
      case 'completed': todos = this.state.todoCollection.filter(todo => todo.completed); break;
      case 'uncompleted': todos = this.state.todoCollection.filter(todo => !todo.completed); break;
    }

    return (
      <div className="card my-5">
        <div className="card-header">
          Todos
          </div>
        <div className="card-body">

          <div className="mb-3 d-flex">
            <button className="btn btn-success" onClick={this.checkAll}>Check all</button>
            <div className="ml-3 flex-fill">
              <input
                className="form-control"
                placeholder="Create new todo..."
                value={this.state.newTodo}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress} />
            </div>
          </div>

          {this.renderTodoList(todos)}

        </div>
        <div className="card-footer d-flex">
          <div className="mr-3">{todoCount} {todoCount > 1 ? 'items' : 'item'} remaining</div>
          <div>
            <button
              className={'mx-1 btn btn-sm ' + (this.state.filter === 'all' ? 'btn-secondary' : 'btn-outline-secondary')}
              onClick={() => this.filterChange('all')}>All</button>
            <button
              className={'mx-1 btn btn-sm ' + (this.state.filter === 'completed' ? 'btn-secondary' : 'btn-outline-secondary')}
              onClick={() => this.filterChange('completed')}>Completed</button>
            <button
              className={'mx-1 btn btn-sm ' + (this.state.filter === 'uncompleted' ? 'btn-secondary' : 'btn-outline-secondary')}
              onClick={() => this.filterChange('uncompleted')}>Uncompleted</button>
          </div>
          <div className="flex-fill text-right">
            <button className="btn btn-sm btn-dark" onClick={this.removeCompleted}>Remove completed</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
