<template>
    <div class="w-auto h-auto p-2 flex flex-col justify-start items-center ">
        <div
            ref="chatBoard"
            v-tobottom
            class="w-[90%] md:w-[40%] h-[60vh] md:h-[80vh] overflow-auto rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-start justify-top"
            @scroll="handleScroll">
            <div
                v-for="(item, index) in messagelist" :key="index" 
                :id="'messageItem'+index"
                :class="item.isSelf ? 'items-end' : 'items-start'"
                class="w-full p-1 md:p-2 flex flex-col justify-center">
                <div
                    :class="item.isSelf ? 'items-end text-right' : 'items-start text-left'"
                    class="w-auto max-w-[70%] h-auto rounded flex flex-col justify-center">
                    <div class="text-sm md:text-lg text-[#A9A9A9]">
                        {{(item.isSelf) ? '我' : ((item.isParent) ? (item.studentUserName + item.studentNumber + '號的' + item.parentTitle + ' ' + item.userName) : (item.userRoleName + ' ' + item.userName))}}
                    </div>
                </div>
                <div
                    :class="item.isSelf ? 'items-end text-right' : 'items-start text-left'"
                    class="w-auto max-w-[70%] h-auto px-2 py-1 md:px-4 md:py-2 bg-[#F0F0F0] rounded flex flex-col justify-center">
                    <div class="text-base md:text-xl">{{item.message}}</div>
                </div>
                <div
                    :class="item.isSelf ? 'items-end text-right' : 'items-start text-left'"
                    class="w-auto max-w-[70%] h-auto  rounded flex flex-col justify-center">
                    <div class="text-sm md:text-lg text-[#A9A9A9]">{{item.createDateTime}}</div>
                </div>
            </div>
        </div>
        <div
            ref="sendEle"
            class="w-[90%] md:w-[50%] h-[35px] max-h-[100px] my-1 flex flex-wrap justify-center items-end gap-[10px]"
            >
            <!-- <button
                @click="openChat"
                class="w-full bg-[#483D8B] text-sm md:text-xl text-white py-1 px-2 rounded">
                {{isSchool ? '留言給家長' : '留言給導師'}}
            </button> -->
            <div class="relative w-[70%] h-full text-base md:text-2xl">
                <textarea
                    ref="textEle"
                    v-model="word"
                    @keyup="changeHeight"
                    placeholder="請在此輸入留言"
                    required
                    class="w-full h-full p-1 bg-gray-100 border-gray-300 border-[1px] overflow-y-auto"
                    style="resize:none;"
                    maxlength="30"
                    >
                </textarea>
            </div>
            <button
                @click="sendMessage"
                class="w-[auto] bg-[#483D8B] text-sm md:text-xl text-white py-1 px-2 rounded">
                送出
            </button>
            <!-- <el-icon size="30" @click="sendMessage"><Promotion /></el-icon> -->
        </div>
    </div>
    
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import { ref,computed,provide,nextTick,onMounted } from 'vue'
import { useRouter } from "vue-router"
import signal from '@/utils/signalR'

const router = useRouter()
const store = useStore()

const roleID = computed(() => {
    return store.state.roleID
})
const classId = computed(() => {
    return localStorage.getItem('classId')
})
const studentId = computed(() => {
    return localStorage.getItem('studentId')
})

const messagelist = ref([
])
const apiLoading = ref(false)
const dayData = ref(new Date())
const init = async() => {
    apiLoading.value = true
    apiLoading.value = false
}

init()

const isMobile = computed(() => {
    return store.state.isMobile
})

const countPosition = (roleType) => {
    return ((roleType == 2 && roleID.value == 2) || (roleType == 3 && roleID.value == 3) )
}

const word = ref('')
const chatBoard = ref(null)
const messageStart = ref(0)
const messageLength = ref(10)
const isInit = ref(true)
const canScroll = ref(false)

