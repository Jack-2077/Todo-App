import { useQuery } from '@apollo/client';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { GET_TODOS } from './queries';

import Todo from './Todo';
import TodoForm from './TodoForm';

export default function Todos() {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const todosList = data.todos.map(({ id, todo, completed }) => {
    return (
      <CSSTransition key={id} timeout={500} classNames='todo'>
        <Todo key={id} id={id} task={todo} completed={completed} />
      </CSSTransition>
    );
  });

  return (
    <>
      <TodoForm />
      <ul>
        <TransitionGroup className='todo-list'>{todosList}</TransitionGroup>
      </ul>
    </>
  );
}
