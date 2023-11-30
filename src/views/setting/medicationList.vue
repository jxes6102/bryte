<template>
    <div 
        class="w-auto h-auto p-2 flex flex-col justify-start items-center"
    >
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
            <div class="px-2">To:</div>
            <div class="px-2">XX班</div>
        </div>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div class="px-2">已完成8筆/待處理6筆</div>
        </div>
        <div class="w-[100%] py-2 text-sm md:text-lg text-[#808080] flex flex-col items-center justify-center">
            <div class="line-style w-[100%] text-[#D3D3D3] text-base md:text-xl flex">待處理</div>
            <div
                v-for="(item, index) in notEatList" :key="index" 
                class="w-[95%] md:w-[40%] h-[auto] rounded-lg bg-slate-50 px-1 py-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-start">
                <div class="w-full py-1 flex flex-wrap items-center justify-start">
                    <div class="px-1">{{item.time}}</div>
                    <div class="px-1">{{item.name}}</div>
                    <div class="w-[auto] bg-[#4169E1] text-sm md:text-xl text-white py-[1px] px-[2px] rounded">
                        {{item.moment}}
                    </div>
                </div>
                <div class="w-full pl-[20px] pr-1 py-1 flex flex-wrap items-center justify-start">
                    {{item.content}}
                </div>
            </div>
        </div>
        <div class="w-[100%] py-2 text-sm md:text-lg text-[#808080] flex flex-col items-center justify-center">
            <div class="line-style w-[100%] flex text-[#D3D3D3]">已完成</div>
            <div
                v-for="(item, index) in isEatList" :key="index" 
                class="w-[95%] md:w-[40%] h-[auto] rounded-lg bg-slate-50 px-1 py-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-start">
                <div class="w-full py-1 flex flex-wrap items-center justify-start">
                    <div class="px-1">{{item.time}}</div>
                    <div class="px-1">{{item.name}}</div>
                    <div class="w-[auto] bg-[#4169E1] text-sm md:text-xl text-white py-[1px] px-[2px] rounded">
                        {{item.moment}}
                    </div>
                </div>
                <div class="w-full pl-[20px] pr-1 py-1 flex flex-wrap items-center justify-start">
                    {{item.content}}
                </div>
                <div class="w-full pl-[20px] pr-1 py-1 flex flex-wrap items-center justify-between">
                    <div>{{item.reply}}</div>
                    <div>{{item.replyPeople}}</div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
/*eslint-disable*/
import { ref,computed,watch } from "vue";
import { useStore } from "vuex";
import { useRouter,useRoute } from "vue-router";

const store = useStore()
const router = useRouter()
const route = useRoute()

const isMobile = computed(() => {
    return store.state.isMobile
})

const dayData = ref(new Date())

//設定選擇日期範圍
const disabledDate = (time) => {
    return (time.getTime() > Date.now()) || (time.getTime() < (Date.now() - 2592000000))
}

const apiLoading = ref(false)
const list = ref([
    {
        time:'18:00',
        name:'猴子一號',
        moment:'飯後',
        content:'小感冒，晚餐後請協助餵藥，謝謝老師!',
        reply:"",
        replyPeople:'',
        isEat:false,
    },
    {
        time:'12:00',
        name:'猴子二號',
        moment:'睡前',
        content:'大感冒，午休前請協助餵藥，謝謝老師!',
        reply:"已吃藥囉!",
        replyPeople:'羅O熊 幼兒園主任',
        isEat:true,
    },
    {
        time:'18:00',
        name:'猴子三號',
        moment:'飯後',
        content:'小感冒，晚餐後請協助餵藥，謝謝老師!',
        reply:"",
        replyPeople:'',
        isEat:false,
    },
    {
        time:'12:00',
        name:'猴子四號',
        moment:'睡前',
        content:'大感冒，午休前請協助餵藥，謝謝老師!',
        reply:"已吃藥囉!",
        replyPeople:'羅O熊 幼兒園主任',
        isEat:true,
    },
])

const notEatList = computed(() => {
    return list.value.filter((item)=>!item.isEat)
})

const isEatList = computed(() => {
    return list.value.filter((item)=>item.isEat)
})

const init = async() => {
    if(apiLoading.value) return false

    apiLoading.value = true

    apiLoading.value = false
}

init()
</script>