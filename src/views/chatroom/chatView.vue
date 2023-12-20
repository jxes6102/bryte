<template>
    <div class="w-auto h-auto md:h-[80%] p-2 flex flex-col justify-start items-center ">
        <dateSelect :apiLoading="apiLoading"></dateSelect>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>To:</div>
            <div class="px-2">XX班</div>
        </div>
        <div 
            v-for="(item,index) in list" :key="index"
            class="w-[95%] md:w-[40%] h-[auto] text-sm md:text-lg rounded-lg bg-slate-50 my-1 px-1 py-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-end">
            <div class="w-full flex flex-wrap items-center justify-end">
                <div class="w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-indigo-500 rounded-full "></div>
                <div class="w-auto px-2 h-full grow flex flex-col items-start justify-center">
                    <div class="w-auto flex flex-wrap items-start justify-center">
                        <div class="text-[#808080]">{{item.classNum + '號'}}</div>
                        <div class="px-1">{{item.name}}</div>
                    </div>
                    <div class="w-full text-[#808080] flex flex-wrap items-center justify-start">
                        <div>共8則留言，2則留言未讀</div>
                    </div>
                </div>
            </div>
            <div class="w-full flex flex-wrap items-center justify-center">
                <button
                    @click="toRoom"
                    class="min-w-[10%] text-[#4169E1] font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                    查看訊息
                </button>
            </div>
        </div>
        
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import { ref,computed } from 'vue'
import { useRouter } from "vue-router";
import dateSelect from '@/components/dateSelect.vue'

const router = useRouter()
const store = useStore()

const roleID = computed(() => {
    return store.state.roleID
})

const list = ref([
    {
        name:'猴子一號',
        class:'猴子班',
        classNum:'83',
    },
    {
        name:'猴子二號',
        class:'猴子班',
        classNum:'56',
    },
    {
        name:'猴子三號',
        class:'猴子班',
        classNum:'36',
    },
    {
        name:'猴子四號',
        class:'猴子班',
        classNum:'21',
    },
])
const apiLoading = ref(false)

const init = async() => {
    apiLoading.value = true
    apiLoading.value = false
}

init()

const isMobile = computed(() => {
    return store.state.isMobile
})

const toRoom = () => {
    router.push({ path: '/chatroom' })
}

</script>

<style>

</style>