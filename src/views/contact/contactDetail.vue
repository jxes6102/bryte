<template>
    <div class="w-auto h-auto md:h-auto p-2 flex flex-col justify-start items-center ">
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
        <div 
            v-if="isSchool" 
            class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>To:</div>
            <div class="px-2">XX班</div>
        </div>
        <div 
            v-if="isSchool" 
            class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div @click="toContactChart" class="px-2 text-[#F08080]">聯絡簿統計</div>
        </div>
        <div 
            class="relative w-[90%] md:w-[40%] h-[auto] min-h-[80px] md:min-h-[120px] rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div class="w-full py-1 md:py-3 px-3 flex flex-wrap items-center justify-start">
                <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">餵藥</div>
            </div>
            <div v-if="isSchool" class="w-full py-1 md:py-3 px-3 text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div class="">已完成</div>
                <div class="text-[#00D1D1]">3筆</div>
                <div class="">/尚未完成</div>
                <div class="text-[#DB7093]">2筆</div>
            </div>
            <div 
                v-else
                class="w-full py-1 md:py-3 px-3 text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div class="w-full py-1 flex flex-wrap items-center justify-start">
                    <div class="">{{data.medication.time}}</div>
                    <div class="w-[auto] mx-1 bg-[#4169E1] text-sm md:text-xl text-white py-[1px] px-[2px] rounded">
                        {{data.medication.moment}}
                    </div>
                </div>
                <div class="w-full py-1 text-left flex flex-wrap items-center justify-start">
                    {{data.medication.content}}
                </div>
                <div class="w-full py-1 text-left flex flex-wrap items-center justify-between">
                    <div>{{data.medication.reply}}</div>
                    <div>{{data.medication.replyPeople}}</div>
                </div>
            </div>
            <div 
                v-if="isSchool"
                @click="toMedication"
                class="absolute right-[5px] bottom-[calc(50%_-_8px)] md:right-[15px] md:bottom-[calc(50%_-_15px)]text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start cursor-pointer">
                <div>查看</div>
                <el-icon :size="isMobile ? 15 : 30"><ArrowRightBold /></el-icon>
            </div>
            <div v-else
                class="absolute right-[5px] bottom-[calc(70%_-_8px)] md:right-[15px] md:bottom-[calc(70%_-_15px)] text-[14px] md:text-xl text-[#4169E1] flex flex-wrap items-center justify-center cursor-pointer">
                <el-icon :size="isMobile ? 15 : 30"><Plus /></el-icon>
                <div>新增</div>
            </div>
        </div>
        <div 
            class="relative w-[90%] md:w-[40%] h-[auto] min-h-[80px] md:min-h-[120px] rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div class="w-full py-1 md:py-3 px-3 flex flex-wrap items-center justify-start">
                <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">學生體溫測量</div>
            </div>
            <div v-if="isSchool" class="w-full py-1 md:py-3 px-3 text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div class="text-[#00D1D1]">3位</div>
                <div class="">家長已測量</div>
            </div>
            <div 
                v-else
                class="w-full px-3 flex flex-wrap items-center justify-start">
                <div class="w-full text-left">{{data.temperature.time}}</div>
                <div class="">家長測量</div>
                <div class="w-[auto] mx-1 bg-[#FFA500] text-sm md:text-xl text-white py-[1px] px-[2px] rounded">
                    {{ data.temperature.status }}
                </div>
                <div class="mx-1">{{data.temperature.value + '°C'}}</div>
            </div>
            <div v-if="isSchool"
                @click="toTemperature" 
                class="absolute right-[5px] bottom-[calc(50%_-_8px)] md:right-[15px] md:bottom-[calc(50%_-_15px)] text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start cursor-pointer">
                <div>查看</div>
                <el-icon :size="isMobile ? 15 : 30"><ArrowRightBold /></el-icon>
            </div>
            <div v-else
                class="absolute right-[5px] bottom-[calc(50%_-_8px)] md:right-[15px] md:bottom-[calc(50%_-_15px)] text-[14px] md:text-xl text-[#4169E1] flex flex-wrap items-center justify-center cursor-pointer">
                <el-icon :size="isMobile ? 15 : 30"><Plus /></el-icon>
                <div>新增</div>
            </div>
        </div>
        <div 
            class="relative w-[90%] md:w-[40%] h-[auto] min-h-[80px] md:min-h-[120px] rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-start justify-center">
            <div class="w-full py-1 md:py-3 px-3 flex flex-wrap items-center justify-between">
                <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">愛的叮嚀</div>
                <div v-if="!isSchool" class="w-full py-1 md:py-3 text-left text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                    <div class="">腸病毒盛行，回家勤洗手，多吃水果</div>
                </div>
                <div 
                    @click="toTip" 
                    class="text-[#808080] cursor-pointer" 
                    v-if="roleID == 2">編輯
                </div>
            </div>
        </div>
        <div 
            v-if="isSchool" 
            class="relative w-[90%] md:w-[40%] h-[auto] min-h-[80px] md:min-h-[120px] rounded-lg bg-slate-50 m-1 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div class="w-full py-1 md:py-3 px-3 flex flex-wrap items-center justify-start">
                <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">聯絡簿簽名</div>
            </div>
            <div class="w-full py-1 md:py-3 px-3 text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div class="">共8名學生，3名學生家長已簽名</div>
            </div>
            <div
                @click="toSign()" 
                class="absolute right-[5px] bottom-[calc(50%_-_8px)] md:right-[15px] md:bottom-[calc(50%_-_15px)]text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start cursor-pointer">
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
            <div
                @click="toChat" 
                class="absolute right-[5px] bottom-[calc(50%_-_8px)] md:right-[15px] md:bottom-[calc(50%_-_15px)] text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start cursor-pointer">
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
            <div 
                @click="toTransmit"
                class="absolute right-[5px] bottom-[calc(50%_-_8px)] md:right-[15px] md:bottom-[calc(50%_-_15px)] text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start cursor-pointer">
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
            <div
                @click="toLearn" 
                class="absolute right-[5px] bottom-[calc(50%_-_8px)] md:right-[15px] md:bottom-[calc(50%_-_15px)] text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start cursor-pointer">
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

const roleID = computed(() => {
    return store.state.roleID
})

const isSchool = computed(() => {
    return (roleID.value == 2) || (roleID.value == 1)
})

const data = ref(
    {
        name:'猴子四號',
        class:'猴子班',
        classNum:'21',
        temperature:{
            time:'18:00',
            value:'39.2',
            status:'不正常'
        },
        medication:{
            time:'12:00',
            moment:'睡前',
            content:'大感冒，午休前請協助餵藥，謝謝老師!',
            reply:"已吃藥囉!",
            replyPeople:'羅O熊 幼兒園主任',
        }
    },
)

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

const toContactChart = () => {
    router.push({ path: '/contactChart' })
}

const toMedication = () => {
    router.push({ path: '/medicationList' })
}

const toSign = () => {
    router.push({ path: '/signView' })
}

const toTransmit = () => {
    router.push({ path: '/transmitView' })
}

const toLearn = () => {
    router.push({ path: '/learnSituation' })
}

const toTip = () => {
    router.push({ path: '/tipView' })
}

const toTemperature = () => {
    router.push({ path: '/temperatureView' })
}

const toChat = () => {
    router.push({ path: '/chatView' })
}

</script>

<style>

</style>