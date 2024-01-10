import { createStore } from 'vuex'

export default createStore({
  state: {
    isMobile:false,
    //1主任 2老師 3家長
    roleID:2,
    isLogin:false,
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
  },
  actions: {
  },
  modules: {
  }
})
