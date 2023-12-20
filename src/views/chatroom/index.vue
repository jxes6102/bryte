<template>
    <div class="w-auto h-auto p-2 flex flex-col justify-start items-center ">
        <div
            ref="chatBoard"
            v-tobottom
            class="w-[90%] md:w-[40%] h-[60vh] md:h-[80vh] overflow-auto rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-start justify-center">
            <div
                v-for="(item,index) in messagelist" :key="index" 
                :class="countPosition(item.roleType) ? 'items-end' : 'items-start'"
                class="w-full p-1 md:p-2 flex flex-col justify-center">
                <div
                    :class="countPosition(item.roleType) ? 'items-end text-right' : 'items-start text-left'"
                    class="w-auto max-w-[70%] h-auto rounded flex flex-col justify-center">
                    <div class="text-sm md:text-lg text-[#A9A9A9]">{{item.name}}</div>
                </div>
                <div
                    :class="countPosition(item.roleType) ? 'items-end text-right' : 'items-start text-left'"
                    class="w-auto max-w-[70%] h-auto px-2 py-1 md:px-4 md:py-2 bg-[#F0F0F0] rounded flex flex-col justify-center">
                    <div class="text-base md:text-xl">{{item.text}}</div>
                </div>
                <div
                    :class="countPosition(item.roleType) ? 'items-end text-right' : 'items-start text-left'"
                    class="w-auto max-w-[70%] h-auto  rounded flex flex-col justify-center">
                    <div class="text-sm md:text-lg text-[#A9A9A9]">{{item.time}}</div>
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
import { useRouter } from "vue-router";

const router = useRouter()
const store = useStore()

const roleID = computed(() => {
    return store.state.roleID
})

const isSchool = computed(() => {
    return (roleID.value == 2) || (roleID.value == 1)
})

const messagelist = ref([
    {
        roleType:3,
        name:'XXX的家長',
        text:'請提醒妹妹要帶水壺回家，謝謝!',
        time:'兩小時前'
    },
    {
        roleType:2,
        name:'XXX老師',
        text:'已提醒',
        time:'一小時前'
    },
    {
        roleType:3,
        name:'XXX的家長',
        text:'請提醒妹妹要帶水壺回家，謝謝!',
        time:'兩小時前'
    },
    {
        roleType:2,
        name:'XXX老師',
        text:'已提醒',
        time:'一小時前'
    },
    {
        roleType:3,
        name:'XXX的家長',
        text:'請提醒妹妹要帶水壺回家，謝謝!',
        time:'兩小時前'
    },
    {
        roleType:2,
        name:'XXX老師',
        text:'已提醒',
        time:'一小時前'
    },
    {
        roleType:3,
        name:'XXX的家長',
        text:'請提醒妹妹要帶水壺回家，謝謝!',
        time:'兩小時前'
    },
    {
        roleType:2,
        name:'XXX老師',
        text:'已提醒',
        time:'一小時前'
    },
    {
        roleType:3,
        name:'XXX的家長',
        text:'請提醒妹妹要帶水壺回家，謝謝!',
        time:'兩小時前'
    },
    {
        roleType:2,
        name:'XXX老師',
        text:'已提醒',
        time:'一小時前'
    },
    {
        roleType:3,
        name:'XXX的家長',
        text:'請提醒妹妹要帶水壺回家，謝謝!',
        time:'兩小時前'
    },
    {
        roleType:2,
        name:'XXX老師',
        text:'已提醒',
        time:'一小時前'
    },
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

const dialogStatus = ref(false)
const openChat = () => {
    dialogStatus.value = true
}

const cancel = () => {
    dialogStatus.value = false
}

provide('cancel', cancel)

const word = ref('')
const chatBoard = ref(null)
const sendMessage = (el) => {
    messagelist.value.push(
        {
            roleType:roleID.value,
            name:'XXX老師',
            text: word.value,
            time:'一小時前'
        }
    )

    const target = {
        top: chatBoard.value.scrollHeight + 999,
        left: 0,
        behavior: 'smooth',
    }

    nextTick(()=>{
        chatBoard.value.scrollTo(target)
    })
  
}

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