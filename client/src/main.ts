import App from '@/App.vue';
import router from '@/lib/router';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { createApp, h, provide } from 'vue';
import VueMapboxTs from 'vue-mapbox-ts';
import store from '@/lib/store';
import apolloClient from '@/lib/apollo';

// Create Vue app
createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
})
  .use(router)
  .use(store)
  .use(VueMapboxTs)
  .mount('#app');
