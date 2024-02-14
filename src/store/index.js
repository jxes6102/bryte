import { createStore } from 'vuex'

export default createStore({
  state: {
    isMobile:false,
    //1主任 2老師 3家長
    roleID:2,
    user:{
    },
    lineId:'',
    isLogin:false,
    lineHtml:'',
    announceStatus:false
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
    setStudentId (state,value){
      localStorage.setItem("studentId", value)
    },
    setStudentName (state,value){
      localStorage.setItem("studentName", value)
    },
    setStudentNumber (state,value){
      localStorage.setItem("studentNumber", value)
    },
    setClassId (state,value){
      localStorage.setItem("classId", value)
    },
    setClassName (state,value){
      localStorage.setItem("className", value)
    },
    setUser (state,value){
      // localStorage.setItem("user", JSON.stringify(value))
      state.user = value
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
      localStorage.removeItem("studentId");
      localStorage.removeItem("studentName");
      localStorage.removeItem("studentNumber");
    },
    setLineId (state,value) {
      localStorage.setItem("lineId", JSON.stringify(value))
    },
    clearLineId (state) {
      state.lineId = ''
      localStorage.removeItem("lineId")
    },
    setLineDom(state,value){
      state.lineHtml = value
    },
    changeAnnounceStatus(state,value){
      state.announceStatus = value
    }
  },
  actions: {
  },
  modules: {
  }
})
