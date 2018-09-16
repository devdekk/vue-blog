import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Home'
import Callback from '@/components/Callback'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    }
  ]
})
