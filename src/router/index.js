// src/router/index.js
// import VueRouter from 'vue-router';
import LoginPage from '@/components/LoginPage';
import SubmitInput from '@/components/SubmitInput';
import auth from '@/services/auth';
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/submit', component: SubmitInput, meta: { requiresAuth: true } },
  // { path: '/submit', component: SubmitInput},
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !auth.isLoggedIn()) {
    next('/login');
  } else {
    next();
  }
});



export default router;
