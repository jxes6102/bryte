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
                @click="write"
                class="w-[auto] text-sm md:text-xl text-[#1E90FF] mx-[2px] py-[1px] px-[2px] border-[#1E90FF] border-[1px] rounded">
                全部填寫
            </button>
            <button
                class="w-[auto] text-sm md:text-xl text-[#FF4500] mx-[2px] py-[1px] px-[2px] border-[#FF4500] border-[1px] rounded">
                全部清除
            </button>
        </div>
        <div 
            v-for="(item,index) in classData" :key="index"
            class="w-[95%] md:w-[40%] h-[auto] text-sm md:text-lg text-[#808080] rounded-lg bg-slate-50 px-1 py-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-end">
            <div class="w-full flex flex-wrap items-center justify-center">
                <div class="w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-indigo-500 rounded-full "></div>
                <div class="w-auto px-2 grow flex flex-col items-start justify-center">
                    <div class="w-auto flex flex-wrap items-start justify-center">
                        <div >{{item.name}}</div>
                    </div>
                </div>
                <div
                    class="w-auto flex flex-row items-start justify-center">
                    <button
                        @click="write"
                        class="w-[auto] text-sm md:text-xl text-[#1E90FF] mx-[2px] py-[1px] px-[2px] border-[#1E90FF] border-[1px] rounded">
                        填寫
                    </button>
                    <button
                        v-if="item.isFill"
                        class="w-[auto] text-sm md:text-xl text-[#FF4500] mx-[2px] py-[1px] px-[2px] border-[#FF4500] border-[1px] rounded">
                        清除
                    </button>
                </div>
                <div v-if="item.isFill" class="line-style w-full py-2 flex flex-wrap items-center justify-center"></div>
                <div v-if="item.isFill" class="w-full px-1 text-xs md:text-lg flex flex-col items-start justify-start">
                    <div>{{'身體狀況: ' + item.detail.body}}</div>
                    <div>{{'飲食狀況: ' + item.detail.food}}</div>
                    <div>{{'午睡狀況: ' + item.detail.sleep}}</div>
                    <div>{{'是否排便: ' + item.detail.defecate}}</div>
                    <div>{{'學習狀況: ' + item.detail.learn}}</div>
                    <div>{{'人際互動: ' + item.detail.communication}}</div>
                    <div>{{'情緒表現: ' + item.detail.mood}}</div>
                </div>
            </div>
        </div>
        <Teleport to="body">
            <dialogView type="large" v-if="modalStatus">
                <template v-slot:message>
                    <div class="w-full h-full py-1 px-2 md:py-2 md:px-4 text-xs md:text-xl  flex flex-col items-center justify-center">
                        <div class=" text-base md:text-2xl font-bold my-1 md:my-3 px-3">全班學習狀況</div>
                        <div class="w-full my-[2px] md:my-2 flex flex-wrap items-center justify-between">
                            <div class="flex flex-wrap items-center justify-center" >
                                <label class="px-[2px]">身體狀況</label>
                                <div 
                                    class="px-[1px] flex flex-wrap items-center justify-center"
                                    v-for="(item,index) in inputData.body.text" :key="index">
                                    <input 
                                        @click="checkInput(inputData.body,index)"
                                        class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" 
                                        v-model="inputData.body.status[index]"/>
                                    <label>{{item}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="w-full my-[2px] md:my-2 flex flex-wrap items-center justify-between">
                            <div class="flex flex-wrap items-center justify-center" >
                                <label class="px-[2px]">飲食狀況</label>
                                <div 
                                    class="px-[1px] flex flex-wrap items-center justify-center"
                                    v-for="(item,index) in inputData.food.text" :key="index">
                                    <input 
                                        @click="checkInput(inputData.food,index)"
                                        class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" 
                                        v-model="inputData.food.status[index]"/>
                                    <label>{{item}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="w-full my-[2px] md:my-2 flex flex-wrap items-center justify-between">
                            <div class="flex flex-wrap items-center justify-center" >
                                <label class="px-[2px]">午睡狀況</label>
                                <div 
                                    class="px-[1px] flex flex-wrap items-center justify-center"
                                    v-for="(item,index) in inputData.sleep.text" :key="index">
                                    <input 
                                        @click="checkInput(inputData.sleep,index)"
                                        class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" 
                                        v-model="inputData.sleep.status[index]"/>
                                    <label>{{item}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="w-full my-[2px] md:my-2 flex flex-wrap items-center justify-between">
                            <div class="flex flex-wrap items-center justify-center" >
                                <label class="px-[2px]">是否排便</label>
                                <div 
                                    class="px-[1px] flex flex-wrap items-center justify-center"
                                    v-for="(item,index) in inputData.defecate.text" :key="index">
                                    <input 
                                        @click="checkInput(inputData.defecate,index)"
                                        class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" 
                                        v-model="inputData.defecate.status[index]"/>
                                    <label>{{item}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="w-full my-[2px] md:my-2 flex flex-wrap items-center justify-between">
                            <div class="flex flex-wrap items-center justify-center" >
                                <label class="px-[2px]">學習狀況</label>
                                <div 
                                    class="px-[1px] flex flex-wrap items-center justify-center"
                                    v-for="(item,index) in inputData.learn.text" :key="index">
                                    <input 
                                        @click="checkInput(inputData.learn,index)"
                                        class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" 
                                        v-model="inputData.learn.status[index]"/>
                                    <label>{{item}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="w-full my-[2px] md:my-2 flex flex-wrap items-center justify-between">
                            <div class="flex flex-wrap items-center justify-center" >
                                <label class="px-[2px]">人際互動</label>
                                <div 
                                    class="px-[1px] flex flex-wrap items-center justify-center"
                                    v-for="(item,index) in inputData.communication.text" :key="index">
                                    <input 
                                        @click="checkInput(inputData.communication,index)"
                                        class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" 
                                        v-model="inputData.communication.status[index]"/>
                                    <label>{{item}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="w-full my-[2px] md:my-2 flex flex-wrap items-center justify-between">
                            <div class="flex flex-wrap items-center justify-center" >
                                <label class="px-[2px]">情緒表現</label>
                                <div 
                                    class="px-[1px] flex flex-wrap items-center justify-center"
                                    v-for="(item,index) in inputData.mood.text" :key="index">
                                    <input 
                                        @click="checkInput(inputData.mood,index)"
                                        class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" 
                                        v-model="inputData.mood.status[index]"/>
                                    <label>{{item}}</label>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </template>
                <template v-slot:control>
                    <div class="absolute w-full bottom-0 md:bottom-1 text-sm md:text-xl flex flex-wrap justify-end items-center">
                        <button
                            @click="send"
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

const classData = ref([
    {
        name:"猴子一號",
        number:41,
        isFill:false,
        detail:{
            body:'',
            food:'',
            sleep:'',
            defecate:'',
            learn:'',
            communication:'',
            mood:''
        }
    },
    {
        name:"猴子二號",
        number:37,
        isFill:true,
        detail:{
            body:'咳嗽',
            food:'胃口不佳',
            sleep:'淺睡',
            defecate:'無',
            learn:'主動',
            communication:'分享',
            mood:'愉快'
        }
    },
    {
        name:"猴子三號",
        number:16,
        isFill:true,
        detail:{
            body:'咳嗽',
            food:'胃口不佳',
            sleep:'熟睡',
            defecate:'無',
            learn:'主動',
            communication:'分享',
            mood:'不安'
        }
    },
    {
        name:"猴子四號",
        number:23,
        isFill:false,
        detail:{
            body:'',
            food:'',
            sleep:'',
            defecate:'',
            learn:'',
            communication:'',
            mood:''
        }
    },
    {
        name:"猴子五號",
        number:48,
        isFill:true,
        detail:{
            body:'咳嗽',
            food:'時間較長',
            sleep:'熟睡',
            defecate:'無',
            learn:'主動',
            communication:'分享',
            mood:'愉快'
        }
    },
    {
        name:"猴子六號",
        number:12,
        isFill:false,
        detail:{
            body:'',
            food:'',
            sleep:'',
            defecate:'',
            learn:'',
            communication:'',
            mood:''
        }
    },
    {
        name:"猴子七號",
        number:6,
        isFill:true,
        detail:{
            body:'咳嗽',
            food:'時間較長',
            sleep:'淺睡',
            defecate:'無',
            learn:'主動',
            communication:'分享',
            mood:'不安'
        }
    },
    {
        name:"猴子八號",
        number:6,
        isFill:false,
        detail:{
            body:'',
            food:'',
            sleep:'',
            defecate:'',
            learn:'',
            communication:'',
            mood:''
        }
    },
    {
        name:"猴子九號",
        number:5,
        isFill:true,
        detail:{
            body:'咳嗽',
            food:'胃口不佳',
            sleep:'熟睡',
            defecate:'無',
            learn:'主動',
            communication:'分享',
            mood:'愉快'
        }
    },
    {
        name:"猴子十一號",
        number:24,
        isFill:false,
        detail:{
            body:'',
            food:'',
            sleep:'',
            defecate:'',
            learn:'',
            communication:'',
            mood:''
        }
    },
])

const inputData = ref({
    body:{
        status:[false,false,false,false],
        text:['正常','咳嗽','流鼻水','體溫偏高'],
    },
    food:{
        status:[false,false,false],
        text:['良好','胃口不佳','時間較長'],
    },
    sleep:{
        status:[false,false,false],
        text:['熟睡','淺睡','無法入睡'],
    },
    defecate:{
        status:[false,false],
        text:['有','無'],
    },
    learn:{
        status:[false,false],
        text:['主動','須鼓勵'],
    },
    communication:{
        status:[false,false,false],
        text:['良好','分享','需關懷'],
    },
    mood:{
        status:[false,false,false],
        text:['愉快','穩定','不安'],
    },
})

// watch(inputData.body, (newVal,oldval) => {
//     console.log()
// },{ deep: true,immediate: false });

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

const write = () => {
    modalStatus.value = true
}

const send = () => {
    console.log('send')
    // console.log('inputData',inputData.value)
    let target = []
    for(let key in inputData.value){
        // console.log('key',key,inputData.value[key])
        let index = inputData.value[key].status.findIndex((item) => item)
        // console.log('index',index)
        if(index>=0){
            target.push(inputData.value[key].text[index])
        }else{
            target.push('')
        }
    }
    console.log('target',target)
}

const checkInput = (obj,index) => {

    if(obj.status[index]){
        return false
    }

    for(let key in obj.status){
        if(key == index.toString()){
            obj.status[key] = true
        }else{
            obj.status[key] = false
        }
    }
    
}

</script>