import axios from 'axios'
import router from '../router'
import store from '../store'
export const TIMEOUT = 10000
// export const baseURL = 'https://cet.bryte.com.tw/api/v2'
// export const baseURL = 'https://5bc7-2001-b011-8007-3b17-3cae-bde3-9aea-e67b.ngrok-free.app/'
// export const baseURL = 'http://localhost:5222/api/'
export const baseURL = '/api/'

// const DEFAULT_CACHE_EXPIRY_TIME = 3000
// https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-391D3550-2FAB-43F0-AA4D-06929689EB22

// const store = useStore()
// const router = useRouter()

console.log('store', store)
console.log('router', router)

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
    if(response && response.headers && response.headers['x-refresh-token']){
      let refreshToken = response.headers['x-refresh-token']
      store.commit('setToken', refreshToken)
    }
    return response
  },
  error => {
    // console.log('interceptors.response error',error)
    if(error && error.response && (error.response.status == 401 || (error.response.status > 499 && error.response.status < 600))){
      store.commit('clearToken')
      router.push('/home')
    }
    if(error && error.response && error.response.status == 403){
      console.log('interceptors.response error',error)
    }
    return Promise.reject(error)
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
