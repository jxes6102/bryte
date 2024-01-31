import { createStore } from 'vuex'

export default createStore({
  state: {
    isMobile:false,
    //1主任 2老師 3家長
    roleID:2,
    user:{
      id:'',
      roleId:'',
      roleName:'',
      roleType:0,
      account:'',
      name:'',
      nickName:'',
      pictureUrl:'',
      email:''
    },
    lineId:'',
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
    setClassId (state,value){
      localStorage.setItem("classId", value)
    },
    setClassName (state,value){
      localStorage.setItem("className", value)
    },
    setUser (state,value){
      localStorage.setItem("user", JSON.stringify(value))
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
      localStorage.removeItem("user");
      localStorage.removeItem("className");
      localStorage.removeItem("classId");
    },
    setLineId (state,value) {
      localStorage.setItem("lineId", JSON.stringify(value))
    },
    clearLineId (state) {
      state.lineId = ''
      localStorage.removeItem("lineId")
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
