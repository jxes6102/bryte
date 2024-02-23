import { createStore } from 'vuex'

export default createStore({
  state: {
    isMobile:false,
    //1主任 2老師 3家長
    roleID:2,
    user:{
    },
    contactBookRecord:{
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
    notifyUnReadCount:0,
    notifyList:[]
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
    setContactBookRecordId (state,value){
      localStorage.setItem("contactBookRecordId", value)
    },
    setUser (state,value){
      state.user = value
    },
    setNotifyUnReadCount (state,value){
      state.notifyUnReadCount = value
    },
    setNotifyList(state,value){
      state.notifyList = value
      
      let count = 0
      for(let key in value){
        if (!value[key].isRead) {
          count += 1
        }
      }
      state.notifyUnReadCount = count
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
      state.roleID = 2
      state.user = {}
      state.lineId = ''
      state.studentIdByLine = ''
      localStorage.removeItem("studentId");
      localStorage.removeItem("studentName");
      localStorage.removeItem("studentNumber");
      localStorage.removeItem("classId");
      localStorage.removeItem("className");
      localStorage.removeItem("contactBookRecord");
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
