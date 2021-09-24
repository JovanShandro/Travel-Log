import App from '@/App.vue';
import router from '@/routes';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { createApp, h, provide } from 'vue';

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
  },

  render: () => h(App),
})
  .use(router)
  .mount('#app');
