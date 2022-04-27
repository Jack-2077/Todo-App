import { useState } from 'react';

import { UPDATE_TODO, TOGGLE_TODO, DELETE_TODO } from '../queries';
import { useMutation } from '@apollo/client';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './Todo.css';

export default function Todo({ id, task, completed }) {
  const [tasks, setTasks] = useState({ task: '', isEditing: false });

  const [updateTodo] = useMutation(UPDATE_TODO);

  const [deleteTodo] = useMutation(DELETE_TODO);

  const [toggleTodo] = useMutation(TOGGLE_TODO);

  async function editTodoTask(e) {
    e.preventDefault();
    await updateTodo({ variables: { id, newTask: tasks.task } });
    setTasks((prev) => {
      return { ...prev, isEditing: false };
    });
  }

  async function deleteTodoTask() {
    await deleteTodo({
      variables: { id },
      update: (cache) => {
        // const prevData = cache.readQuery({ query: GET_TODOS });
        // const newTodos = prevData.todos.filter((todo) => todo.id !== id);
        // cache.writeQuery({ query: GET_TODOS, data: { todos: newTodos } });
        const normalizedId = cache.identify({ id, __typename: 'todos' });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });
  }

  async function toggleTodoTask() {
    await toggleTodo({ variables: { id, completed: !completed } });
  }

  const handleChange = (e) =>
    setTasks((prev) => {
      return { ...prev, task: e.target.value };
    });

  const toggleForm = () =>
    setTasks((prev) => {
      return { ...prev, isEditing: !prev.isEditing };
    });

  let result;
  if (tasks.isEditing) {
    result = (
      <CSSTransition key='editing' timeout={500} classNames='form'>
        <form className='Todo-edit-form' onSubmit={editTodoTask}>
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
        <li className='Todo-task' onClick={toggleTodoTask}>
          {task}
        </li>
      </CSSTransition>
    );
  }

  return (
    <TransitionGroup className={completed ? 'Todo completed' : 'Todo'}>
      <div className='Toggle-button'>
        <button onClick={toggleTodoTask}>
          {!tasks.isEditing && (
            <i class={completed ? 'fas fa-check-circle' : 'far fa-circle'} />
          )}
        </button>
      </div>
      {result}
      <div className='Todo-buttons'>
        <button onClick={toggleForm}>
          <i className='fas fa-pen' />
        </button>
        <button onClick={deleteTodoTask}>
          <i className='fas fa-trash' />
        </button>
      </div>
    </TransitionGroup>
  );
}
