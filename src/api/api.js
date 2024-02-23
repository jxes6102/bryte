import request from '@/api/index'

export const getNewsSearch = (data) => {
  const url = '/news/search'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getIntroduction = (data) => {
  const url = '/department?DepartmentID=' + data.DepartmentID
  const method = 'get'
  return request({
    method,
    url,
    data,
  })
}

export const getNew = (data) => {
  const url = '/news?NewsID=' + data.NewsID
  const method = 'get'
  return request({
    method,
    url,
    data,
  })
}

export const getUserMenu = (data) => {
  const url = '/CetUser/UserMenu?UserID=' + data.UserID
  const method = 'get'
  return request({
    method,
    url,
    data,
  })
}

export const getProfile = (data) => {
  const url = '/User/Profile'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getUserList = (data) => {
  const url = '/CetUser/Search'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getClassList = (data) => {
  const url = '/Course/Calendar'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getClassDetail = (data) => {
  const url = '/Course/Flow?DepartmentID='+data.DepartmentID+'&CLSNO='+data.CLSNO+'&HDYDATE='+data.HDYDATE+'&STUID='+data.STUID
  const method = 'get'
  return request({
    method,
    url,
    data,
  })
}

export const getSignRecord = (data) => {
  const url = '/Course/GetSignRecordBySTUID'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const testLogin = (data) => {
  const url = '/Auth/Login'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const testLogout = () => {
  const url = '/Auth/Logout'
  const method = 'post'
  return request({
    method,
    url,
  })
}

export const authorize = () => {
  const url = '/Auth/Authorize'
  const method = 'post'
  return request({
    method,
    url,
  })
}

export const registerApi = (data) => {
  const url = '/Auth/Register'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const checkQR = (data) => {
  const url = '/Pickup/Arrived' + addToUrl(data)
  const method = 'post'
  return request({
    method,
    url,
  })
}

export const getLineInformation = () => {
  const url = '/Auth/LineLogin'
  const method = 'get'
  return request({
    method,
    url,
  })
}

export const getLineLoginCallback = (data) => {
  const url = '/Auth/LineLoginCallback'+addToUrl(data)
  const method = 'get'
  return request({
    method,
    url,
    data
  })
}


export const getLineInformationBindAccount = () => {
  const url = '/Auth/LineLoginBindAccount'
  const method = 'get'
  return request({
    method,
    url,
  })
}

export const editLineInformationBindAccount = (data) => {
  const url = '/Auth/LineLoginBindAccount'
  const method = 'post'
  return request({
    method,
    url,
    data
  })
}

export const getCaptcha = () => {
  const url = '/Auth/Captcha'
  const method = 'get'
  return request({
    method,
    url,
  })
}

export const getCall = () => {
  const url = '/Pickup/Monitor'
  const method = 'post'
  return request({
    method,
    url,
  })
}

const addToUrl = (payload) => {
  let str = '?'
  for(let key in payload){
      str += key + '=' + payload[key] + '&'
  }
  str = str.substring(0,str.length-1)
  return str
}

export const getContactBookClassList = () => {
  const url = '/ContactBook/GetClassList'
  const method = 'post'
  return request({
    method,
    url,
  })
}

export const getContactBookStudentList = () => {
  const url = '/ContactBook/GetStudentList'
  const method = 'post'
  return request({
    method,
    url,
  })
}


export const getMedicationRemindByClassIdAndStudentId = (data) => {
  const url = '/MedicationRemind/GetDataByClassIdAndStudentIdAndDate'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const createMedicationRemind = (data) => {
  const url = '/MedicationRemind/Create'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const editMedicationRemind = (data) => {
  const url = '/MedicationRemind/Edit'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getMedicationRemindRecordListByClass = (data) => {
  const url = '/MedicationRemindRecord/GetDataListByClassIdAndDate'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const editMedicationRemindRecord = (data) => {
  const url = '/MedicationRemindRecord/Edit'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getBodyTemperatureRecordListByClass = (data) => {
  const url = '/BodyTemperatureRecord/GetDataListByClassIdAndDate'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getBodyTemperatureRecordByClassIdAndStudentId = (data) => {
  const url = '/BodyTemperatureRecord/GetDataByClassIdAndStudentIdAndDate'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const createBodyTemperatureRecordRecord = (data) => {
  const url = '/BodyTemperatureRecord/CreateByDate'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const editBodyTemperatureRecordRecord = (data) => {
  const url = '/BodyTemperatureRecord/Edit'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getRollCallListByClassId = (data) => {
  const url = '/RollCall/GetDataListByClassIdAndDate'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const editRollCall = (data) => {
  const url = '/RollCall/EditByState'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getLeaveByClassIdAndStudentId = (data) => {
  const url = '/Leave/GetDataByClassIdAndStudentIdAndDate'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const editLeave = (data) => {
  const url = '/Leave/EditForParent'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const createLeave = (data) => {
  const url = '/Leave/CreateForParent'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getContactBookRecordByClassId = (data) => {
  const url = '/ContactBookRecord/GetDataListByClassIdAndDate'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getContactBookRecord = (data) => {
  const url = '/ContactBookRecord/Detail'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getContactBookRecordByClassIdAndStudentId = (data) => {
  const url = '/ContactBookRecord/GetDataListByClassIdAndStudentIdAndDate'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const editContactBookRecordBySignature = (data) => {
  const url = '/ContactBookRecord/EditSignature'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getStudentStateRecordByClassId = (data) => {
  const url = '/StudentStateRecord/GetDataListByClassIdAndDate'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getStudentStateRecordByContactBookRecordId = (data) => {
  const url = '/StudentStateRecord/GetDataListByContactBookRecordId'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const editStudentStateRecord = (data) => {
  const url = '/StudentStateRecord/EditDataList'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const editAllStudentStateRecord = (data) => {
  const url = '/StudentStateRecord/EditAllDataList'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getChatRoomListByClassId = (data) => {
  const url = '/ChatMessage/GetChatRoomListByClassId'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getAnnouncementByClassId = (data) => {
  const url = '/Announcement/GetDataByClassId'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const createAnnouncement = (data) => {
  const url = '/Announcement/Create'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const editAnnouncement = (data) => {
  const url = '/Announcement/Edit'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const uploadFile = (data) => {
  const url = '/File/UploadFile'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const uploadSignature = (data) => {
  const url = '/File/UploadSignature'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getClassSelect = () => {
  const url = '/Select/GetClassSelect'
  const method = 'post'
  return request({
    method,
    url,
  })
}

export const getRollCallStateSelect = () => {
  const url = '/Select/GetRollCallStateSelect'
  const method = 'post'
  return request({
    method,
    url,
  })
}

export const getLeaveStateSelect = () => {
  const url = '/Select/GetLeaveStateSelect'
  const method = 'post'
  return request({
    method,
    url,
  })
}


// .catch((err) => { })