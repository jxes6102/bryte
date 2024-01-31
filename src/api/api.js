import request from '@/api/index'

export const getBannerSearch = (data) => {
  const url = '/Department/BannerSearch?DepartmentID='+data.DepartmentID
  const method = 'get'
  return request({
    method,
    url,
    data,
  })
}

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

export const initTodayRollCall = () => {
  const url = '/Init/InitTodayRollCall'
  const method = 'post'
  return request({
    method,
    url,
  })
}

export const initTodayPickup = () => {
  const url = '/Init/InitTodayPickup'
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

export const editBodyTemperatureRecordRecord = (data) => {
  const url = '/BodyTemperatureRecord/Edit'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const uploadFile = (data) => {
  const url = '/Upload/UploadFile'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}