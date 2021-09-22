import { createApp, provide, h } from 'vue';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import App from '@/App.vue';
import router from '@/routes';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
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
