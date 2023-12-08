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
                @click="openMedication"
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
                @click="takeTemperature"
                class="absolute right-[5px] bottom-[calc(50%_-_8px)] md:right-[15px] md:bottom-[calc(50%_-_15px)] text-[14px] md:text-xl text-[#4169E1] flex flex-wrap items-center justify-center cursor-pointer">
                <el-icon :size="isMobile ? 15 : 30"><Plus /></el-icon>
                <div>量體溫</div>
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
            <div
                v-if="isSchool" 
                class="w-full py-1 md:py-3 px-3 text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div class="">共8名學生，2名已填寫</div>
            </div>
            <div
                v-else 
                class="w-full px-3">
                <div class="w-full text-left text-[#808080] text-[14px] md:text-xl flex flex-wrap items-center justify-start">
                    <div>共8則留言，2則留言未讀</div>
                </div>
                <button
                    @click="toRoom"
                    class="min-w-[10%] text-[#4169E1] mx-2 py-1 px-2 md:py-2 md:px-3 text-[14px] md:text-xl font-semibold rounded">
                    家長給導師
                </button>
            </div>
            <div
                v-if="isSchool"
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
            <div v-if="isSchool" class="w-full py-1 md:py-3 px-3 text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div class="">共8則留言，2則留言未讀</div>
            </div>
            <div v-else class="w-full px-3 text-xs text-[#808080] md:text-lg flex flex-col items-start justify-start">
                <div v-if="data.work.notification.status">{{'通知單，請於' + data.work.notification.day + '前繳回'}}</div>
                <div v-if="data.work.worksheet.status">{{'學習單，請於' + data.work.worksheet.day + '前繳回'}}</div>
                <div v-if="data.work.receipt.status">{{'附上收據，找回' + data.work.receipt.money + '元'}}</div>
                <div
                    v-if="data.work.things.suit || data.work.things.shoe || data.work.things.bedding || data.work.things.toiletry" 
                    class="w-full flex flex-wrap items-center justify-start" >
                    <div>清洗衣物:</div>
                    <div class="px-1" v-if="data.work.things.suit">衣褲</div>
                    <div class="px-1" v-if="data.work.things.shoe">室內鞋</div>
                    <div class="px-1" v-if="data.work.things.bedding">寢具</div>
                    <div class="px-1" v-if="data.work.things.toiletry">牙刷、牙杯</div>
                </div>
            </div>
            <div 
                v-if="isSchool"
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
            <div 
                v-if="isSchool"
                class="w-full py-1 md:py-3 px-3 text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start">
                <div class="">共8名學生，2名已填寫</div>
            </div>
            <div 
                v-else
                class="w-full px-3 text-[#808080] text-xs md:text-lg flex flex-col items-start justify-start">
                <div>{{'身體狀況: ' + data.detail.body}}</div>
                <div>{{'飲食狀況: ' + data.detail.food}}</div>
                <div>{{'午睡狀況: ' + data.detail.sleep}}</div>
                <div>{{'是否排便: ' + data.detail.defecate}}</div>
                <div>{{'學習狀況: ' + data.detail.learn}}</div>
                <div>{{'人際互動: ' + data.detail.communication}}</div>
                <div>{{'情緒表現: ' + data.detail.mood}}</div>
            </div>
            <div
                v-if="isSchool"
                @click="toLearn"
                class="absolute right-[5px] bottom-[calc(50%_-_8px)] md:right-[15px] md:bottom-[calc(50%_-_15px)] text-[14px] md:text-xl text-[#808080] flex flex-wrap items-center justify-start cursor-pointer">
                <div>查看</div>
                <el-icon :size="isMobile ? 15 : 30"><ArrowRightBold /></el-icon>
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
const dayData = ref(new Date())
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

</script>

<style>

</style>