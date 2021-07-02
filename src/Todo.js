import React, { Component } from "react";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      isEditing: false,
      task: this.props.task,
    };
  }
  handleRemove() {
    this.props.removeTodo(this.props.id);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleUpdate(evt) {
    evt.preventDefault();
    this.props.updateTodo(this.props.id, this.state.task);
    this.setState({
      isEditing: false,
    });
  }
  toggleForm() {
    this.setState({ isEditing: !this.state.isEditing });
  }
  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <div>
          <form onSubmit={this.handleUpdate}>
            <input
              type="text"
              name="task"
              value={this.state.task}
              onChange={this.handleChange}
            />
            <button>Save</button>
          </form>
        </div>
      );
    } else {
      result = (
        <div>
          <button onClick={this.toggleForm}>Edit</button>
          <button onClick={this.handleRemove}>X</button>
          <li>{this.props.task}</li>
        </div>
      );
    }
    return result;
  }
}

export default Todo;
