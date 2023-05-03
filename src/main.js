import Vue from 'vue'
import App from '@/App.vue'

import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

import router from '@/router'

//引入仓库
import store from './store'

//引入mockServe文件,让咱们模拟接口跑起来
import "@/mock/mockServer.js";

import "swiper/css/swiper.css"

import * as API from '@/api'

import {MessageBox} from 'element-ui'

Vue.config.productionTip = false

// ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import VueLazyload from 'vue-lazyload';
import sanli from '@/assets/1.gif';
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading: sanli
})

import myPlugins from '@/plugins/myPlugins'
//注册插件
Vue.use(myPlugins,{name:'upper'})


//引入表单验证插件
import "@/plugins/validate"
const vm = new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API;
  },
}).$mount('#app')
console.log(vm)