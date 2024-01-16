/*eslint-disable*/
import { createRouter,createWebHistory,createWebHashHistory } from 'vue-router'
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
import transmitView from '../views/setting/transmitView'
import learnSituation from '../views/setting/learnSituation'
import tipView from '../views/setting/tipView'
import temperatureView from '../views/setting/temperatureView'
import chatView from '../views/chatroom/chatView'
import chatroom from '../views/chatroom' 
import messageView from '../views/message'
import qrcodeView from '../views/qrcode'
import recordView from '../views/record'
import latestNewsView from '../views/news/latestNews.vue'
import loginView from '../views/login/'
import checkView from '../views/login/checkView.vue'
import testView from '../views/testView.vue'
import errorView from '../views/errorView.vue'
import { useStore } from "vuex";

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
    component: editNewsView,
  },
  {
    path: '/editIntroduction',
    name: 'editIntroduction',
    component: editIntroduction,
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
    component: userView,
  },
  {
    path: '/course',
    name: 'course',
    component: courseView
  },
  {
    path: '/courseDetail',
    name: 'courseDetail',
    component: courseDetail,
    beforeEnter: (to) => {
      if((!to.query?.CLSNO) || (!to.query?.HDYDATE)){
        return '/course'
      }
    },
  },
  {
    path: '/signRecord',
    name: 'signRecord',
    component: signRecord,
    beforeEnter: (to) => {
      if((!to.query?.CLSNO) || (!to.query?.HDYDATE)){
        return '/course'
      }
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: contactView,
    beforeEnter: () => {
      const store = useStore()
      // console.log(store.state.roleID)
      // console.log('to',to)
      // console.log('from',from)
      if(store.state.roleID == 3){
        return '/contactDetail'
      }
      // reject the navigation
      // return false
    },
  },
  {
    path: '/contactDetail',
    name: 'contactDetail',
    component: contactDetail
  },
  {
    path: '/contactSet',
    name: 'contactSet',
    component: contactSet,
  },
  {
    path: '/contactChart',
    name: 'contactChart',
    component: contactChart,
  },
  {
    path: '/medicationList',
    name: 'medicationList',
    component: medicationList,
  },
  {
    path: '/signView',
    name: 'signView',
    component: signView,
  },
  {
    path: '/transmitView',
    name: 'transmitView',
    component: transmitView,
  },
  {
    path: '/learnSituation',
    name: 'learnSituation',
    component: learnSituation,
  },
  {
    path: '/tipView',
    name: 'tipView',
    component: tipView,
  },
  {
    path: '/temperatureView',
    name: 'temperatureView',
    component: temperatureView,
  },
  {
    path: '/chatView',
    name: 'chatView',
    component: chatView,
  },
  {
    path: '/chatroom',
    name: 'chatroom',
    component: chatroom,
  },
  {
    path: '/messageView',
    name: 'messageView',
    component: messageView,
  },
  {
    path: '/qrcodeView',
    name: 'qrcodeView',
    component: qrcodeView,
  },
  {
    path: '/recordView',
    name: 'recordView',
    component:recordView,
  },
  {
    path: '/latestNewsView',
    name: 'latestNewsView',
    component: latestNewsView,
  },
  {
    path: '/login',
    name: 'login',
    component: loginView,
  },
  {
    path: '/checkView',
    name: 'checkView',
    component: checkView,
  },
  {
    path: '/testView',
    name: 'testView',
    component: testView,
  },
  { 
    path: '/:pathMatch(.*)*', 
    component: errorView 
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

//可在未登入時進入
const allow = ['login','home','latestNewsView','checkView','testView']
//需特定權限
const authority = [
  'editNews',
  'editIntroduction',
  'user',
  'contactSet',
  'contactChart',
  'medicationList',
  'signView',
  'transmitView',
  'learnSituation',
  'temperatureView',
  'chatView',
  'qrcodeView',
  'recordView'
]

router.beforeEach((to, from) => {
  const store = useStore()
  // console.log('to',to.name)
  if(!(allow.includes(to.name) || store.state.isLogin)){
    return '/'
  }
  if((authority.includes(to.name)) && (store.state.roleID == 3)){
    return '/'
  }

  // explicitly return false to cancel the navigation
  // return false
})

export default router
