<template>
    <div class="w-auto h-auto md:h-auto p-2 flex flex-col justify-start items-center ">
        <dateSelect :apiLoading="apiLoading"
        :date="dayData" @changeDate="changeDate"></dateSelect>
        <div v-if="isSchool" class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>{{statement}}</div>
        </div>
        <div 
            class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>To:</div>
            <div class="px-2">{{className}}班</div>
        </div>
        <div v-if="!isSchool" class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>{{studentName}} {{studentNumber}}號</div>
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
            <conversationView type="large" v-if="dialogStatus">
                <template v-slot:content>
                    <div class="w-full py-1 md:py-3 px-3 flex flex-col items-start justify-start">
                        <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">測量體溫時間</div>
                        <el-time-select
                            class="w-[150px] md:w-[200px]"
                            v-model="temperatureData.bodyTemperatureTime"
                            :clearable="false"
                            start="00:10"
                            step="00:10"
                            end="23:50"
                            placeholder="Select time"
                        />
                    </div>
                    <div class="w-full py-1 md:py-3 px-3 flex flex-col items-start justify-start">
                        <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">測量體溫類型</div>
                        <el-select 
                            v-model="temperatureData.state"
                            placeholder="請選擇類型"
                            size="large"
                            class="w-[150px] md:w-[200px]">
                            <el-option
                              v-for="item in temperatureStateOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                        </el-select>
                    </div>
                    <div class="w-full py-1 md:py-3 px-3 flex flex-col items-start justify-start">
                        <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">體溫</div>
                        <input 
                            v-model="temperatureData.temperature"
                            required
                            type="number" >
                    </div>
                </template>
                <template v-slot:control>
                    <div class="absolute w-full bottom-2 md:bottom-4 flex flex-wrap justify-center items-center">
                        <button @click="setTemperature"
                            class="min-w-[20%] w-[90%] bg-[#483D8B] text-sm md:text-xl text-white py-1 px-2 rounded">
                            送出
                        </button>
                    </div>
                </template>
            </conversationView>
            <conversationView type="large" v-if="modalStatus">
                <template v-slot:content>
                    <div class="w-full py-1 md:py-3 px-3 md:px-3 flex flex-col items-start justify-start">
                        <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">起訖日期</div>
                        <div class="w-full flex flex-wrap items-center justify-start gap-x-[2px]">
                            <el-date-picker
                                v-model="medicationData.startDate"
                                popper-class="custom-date-picker"
                                type="date"
                                placeholder="選擇查詢日期"
                                :disabled="apiLoading"
                                :editable="false"
                                :style="isMobile ? 'width: 110px;font-size: 12px;' : 'width: 40%;'"
                            />
                            <div>至</div>
                            <el-date-picker
                                v-model="medicationData.endDate"
                                popper-class="custom-date-picker"
                                type="date"
                                placeholder="選擇查詢日期"
                                :disabled="apiLoading"
                                :editable="false"
                                :style="isMobile ? 'width: 110px;font-size: 12px;' : 'width: 40%;'"
                            />
                        </div>
                    </div>
                    <div class="w-full py-1 md:py-3 px-3 flex flex-col items-start justify-start">
                        <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">餵藥時間</div>
                        <el-time-select
                            class="w-[150px]"
                            v-model="medicationData.medicationTime"
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
                            <el-select 
                                v-model="medicationData.isAfterMeal"
                                placeholder="請選擇類型"
                                size="large"
                                class="w-[150px] md:w-[200px]">
                                <el-option
                                v-for="item in isAfterMealeOptions"
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
                                v-model="medicationData.remark"
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
                    <!-- <div class="w-full py-1 md:py-3 px-3 flex flex-col items-start justify-start">
                        <div class="w-full text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">上傳相片</div>
                        <input type="file" id="fileInput" @change="upload" accept="image/*" style="display: none">
                        <button
                            @click="triggerUpload"
                            class="min-w-[20%] bg-white py-[1px] px-[2px] md:py-1 md:px-2 rounded-sm border-[1px] text-[#808080] border-[#808080]">
                            上傳相片
                        </button>
                    </div> -->
                </template>
                <template v-slot:control>
                    <div class="absolute w-full bottom-2 md:bottom-4 flex flex-wrap justify-center items-center">
                        <input type="file" id="fileInput" @change="upload" accept="image/*" style="display: none">
                        <button @click="setMedication"
                            class="min-w-[20%] w-[40%] bg-[#483D8B] text-sm md:text-xl text-white py-1 px-2 rounded">
                            送出
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
                    <div class=" text-base md:text-2xl font-bold my-1 md:my-3 px-3">學習狀況</div>
                    <div 
                        class="w-full px-3 text-[#808080] text-sm md:text-2xl flex flex-col items-start md:items-center justify-start">
                        <div v-for="(item, index) in studentStateRecordData" :key="index">
                            {{item.value + ': ' + item.itemValue}}
                        </div>
                    </div>
                </template>
            </dialogView>
            <conversationView type="large" v-if="leaveStatus">
                <template v-slot:content>
                    <div class="w-full py-1 md:py-3 px-3 flex flex-col items-start justify-start">
                        <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">同學姓名</div>
                        <div class="w-full py-1 md:py-3 flex flex-col items-start justify-start">
                            <el-input v-model="studentName" disabled placeholder="" />
                        </div>
                    </div>
                    
                    <div class="w-full py-1 md:py-3 px-3 md:px-3 flex flex-col items-start justify-start">
                        <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">起訖日期</div>
                        <div class="w-full flex flex-wrap items-center justify-start gap-x-[2px]">
                            <el-date-picker
                                v-model="inputLeave.startDate"
                                popper-class="custom-date-picker"
                                type="date"
                                placeholder="選擇日期"
                                :disabled="apiLoading"
                                :editable="false"
                                :style="isMobile ? 'width: 110px;font-size: 12px;' : 'width: 40%;'"
                            />
                            <div>至</div>
                            <el-date-picker
                                v-model="inputLeave.endDate"
                                popper-class="custom-date-picker"
                                type="date"
                                placeholder="選擇日期"
                                :disabled="apiLoading"
                                :editable="false"
                                :style="isMobile ? 'width: 110px;font-size: 12px;' : 'width: 40%;'"
                            />
                        </div>
                    </div>
                    
                    <div class="w-full py-1 md:py-3 px-3 flex flex-col items-start justify-start">
                        <div class="text-[16px] md:text-2xl text-[#6E6EFF] font-semibold">類別</div>
                        <div class="px-[1px] flex flex-wrap items-center justify-center">
                            <el-select v-model="inputLeave.state" placeholder="Select">
                                <el-option
                                    v-for="item in leaveOptions"
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
                                v-model="inputLeave.remark"
                                placeholder="請在此輸入備註"
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
                        <button @click="setLeave"
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
import { createBodyTemperatureRecordRecord,
    editBodyTemperatureRecordRecord,
    getBodyTemperatureRecordByClassIdAndStudentId,
    createMedicationRemind,
    editMedicationRemind,
    getMedicationRemindByClassIdAndStudentId,
    getLeaveStateSelect,
    getLeaveByClassIdAndStudentId,
    editLeave,
    createLeave,
    getContactBookRecordByClassIdAndStudentId,
    getStudentStateRecordByContactBookRecordId,
    getFile } from '@/api/api'
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
    return (user.value.roleType == 3) || (user.value.roleType == 2)
})

