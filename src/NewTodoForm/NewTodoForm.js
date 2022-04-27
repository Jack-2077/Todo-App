import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_TODO, GET_TODOS } from '../queries';

import './NewTodoForm.css';

export default function NewTodoForm() {
  const [addTodo] = useMutation(ADD_TODO);
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      async function addTodoTask() {
        await addTodo({
          variables: { todo: task },
          update: (cache) => {
            const prevData = cache.readQuery({ query: GET_TODOS });
            const newTodos = [...prevData.todos, task];
            cache.writeQuery({ query: GET_TODOS, data: { todos: newTodos } });
          },
        });
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
