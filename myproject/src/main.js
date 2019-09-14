import Vue from 'vue'
import App from './App.vue'


import Antd from "ant-design-vue";
Vue.use(Antd)

Vue.config.productionTip = false

import He from './components/He.vue'
import Login from './components/login.vue'
import Reg from './components/reg.vue'




// 路由
// 1.引入路由
import VueRouter from 'vue-router';

// 2.安装（使用）路由
Vue.use(VueRouter)
// 3. 实例化router并配置参数
let router = new VueRouter({
  routes: [{
      // 当浏览器路径为/home时，渲染Home组件内容
      path: '/He',
      component: He
    },
    {
      // 当浏览器路径为/home时，渲染Home组件内容
      path: '/login',
      component: Login
    }, {
      // 当浏览器路径为/home时，渲染Home组件内容
      path: '/reg',
      component: Reg
    },
    {
      path: '/',
      redirect: {
        path: 'reg',
      }
    }
  ]
})


new Vue({
  // 4.把router实例注入到vue实例中
  router,
  Antd,
  render: h => h(App),
}).$mount('#app')