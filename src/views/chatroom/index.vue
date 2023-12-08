<template>
    <div class="w-auto h-auto md:h-[80%] p-2 flex flex-col justify-start items-center ">
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
        <div class="w-[90%] md:w-[40%] my-2">
            <button
                @click="openChat"
                class="w-full bg-[#483D8B] text-sm md:text-xl text-white py-1 px-2 rounded">
                {{isSchool ? '留言給家長' : '留言給導師'}}
            </button>
        </div>
        <Teleport to="body">
            <dialogView v-if="dialogStatus">
                <template v-slot:message>
                    <div class="w-[90%] md:w-[90%] h-[90px] md:h-[270px] rounded-lg m-1 p-1 flex flex-wrap items-start justify-center">
                        <div class="relative w-full h-full text-base md:text-2xl">
                            <textarea 
                                v-model="word"
                                placeholder="請在此輸入留言"
                                required
                                class="w-full h-full p-1 bg-gray-100 border-gray-300 border-[1px]"
                                style="resize:none;"
                                maxlength="30"
                                >
                            </textarea>
                            <!-- <div class="absolute right-3 bottom-1">{{'字數' + word.length + '/30'}}</div> -->
                        </div>
                    </div>
                </template>
                <template v-slot:control>
                    <div class="absolute w-full bottom-2 md:bottom-4 flex flex-wrap justify-center items-center">
                        <button
                            @click="sendMessage"
                            class="min-w-[20%] w-[70%] bg-[#483D8B] text-sm md:text-xl text-white py-1 px-2 rounded">
                            送出
                        </button>
                    </div>
                </template>
            </dialogView>
        </Teleport>
    </div>
    
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import { ref,computed,provide,nextTick } from 'vue'
import { useRouter } from "vue-router";
import dialogView from "@/components/dialogView.vue"

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

</script>

<style>

</style>