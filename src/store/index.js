import { createStore } from 'vuex'

export default createStore({
  state: {
    isMobile:false,
    roleID:1
  },
  getters: {
  },
  mutations: {
    setMobile (state,value){
      state.isMobile = (value <= 768) ? true : false
    },
  },
  actions: {
  },
  modules: {
  }
})
