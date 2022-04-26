import React, { useState } from 'react';
import Todo from '../Todo/Todo';
import NewTodoForm from '../NewTodoForm/NewTodoForm';
import './TodoList.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../queries';

export default function TodoList() {
  const { loading, error, data } = useQuery(GET_TODOS);

  const [todos, setTodos] = useState([]);

  const create = (newTodo) =>
    setTodos((prev) => {
      return [...prev, newTodo];
    });

  // const update = (id, updatedTodo) => {
  //   const updatedTodos = todos.map((item) => {
  //     if (item.id === id) {
  //       return { ...item, task: updatedTodo };
  //     }
  //     return item;
  //   });
  //   setTodos(updatedTodos);
  // };

  // const toggleCompletion = (id) => {
  //   const updatedTodos = todos.map((item) => {
  //     if (item.id === id) {
  //       return { ...item, completed: !item.completed };
  //     }
  //     return item;
  //   });
  //   setTodos(updatedTodos);
  // };

  // const remove = (id) =>
  //   setTodos((prev) => {
  //     return prev.filter((item) => item.id !== id);
  //   });

  // const todosList = todos.map((item) => {
  //   return (
  //     <CSSTransition key={item.id} timeout={500} classNames='todo'>
  //       <Todo
  //         key={item.id}
  //         id={item.id}
  //         task={item.task}
  //         removeTodo={remove}
  //         updateTodo={update}
  //         completed={item.completed}
  //         toggleTodo={toggleCompletion}
  //       />
  //     </CSSTransition>
  //   );
  // });

  return (
    <div className='TodoList'>
      <h1>
        Todo List! <span>A Simple React Todo List App</span>
      </h1>
      {/* <NewTodoForm createTodo={create} /> */}
      {loading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      <ul>
        {!loading && !error && (
          <TransitionGroup className='todo-list'>
            {data.todos[0].todo}
          </TransitionGroup>
        )}
      </ul>
    </div>
  );
}
