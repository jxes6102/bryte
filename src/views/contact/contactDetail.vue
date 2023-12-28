<template>
    <div class="w-auto h-auto md:h-auto p-2 flex flex-col justify-start items-center ">
        <dateSelect :apiLoading="apiLoading"></dateSelect>
        <div v-if="isSchool" class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>{{statement}}</div>
        </div>
        <div 
            v-if="isSchool" 
            class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>To:</div>
            <div class="px-2">XX班</div>
        </div>
        <div 
            v-if="isSchool" 
            class="w-[95%] md:w-[40%] h-[auto] text-base md:text-2xl rounded-lg p-1 flex flex-wrap items-center justify-center">
            <div @click="toContactChart" class="btn-style-1">聯絡簿統計</div>
        </div>
        <div class="relative w-[auto] h-[auto] my-1 py-2 grid grid-cols-2 md:grid-cols-4 justify-items-center gap-[5vw] md:gap-[2vw]">
            <div
                @click="linkMedication" 
                class="relative w-[35vw] md:w-[12vw] h-[35vw] md:h-[12vw] rounded-lg bg-slate-50 p-1 shadow-style-1 flex flex-wrap items-center justify-center cursor-pointer border-style hover-style">
                <img :class="isMobile ? 'w-[20vw] h-[20vw]' : 'w-[6vw] h-[6vw]'" 
                    src="@/assets/img/medication.png" alt="">
                <div class="w-full text-[16px] md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl text-[#1a1a1a] flex flex-wrap items-center justify-center">
                    餵藥提醒
                </div>
            </div>
            <div 
                @click="linkTemperature"
                class="relative w-[35vw] md:w-[12vw] h-[35vw] md:h-[12vw] rounded-lg bg-slate-50 p-1 shadow-style-1 flex flex-wrap items-center justify-center cursor-pointer border-style hover-style">
                <img :class="isMobile ? 'w-[20vw] h-[20vw]' : 'w-[6vw] h-[6vw]'" 
                    src="@/assets/img/temperature.png" alt="">
                <div class="w-full text-[16px] md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl text-[#1a1a1a] flex flex-wrap items-center justify-center">
                    體溫檢查
                </div>
            </div>
            <div
                @click="toTip"  
                class="relative w-[35vw] md:w-[12vw] h-[35vw] md:h-[12vw] rounded-lg bg-slate-50 p-1 shadow-style-1 flex flex-wrap items-center justify-center cursor-pointer border-style hover-style">
                <img :class="isMobile ? 'w-[20vw] h-[20vw]' : 'w-[6vw] h-[6vw]'" 
                    src="@/assets/img/tip.png" alt="">
                <div class="w-full text-[16px] md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl text-[#1a1a1a] flex flex-wrap items-center justify-center">
                    班級叮嚀
                </div>
            </div>
            <div
                v-if="isSchool"
                @click="toSign()"
                class="relative w-[35vw] md:w-[12vw] h-[35vw] md:h-[12vw] rounded-lg bg-slate-50 p-1 shadow-style-1 flex flex-wrap items-center justify-center cursor-pointer border-style hover-style">
                <img :class="isMobile ? 'w-[20vw] h-[20vw]' : 'w-[6vw] h-[6vw]'" 
                    src="@/assets/img/sign.png" alt="">
                <div class="w-full text-[16px] md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl text-[#1a1a1a] flex flex-wrap items-center justify-center">
                    聯絡簿簽名
                </div>
            </div>
            <div 
                @click="linkChat"
                class="relative w-[35vw] md:w-[12vw] h-[35vw] md:h-[12vw] rounded-lg bg-slate-50 p-1 shadow-style-1 flex flex-wrap items-center justify-center cursor-pointer border-style hover-style">
                <img :class="isMobile ? 'w-[20vw] h-[20vw]' : 'w-[6vw] h-[6vw]'" 
                    src="@/assets/img/chat.png" alt="">
                <div class="w-full text-[16px] md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl text-[#1a1a1a] flex flex-wrap items-center justify-center">
                    留言版
                </div>
            </div>
            <div 
                @click="linkTransmit"
                class="relative w-[35vw] md:w-[12vw] h-[35vw] md:h-[12vw] rounded-lg bg-slate-50 p-1 shadow-style-1 flex flex-wrap items-center justify-center cursor-pointer border-style hover-style">
                <img :class="isMobile ? 'w-[20vw] h-[20vw]' : 'w-[6vw] h-[6vw]'" 
                    src="@/assets/img/transmit.png" alt="">
                <div class="w-full text-[16px] md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl text-[#1a1a1a] flex flex-wrap items-center justify-center">
                    當日通知單
                </div>
            </div>
            <div 
                @click="linkLearn"
                class="relative w-[35vw] md:w-[12vw] h-[35vw] md:h-[12vw] rounded-lg bg-slate-50 p-1 shadow-style-1 flex flex-wrap items-center justify-center cursor-pointer border-style hover-style">
                <img :class="isMobile ? 'w-[20vw] h-[20vw]' : 'w-[6vw] h-[6vw]'" 
                    src="@/assets/img/learn.png" alt="">
                <div class="w-full text-[16px] md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl text-[#1a1a1a] flex flex-wrap items-center justify-center">
                    學習狀況
                </div>
            </div>
            <div 
                v-if="!isSchool"
                @click="askLeave"
                class="relative w-[35vw] md:w-[12vw] h-[35vw] md:h-[12vw] rounded-lg bg-slate-50 p-1 shadow-style-1 flex flex-wrap items-center justify-center cursor-pointer border-style hover-style">
                <el-icon color="#6E6EFF" :size="isMobile ? '20vw' : '6vw'"><AlarmClock /></el-icon>
                <div class="w-full text-[16px] md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl text-[#1a1a1a] flex flex-wrap items-center justify-center">
                    請假
                </div>
            </div>
            <div 
                @click="toRecord"
                v-if="isSchool"
                class="relative w-[35vw] md:w-[12vw] h-[35vw] md:h-[12vw] rounded-lg bg-slate-50 p-1 shadow-style-1 flex flex-wrap items-center justify-center cursor-pointer border-style hover-style">
                <el-icon color="#6E6EFF" :size="isMobile ? '20vw' : '6vw'"><CircleCheck /></el-icon>
                <div class="w-full text-[16px] md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl text-[#1a1a1a] flex flex-wrap items-center justify-center">
                    簽到記錄
                </div>
            </div>
        </div>
        <div v-if="!isSchool"
            class="w-[90%] md:w-[40%] my-2 flex flex-col items-start justify-start"
            >
            <button
                class="w-full bg-[#20B2AA] text-sm md:text-xl text-white py-1 px-2 rounded">
                簽名
            </button>
        </div>

        <Teleport to="body">
            <dialogView type="small" v-if="dialogStatus">
                <template v-slot:message>
                    <div class="w-full h-auto rounded-lg m-1 p-1 flex flex-wrap items-center justify-center">
                        <el-select 
                            v-model="temperatureValue"
                            placeholder="請選擇體溫"
                            size="large"
                            style="width:90%;">
                            <el-option
                              v-for="item in temperatureOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                        </el-select>
                    </div>
                </template>
                <template v-slot:control>
                    <div class="absolute w-full bottom-2 md:bottom-4 flex flex-wrap justify-center items-center">
                        <button
                            class="min-w-[20%] w-[90%] bg-[#483D8B] text-sm md:text-xl text-white py-1 px-2 rounded">
                            送出
                        </button>
                    </div>
                </template>
            </dialogView>
            <conversationView type="large" v-if="modalStatus">
                <template v-slot:content>
                    <div class="w-full py-1 md:py-3 px-3 md:px-3 flex flex-col items-start justify-start">
                        <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">起訖日期</div>
                        <div class="w-full flex flex-wrap items-center justify-start gap-x-[2px]">
                            <el-date-picker
                                v-model="inputMedication.startDate"
                                popper-class="custom-date-picker"
                                type="date"
                                placeholder="選擇查詢日期"
                                :disabled-date="inputMedication.disabledDate"
                                :disabled="apiLoading"
                                :editable="false"
                                :style="isMobile ? 'width: 110px;font-size: 12px;' : 'width: 40%;'"
                            />
                            <div>至</div>
                            <el-date-picker
                                v-model="inputMedication.endDate"
                                popper-class="custom-date-picker"
                                type="date"
                                placeholder="選擇查詢日期"
                                :disabled-date="inputMedication.disabledDate"
                                :disabled="apiLoading"
                                :editable="false"
                                :style="isMobile ? 'width: 110px;font-size: 12px;' : 'width: 40%;'"
                            />
                        </div>
                    </div>
                    <div class="w-full py-1 md:py-3 px-3 flex flex-col items-start justify-start">
                        <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">餵藥時間</div>
                        <el-time-select
                            class="w-[150px] md:w-[200px]"
                            v-model="inputMedication.time"
                            :clearable="false"
                            start="00:10"
                            step="00:10"
                            end="23:50"
                            placeholder="Select time"
                        />
                    </div>
                    <div class="w-full py-1 md:py-3 px-3 flex flex-col items-start justify-start">
                        <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">飯前飯後</div>
                        <div class="px-[1px] flex flex-wrap items-center justify-center">
                            <el-radio-group v-model="inputMedication.moment" class="">
                                <el-radio label="1" size="large">飯前</el-radio>
                                <el-radio label="2" size="large">飯後</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="w-full py-1 md:py-3 px-3 flex flex-col items-start justify-start">
                        <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">備註</div>
                        <div class="relative w-full h-[50px] md:h-[80px] text-base md:text-2xl">
                            <textarea 
                                v-model="inputMedication.word"
                                placeholder="請在此輸入留言"
                                required
                                class="w-full h-full p-1 bg-gray-100 border-gray-300 border-[1px]"
                                style="resize:none;"
                                maxlength="30"
                                >
                            </textarea>
                            <!-- <div class="absolute right-3 bottom-1">{{'字數' + word.length + '/30'}}</div> -->
                        </div>
                    </div>
                    <div class="w-full py-1 md:py-3 px-3 flex flex-col items-start justify-start">
                        <div class="w-full text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">上傳相片</div>
                        <button
                            @click="cancel"
                            class="min-w-[20%] bg-white py-[1px] px-[2px] md:py-1 md:px-2 rounded-sm border-[1px] text-[#808080] border-[#808080]">
                            點擊選擇相片
                        </button>
                    </div>
                </template>
            </conversationView>
            <dialogView v-if="transmitStatus">
                <template v-slot:message>
                    <div class="w-full px-3 text-sm text-[#808080] md:text-2xl flex flex-col items-start justify-start">
                        <div class="my-1" v-if="data.work.notification.status">{{'通知單，請於' + data.work.notification.day + '前繳回'}}</div>
                        <div class="my-1" v-if="data.work.worksheet.status">{{'學習單，請於' + data.work.worksheet.day + '前繳回'}}</div>
                        <div class="my-1" v-if="data.work.receipt.status">{{'附上收據，找回' + data.work.receipt.money + '元'}}</div>
                        <div
                            v-if="data.work.things.suit || data.work.things.shoe || data.work.things.bedding || data.work.things.toiletry" 
                            class="w-full my-1 flex flex-wrap items-center justify-start" >
                            <div>清洗衣物:</div>
                            <div class="px-1" v-if="data.work.things.suit">衣褲</div>
                            <div class="px-1" v-if="data.work.things.shoe">室內鞋</div>
                            <div class="px-1" v-if="data.work.things.bedding">寢具</div>
                            <div class="px-1" v-if="data.work.things.toiletry">牙刷、牙杯</div>
                        </div>
                    </div>
                </template>
            </dialogView>
            <dialogView v-if="learnStatus">
                <template v-slot:message>
                    <div 
                        class="w-full px-3 text-[#808080] text-sm md:text-2xl flex flex-col items-start md:items-center justify-start">
                        <div>{{'身體狀況: ' + data.detail.body}}</div>
                        <div>{{'飲食狀況: ' + data.detail.food}}</div>
                        <div>{{'午睡狀況: ' + data.detail.sleep}}</div>
                        <div>{{'是否排便: ' + data.detail.defecate}}</div>
                        <div>{{'學習狀況: ' + data.detail.learn}}</div>
                        <div>{{'人際互動: ' + data.detail.communication}}</div>
                        <div>{{'情緒表現: ' + data.detail.mood}}</div>
                    </div>
                </template>
            </dialogView>
            <conversationView type="large" v-if="leaveStatus">
                <template v-slot:content>
                    <div class="w-full py-1 md:py-3 px-3 flex flex-col items-start justify-start">
                        <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">兒童姓名</div>
                        <div class="w-full py-1 md:py-3 flex flex-col items-start justify-start">
                            <el-input value="曾O樂" disabled placeholder="" />
                        </div>
                    </div>
                    
                    <div class="w-full py-1 md:py-3 px-3 md:px-3 flex flex-col items-start justify-start">
                        <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">起訖日期</div>
                        <div class="w-full flex flex-wrap items-center justify-start gap-x-[2px]">
                            <el-date-picker
                                v-model="inputLeave.startDate"
                                popper-class="custom-date-picker"
                                type="date"
                                placeholder="選擇查詢日期"
                                :disabled-date="inputLeave.disabledDate"
                                :disabled="apiLoading"
                                :editable="false"
                                :style="isMobile ? 'width: 110px;font-size: 12px;' : 'width: 40%;'"
                            />
                            <div>至</div>
                            <el-date-picker
                                v-model="inputLeave.endDate"
                                popper-class="custom-date-picker"
                                type="date"
                                placeholder="選擇查詢日期"
                                :disabled-date="inputLeave.disabledDate"
                                :disabled="apiLoading"
                                :editable="false"
                                :style="isMobile ? 'width: 110px;font-size: 12px;' : 'width: 40%;'"
                            />
                        </div>
                    </div>
                    
                    <div class="w-full py-1 md:py-3 px-3 flex flex-col items-start justify-start">
                        <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">類別</div>
                        <div class="px-[1px] flex flex-wrap items-center justify-center">
                            <el-select v-model="inputLeave.type" placeholder="Select">
                                <el-option
                                    v-for="item in inputLeave.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </div>
                    </div>
                    <div class="w-full py-1 md:py-3 px-3 flex flex-col items-start justify-start">
                        <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">備註</div>
                        <div class="relative w-full h-[50px] md:h-[80px] text-base md:text-2xl">
                            <textarea 
                                v-model="inputLeave.word"
                                placeholder="請在此輸入留言"
                                required
                                class="w-full h-full p-1 bg-gray-100 border-gray-300 border-[1px]"
                                style="resize:none;"
                                maxlength="30"
                                >
                            </textarea>
                            <!-- <div class="absolute right-3 bottom-1">{{'字數' + word.length + '/30'}}</div> -->
                        </div>
                    </div>
                </template>
                <template v-slot:control>
                    <div class="absolute w-full bottom-2 md:bottom-4 flex flex-wrap justify-center items-center">
                        <button
                            class="min-w-[20%] w-[90%] bg-[#483D8B] text-sm md:text-xl text-white py-1 px-2 rounded">
                            送出
                        </button>
                    </div>
                </template>
            </conversationView>
        </Teleport>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { useStore } from "vuex";
