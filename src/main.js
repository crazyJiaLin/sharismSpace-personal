// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Axios from 'axios'
Vue.prototype.$axios = Axios;


import {
  Container,Header,Main,Row,Col,
  Button,Input,Checkbox,Switch,
  Select,Option,
  Dropdown,DropdownMenu,DropdownItem,
  Notification,Message} from 'element-ui'
Vue.use(Container); Vue.use(Header); Vue.use(Main); Vue.use(Row); Vue.use(Col);
Vue.use(Button); Vue.use(Input); Vue.use(Checkbox); Vue.use(Switch); 
Vue.use(Select); Vue.use(Option);
Vue.use(Dropdown); Vue.use(DropdownMenu); Vue.use(DropdownItem);
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

import App from './App'
import router from './router/router.js'
import {store} from './store/store.js'

// 公共样式
import './assets/css/reset.css'
import './assets/css/public.css'
import './assets/css/iconfont.css'
import './assets/css/animate.css'

//自封装全局工具方法
import './assets/js/tools.js'

window.blogReqUrl = 'http://www.sharismspace.com/blog_server-0.0.1-SNAPSHOT';  //博客服务器跟地址
window.userReqUrl = 'http://www.sharismspace.com/user_server-0.0.1-SNAPSHOT';  //博客服务器跟地址


Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
