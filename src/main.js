import Vue from 'vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "u-reset.css";
import App from './App.vue';
import VCharts from 'v-charts'

Vue.use(ElementUI);
Vue.use(VCharts);
Vue.config.productionTip = false;

//导航守卫 验证
router.beforeEach((to,from,next)=>{
  document.title=to.meta.title;
  if(to.meta.requiresAuth){
    if(!sessionStorage.getItem('token')){
      next({
        name: 'login',
        query: {redirect: to.name }
      })
    }else{
      next();
    }
  }else{
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