import { ref,computed,provide } from 'vue'
import { useRouter } from "vue-router";
import dialogView from "@/components/dialogView.vue"
import conversationView from "@/components/conversationView.vue"
import dateSelect from '@/components/dateSelect.vue'

const router = useRouter()
const store = useStore()

const roleID = computed(() => {
    return store.state.roleID
})

const isSchool = computed(() => {
    return (roleID.value == 2) || (roleID.value == 1)
})

const statement = computed(() => {
    if(roleID.value == 1){
        return '園長:施O漢'
    } else if(roleID.value == 2) {
        return '導師:羅O空'
    }
})

const data = ref(
    {
        name:'猴子四號',
        class:'猴子班',
        classNum:'21',
        isSign:false,
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
        },
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
                status:true,
                money:'124'
            },
            things:{
                suit:true,
                shoe:false,
                bedding:true,
                toiletry:false
            },
        },
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
)
const temperatureValue = ref('')
const temperatureOptions = ref([])

const apiLoading = ref(false)

const init = async() => {
    apiLoading.value = true
    let target = 34.0
    for(let i = 0;i<60;i++){
        target+=0.1
        //console.log('test',target.toFixed(1))
        temperatureOptions.value.push({
            value: target.toFixed(1),
            label: target.toFixed(1)
        })
    }
    apiLoading.value = false
}

