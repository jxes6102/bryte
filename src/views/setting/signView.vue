<template>
    <div 
        class="w-auto h-auto p-2 flex flex-col justify-start items-center"
    >
        <dateSelect :apiLoading="apiLoading"></dateSelect>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div class="px-2">To:</div>
            <div class="px-2">XX班</div>
        </div>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-end">
            <button
                @click="warnSign"
                class="w-[auto] bg-[#483D8B] text-sm md:text-xl text-white py-1 px-2 rounded">
                提醒簽名
            </button>
        </div>
        <div 
            v-for="(item,index) in classData" :key="index"
            class="w-[95%] md:w-[40%] h-[auto] text-sm md:text-lg text-[#808080] rounded-lg bg-slate-50 px-1 py-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-end">
            <div class="w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-indigo-500 rounded-full "></div>
            <div class="w-auto px-2 grow flex flex-col items-start justify-center">
                <div class="w-auto flex flex-wrap items-start justify-center">
                    <div >{{item.name}}</div>
                    <div class="text-black">{{item.number + '號'}}</div>
                </div>
                <div 
                    v-if="item.isSign"
                    class="w-auto text-[#00FF7F] flex flex-wrap items-center justify-center">
                    已回簽
                </div>
                <div 
                    v-else
                    class="w-auto text-[#DC143C] flex flex-wrap items-center justify-center">
                    尚未回簽
                </div>
            </div>
            <div
                v-if="!item.isSign" 
                class="w-auto flex flex-row items-start justify-center">
                <button
                    @click="warnSign"
                    class="w-[auto] bg-[#483D8B] text-sm md:text-xl text-white py-1 px-2 rounded-md">
                    提醒簽名
                </button>
            </div>
        </div>
        <Teleport to="body">
            <dialogView v-if="modalStatus">
                <template v-slot:message>
                    <div class="w-full h-full py-1 px-2 md:py-2 md:px-4 flex flex-col items-center justify-center">
                        <div class=" text-base md:text-2xl font-bold px-3">確定提醒家長簽名?</div>
                        <div class=" text-sm md:text-lg px-3">{{'提醒對象:(共' + noSignList.length + '位尚未簽名)'}}</div>
                        <div class="overflow-hidden w-full h-[40%] py-1 px-2 md:py-2 md:px-4 flex flex-wrap items-center justify-center">
                            <div 
                                v-for="(item,index) in noSignList" :key="index"
                                class="text-sm md:text-lg px-1">{{item.name+'家長'}}
                            </div>
                        </div>
                    </div>
                    
                </template>
                <template v-slot:control>
                    <div class="absolute w-full bottom-1 text-sm md:text-xl flex flex-wrap justify-end items-center">
                        <button
                            class="min-w-[10%] text-[#0000CD] font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            確定
                        </button>
                        <button
                            @click="cancel"
                            class="min-w-[10%] text-[#0000CD] font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            取消
                        </button>
                    </div>
                </template>
            </dialogView>
        </Teleport>
        
    </div>
</template>

<script setup>
/*eslint-disable*/
import { ref,computed,watch,provide } from "vue";
import { useStore } from "vuex";
import { useRouter,useRoute } from "vue-router";
import dialogView from "@/components/dialogView.vue"
import dateSelect from '@/components/dateSelect.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()

const isMobile = computed(() => {
    return store.state.isMobile
})

const apiLoading = ref(false)
//尚未註冊 奇怪
const classData = ref([
    {
        name:"猴子一號",
        number:41,
        isSign:false,
        imgUrl:'',
        isRegister:false
    },
    {
        name:"猴子二號",
        number:37,
        isSign:true,
        imgUrl:'',
        isRegister:false
    },
    {
        name:"猴子三號",
        number:16,
        isSign:false,
        imgUrl:'',
        isRegister:false
    },
    {
        name:"猴子四號",
        number:23,
        isSign:true,
        imgUrl:'',
        isRegister:false
    },
    {
        name:"猴子五號",
        number:48,
        isSign:false,
        imgUrl:'',
        isRegister:false
    },
    {
        name:"猴子六號",
        number:12,
        isSign:true,
        imgUrl:'',
        isRegister:false
    },
    {
        name:"猴子七號",
        number:6,
        isSign:true,
        imgUrl:'',
        isRegister:false
    },
    {
        name:"猴子八號",
        number:6,
        isSign:false,
        imgUrl:'',
        isRegister:false
    },
    {
        name:"猴子九號",
        number:5,
        isSign:false,
        imgUrl:'',
        isRegister:false
    },
    {
        name:"猴子十一號",
        number:24,
        isSign:true,
        imgUrl:'',
        isRegister:false
    },
])
const noSignList = computed(() => {
    return classData.value.filter((item)=>!item.isSign)
})

const init = async() => {
    if(apiLoading.value) return false

    apiLoading.value = true

    apiLoading.value = false
}

init()

const modalStatus = ref(false)
const cancel = () => {
    modalStatus.value = false
}
provide('cancel', cancel)

const warnSign = () => {
    modalStatus.value = true
}

</script>