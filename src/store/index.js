import { createStore } from 'vuex'

export default createStore({
  state: {
    isMobile:false,
    //1主任 2老師 3家長
    roleID:2
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
