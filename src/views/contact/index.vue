<template>
    <div class="w-auto h-auto md:h-[80%] p-2 flex flex-col justify-start items-center ">
        <dateSelect :apiLoading="apiLoading"></dateSelect>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>{{statement}}</div>
        </div>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>To:</div>
            <div class="px-2">全校</div>
        </div>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>聯絡簿回覆: (</div>
            <div class="text-[#F08080]">67/123</div>
            <div>)</div>
        </div>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-2xl rounded-lg p-1 flex flex-wrap items-center justify-center">
            <div @click="toContactChart" class="btn-style-1">聯絡簿統計</div>
            <div @click="toMedication" class="btn-style-1">今日餵藥列表</div>
        </div>
        <div 
            v-for="(item,index) in data" :key="index"
            @click="toContactDetail"
            class="relative w-[90%] md:w-[40%] h-[auto] min-h-[80px] md:min-h-[120px] rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div class="w-full py-1 md:py-3 px-3 flex flex-wrap items-center justify-start">
                <div class="text-[16px] md:text-2xl font-semibold">{{ item.className }}</div>
                <div 
                    class="text-[#6E6EFF] text-[14px] md:text-xl pl-1"
                    v-for="(name,teacherKey) in item.teacher" :key="teacherKey" >{{ name }}</div>
            </div>
            <div class="w-full py-1 md:py-3 px-3 text-[14px] md:text-xl flex flex-wrap items-center justify-start">
                <div class="text-[#00D1D1]">{{ item.peopleCount + '人'}}</div>
                <div class="">{{ '/' + item.peopleTotal + '人'}}</div>
            </div>
            <div 
                class="absolute right-[5px] top-[calc(50%_-_10px)] md:right-[15px] md:top-[calc(50%_-_20px)] cursor-pointer">
                <el-icon :size="isMobile ? 20 : 40"><ArrowRightBold /></el-icon>
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

const isMobile = computed(() => {
    return store.state.isMobile
})

const roleID = computed(() => {
    return store.state.roleID
})

const statement = computed(() => {
    if(roleID.value == 1){
        return '園長:施O漢'
    } else if(roleID.value == 2) {
        return '導師:羅O空'
    }
})

const data = ref([
    {
        className:'松鼠班',
        teacher:['白O馳','樂O可'],
        peopleCount:21,
        peopleTotal:28,
    },
    {
        className:'猴子班',
        teacher:['巴O雄'],
        peopleCount:74,
        peopleTotal:89,
    },
    {
        className:'白兔班',
        teacher:['楊O森'],
        peopleCount:21,
        peopleTotal:28,
    },
    {
        className:'企鵝班',
        teacher:['彭O海'],
        peopleCount:12,
        peopleTotal:24,
    },
    {
        className:'黑熊班',
        teacher:['萬O輝','趙O雪'],
        peopleCount:11,
        peopleTotal:23,
    },
    {
        className:'綿羊班',
        teacher:['塗O龍'],
        peopleCount:18,
        peopleTotal:25,
    },
    {
        className:'蠑螈班',
        teacher:['毛O東','鄧O庭'],
        peopleCount:1,
        peopleTotal:64,
    },
])

const apiLoading = ref(false)

const init = async() => {
    apiLoading.value = true
    if(roleID.value == 2){
        data.value = data.value.slice(0,2)
    }
    apiLoading.value = false
}

init()

const toContactDetail = () => {
    router.push({ path: '/contactDetail' })
}

const toContactChart = () => {
    router.push({ path: '/contactChart' })
}

const toMedication = () => {
    router.push({ path: '/medicationList' })
}

</script>

<style>

</style>