<template>
    <div 
        class="w-auto h-auto p-2 flex flex-col justify-start items-center"
    >
        <dateSelect :apiLoading="apiLoading"></dateSelect>
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
                @click="eat(item)"
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
        <Teleport to="body">
            <conversationView v-if="modalStatus">
                <template v-slot:header>
                    <div class="w-full py-1 px-2 md:py-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-center">
                        <div class="w-[40px] h-[40px] md:w-[70px] md:h-[70px] bg-indigo-500 rounded-full "></div>
                        <div class="w-auto px-2 grow flex flex-col items-start justify-center">
                            <div class="text-black">{{modifyData.name}}</div>
                            <div>{{modifyData.class + ' ' + modifyData.classNum + '號'}}</div>
                        </div>
                        <div class="w-auto flex flex-col items-center justify-center">
                            待處理
                        </div>
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <div class="px-1 text-black">{{modifyData.time}}</div>
                        <div class="w-[auto] bg-[#4169E1] text-sm md:text-xl text-white py-[1px] px-[2px] rounded">
                            {{modifyData.moment}}
                        </div>
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <div class="px-1">{{modifyData.content}}</div>
                    </div>
                </template>
                <template v-slot:content>
                    <div class="line-style w-full text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-center">
                        導師回覆
                    </div>
                    <div class="relative w-full h-auto px-2 text-sm md:text-lg">
                        <textarea 
                            v-model="modifyData.reply"
                            required
                            class="w-full h-[60px] md:h-[100px] px-[2px] border-[1px] border-black"
                            style="resize:none;"
                            maxlength="30"
                            >
                        </textarea>
                        <!-- <div class="absolute right-3 bottom-1">字數</div> -->
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <div>快速輸入:</div>
                        <div 
                            @click="simpleInput(item)"
                            class="px-1 text-[#4169E1] underline decoration-solid cursor-pointer"
                            v-for="(item, index) in fontData" :key="index" >
                            {{ item }}
                        </div>

                    </div>
                </template>
                <template v-slot:control>
                    <div class="absolute w-full bottom-1 md:bottom-2 flex flex-wrap justify-start items-center">
                        <button
                            @click="cancel"
                            class="min-w-[20%] bg-white  mx-2 py-[1px] px-[2px] md:py-1 md:px-2 rounded-sm border-[1px] text-[#808080] border-[#808080]">
                            點擊選擇相片
                        </button>
                        <!-- <button
                            @click="cancel"
                            class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            完成
                        </button>
                        <button
                            @click="cancel"
                            class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            取消
                        </button> -->
                    </div>
                </template>
            </conversationView>
        </Teleport>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { ref,computed,watch,provide } from "vue";
import { useStore } from "vuex";
import { useRouter,useRoute } from "vue-router";
import conversationView from "@/components/conversationView.vue"
import dateSelect from '@/components/dateSelect.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()

const isMobile = computed(() => {
    return store.state.isMobile
})

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
        class:'猴子班',
        classNum:'83'
    },
    {
        time:'12:00',
        name:'猴子二號',
        moment:'睡前',
        content:'大感冒，午休前請協助餵藥，謝謝老師!',
        reply:"已吃藥囉!",
        replyPeople:'羅O熊 幼兒園主任',
        isEat:true,
        class:'猴子班',
        classNum:'56'
    },
    {
        time:'18:00',
        name:'猴子三號',
        moment:'飯後',
        content:'小感冒，晚餐後請協助餵藥，謝謝老師!',
        reply:"",
        replyPeople:'',
        isEat:false,
        class:'猴子班',
        classNum:'36'
    },
    {
        time:'12:00',
        name:'猴子四號',
        moment:'睡前',
        content:'大感冒，午休前請協助餵藥，謝謝老師!',
        reply:"已吃藥囉!",
        replyPeople:'羅O熊 幼兒園主任',
        isEat:true,
        class:'猴子班',
        classNum:'21'
    },
])

const fontData = ref([
    '已完成',
    '帶錯藥',
    '已服用'
])

const modifyData = ref({})

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

const modalStatus = ref(false)
const eat = (item) => {
    
    modifyData.value = item
    // console.log('modifyData.value',modifyData.value)
    modalStatus.value = true
}
const cancel = () => {
    modalStatus.value = false
}
provide('cancel', cancel)

const simpleInput = (item) => {
    // console.log('item',item)
    modifyData.value.reply = item
}

</script>