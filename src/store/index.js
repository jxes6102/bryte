import { createStore } from 'vuex'

export default createStore({
  state: {
    isMobile:false,
    //1主任 2老師 3家長
    roleID:2,
    user:{
    },
    isLogin:false,
    lineHtml:'',
    announceStatus:false,
    studentId:'',
    studentName:'',
    studentNumber:0,
    classId:'',
    className:'',
    lineId:'',
    studentIdByLine:'',
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
      state.studentId = value
    },
    setStudentName (state,value){
      state.studentName = value
    },
    setStudentNumber (state,value){
      state.studentNumber = value
    },
    setClassId (state,value){
      state.classId = value
    },
    setClassName (state,value){
      state.className = value
    },
    setUser (state,value){
      state.user = value
    },
    changeLoginStatus (state,value) {
      state.isLogin = value
    },
    setToken (state,value) {
      state.isLogin = true
      localStorage.setItem("token", value)
    },
    clearToken (state) {
      state.isLogin = false
      localStorage.removeItem("token")
    },
    setLineId (state,value) {
      state.lineId = value
    },
    clearLineId (state) {
      state.lineId = ''
    },
    setStudentIdByLine (state,value) {
      state.studentIdByLine = value
    },
    clearStudentIdByLine (state) {
      state.studentIdByLine = ''
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