const formatDate = (dateTime) => {
    let date = new Date(dateTime)
    let AM = date.getHours() < 12 ? '上午' : (date.getHours() < 18 ? '下午' : '晚上')
    let hours = date.getHours() < 12 ? date.getHours() : date.getHours() - 12
    hours = hours < 10 ? '0' + hours : '' + hours
    let mins = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes()
    let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : '' + date.getSeconds()
    return (AM + ' ' + hours + ':' + mins)
    // return (AM + ' ' + hours + ':' + mins + ':' + seconds)
}

signal.stop().then(() => {
    signal.start().then(() => {
        signal.invoke('AddToGroup', classId.value, studentId.value).then((res) => {
            console.log('連接成功')
            getMessageHistory()
        }).catch((err) => {
            console.error(err) 
        })
    })
})

signal.on('ReceiveMessage', (res) => {
    console.log('ReceiveMessage', res)
    let date = JSON.parse(JSON.stringify(res.createDateTime))
    let data = JSON.parse(JSON.stringify(res[key]))
    data.createDateTime = formatDate(date)
    messagelist.value.push(data)
    messageStart.value = messageStart.value + 1
    const target = {
        top: chatBoard.value.scrollHeight + 999,
        left: 0,
        behavior: 'smooth',
    }
    nextTick(()=>{
        chatBoard.value.scrollTo(target)
    })
})

signal.on('MessageHistory', (res) => {
    console.log('MessageHistory', res)
    for(let key in res){
        let date = JSON.parse(JSON.stringify(res[key].createDateTime))
        let data = JSON.parse(JSON.stringify(res[key]))
        console.log('date', date)
        data.createDateTime = formatDate(date)
        messagelist.value.unshift(data)
    }
    messageStart.value = messageStart.value + messageLength.value
    if(isInit.value){
        const target = {
            top: chatBoard.value.scrollHeight + 999,
            left: 0,
            behavior: 'smooth',
        }
        nextTick(()=>{
            chatBoard.value.scrollTo(target)
        })
        isInit.value = false
    }
    else{
        if(chatBoard){
            let messageItem = chatBoard.value.querySelector('[id="messageItem0"]')    
            if(messageItem){
                chatBoard.value.scrollTop += messageItem.clientHeight * res.length
            }
        }
    }
})

const getMessageHistory = () => {
    signal.invoke('GetMessageHistory', messageStart.value, messageLength.value, classId.value, studentId.value).then((res) => {
        console.log('取得留言歷史紀錄成功')
    }).catch((err) => {
        console.error(err) 
    })
}

const sendMessage = () => {
    signal.invoke('SendMessageToGroup', classId.value, studentId.value, word.value).then((res) => {
        console.log('傳送成功')
        word.value = ''
    }).catch((err) => {
        console.error(err) 
    })
}

const handleScroll = () => {
    const container = chatBoard.value;
    if(canScroll.value){
        if (container.scrollTop === 0) {
            console.log('scrollTop === 0')
            canScroll.value = false
            getMessageHistory()
        }
    }else{
        if (container.scrollTop != 0) {
            canScroll.value = true
        }
    }
};

const textEle = ref(null)
const sendEle = ref(null)
const changeHeight = () => {
    sendEle.value.style.height = '35px'
    sendEle.value.style.height = textEle.value.scrollHeight + 'px'

    let allHeight = isMobile.value ? '60vh' : '80vh'
    if(textEle.value.scrollHeight >= 100){
        chatBoard.value.style.height = 'calc('+allHeight+' - 100px)'
    }else{
        chatBoard.value.style.height = 'calc('+allHeight+' - ' + textEle.value.scrollHeight + 'px)'
    }
    
    const target = {
        top: chatBoard.value.scrollHeight + 999,
        left: 0,
        behavior: 'smooth',
    }

    nextTick(()=>{
        chatBoard.value.scrollTo(target)
    })
}

onMounted(() => {
    changeHeight()
})
</script>

<style>

</style>