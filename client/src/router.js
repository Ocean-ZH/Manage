import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import NotFound from './views/404.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/index'
    },
    {
      path: '/index',
      component: Index
    }, {
      path: '/register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/Register.vue'),
    }, {
      path: '/login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/Login.vue'),
    },{
      path:'*',
      name:"/404",
      component:NotFound,
    }
  ]
})

router.beforeEach((to,from,next)=>{
  // console.log(to)
  const isLogin = window.localStorage.token ? true : false;
  if(to.path == '/login' || to.path == '/register'){
    next();
  }else{
    isLogin? next() : next('/login');
  }
})

export default router;