const signalR = require("@microsoft/signalr")

//import { baseURL } from '@/api'
//const url = baseURL + "ChatHub"
const url = '/hub'

const signal = new signalR.HubConnectionBuilder()
  .withUrl(url, {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
    accessTokenFactory: () => localStorage.getItem('token')
  })
  .configureLogging(signalR.LogLevel.Information)
  .build()
// signal.start().then(() => {
//   if (window.Notification) {
//     if (Notification.permission === 'granted') {
//       console.log('允許通知')
//     } else if (Notification.permission !== 'denied') {
//       console.log('需要通知許可權')
//       Notification.requestPermission((permission) => { console.log("許可權通知",permission) })
//     } else if (Notification.permission === 'denied') {
//       console.log('拒絕通知')
//     }
//   } else {
//     console.error('流覽器不支持Notification')
//   }
//   console.log('連接成功')
// })
signal.onclose((err)=>{
    console.log("連接已經斷開 執行onclose", err)
})
export default signal

