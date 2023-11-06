import request from '@/api/index'

let DepartmentID = "2bd3434f-1e95-4fdb-ab29-315921e06868"

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