init()

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

const toRoom = () => {
    router.push({ path: '/chatroom' })
}

const dialogStatus = ref(false)
const takeTemperature = () => {
    dialogStatus.value = true
}

const modalStatus = ref(false)
const openMedication = () => {
    modalStatus.value = true
}

const cancel = () => {
    dialogStatus.value = false
    modalStatus.value = false
    transmitStatus.value = false
    learnStatus.value = false
    leaveStatus.value = false
}

provide('cancel', cancel)

const inputMedication = ref({
    time:'17:20',
    word:'',
    moment:'1',
    startDate:new Date(),
    endDate:new Date(),
    disabledDate: function(time) {
        return (time.getTime() > Date.now()) || (time.getTime() < (Date.now() - 2592000000))
    },
})

const linkMedication = () => {
    if(isSchool.value){
        toMedication()
    }else{
        openMedication()
    }
}

const linkTemperature = () => {
    if(isSchool.value){
        toTemperature()
    }else{
        takeTemperature()
    }
}

const linkChat = () => {
    if(isSchool.value){
        toChat()
    }else{
        toRoom()
    }
}

const transmitStatus = ref(false)
const linkTransmit = () => {
    if(isSchool.value){
        toTransmit()
    }else{
        transmitStatus.value = true
    }
}

const learnStatus = ref(false) 
const linkLearn = () => {
    if(isSchool.value){
        toLearn()
    }else{
        learnStatus.value = true
    }
}

