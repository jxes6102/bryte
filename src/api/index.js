import axios from 'axios'
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export const TIMEOUT = 10000
// export const baseURL = 'https://cet.bryte.com.tw/api/v2'
// export const baseURL = 'https://5bc7-2001-b011-8007-3b17-3cae-bde3-9aea-e67b.ngrok-free.app/'
// export const baseURL = 'http://localhost:5222/api/'
export const baseURL = '/api/'

// const DEFAULT_CACHE_EXPIRY_TIME = 3000
// https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-391D3550-2FAB-43F0-AA4D-06929689EB22

const store = useStore()
const router = useRouter()

const CONFIG = {
  baseURL: baseURL,
  timeout: TIMEOUT,
  // headers: { Authorization: `Bearer ${token}` }
}
const instance = axios.create(CONFIG)

instance.interceptors.request.use(
  config => {
    // before request is sent
    const token = localStorage.getItem('token');
    config.headers['ngrok-skip-browser-warning'] = 69420
    // console.log('config',config.url)
    let noTokenArr = [
      
    ]
    if (token && !noTokenArr.includes(config.url)) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    // console.log('interceptors.request error',error)
    // request error
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  response => {
    // Do something with response data
    // console.log('interceptors.response response',response)
    return response;
  },
  error => {
    // console.log('interceptors.response error',error)
    if(error.response.status == 401){
      // console.log('未允許拿取')
      store.commit('clearToken')
      store.commit('clearUserData')
      router.push('/home');
    }
    return error;
  }
);

/**
 * @param {string} method http的request methods
 * @param {string} url 同axios的url
 * @param {object} data axios收的params或data(依method決定)
 * @param {number} timeout(optional) 同axios config中的timeout
 * @param {number} noCache(optional) method為get 且傳入true時 不使用既有的快取
 */
export default async function ({
  method = '',
  url = '',
  data,
  timeout,
  noCache,
}) {
  // console.log('b')
  const config = {
    timeout,
    noCache,
  }
  method = method.toLowerCase()
  switch (method) {
    case 'get':
      // cache機制 檢查是否取出
      return instance.get(url, { params: data }, config)
    case 'post':
      return instance.post(url, data, config)
    case 'delete':
      config.params = data
      return instance.delete(url, config)
    case 'put':
      return instance.put(url, data, config)
    case 'patch':
      return instance.patch(url, data, config)
    default:
      // TODO: 這邊設計未知method的錯誤
      return Promise.reject()
  }
}
