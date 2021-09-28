import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
  credentials: 'include',
});

const cache = new InMemoryCache();

export default new ApolloClient({
  link: httpLink,
  cache,
});
