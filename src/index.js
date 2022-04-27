import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

console.log(process.env.REACT_APP_ADMIN_SECRET);
const client = new ApolloClient({
  uri: 'https://react-todolist-app.hasura.app/v1/graphql',
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': process.env.REACT_APP_ADMIN_SECRET,
  },
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
