import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import store from './store'

import Antd from "ant-design-vue";
Vue.use(Antd)

Vue.config.productionTip = false

// import He from './components/He.vue'
// import Login from './components/login.vue'
// import Reg from './components/reg.vue'

import router from './router'

axios.defaults.baseURL = 'http://localhost:1906/'
Vue.prototype.$axios = axios;


axios.interceptors.response.use(function (res) {
  if (res.data.data.authorization === false) {
    router.push({
      path: "/login",
      targetUrl: router.currentRoute.fullPath
    })
  }
  return res;
}, function (error) {
  return Promise.reject(error);
})



// // 路由
// // 1.引入路由
// import VueRouter from 'vue-router';

// // 2.安装（使用）路由
// Vue.use(VueRouter)
// // 3. 实例化router并配置参数
// let router = new VueRouter({
//   routes: [{
//       // 当浏览器路径为/home时，渲染Home组件内容
//       path: '/He',
//       component: He
//     },
//     {
//       // 当浏览器路径为/home时，渲染Home组件内容
//       path: '/login',
//       component: Login
//     }, {
//       // 当浏览器路径为/home时，渲染Home组件内容
//       path: '/reg',
//       component: Reg
//     },
//     {
//       path: '/',
//       redirect: {
//         path: 'login',
//       }
//     }
//   ]
// })


new Vue({
  // 4.把router实例注入到vue实例中
  router,
  Antd,
  store,
  render: h => h(App),
}).$mount('#app')