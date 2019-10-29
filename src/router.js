import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/login/Login'
import Category from './views/category/Category'
import Echarts from './views/echarts/echarts'
import Goods from './views/goods/goods'
import Team from './views/team/team'
import Orders from './views/orders/orders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{title:'首页',requiresAuth: true},
      redirect:'echarts',
      children:[
        {path:'echarts',component:Echarts,name:'echarts',meta:{title:'数据可视化',requiresAuth: true}},
        {
          path:'Category',
          name:'category',
          component:Category,
          meta:{title:'分类管理',requiresAuth: true},
        },
      {
          path:'goods',
          name:'goods',
          component:Goods,
          meta:{title:'商品管理',requiresAuth: true},
      },
        {
          path:'team',
          name:'team',
          component:Team,
          meta:{title:'团队管理',requiresAuth: true},
        },
        {
          path:'orders',
          name:'orders',
          component:Orders,
          meta:{title:'订单管理',requiresAuth: true},
        }
      ]
    },
    {
      path: '/Login',
      name: 'login',
      component: Login,
      meta:{title:'登录'},
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
