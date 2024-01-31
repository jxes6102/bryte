<template>
    <div class="w-auto h-auto md:h-[80%] p-2 flex flex-col justify-start items-center ">
        <dateSelect :apiLoading="apiLoading" 
        :date="dayData" @changeDate="changeDate"></dateSelect>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>To:</div>
            <div class="px-2">{{className}}班</div>
            <div class="px-1 text-[#F08080]">{{feverCount}}位發燒</div>
        </div>
        <div 
            v-for="(item,index) in list" :key="index"
            @click="detail(item)"
            class="w-[95%] md:w-[40%] h-[auto] text-sm md:text-lg rounded-lg bg-slate-50 my-1 px-1 py-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-end">
            <div class="w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-indigo-500 rounded-full "></div>
            <div class="w-auto px-2 h-full grow flex flex-col items-start justify-center">
                <div class="w-auto flex flex-wrap items-start justify-center">
                    <div class="px-1">{{item.bodyTemperatureTime.substr(0, 5)}}</div>
                    <div class="px-1">{{item.studentUserName}}</div>
                    <div class="px-1">{{item.studentNunber + '號'}}</div>
                </div>
                <div 
                    v-if="item.state != 0"
                    class="w-auto flex flex-wrap items-center justify-start">
                    <div v-if="item.isParent" class="w-full flex flex-wrap items-center justify-start gap-x-[2px]">
                        <div v-if="item.isFever" class="w-[auto] bg-[#DC3545] text-sm md:text-xl text-white py-[1px] px-[2px] rounded">
                            發燒
                        </div>
                        <div v-else class="w-[auto] bg-[#0D6EFD] text-sm md:text-xl text-white py-[1px] px-[2px] rounded">
                            正常
                        </div>
                        <div class="">{{item.stateName}}</div>
                        <div class="">{{item.temperature + '°C'}}</div>
                    </div>
                    <div v-else class="w-full flex flex-wrap items-center justify-start gap-x-[2px]">                        
                        <div v-if="item.isFever" class="w-[auto] bg-[#DC3545] text-sm md:text-xl text-white py-[1px] px-[2px] rounded">
                            發燒
                        </div>
                        <div v-else class="w-[auto] bg-[#0D6EFD] text-sm md:text-xl text-white py-[1px] px-[2px] rounded">
                            正常
                        </div>
                        <div class="">{{item.stateName}}</div>
                        <div class="">{{item.temperature + '°C'}}</div>
                    </div>
                    <div v-if="item.isParent" class="w-full flex flex-wrap items-center justify-start gap-x-[2px]">
                        <div class="">{{item.parentName + ' ' + item.parentTitle + ' 測量'}}</div>
                    </div>
                    <div v-else class="w-full flex flex-wrap items-center justify-start gap-x-[2px]">
                        <div class="">{{item.teacherUserName + ' ' + item.teacherRoleName + ' 測量'}}</div>
                    </div>
                </div>
                <div 
                    v-else
                    class="w-auto flex flex-wrap items-center justify-center">
                    <div class="w-[auto] bg-[#999999] text-sm md:text-xl text-white py-[1px] px-[2px] rounded">
                        尚未測量
                    </div>
                </div>
            </div>
        </div>
        <Teleport to="body">
            <conversationView v-if="modalStatus">
                <template v-slot:header>
                    <div class="w-full py-1 px-2 md:py-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-center">
                        <div class="w-[40px] h-[40px] md:w-[70px] md:h-[70px] bg-indigo-500 rounded-full "></div>
                        <div class="w-auto px-2 grow flex flex-col items-start justify-center">
                            <div class="text-black">{{modifyData.studentUserName}}</div>
                            <div>{{modifyData.className + ' ' + modifyData.studentNunber + '號'}}</div>
                        </div>
                    </div>
                </template>
                <template v-slot:content>
                    <div class="line-style w-full text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-center">
                        測量體溫
                    </div>
                    <div class="relative w-full h-auto px-2 text-sm md:text-lg">
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <div>測量體溫時間</div>
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <input 
                            v-model="modifyData.bodyTemperatureTime"
                            required
                            style="width:100%;"
                            type="time" >
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <div>測量體溫類型</div>
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <el-select 
                            v-model="modifyData.state"
                            placeholder="請選擇類型"
                            size="large"
                            style="width:100%;">
                            <el-option
                              v-for="item in stateOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                        </el-select>
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <div>體溫</div>
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <input 
                            v-model="modifyData.temperature"
                            required
                            style="width:100%;"
                            type="number" >
                    </div>
                </template>
                <template v-slot:control>
                    <div class="absolute w-full bottom-1 md:bottom-2 flex flex-wrap justify-start items-center">
                        <button
                            @click="edit"
                            class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            完成
                        </button>
                        <button
                            @click="cancel"
                            class="min-w-[20%] bg-blue-500 hover:bg-[#999999] text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            取消
                        </button>
                    </div>
                </template>
            </conversationView>
        </Teleport>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { getBodyTemperatureRecordListByClass, editBodyTemperatureRecordRecord } from '@/api/api'
