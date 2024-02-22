<template>
    <div class="w-auto h-auto p-2 flex flex-col justify-center items-center">
        <div
            @click="toNotify(item)"
            v-for="(item,index) in notifyList" :key="index"
            class="w-[95%] md:w-[40%] h-[auto] text-sm md:text-lg rounded-lg bg-slate-50 my-1 px-1 py-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-end">
            <div class="w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-indigo-500 rounded-full "></div>
            <div class="w-auto px-1 h-full grow flex flex-col items-start justify-center">
                <div class="max-w-[50vw] md:max-w-[18vw] px-1 truncate">{{item.title}}</div>
                <div class="max-w-[50vw] md:max-w-[18vw] px-1 truncate">{{item.message}}</div>
            </div>
            <div class="w-auto px-1 h-full flex flex-col items-start justify-center">
                <div class="w-full text-left">{{item.createDateTime}}</div>
                <div 
                    class="w-full flex flex-wrap justify-center items-center">
                    <div class="w-[20px] h-[20px] md:w-[22px] md:h-[22px] text-white text-xs bg-[#FF0000] rounded-full flex flex-wrap justify-center items-center">
                        {{item.isRead ? '已讀' : '未讀'}}
                    </div>
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

    } else if (item.type == 3) {

    } else if (item.type == 4) {

    }
}

</script>

<style>

</style>