import React, { Component } from 'react'
import Todo from './Todo'

class TodoList extends Component{
    constructor(props) {
        super(props)
        this.state = { todos: [{ task: "walk the fish" }, {task: "clean vessels"}]}
    }
    render() {
        const todos = this.state.todos.map((item) => {
            return <Todo task={item.task}/>
        })
        return (
            <div>
                <h1>Todo List!</h1>
                <ul>
                    {todos}
                </ul>
            </div>
        )
    }
}

export default TodoList 