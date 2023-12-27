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
import transmitView from '../views/setting/transmitView'
import learnSituation from '../views/setting/learnSituation'
// import contactDownload from '../views/contact/contactDownload'
import tipView from '../views/setting/tipView'
import temperatureView from '../views/setting/temperatureView'
import chatView from '../views/chatroom/chatView'
import chatroom from '../views/chatroom' 
import messageView from '../views/message'
import qrcodeView from '../views/qrcode'
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
    beforeEnter: () => {
      const store = useStore()
      if(store.state.roleID == 3){
        return '/'
      }
    },
  },
  {
    path: '/editIntroduction',
    name: 'editIntroduction',
    component: editIntroduction,
    beforeEnter: () => {
      const store = useStore()
      if(store.state.roleID == 3){
        return '/'
      }
    },
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
    beforeEnter: () => {
      const store = useStore()
      if(store.state.roleID == 3){
        return '/'
      }
    },
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
    beforeEnter: () => {
      const store = useStore()
      if(store.state.roleID == 3){
        return '/'
      }
    },
  },
  {
    path: '/contactChart',
    name: 'contactChart',
    component: contactChart,
    beforeEnter: () => {
      const store = useStore()
      if(store.state.roleID == 3){
        return '/'
      }
    },
  },
  {
    path: '/medicationList',
    name: 'medicationList',
    component: medicationList,
    beforeEnter: () => {
      const store = useStore()
      if(store.state.roleID == 3){
        return '/'
      }
    },
  },
  {
    path: '/signView',
    name: 'signView',
    component: signView,
    beforeEnter: () => {
      const store = useStore()
      if(store.state.roleID == 3){
        return '/'
      }
    },
  },
  {
    path: '/transmitView',
    name: 'transmitView',
    component: transmitView,
    beforeEnter: () => {
      const store = useStore()
      if(store.state.roleID == 3){
        return '/'
      }
    },
  },
  {
    path: '/learnSituation',
    name: 'learnSituation',
    component: learnSituation,
    beforeEnter: () => {
      const store = useStore()
      if(store.state.roleID == 3){
        return '/'
      }
    },
  },
  // {
  //   path: '/contactDownload',
  //   name: 'contactDownload',
  //   component: contactDownload
  // },
  {
    path: '/tipView',
    name: 'tipView',
    component: tipView,
    // beforeEnter: () => {
    //   const store = useStore()
    //   if(store.state.roleID == 3){
    //     return '/'
    //   }
    // },
  },
  {
    path: '/temperatureView',
    name: 'temperatureView',
    component: temperatureView,
    beforeEnter: () => {
      const store = useStore()
      if(store.state.roleID == 3){
        return '/'
      }
    },
  },
  {
    path: '/chatView',
    name: 'chatView',
    component: chatView,
    beforeEnter: () => {
      const store = useStore()
      if(store.state.roleID == 3){
        return '/'
      }
    },
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
    beforeEnter: () => {
      const store = useStore()
      if(store.state.roleID == 3){
        return '/'
      }
    },
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

export default router
