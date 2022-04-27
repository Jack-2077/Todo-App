import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../queries';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Todo from '../Todo/Todo';
import NewTodoForm from '../NewTodoForm/NewTodoForm';

import './TodoList.css';

export default function TodoList() {
  const { loading, data } = useQuery(GET_TODOS);

  const todolist = data?.todos.map(({ id, todo, completed }) => {
    return (
      <CSSTransition key={id} timeout={500} classNames='todo'>
        <Todo key={id} id={id} task={todo} completed={completed} />
      </CSSTransition>
    );
  });

  return (
    <div className='TodoList'>
      <h1>
        Todo List! <span>A Simple React Todo List App</span>
      </h1>
      <NewTodoForm />
      <ul>
        {!loading ? (
          <TransitionGroup className='todo-list'>{todolist}</TransitionGroup>
        ) : (
          'Loading...'
        )}
      </ul>
    </div>
  );
}
