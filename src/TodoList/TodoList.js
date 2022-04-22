import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
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

  toggleCompletion(id) {
    const updatedTodos = this.state.todos.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    this.setState({
      todos: updatedTodos,
    });
  }

  remove(id) {
    this.setState({
      todos: this.state.todos.filter((item) => item.id !== id),
    });
  }
  render() {
    const todos = this.state.todos.map((item) => {
      return (
        <CSSTransition key={item.id} timeout={500} classNames="todo">
          <Todo
            key={item.id}
            id={item.id}
            task={item.task}
            removeTodo={this.remove}
            updateTodo={this.update}
            completed={item.completed}
            toggleTodo={this.toggleCompletion}
          />
        </CSSTransition>
      );
    });
    return (
      <div className="TodoList">
        <h1>
          Todo List! <span>A Simple React Todo List App</span>
        </h1>
        <NewTodoForm createTodo={this.create} />
        <ul>
          <TransitionGroup className="todo-list">{todos}</TransitionGroup>
        </ul>
      </div>
    );
  }
}

export default TodoList;
