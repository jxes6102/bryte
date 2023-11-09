import request from '@/api/index'

let DepartmentID = "2bd3434f-1e95-4fdb-ab29-315921e06868"
let UserID = "50ceb08b-9174-453f-9bfc-2b57cb4f86be"

export const getBannerSearch = (data) => {
  const url = '/Department/BannerSearch?DepartmentID='+DepartmentID
  const method = 'get'
  return request({
    method,
    url,
    data,
  })
}

export const getNewsSearch = (data) => {
  data.DepartmentID = DepartmentID
  const url = '/news/search'
  const method = 'post'
  return request({
    method,
    url,
    data,
  })
}

export const getIntroduction = (data) => {
  const url = '/department?DepartmentID=' + DepartmentID
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
  const url = '/CetUser/UserMenu?UserID=' + UserID
  const method = 'get'
  return request({
    method,
    url,
    data,
  })
}

export const getProfile = (data) => {
  const url = '/CetUser/Profile?UserID=' + UserID
  const method = 'get'
  return request({
    method,
    url,
    data,
  })
}
