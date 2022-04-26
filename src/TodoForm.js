import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_TODO } from './queries';

export default function TodoForm() {
  const [addTodo] = useMutation(ADD_TODO);
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      async function addTodoTask() {
        await addTodo({ variables: { todo: task } });
        setTask('');
      }
      addTodoTask();
    }
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  return (
    <form className='NewTodoForm' onSubmit={handleSubmit}>
      <label htmlFor='task'>New Todo</label>
      <input
        type='text'
        placeholder='New Todo'
        id='task'
        name='task'
        value={task}
        onChange={handleChange}
      />
      <button>Add new todo</button>
    </form>
  );
}
