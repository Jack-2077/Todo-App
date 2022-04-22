import React, { useState } from 'react';
import './Todo.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function Todo({
  removeTodo,
  toggleTodo,
  updateTodo,
  id,
  task,
  completed,
}) {
  const [tasks, setTasks] = useState({ task: '', isEditing: false });

  const handleRemove = () => removeTodo(id);

  const handleChange = (e) =>
    setTasks((prev) => {
      return { ...prev, task: e.target.value };
    });

  const handleToggle = () => toggleTodo(id);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTodo(id, tasks.task);
    setTasks((prev) => {
      return { ...prev, isEditing: false };
    });
  };

  const toggleForm = () =>
    setTasks((prev) => {
      return { ...prev, isEditing: !prev.isEditing };
    });

  let result;
  if (tasks.isEditing) {
    result = (
      <CSSTransition key='editing' timeout={500} classNames='form'>
        <form className='Todo-edit-form' onSubmit={handleUpdate}>
          <input
            type='text'
            name='task'
            value={tasks.task}
            onChange={handleChange}
          />
          <button>Save</button>
        </form>
      </CSSTransition>
    );
  } else {
    result = (
      <CSSTransition key='normal' timeout={500} classNames='task-text'>
        <li className='Todo-task' onClick={handleToggle}>
          {task}
        </li>
      </CSSTransition>
    );
  }

  return (
    <TransitionGroup className={completed ? 'Todo completed' : 'Todo'}>
      {result}
      <div className='Todo-buttons'>
        <button onClick={toggleForm}>
          <i className='fas fa-pen' />
        </button>
        <button onClick={handleRemove}>
          <i className='fas fa-trash' />
        </button>
      </div>
    </TransitionGroup>
  );
}
