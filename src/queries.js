import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query getTodos {
    todos {
      completed
      id
      todo
    }
  }
`;

export const ADD_TODO = gql`
  mutation addTodo($todo: String!) {
    insert_todos_one(object: { todo: $todo }) {
      completed
      id
      todo
    }
  }
`;

export const TOGGLE_TODO = gql`
  mutation toggleTodo($id: uuid!, $completed: Boolean) {
    update_todos_by_pk(
      pk_columns: { id: $id }
      _set: { completed: $completed }
    ) {
      id
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo($id: uuid!, $newTask: String!) {
    update_todos_by_pk(pk_columns: { id: $id }, _set: { todo: $newTask }) {
      completed
      id
      todo
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: uuid!) {
    delete_todos_by_pk(id: $id) {
      completed
      id
      todo
    }
  }
`;
