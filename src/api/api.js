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
  const url = '/CetUser/Profile?UserID=' + data.UserID
  const method = 'get'
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