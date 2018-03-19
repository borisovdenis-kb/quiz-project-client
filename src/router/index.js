import Vue from 'vue'
import Router from 'vue-router'
import AdminControlPage from '../components/admin/AdminControlPage'
import AnswerResolverPage from '../components/admin/AnswerResolverPage'
import NavigationPage from '../components/NavigationPage'
import QuizPage from '../components/quiz/QuizPage'
import PlayerPage from '../components/player/PlayerPage'

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
    },
    {
      path: 'admin/answerResolver',
      name: 'AnswerResolverPage',
      component: AnswerResolverPage
    },
    {
      path: '/quiz',
      name: 'QuizPage',
      component: QuizPage
    },
    {
      path: '/player',
      name: 'PlayerPage',
      component: PlayerPage
    }
  ]
})