const inputLeave = ref({
    type:'Option3',
    options:[
        {
            value: 'Option1',
            label: '婚假',
        },
        {
            value: 'Option2',
            label: '喪假',
        },
        {
            value: 'Option3',
            label: '病假',
        },
        {
            value: 'Option4',
            label: '公傷病假',
        },
        {
            value: 'Option5',
            label: '事假',
        },
        {
            value: 'Option6',
            label: '公假',
        },
        {
            value: 'Option7',
            label: '生理假',
        },
        {
            value: 'Option8',
            label: '產假',
        },
        {
            value: 'Option9',
            label: '產檢假',
        },
        {
            value: 'Option10',
            label: '陪產檢及陪產假',
        },
        {
            value: 'Option11',
            label: '安胎假',
        },
        {
            value: 'Option12',
            label: '育嬰留職停薪',
        },
        {
            value: 'Option13',
            label: '家庭照顧假',
        },
    ],
    word:'',
    startDate:new Date(),
    endDate:new Date(),
    disabledDate: function(time) {
        return (time.getTime() > Date.now()) || (time.getTime() < (Date.now() - 2592000000))
    },
})
const leaveStatus = ref(false)
const askLeave = async() => {
    leaveStatus.value = true
}

const toRecord = () => {
    router.push({ path: '/recordView' })
}

</script>
