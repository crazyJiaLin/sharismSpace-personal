import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = () => import('@/components/home/home.vue');
const BlogDetail = () => import('@/components/blog/blog-detail.vue');
export default new Router({
  routes: [
    { path: '/', name: 'HelloWorld', component: Home },
    { path: '/blog/:id', name: 'BlogDetail', component: BlogDetail },
    {path:'*',redirect:'/'}
  ]
})