import { useStore } from "vuex";
import { ref,computed,watch,provide } from "vue";
import { useRouter } from "vue-router";
import conversationView from "@/components/conversationView.vue"
import dateSelect from '@/components/dateSelect.vue'

const router = useRouter()
const store = useStore()

const roleID = computed(() => {
    return store.state.roleID
})
const classId = computed(() => {
    return localStorage.getItem('classId')
})

const className = computed(() => {
    return localStorage.getItem('className')
})

const stateOptions = ref([
    {value: 0, label: '請選擇'},
    {value: 1, label: '額溫'},
    {value: 2, label: '腋溫'},
    {value: 3, label: '口溫'},
    {value: 4, label: '肛溫'},
    {value: 5, label: '耳溫'}
])

const list = ref([
    {
        isFever: false,
        bodyTemperatureTime:'00:00:00',
    }
])

const feverCount = computed(() => {
    let count = 0
    for (let key in list.value) {
        if (list.value[key].isFever) {
            count++
        }
    }
    return count
})

const apiLoading = ref(false)

const getList = async() => {
  const formData = new FormData()
  formData.append("classId", classId.value)
  formData.append("date", dayData.value.toDateString())

  await getBodyTemperatureRecordListByClass(formData).then((res) => {
    if(res.data.status){
        list.value = res.data.data
      }else{
        console.log(res.data.message)
      }
  }).catch((res) => {
    if (res.response.status == 401) {
        store.commit('clearToken')
        router.push({ path: '/' })
    }
    console.log(res)
  })
}

const init = async() => {
    apiLoading.value = true
    await getList()
    apiLoading.value = false
}

const dayData = ref(new Date())
init()
const changeDate = (value) => {
    dayData.value = value
    init()
}

const modifyData = ref({})
const modalStatus = ref(false)
const detail = (item) => {
    modifyData.value = JSON.parse(JSON.stringify(item))
    modalStatus.value = true
}

const cancel = () => {
    modalStatus.value = false
}
provide('cancel', cancel)

const isMobile = computed(() => {
    return store.state.isMobile
})

const edit = async() => {
    var formData = new FormData();
    for (var key in modifyData.value) {
        if (modifyData.value.hasOwnProperty(key)) {
            formData.append(key, modifyData.value[key])
        }
    }    
    await editBodyTemperatureRecordRecord(formData).then((res) => {
        if(res.data.status){
            modalStatus.value = false
            getList()
        }else{
            console.log(res.data.message)
        }
    }).catch((res) => {
        if (res.response.status == 401) {
            store.commit('clearToken')
            router.push({ path: '/' })
        }
        console.log(res)
    })
}
</script>

<style>

</style>