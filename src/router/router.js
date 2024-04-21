import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/HomePage.vue"
import ActorsPage from "../views/ActorsPage.vue"
import MovieDetailPage from "../views/MovieDetailPage.vue"
import ActorDetailPage from "../views/ActorDetailPage.vue"
import LoginForm from "../views/LoginForm.vue"
import RegisterForm from "../views/RegisterForm.vue"
import FavoritePage from "../views/FavoritePage.vue"
import NotFound from "../views/NotFound.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
    },
    ,
    {
      path: "/movie/:id",
      name: "MovieDetailPage",
      component: MovieDetailPage,
    },
    {
      path: "/actors",
      name: "ActorsPage",
      component: ActorsPage,
    },
    {
      path: "/actor/:id",
      name: "actor",
      component: ActorDetailPage,
    },
    {
      path: "/login",
      name: "LoginForm",
      component: LoginForm,
    },
    {
      path: "/register",
      name: "RegisterForm",
      component: RegisterForm,
    },
    {
      path: "/favourite",
      name: "FavoritePage",
      component: FavoritePage,
    },
    {
      path: "/:catchAll(.*)", 
      name: "NotFound",
      component: NotFound,
    },
  ],
});

// NAVIGATION GUARD
router.beforeEach(async (to, from, next) => {
  if (localStorage.getItem("access_token") && to.path === "/login") {
    next({ path: "/" });
  } 
  else if (localStorage.getItem("access_token") && to.path === "/register") {
    next({ path: "/" });
  }
  else if (!localStorage.getItem("access_token") && to.path === "/favourite") {
    next({ path: "/" });
  } 
  next()
});

export default router;
