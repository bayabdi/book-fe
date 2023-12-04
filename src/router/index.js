import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation guard to check authentication status
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Redirect to login if the route requires authentication and the user is not authenticated
    next('/login');
  } else {
    // Continue to the requested route
    next();
  }
});

export default router
