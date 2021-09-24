import App from '@/App.vue';
import router from '@/routes';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { createApp, h, provide } from 'vue';
import { authStoreSymbol, createAuthStore } from './store';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
  credentials: 'include',
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
    provide(authStoreSymbol, createAuthStore());
  },

  render: () => h(App),
})
  .use(router)
  .mount('#app');
