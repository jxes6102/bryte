<template>
    <div class="w-auto h-auto md:h-[80%] p-2 flex flex-col justify-start items-center ">
        <div class="w-[100%] h-[auto] flex flex-wrap justify-center items-center">
            <div class="w-auto text-lg md:text-3xl px-2 md:px-4">選擇日期</div>
            <div class="w-[150px] md:w-[auto]">
                <el-date-picker
                    v-model="dayData"
                    popper-class="custom-date-picker"
                    type="date"
                    placeholder="選擇查詢日期"
                    :disabled-date="disabledDate"
                    :disabled="apiLoading"
                    :editable="false"
                    :style="isMobile ? 'width: 150px;font-size: 12px;' : 'width: 100%;'"
                />
            </div>
        </div>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>To:</div>
            <div class="px-2">XX班</div>
        </div>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div @click="toContactChart" class="px-2 text-[#F08080]">聯絡簿統計</div>
        </div>
        <div 
            class="relative w-[90%] md:w-[40%] h-[auto] min-h-[80px] md:min-h-[120px] rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div class="w-full py-1 md:py-3 px-3 flex flex-wrap items-center justify-start">
                <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">餵藥</div>
            </div>
            <div class="w-full py-1 md:py-3 px-3 text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div class="">已完成</div>
                <div class="text-[#00D1D1]">3筆</div>
                <div class="">/尚未完成</div>
                <div class="text-[#DB7093]">2筆</div>
            </div>
            <div 
                @click="toMedication"
                class="absolute right-[5px] bottom-[calc(50%_-_8px)] md:right-[15px] md:bottom-[calc(50%_-_15px)]text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div>查看</div>
                <el-icon :size="isMobile ? 15 : 30"><ArrowRightBold /></el-icon>
            </div>
        </div>
        <div 
            class="relative w-[90%] md:w-[40%] h-[auto] min-h-[80px] md:min-h-[120px] rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div class="w-full py-1 md:py-3 px-3 flex flex-wrap items-center justify-start">
                <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">學生體溫測量</div>
            </div>
            <div class="w-full py-1 md:py-3 px-3 text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div class="text-[#00D1D1]">3位</div>
                <div class="">家長已測量</div>
            </div>
            <div class="absolute right-[5px] bottom-[calc(50%_-_8px)] md:right-[15px] md:bottom-[calc(50%_-_15px)] text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div>查看</div>
                <el-icon :size="isMobile ? 15 : 30"><ArrowRightBold /></el-icon>
            </div>
        </div>
        <div 
            class="relative w-[90%] md:w-[40%] h-[auto] min-h-[80px] md:min-h-[120px] rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-start justify-center">
            <div class="w-full py-1 md:py-3 px-3 flex flex-wrap items-center justify-start">
                <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">愛的叮嚀</div>
            </div>
        </div>
        <div 
            class="relative w-[90%] md:w-[40%] h-[auto] min-h-[80px] md:min-h-[120px] rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div class="w-full py-1 md:py-3 px-3 flex flex-wrap items-center justify-start">
                <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">聯絡簿簽名</div>
            </div>
            <div class="w-full py-1 md:py-3 px-3 text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div class="">共8名學生，3名學生家長已簽名</div>

            </div>
            <div class="absolute right-[5px] bottom-[calc(50%_-_8px)] md:right-[15px] md:bottom-[calc(50%_-_15px)]text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div>查看</div>
                <el-icon :size="isMobile ? 15 : 30"><ArrowRightBold /></el-icon>
            </div>
        </div>
        <div 
            class="relative w-[90%] md:w-[40%] h-[auto] min-h-[80px] md:min-h-[120px] rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div class="w-full py-1 md:py-3 px-3 flex flex-wrap items-center justify-start">
                <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">今日發回</div>
            </div>
            <div class="w-full py-1 md:py-3 px-3 text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div class="">共8則留言，2則留言未讀</div>
            </div>
            <div class="absolute right-[5px] bottom-[calc(50%_-_8px)] md:right-[15px] md:bottom-[calc(50%_-_15px)] text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div>查看</div>
                <el-icon :size="isMobile ? 15 : 30"><ArrowRightBold /></el-icon>
            </div>
        </div>
        <div 
            class="relative w-[90%] md:w-[40%] h-[auto] min-h-[80px] md:min-h-[120px] rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div class="w-full py-1 md:py-3 px-3 flex flex-wrap items-center justify-start">
                <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">學習狀況</div>
            </div>
            <div class="w-full py-1 md:py-3 px-3 text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div class="">共8名學生，2名已填寫</div>
            </div>
            <div class="absolute right-[5px] bottom-[calc(50%_-_8px)] md:right-[15px] md:bottom-[calc(50%_-_15px)] text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div>查看</div>
                <el-icon :size="isMobile ? 15 : 30"><ArrowRightBold /></el-icon>
            </div>
        </div>
        <div 
            class="relative w-[90%] md:w-[40%] h-[auto] min-h-[80px] md:min-h-[120px] rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div class="w-full py-1 md:py-3 px-3 flex flex-wrap items-center justify-start">
                <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">家長留言</div>
            </div>
            <div class="w-full py-1 md:py-3 px-3 text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div class="">共8名學生，2名已填寫</div>
            </div>
            <div class="absolute right-[5px] bottom-[calc(50%_-_8px)] md:right-[15px] md:bottom-[calc(50%_-_15px)] text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div>查看</div>
                <el-icon :size="isMobile ? 15 : 30"><ArrowRightBold /></el-icon>
            </div>
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
const dayData = ref(new Date())
const init = async() => {
    apiLoading.value = true
    // let role = store.state.roleID
    // console.log('roleID',roleID.value)
    apiLoading.value = false
}

init()

//設定選擇日期範圍
const disabledDate = (time) => {
    return (time.getTime() > Date.now()) || (time.getTime() < (Date.now() - 2592000000))
}

const isMobile = computed(() => {
    return store.state.isMobile
})

const roleID = computed(() => {
    return store.state.roleID
})

const toContactChart = () => {
    router.push({ path: '/contactChart' })
}

const toMedication = () => {
    router.push({ path: '/medicationList' })
}

</script>

<style>

</style>