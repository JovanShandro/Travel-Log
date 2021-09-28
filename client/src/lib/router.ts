import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/pages/Home.vue';
import Authentication from '@/pages/Authentication.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Authentication',
    component: Authentication,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
