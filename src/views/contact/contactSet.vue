<template>
    <div class="w-full h-auto text-sm md:text-xl flex flex-col items-center justify-center">
        <template v-if="roleID == 1">
            <div class="w-full md:w-[60%] h-auto rounded-lg bg-slate-50 py-1 px-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between">
                <div>開放校內所有教師查詢聯絡簿</div>
                <el-switch :size="isMobile ? 'default' : 'large'" v-model="statusList.canTeacherContact" />
            </div>
            <div class="w-full md:w-[60%] h-auto rounded-lg bg-slate-50 py-1 px-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between">
                <div>開放各班級使用電子聯絡簿</div>
                <div 
                    @click="choseCanClassContact"
                    :class="statusList.canClassContact.status ? 'rotate90deg' : ''"
                    class="transition-all duration-500 pr-[10px]"
                    >
                    <el-icon size="20"><ArrowRightBold /></el-icon>
                </div>
    
                <Transition
                    appear
                    mode="out-in"
                    enter-active-class="toOpen"
                    leave-active-class="toClose"
                    >
                    <div 
                        v-if="statusList.canClassContact.status"
                        class="w-full flex flex-wrap items-center justify-center">
                        <div
                            v-for="(item, index) in statusList.canClassContact.grade" :key="index"
                            class="w-[100%] text-left flex flex-wrap items-center justify-center">
                            <div class="w-full pl-[5%] pr-[10px] py-[2px] bg-[#969fe4] flex flex-wrap items-center justify-between">
                                <div class="text-white">{{ item.name }}</div>
                                <div class="flex flex-wrap items-center justify-center" >
                                    <button
                                        @click="choseAll(item)"
                                        class="w-[auto] bg-gray-100 text-sm md:text-xl text-black py-[1px] px-[2px] rounded">
                                        全選
                                    </button>
                                </div>
                            </div>
    
                            <div 
                                v-for="(thing, key) in item.class" :key="key"
                                class="w-full pl-[10%] pr-[10px] flex flex-wrap items-center justify-between ">
                                <div>{{ thing.name }}</div>
                                <div class="flex flex-wrap items-center justify-center" >
                                    <input class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" v-model="thing.status" />
                                    <label >{{thing.status ? '開啟' : '關閉'}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
                
            </div>
    
            <div class="w-full md:w-[60%] h-auto rounded-lg bg-slate-50 py-1 px-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between">
                <div>開放各年級使用餵藥系統</div>
                <div 
                    @click="choseCanGradeMedication"
                    :class="statusList.canGradeMedication.status ? 'rotate90deg' : ''"
                    class="transition-all duration-500 pr-[10px]"
                    >
                    <el-icon size="20"><ArrowRightBold /></el-icon>
                </div>
    
                <Transition
                    appear
                    mode="out-in"
                    enter-active-class="toOpen"
                    leave-active-class="toClose"
                    >
                    <div 
                        v-if="statusList.canGradeMedication.status"
                        class="w-full flex flex-wrap items-center justify-center">
                        <div
                            v-for="(item, index) in statusList.canGradeMedication.grade" :key="index"
                            class="w-[100%] text-left flex flex-wrap items-center justify-center">
                            <div class="w-full pl-[5%] pr-[10px] py-[2px] flex flex-wrap items-center justify-between">
                                <div class="">{{ item.name }}</div>
                                <div class="flex flex-wrap items-center justify-center" >
                                    <input class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" v-model="item.status" />
                                    <label >{{item.status ? '開啟' : '關閉'}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>

            </div>
            <div class="w-full md:w-[60%] h-auto rounded-lg bg-slate-50 py-1 px-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between">
                <div>開放導師自行啟用家長簽名</div>
                <el-switch :size="isMobile ? 'default' : 'large'" v-model="statusList.canParentSign" />
            </div>
            <div class="w-full md:w-[60%] h-auto rounded-lg bg-slate-50 py-1 px-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between">
                <div>開放導師自行啟用家長留言</div>
                <el-switch :size="isMobile ? 'default' : 'large'" v-model="statusList.canParentMessage" />
            </div>
            <div class="w-full md:w-[60%] h-auto rounded-lg bg-slate-50 py-1 px-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between">
                <div>開放導師自行啟用定時推撥提醒家長</div>
                <el-switch :size="isMobile ? 'default' : 'large'" v-model="statusList.canBroadcast" />
            </div>
            <div class="w-full md:w-[60%] h-auto rounded-lg bg-slate-50 py-1 px-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between">
                <div>使用學校自訂義餵藥時間</div>
                <el-switch :size="isMobile ? 'default' : 'large'" v-model="statusList.useMedicationTime" />
            </div>
            <div class="w-full md:w-[60%] h-auto rounded-lg bg-slate-50 py-1 px-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between">
                <div>自訂義餵藥時間列表</div>
                <el-switch :size="isMobile ? 'default' : 'large'" v-model="statusList.coustomMedicationTime" />
            </div>
        </template>
        <template v-else-if="roleID == 2">
            <div class="w-full md:w-[60%] h-auto rounded-lg bg-slate-50 py-1 px-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between">
                <div>啟用聯絡簿家長簽名</div>
                <el-switch :size="isMobile ? 'default' : 'large'" v-model="statusList.parentSign" />
            </div>
            <div class="w-full md:w-[60%] h-auto rounded-lg bg-slate-50 py-1 px-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between">
                <div>啟用聯絡簿留言版</div>
                <el-switch :size="isMobile ? 'default' : 'large'" v-model="statusList.parentNote" />
            </div>
            <div class="w-full md:w-[60%] h-auto rounded-lg bg-slate-50 py-1 px-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between">
                <div>啟用定時推播提醒家長</div>
                <div class="w-full flex flex-wrap items-center justify-end">
                    <el-time-select
                        class="w-[100px] md:w-[200px] mx-2"
                        v-model="statusList.parentWarn.time"
                        :disabled="!statusList.parentWarn.status"
                        :clearable="false"
                        :size="isMobile ? 'small' : 'default'" 
                        start="00:10"
                        step="00:10"
                        end="23:50"
                        placeholder="Select time"
                    />
                    <el-switch :size="isMobile ? 'default' : 'large'" v-model="statusList.parentWarn.status" />
                </div>
            </div>
        </template>
        
    </div>
</template>
  
<script setup>
/*eslint-disable*/
import { useStore } from "vuex";

import {ref,computed } from 'vue'
import { useRouter } from "vue-router";
import 'animate.css';

const store = useStore()
const router = useRouter()

const isMobile = computed(() => {
    return store.state.isMobile
})

const roleID = computed(() => {
    return store.state.roleID
})

const statusList = ref({})

const init = () => {
    // console.log(roleID.value)
    if(roleID.value == 1){
        statusList.value = {
            canTeacherContact:false,
            canClassContact:{
                status:false,
                grade:[
                    {
                        name:'幼兒園',
                        status:true,
                        class:[
                            {name:'天鵝班',status:false},
                            {name:'鬥雞班',status:false},
                            {name:'小鴨班',status:false},
                            {name:'鴿子班',status:false},
                        ]
                    },
                    {
                        name:'幼稚園',
                        status:true,
                        class:[
                            {name:'放牛班',status:false},
                            {name:'猴子班',status:false},
                        ]
                    }
                ]
            },
            canGradeMedication:{
                status:false,
                grade:[
                    {
                        name:'幼兒園',
                        status:true,
                    },
                    {
                        name:'幼稚園',
                        status:true,
                    }
                ]
            },
            canParentSign:false,
            canParentMessage:false,
            canBroadcast:false,
            useMedicationTime:false,
            coustomMedicationTime:false
        }
    }else if(roleID.value == 2){
        statusList.value = {
            parentSign:false,
            parentNote:false,
            parentWarn:{
                status:false,
                time:'17:10'
            },
        }
    }
}
init()

const choseCanClassContact = () => {
    statusList.value.canClassContact.status = !statusList.value.canClassContact.status
}

const choseAll = async (obj) => {
    for(let item of obj.class){
        item.status = true
    }
}

const choseCanGradeMedication = () => {
    statusList.value.canGradeMedication.status = !statusList.value.canGradeMedication.status
}

</script>

<style scoped>
.rotate90deg {
    transform: rotate(90deg);
}

.toOpen {
    animation: move-show 0.7s ease-in; 
}

@keyframes move-show {
    from {
        max-height: 0px;
    }
    to {
        /*需大於該元素長度*/
        max-height: 999px;
    }
}

.toClose {
    animation: move-hide 0.7s ease-out;
}
    
@keyframes move-hide {
    from {
        /*需大於該元素長度*/
        max-height: 999px;
    }
    to {
        max-height: 0px;
    }
}
</style>