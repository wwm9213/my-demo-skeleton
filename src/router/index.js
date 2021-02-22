import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routerList = {
  path: "/main",
  name: "Main",
  component: () => import("../views/Layout"),
  children: [
    {
      path: "/home",
      name: "Home",
      component: () => import("../views/Home")
    },
    {
      path: "/aboutOne",
      name: "AboutOne",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About/AboutOne")
    }
  ]
};
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  routerList,
  {
    path: "*",
    name: "nofind",
    component: () =>
      import(
        /** 捕获所有路由或 404 Not found 路由,应该放在最后 */ "../views/NoFind"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
