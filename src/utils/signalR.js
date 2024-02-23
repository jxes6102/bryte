const signalR = require("@microsoft/signalr")
const url = '/hub'

const chatHub = new signalR.HubConnectionBuilder()
  .withUrl(url + '/ChatHub', {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
    accessTokenFactory: () => localStorage.getItem('token')
  })
  .configureLogging(signalR.LogLevel.Information)
  .build()

chatHub.onclose((err)=>{
  console.log("ChatHub連接已經斷開", err)
})

const notifyHub = new signalR.HubConnectionBuilder()
  .withUrl(url + '/NotifyHub', {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
    accessTokenFactory: () => localStorage.getItem('token')
  })
  .configureLogging(signalR.LogLevel.Information)
  .build()
  
notifyHub.onclose((err)=>{
  console.log("NotifyHub連接已經斷開", err)
})

notifyHub.onreconnected(connectionId => {
  console.log('SignalR reconnected with connectionId: ', connectionId);
});

const sendNotify = (type, data) => {
  notifyHub.invoke('SendNotify', type, data).then(() => {
    console.log('SendNotify')
  }).catch((err) => {
    console.error(err) 
  })
}

const readNotify = (id) => {
  notifyHub.invoke('ReadNotify', id).then(() => {
    console.log('ReadNotify')
  }).catch((err) => {
    console.error(err) 
  })
}

const clearNotify = (id) => {
  notifyHub.invoke('ClearNotify', id).then(() => {
    console.log('ClearNotify')
  }).catch((err) => {
    console.error(err) 
  })
}

const clearAllNotify = () => {
  notifyHub.invoke('ClearAllNotify').then(() => {
    console.log('ClearAllNotify')
  }).catch((err) => {
    console.error(err) 
  })
}

export default {chatHub, notifyHub, sendNotify, readNotify, clearNotify, clearAllNotify}

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