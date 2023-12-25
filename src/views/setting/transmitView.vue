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
                @click="write('all')"
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
                        @click="write(item.work)"
                        class="w-[auto] text-sm md:text-xl text-[#1E90FF] mx-[2px] py-[1px] px-[2px] border-[#1E90FF] border-[1px] rounded">
                        填寫
                    </button>
                    <button
                        v-if="item.hasWork"
                        class="w-[auto] text-sm md:text-xl text-[#FF4500] mx-[2px] py-[1px] px-[2px] border-[#FF4500] border-[1px] rounded">
                        清除
                    </button>
                </div>
            </div>
            <div v-if="item.hasWork" class="line-style w-full py-2 flex flex-wrap items-center justify-center"></div>
            <div v-if="item.hasWork" class="w-full px-1 text-xs md:text-lg flex flex-col items-start justify-start">
                <div v-if="item.work.notification.status">{{'通知單，請於' + item.work.notification.day + '前繳回'}}</div>
                <div v-if="item.work.worksheet.status">{{'學習單，請於' + item.work.worksheet.day + '前繳回'}}</div>
                <div v-if="item.work.receipt.status">{{'附上收據，找回' + item.work.receipt.money + '元'}}</div>
                <div
                    v-if="item.work.things.suit || item.work.things.shoe || item.work.things.bedding || item.work.things.toiletry" 
                    class="w-full flex flex-wrap items-center justify-start" >
                    <div>清洗衣物:</div>
                    <div class="px-1" v-if="item.work.things.suit">衣褲</div>
                    <div class="px-1" v-if="item.work.things.shoe">室內鞋</div>
                    <div class="px-1" v-if="item.work.things.bedding">寢具</div>
                    <div class="px-1" v-if="item.work.things.toiletry">牙刷、牙杯</div>
                </div>
            </div>
        </div>
        <Teleport to="body">
            <dialogView v-if="modalStatus">
                <template v-slot:message>
                    <div class="w-full h-full py-1 px-2 md:py-2 md:px-4 text-xs md:text-xl  flex flex-col items-center justify-center">
                        <div class=" text-base md:text-2xl font-bold my-1 md:my-3 px-3">全班當日通知單</div>
                        <div class="w-full my-1 md:my-2 flex flex-wrap items-center justify-between">
                            <div class="w-full flex flex-wrap items-center justify-start" >
                                <input class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" v-model="inputData.notification.status" />
                                <div>
                                    通知單，請於
                                    <input 
                                        class="w-[100px] md:w-[140px]" type="date" 
                                        v-model="inputData.notification.day"
                                        />
                                    前繳回
                                </div>
                            </div>
                        </div>
                        <div class="w-full my-1 md:my-2 flex flex-wrap items-center justify-between">
                            <div class="flex flex-wrap items-center justify-center" >
                                <input class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" v-model="inputData.worksheet.status" />
                                <div>
                                    學習單，請於
                                    <input 
                                        class="w-[100px] md:w-[140px]" type="date" 
                                        v-model="inputData.worksheet.day"
                                        />
                                    前繳回
                                </div>
                            </div>
                        </div>
                        <div class="w-full my-1 md:my-2 flex flex-wrap items-center justify-between">
                            <div class="flex flex-wrap items-center justify-center" >
                                <input class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" v-model="inputData.receipt.status" />
                                <div>
                                    附上收據，找回
                                    <input 
                                        class="w-[40px] md:w-[60px] text-right"
                                        v-model="inputData.receipt.money"
                                        type="text" required minlength="1" maxlength="5"/>
                                    元
                                </div>
                            </div>
                        </div>
                        <div class="w-full my-1 md:my-2 flex flex-wrap items-center justify-between">
                            <div class="flex flex-wrap items-center justify-center" >
                                <label >清洗衣物</label>
                                <input class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" v-model="inputData.things.suit" />
                                <label >衣褲</label>
                                <input class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" v-model="inputData.things.shoe" />
                                <label >室內鞋</label>
                                <input class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" v-model="inputData.things.bedding" />
                                <label >寢具</label>
                                <input class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" v-model="inputData.things.toiletry" />
                                <label >牙刷、牙杯</label>
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
//尚未註冊 奇怪
const classData = ref([
    {
        name:"猴子一號",
        number:41,
        hasWork:true,
        work:{
            notification:{
                status:true,
                day:new Date().toISOString().substring(0,10)
            },
            worksheet:{
                status:true,
                day:new Date().toISOString().substring(0,10)
            },
            receipt:{
                status:false,
                money:'124'
            },
            things:{
                suit:true,
                shoe:false,
                bedding:false,
                toiletry:false
            }
        }
    },
    {
        name:"猴子二號",
        number:37,
        hasWork:true,
        work:{
            notification:{
                status:false,
                day:new Date().toISOString().substring(0,10)
            },
            worksheet:{
                status:true,
                day:new Date().toISOString().substring(0,10)
            },
            receipt:{
                status:false,
                money:'0'
            },
            things:{
                suit:false,
                shoe:false,
                bedding:true,
                toiletry:true
            }
        }
    },
    {
        name:"猴子三號",
        number:16,
        hasWork:true,
        work:{
            notification:{
                status:false,
                day:new Date().toISOString().substring(0,10)
            },
            worksheet:{
                status:false,
                day:new Date().toISOString().substring(0,10)
            },
            receipt:{
                status:false,
                money:'9246'
            },
            things:{
                suit:false,
                shoe:true,
                bedding:false,
                toiletry:false
            }
        }
    },
    {
        name:"猴子四號",
        number:23,
        hasWork:false,
        work:{
            notification:{
                status:false,
                day:new Date().toISOString().substring(0,10)
            },
            worksheet:{
                status:true,
                day:new Date().toISOString().substring(0,10)
            },
            receipt:{
                status:false,
                money:'456'
            },
            things:{
                suit:false,
                shoe:true,
                bedding:false,
                toiletry:true
            }
        }
    },
    {
        name:"猴子五號",
        number:48,
        hasWork:true,
        work:{
            notification:{
                status:true,
                day:new Date().toISOString().substring(0,10)
            },
            worksheet:{
                status:false,
                day:new Date().toISOString().substring(0,10)
            },
            receipt:{
                status:true,
                money:'853'
            },
            things:{
                suit:false,
                shoe:false,
                bedding:true,
                toiletry:false
            }
        }
    },
    {
        name:"猴子六號",
        number:12,
        hasWork:false,
        work:{
            notification:{
                status:false,
                day:new Date().toISOString().substring(0,10)
            },
            worksheet:{
                status:false,
                day:new Date().toISOString().substring(0,10)
            },
            receipt:{
                status:false,
                money:'1542'
            },
            things:{
                suit:false,
                shoe:false,
                bedding:true,
                toiletry:false
            }
        }
    },
    {
        name:"猴子七號",
        number:6,
        hasWork:true,
        work:{
            notification:{
                status:false,
                day:new Date().toISOString().substring(0,10)
            },
            worksheet:{
                status:true,
                day:new Date().toISOString().substring(0,10)
            },
            receipt:{
                status:true,
                money:'734'
            },
            things:{
                suit:true,
                shoe:false,
                bedding:false,
                toiletry:true
            }
        }
    },
    {
        name:"猴子八號",
        number:6,
        hasWork:false,
        work:{
            notification:{
                status:false,
                day:new Date().toISOString().substring(0,10)
            },
            worksheet:{
                status:false,
                day:new Date().toISOString().substring(0,10)
            },
            receipt:{
                status:true,
                money:'17'
            },
            things:{
                suit:false,
                shoe:false,
                bedding:true,
                toiletry:false
            }
        }
    },
    {
        name:"猴子九號",
        number:5,
        hasWork:true,
        work:{
            notification:{
                status:true,
                day:new Date().toISOString().substring(0,10)
            },
            worksheet:{
                status:false,
                day:new Date().toISOString().substring(0,10)
            },
            receipt:{
                status:false,
                money:'274'
            },
            things:{
                suit:false,
                shoe:false,
                bedding:false,
                toiletry:false
            }
        }
    },
    {
        name:"猴子十一號",
        number:24,
        hasWork:false,
        work:{
            notification:{
                status:false,
                day:new Date().toISOString().substring(0,10)
            },
            worksheet:{
                status:true,
                day:new Date().toISOString().substring(0,10)
            },
            receipt:{
                status:false,
                money:'2356'
            },
            things:{
                suit:false,
                shoe:false,
                bedding:true,
                toiletry:false
            }
        }
    },
])

const inputData = ref({})
watch(inputData, (newVal,oldval) => {
    let moneyStr = newVal.receipt.money
    const checkNum = /[^0-9]/gi
    if(checkNum.test(moneyStr)){
        newVal.receipt.money = moneyStr.replace(checkNum, '')
    }

},{ deep: true,immediate: false });

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

const write = (item) => {
    if(item == 'all') {
        inputData.value = {
            notification:{
                status:false,
                day:new Date().toISOString().substring(0,10)
            },
            worksheet:{
                status:false,
                day:new Date().toISOString().substring(0,10)
            },
            receipt:{
                status:false,
                money:'0'
            },
            things:{
                suit:false,
                shoe:false,
                bedding:false,
                toiletry:false
            }
        }
    }else{
        inputData.value = item
    }

    modalStatus.value = true
}

const send = () => {
    // console.log('send')
    // console.log('inputData',inputData.value)
}

</script>