const user = computed(() => {
    if (store.state.user && store.state.user.roleName != ''){
        return store.state.user
    }
    return JSON.parse(localStorage.getItem('user'))
})

const classId = computed(() => {
    return localStorage.getItem('classId')
})

const className = computed(() => {
    return localStorage.getItem('className')
})

const studentId = computed(() => {
    return localStorage.getItem('studentId')
})

const studentName = computed(() => {
    return localStorage.getItem('studentName')
})

const studentNumber = computed(() => {
    return localStorage.getItem('studentNumber')
})

const statement = computed(() => {
    return (user.value == null ? '' : user.value.roleName + '：' + user.value.name)
    // if(roleID.value == 1){
    //     return '園長:施O漢'
    // } else if(roleID.value == 2) {
    //     return '導師:羅O空'
    // }
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

const dayData = ref(new Date())
init()
const changeDate = (value) => {
    dayData.value = value
    init()
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

const toRoom = () => {
    router.push({ path: '/chatroom' })
}

const dialogStatus = ref(false)
const takeTemperature = () => {
    getTemperature()
}

const modalStatus = ref(false)
const openMedication = () => {
    getMedication()
}

const cancel = () => {
    dialogStatus.value = false
    modalStatus.value = false
    transmitStatus.value = false
    learnStatus.value = false
    leaveStatus.value = false
}

provide('cancel', cancel)

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
const linkLearn = async() => {
    if(isSchool.value){
        toLearn()
    }else{
        await getStudentState()
        learnStatus.value = true
    }
}

const inputLeave = ref({
})

const leaveOptions = ref([
        {
            value: '',
            label: '',
        }
    ])

const getLeaveOptions= async() => {
  await getLeaveStateSelect().then((res) => {
    if(res.data.status){
        leaveOptions.value = res.data.data.optionList
      }else{
        console.log(res.data.message)
      }
  }).catch((res) => {
    if (res && res.response && res.response.status == 401) {
        store.commit('clearToken')
        router.push({ path: '/' })
    }
    console.log(res)
  })
}

const getLeave = async() => {
    await getLeaveOptions()
    const formData = new FormData()
    formData.append("classId", classId.value)
    formData.append("studentId", studentId.value)
    formData.append("date", dayData.value.toDateString())
    await getLeaveByClassIdAndStudentId(formData).then((res) => {
        if(res.data.status){
            inputLeave.value = res.data.data
            leaveStatus.value = true
        }else{
            console.log(res.data.message)
        }
    }).catch((res) => {
        if (res && res.response && res.response.status == 401) {
            store.commit('clearToken')
            router.push({ path: '/' })
        }
        console.log(res)
    })
}

const setLeave = async() => {
    const formData = new FormData()
    for (var key in inputLeave.value) {
        if (inputLeave.value.hasOwnProperty(key)) {
            formData.append(key, inputLeave.value[key])
        }
    }
    if (inputLeave.value.id && inputLeave.value.id != '00000000-0000-0000-0000-000000000000') {
        await editLeave(formData).then((res) => {
            if(res.data.status){
                leaveStatus.value = false
            }else{
                console.log(res.data.message)
            }
        }).catch((res) => {
            if (res && res.response && res.response.status == 401) {
                store.commit('clearToken')
                router.push({ path: '/' })
            }
            console.log(res)
        })
    } else {
        formData.set('classId', classId.value)
        formData.set('studentId', studentId.value)
        await createLeave(formData).then((res) => {
            if(res.data.status){
                leaveStatus.value = false
            }else{
                console.log(res.data.message)
            }
        }).catch((res) => {
            if (res && res.response && res.response.status == 401) {
                store.commit('clearToken')
                router.push({ path: '/' })
            }
            console.log(res)
        })
    }
}

const leaveStatus = ref(false)
const askLeave = async() => {
    await getLeave()
}

const toRecord = () => {
    router.push({ path: '/recordView' })
}

const temperatureStateOptions = ref([
    {value: 0, label: '請選擇'},
    {value: 1, label: '額溫'},
    {value: 2, label: '腋溫'},
    {value: 3, label: '口溫'},
    {value: 4, label: '肛溫'},
    {value: 5, label: '耳溫'}
])

const temperatureData = ref({})
const getTemperature = async() => {
    const formData = new FormData()
    formData.append("classId", classId.value)
    formData.append("studentId", studentId.value)
    formData.append("date", dayData.value.toDateString())
    await getBodyTemperatureRecordByClassIdAndStudentId(formData).then((res) => {
        if(res.data.status){
            temperatureData.value = res.data.data
            dialogStatus.value = true
        }else{
            console.log(res.data.message)
        }
    }).catch((res) => {
        if (res && res.response && res.response.status == 401) {
            store.commit('clearToken')
            router.push({ path: '/' })
        }
        console.log(res)
    })
}

const setTemperature = async() => {
    var formData = new FormData();
    for (var key in temperatureData.value) {
        if (temperatureData.value.hasOwnProperty(key)) {
            formData.append(key, temperatureData.value[key])
        }
    } 
    formData.append("date", dayData.value.toDateString())
    if (temperatureData.value.contactBookRecordId && temperatureData.value.contactBookRecordId != '00000000-0000-0000-0000-000000000000') {
        await editBodyTemperatureRecordRecord(formData).then((res) => {
            if(res.data.status){
                dialogStatus.value = false
            }else{
                console.log(res.data.message)
            }
        }).catch((res) => {
            if (res && res.response && res.response.status == 401) {
                store.commit('clearToken')
                router.push({ path: '/' })
            }
            console.log(res)
        })
    } else {
        await createBodyTemperatureRecordRecord(formData).then((res) => {
            if(res.data.status){
                dialogStatus.value = false
            }else{
                console.log(res.data.message)
            }
        }).catch((res) => {
            if (res && res.response && res.response.status == 401) {
                store.commit('clearToken')
                router.push({ path: '/' })
            }
            console.log(res)
        })
    }
}

const isAfterMealeOptions = ref([
    {value: true, label: '飯後'},
    {value: false, label: '飯前'}
])


const medicationData = ref({})
const getMedication = async() => {
    const formData = new FormData()
    formData.append("classId", classId.value)
    formData.append("studentId", studentId.value)
    formData.append("date", dayData.value.toDateString())
    await getMedicationRemindByClassIdAndStudentId(formData).then((res) => {
        if(res.data.status){
            medicationData.value = res.data.data
            modalStatus.value = true
        }else{
            console.log(res.data.message)
        }
    }).catch((res) => {
        if (res && res.response && res.response.status == 401) {
            store.commit('clearToken')
            router.push({ path: '/' })
        }
        console.log(res)
    })
}

const setMedication = async() => {
    var formData = new FormData();
    for (var key in medicationData.value) {
        if (medicationData.value.hasOwnProperty(key)) {
            formData.append(key, medicationData.value[key])
        }
    } 
    if (medicationData.value.id && medicationData.value.id != '00000000-0000-0000-0000-000000000000') {
        await editMedicationRemind(formData).then((res) => {
            if(res.data.status){
                modalStatus.value = false
            }else{
                console.log(res.data.message)
            }
        }).catch((res) => {
            if (res && res.response && res.response.status == 401) {
                store.commit('clearToken')
                router.push({ path: '/' })
            }
            console.log(res)
        })
    } else {
        formData.set('classId', classId.value)
        formData.set('studentId', studentId.value)
        await createMedicationRemind(formData).then((res) => {
            if(res.data.status){
                modalStatus.value = false
            }else{
                console.log(res.data.message)
            }
        }).catch((res) => {
            if (res && res.response && res.response.status == 401) {
                store.commit('clearToken')
                router.push({ path: '/' })
            }
            console.log(res)
        })
    }
}

const contactBookRecordData = ref([{}])
const studentStateRecordData = ref([{}])

const getStudentState = async() => {
    const formData = new FormData()
    formData.append("classId", classId.value)
    formData.append("studentId", studentId.value)
    formData.append("date", dayData.value.toDateString())

    await getContactBookRecordByClassIdAndStudentId(formData).then((res) => {
    if(res.data.status){
        contactBookRecordData.value = res.data.data
        getStudentStateRecordList()
    }else{
        console.log(res.data.message)
    }
    }).catch((res) => {
    if (res && res.response && res.response.status == 401) {
        store.commit('clearToken')
        router.push({ path: '/' })
    }
    console.log(res)
    })
}

const getStudentStateRecordList = async() => {
    let dataList = []
    const formData = new FormData()
    formData.append("contactBookRecordId", contactBookRecordData.value.id)
    await getStudentStateRecordByContactBookRecordId(formData).then((res) => {
        if(res.data.status){
            let studentStateRecordList = res.data.data
            let studentStateGroupList = []
            for (let index in studentStateRecordList) {
                let isHave = false
                for (let groupIndex in studentStateGroupList) {
                    if (studentStateGroupList[groupIndex].id == studentStateRecordList[index].studentStateGroupId) {
                        isHave = true
                    }
                }
                if (!isHave) {
                    let studentStateGroup = {
                        id: studentStateRecordList[index].studentStateGroupId,
                        key: studentStateRecordList[index].studentStateGroupKey,
                        value: studentStateRecordList[index].studentStateGroupValue
                    }
                    studentStateGroupList.push(studentStateGroup)
                }
            }
            let studentStateGroupList1 = []
            for (let groupIndex in studentStateGroupList) {
                let itemValue = ''
                for (let index in studentStateRecordList) {
                    if ((studentStateGroupList[groupIndex].id == studentStateRecordList[index].studentStateGroupId) &&
                        (studentStateRecordList[index].isCheck)) {
                        itemValue = itemValue + studentStateRecordList[index].studentStateItemValue + '、'
                    }
                }
                itemValue = itemValue.substring(0, itemValue.length - 1)
                let studentStateGroup = {
                    id: studentStateGroupList[groupIndex].id,
                    key: studentStateGroupList[groupIndex].key,
                    value: studentStateGroupList[groupIndex].value,
                    itemValue: itemValue
                }
                studentStateGroupList1.push(studentStateGroup)
            }
            studentStateRecordData.value = studentStateGroupList1
            console.log('getStudentStateRecordList', studentStateRecordData)
        }else{
            console.log(res.data.message)
        }
    }).catch((res) => {
        if (res && res.response && res.response.status == 401) {
            store.commit('clearToken')
            router.push({ path: '/' })
        }
        console.log(res)
    })
}


const triggerUpload = async() => {
    fileInput.click();
}

const upload = async(event) => {
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append("file", file)
    formData.append("type", "medicationRemind")
    console.log(file)
    await uploadFile(formData).then((res) => {
        if(res.data.status){
            medicationData.value.photo = res.data.data
        }else{
            console.log(res.data.message)
        }
    }).catch((res) => {
        if (res && res.response && res.response.status == 401) {
            store.commit('clearToken')
            router.push({ path: '/' })
        }
        console.log(res)
    })
}
</script>
