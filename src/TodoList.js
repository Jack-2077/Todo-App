import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
  }

  create(newTodo) {
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  }

  update(id, updatedTodo) {
    const updatedTodos = this.state.todos.map((item) => {
      if (item.id === id) {
        return { ...item, task: updatedTodo };
      }
      return item;
    });
    this.setState({
      todos: updatedTodos,
    });
  }

  remove(id) {
    this.setState({
      todos: this.state.todos.filter((item) => item.id != id),
    });
  }
  render() {
    const todos = this.state.todos.map((item) => {
      return (
        <Todo
          key={item.id}
          id={item.id}
          task={item.task}
          removeTodo={this.remove}
          updateTodo={this.update}
        />
      );
    });
    return (
      <div>
        <h1>Todo List!</h1>
        <NewTodoForm createTodo={this.create} />
        <ul>{todos}</ul>
      </div>
    );
  }
}

export default TodoList;
