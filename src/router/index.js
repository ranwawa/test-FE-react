import { createRouter, createWebHashHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import Profile from '../components/HelloWorld.vue';

export const routes = [
  {
    path: '/',
    component: LoginPage,
  },
  {
    path: '/profile',
    component: Profile,
  },
];

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
