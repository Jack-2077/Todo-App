import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { UPDATE_TODO, TOGGLE_TODO, DELETE_TODO } from './queries';

export default function Todo({ id, task, completed }) {
  const [updateTodo] = useMutation(UPDATE_TODO);

  const [deleteTodo] = useMutation(DELETE_TODO);

  const [toggleTodo] = useMutation(TOGGLE_TODO);

  async function editTodoTask(updatedTask) {
    await updateTodo({ variables: { id, newTask: updatedTask } });
  }

  async function deleteTodoTask() {
    await deleteTodo({ variables: { id } });
  }

  async function toggleTodoTask() {
    await toggleTodo({ variables: { id, completed: !completed } });
  }

  return (
    <TransitionGroup className={completed ? 'Todo completed' : 'Todo'}>
      <CSSTransition key='normal' timeout={500} classNames='task-text'>
        <li className='Todo-task'>
          {task} is {completed ? 'done' : 'not done'}
        </li>
      </CSSTransition>
      <div className='Todo-buttons'>
        <button onClick={editTodoTask}>
          <i className='fas fa-pen' />
        </button>
        {/* <button onClick={() => addTodo({ variables: { todo: 'new task' } })}>
          <i className='fas fa-trash' />
        </button> */}
        <button onClick={deleteTodoTask}>
          <i className='fas fa-trash' />
        </button>
        <button onClick={toggleTodoTask}>
          <i class={completed ? 'fas fa-check-circle' : 'far fa-circle'} />
        </button>
      </div>
    </TransitionGroup>
  );
}
