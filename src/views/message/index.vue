<template>
    <div class="w-auto h-auto p-2 flex flex-col justify-center items-center">
        <div
            @click="toRoom"
            v-for="(item,index) in list" :key="index"
            class="w-[95%] md:w-[40%] h-[auto] text-sm md:text-lg rounded-lg bg-slate-50 my-1 px-1 py-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-end">
            <div class="w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-indigo-500 rounded-full "></div>
            <div class="w-auto px-1 h-full grow flex flex-col items-start justify-center">
                <div class="max-w-[50vw] md:max-w-[18vw] px-1 truncate">{{item.name}}</div>
                <div class="max-w-[50vw] md:max-w-[18vw] px-1 truncate">{{item.message}}</div>
            </div>
            <div class="w-auto px-1 h-full flex flex-col items-start justify-center">
                <div class="w-full text-left">{{item.time}}</div>
                <div 
                    v-if="item.noReadCount > 0" 
                    class="w-full flex flex-wrap justify-center items-center">
                    <div class="w-[20px] h-[20px] md:w-[22px] md:h-[22px] text-white text-xs bg-[#FF0000] rounded-full flex flex-wrap justify-center items-center">{{item.noReadCount+'+'}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";

import {ref,computed } from 'vue'
import { useRouter } from "vue-router";

const store = useStore()
const router = useRouter()

const isMobile = computed(() => {
    return store.state.isMobile
})

const list = ref([
    {
        name:'猴子一號',
        class:'猴子班',
        classNum:'83',
        time:'18:00',
        message:'test1',
        noReadCount:9
    },
    {
        name:'猴子二號',
        class:'猴子班',
        classNum:'56',
        time:'18:00',
        message:'test2test2test2test2test2test2test2test2test2test2test2test2test2',
        noReadCount:0
    },
    {
        name:'猴子三號',
        class:'猴子班',
        classNum:'21',
        time:'18:00',
        message:'test3',
        noReadCount:9
    },
])

const toRoom = () => {
    router.push({ path: '/chatroom' })
}

</script>

<style>

</style>