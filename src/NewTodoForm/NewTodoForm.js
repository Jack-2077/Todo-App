import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './NewTodoForm.css';

export default function NewTodoForm({ createTodo }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      createTodo({ task, id: uuid(), completed: false });
      setTask('');
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
