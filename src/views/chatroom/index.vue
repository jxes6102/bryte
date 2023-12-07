<template>
    <div v-tobottom class="w-auto h-auto md:h-[80%] p-2 flex flex-col justify-start items-center ">
        <div 
            class="w-[90%] md:w-[40%] h-[auto]  rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
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
                class="w-full bg-[#483D8B] text-sm md:text-xl text-white py-1 px-2 rounded">
                留言給家長 
            </button>
        </div>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import { ref,computed } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter()
const store = useStore()

const roleID = computed(() => {
    return store.state.roleID
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
    // let role = store.state.roleID
    // console.log('roleID',roleID.value)
    apiLoading.value = false
}

init()

const isMobile = computed(() => {
    return store.state.isMobile
})

const countPosition = (roleType) => {
    return ((roleType == 2 && roleID.value == 2) || (roleType == 3 && roleID.value == 3) )
}

</script>

<style>

</style>