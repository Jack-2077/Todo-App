import React from 'react';
import uuid from 'uuid';
import './NewTodoForm.css';

import React from 'react';

export default function NewTodoForm({ createTodo }) {
  const [task, setTask] = useState('');

  const handleSubmit = () => {
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
