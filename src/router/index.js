import Vue from 'vue'
import Router from 'vue-router'
import AdminControlPage from '../components/AdminControlPage'
import NavigationPage from '../components/NavigationPage'

Vue.use(Router);

export default new Router({
  hashbang: false,
  routes: [
    {
      path: '/',
      name: 'NavigationPage',
      component: NavigationPage
    },
    {
      path: '/admin',
      name: 'AdminControlPage',
      component: AdminControlPage
    }
  ]
})
