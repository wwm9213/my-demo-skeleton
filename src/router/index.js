import Vue from 'vue';
import VueRouter from 'vue-router';
import { storage } from '@/utils';
Vue.use(VueRouter);
const routerList = {
  path: '/main',
  name: 'Main',
  component: () => import('../views/Layout'),
  children: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/Home')
    },
    {
      path: '/chatRoom',
      name: 'ChatRoom',
      component: () => import(/* webpackChunkName: "聊天室" */ '../views/About/ChatRoom')
    },
    {
      path: '/echartsDemo',
      name: 'EchartsDemo',
      component: () => import(/* webpackChunkName: "echarts demo" */ '../views/Echarts')
    },
    {
      path: '/directive',
      name: 'Directive',
      component: () => import(/* webpackChunkName: "自定义指令" */ '../views/About/Directive')
    },
    {
      path: '/ToDoList',
      name: 'toDoList',
      component: () => import(/* webpackChunkName: "ToDoList" */ '../views/About/ToDoList')
    }
  ]
};

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login')
  },
  routerList,

  {
    path: '*',
    name: 'nofind',
    component: () => import(/** 捕获所有路由或 404 Not found 路由,应该放在最后 */ '../views/NoFind')
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const token = storage.get();

  if (to.path !== '/login') {
    if (!token) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
