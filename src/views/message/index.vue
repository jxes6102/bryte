<template>
    <div class="w-auto h-auto p-2 flex flex-col justify-center items-center">
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-end">
            <button
                @click="removeAll"
                class="w-[auto] text-sm md:text-xl text-[#FF4500] mx-[2px] py-[1px] px-[2px] border-[#FF4500] border-[1px] rounded">
                清除已讀
            </button>
        </div>
        <div
            v-for="(item,index) in notifyList" :key="index"
            :class="(index % 2 == 0) ? 'bg-slate-50' : 'bg-slate-200'"
            class="w-[95%] md:w-[40%] h-[auto] text-sm md:text-lg rounded-lg bg-slate-50 my-1 px-1 py-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-end">
            <div 
                @click="toNotify(item)" 
                class="w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-indigo-500 rounded-full ">
                <img v-if="item.userPictureUrl" :src="item.userPictureUrl" class="rounded-full " alt="">
            </div>
            <div 
                @click="toNotify(item)" 
                class="w-auto px-1 h-full grow flex flex-col items-start justify-center">
                <div class="max-w-[50vw] md:max-w-[18vw] px-1 truncate">{{item.title}}</div>
                <div class="max-w-[50vw] md:max-w-[18vw] px-1 truncate">{{item.message}}</div>
                <div class="max-w-[50vw] md:max-w-[18vw] px-1 truncate md:text-sm text-xs">{{item.createDateTime}}</div>
            </div>
            <div class="w-auto px-1 h-full flex flex-col items-start justify-center">
                <button
                    @click="remove(item)"
                    class="w-[auto] text-sm md:text-xl text-[#FF4500] mx-[2px] py-[1px] px-[2px] border-[#FF4500] border-[1px] rounded">
                    清除
                </button>
            </div>
            <div 
                @click="toNotify(item)" 
                class="w-auto px-1 h-full flex flex-col items-start justify-center">
                <div
                    :class="(item.isRead) ? 'bg-[#808080]' : 'bg-[#DC143C]'"
                    class="w-[auto] mx-[2px] md:mx-1 text-sm md:text-xl text-white py-[2px] px-[4px] md:py-1 md:px-2 rounded">
                    {{item.isRead ? '已讀' : '未讀'}}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";

import {ref,computed } from 'vue'
import { useRouter } from "vue-router"
import signalR from '@/utils/signalR'

const store = useStore()
const router = useRouter()

const isMobile = computed(() => {
    return store.state.isMobile
})

const notifyList = computed(() => {
    return store.state.notifyList
})

const remove = (item) => {
    signalR.clearNotify(item.id)
}

const removeAll = () => {
    signalR.clearAllNotify()
}

const toNotify = (item) => {
    if (item.type == 0) {
        let pairs = item.data.split('&')
        let obj = {}
        pairs.forEach(pair => {
            let keyValue = pair.split('=')
            let key = keyValue[0]
            let value = keyValue[1]
            obj[key] = value
        });
        store.commit('setStudentId', obj['studentId'])
        store.commit('setClassId', obj['classId'])
        signalR.readNotify(item.id)
        router.push({ path: '/chatroom' })
    } else if (item.type == 1) {
        let pairs = item.data.split('&')
        let obj = {}
        pairs.forEach(pair => {
            let keyValue = pair.split('=')
            let key = keyValue[0]
            let value = keyValue[1]
            obj[key] = value
        });
        store.commit('setClassId', obj['classId'])
        signalR.readNotify(item.id)
        router.push({ path: '/tipView' })
    } else if (item.type == 3) {

    } else if (item.type == 4) {

    }
}
</script>

<style>

</style>