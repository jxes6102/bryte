import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import introductionView from '../views/Introduction'
import editIntroduction from '../views/Introduction/editIntroduction'
import newsView from '../views/news'
import editNewsView from '../views/news/editNews'
import centerView from '../views/center'
import profileView from '../views/center/profileView'
import userView from '../views/center/userView'
import courseView from '../views/course'
import courseDetail from '../views/course/courseDetail'
import signRecord from '../views/course/signRecord'
import contactView from '../views/contact'
import contactDetail from '../views/contact/contactDetail'
import contactSet from '../views/contact/contactSet'
import contactChart from '../views/setting/contactChart'
import medicationList from '../views/setting/medicationList'
import signView from '../views/setting/signView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/introduction',
    name: 'introduction',
    component: introductionView
  },
  {
    path: '/news',
    name: 'news',
    component: newsView
  },
  {
    path: '/editNews',
    name: 'editNews',
    component: editNewsView
  },
  {
    path: '/editIntroduction',
    name: 'editIntroduction',
    component: editIntroduction
  },
  {
    path: '/center',
    name: 'center',
    component: centerView
  },
  {
    path: '/profile',
    name: 'profile',
    component: profileView
  },
  {
    path: '/user',
    name: 'user',
    component: userView
  },
  {
    path: '/course',
    name: 'course',
    component: courseView
  },
  {
    path: '/courseDetail',
    name: 'courseDetail',
    component: courseDetail
  },
  {
    path: '/signRecord',
    name: 'signRecord',
    component: signRecord
  },
  {
    path: '/contact',
    name: 'contact',
    component: contactView
  },
  {
    path: '/contactDetail',
    name: 'contactDetail',
    component: contactDetail
  },
  {
    path: '/contactSet',
    name: 'contactSet',
    component: contactSet
  },
  {
    path: '/contactChart',
    name: 'contactChart',
    component: contactChart
  },
  {
    path: '/medicationList',
    name: 'medicationList',
    component: medicationList
  },
  {
    path: '/signView',
    name: 'signView',
    component: signView
  },

  
  
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
