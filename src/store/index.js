import { createStore } from 'vuex'

export default createStore({
  state: {
    isMobile:false,
    //1主任 2老師 3家長
    roleID:2,
    isLogin:false,
    announceStatus:false,
    userData:''
  },
  getters: {
  },
  mutations: {
    setMobile (state,value){
      state.isMobile = (value <= 768) ? true : false
    },
    setRole (state,value){
      state.roleID = value
    },
    changeLoginStatus (state,value) {
      state.isLogin = value
    },
    setToken (state,value) {
      state.isLogin = true
      localStorage.setItem("token", value);
    },
    clearToken (state) {
      state.isLogin = false
      localStorage.removeItem("token");
    },
    changeAnnounceStatus(state,value){
      state.announceStatus = value
    },
    setUserData(state,value){
      state.userData = value
    },
    clearUserData(state){
      state.userData = {}
    },
    
  },
  actions: {
  },
  modules: {
  }
})
