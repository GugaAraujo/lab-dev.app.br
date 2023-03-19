import { createRouter, createWebHistory } from "vue-router";
import { store } from "./../store";
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from "@/views/RegisterView.vue"
import { LOGOUT } from "@/store/types-action";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requireAuth: true },
      component: HomeView
    },
    {
      path: "/register",
      name: "register",
      meta: { onlyGuest: true },
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      meta: { onlyGuest: true },
      component: LoginView
    },
    {
      path: "/logout",
      name: "logout",
      component: {
        beforeRouteEnter(to, from, next) {
          store.dispatch(LOGOUT);
          next('/login');
        },
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  const hasToken = store.state.user?.user?.token
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!hasToken) {
      next({ name: 'login' });
    }
    else {
      next();
    }
  }

  else if (to.matched.some(record => record.meta.onlyGuest)) {
    if (hasToken) {
      next({ name: "home" });
    } else {
      next();
    }
  }
  else {
    next();
  }
})

export default router
