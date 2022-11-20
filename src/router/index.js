import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
// import KakaoSuccessView from "../views/LoginSuccessView.vue";
import ContentView from "../views/layout/MainView.vue";
import LoginView from "../views/login/LoginView.vue";
import ShowPostView from "../views/BlogCRUD/ShowPostView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login.do",
    name: "login",
    component: LoginView,
  },
  {
    path: "/main.do",
    name: "main",
    component: ContentView,
  },
  {
    path: "/post/:bno",
    name: "postDetail",
    component: ShowPostView,
  },
  {
    path: "/post.do",
    name: "newPost",
    component: () =>
      import(
        /* webpackChunkName: 'newPost' */ "../views/BlogCRUD/ControlPostView.vue"
      ),
  },
  {
    path: "/post.do/:id",
    name: "updatePost",
    component: () =>
      import(
        /* webpackChunkName: 'updatePost' */ "../views/BlogCRUD/ControlPostView.vue"
      ),
  },
  {
    path: "/map.do",
    name: "map",
    component: () =>
      import(/* webpackChunkName: 'map' */ "../views/MapView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
