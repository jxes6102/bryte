<template>
    <div 
        class="w-auto h-auto p-2 flex flex-col justify-start items-center"
    >
        <dateSelect :apiLoading="apiLoading" :date="dayData" @changeDate="changeDate"></dateSelect>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div class="px-2">To:</div>
            <div class="px-2">{{className}}班</div>
        </div>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div class="px-2">已完成{{isEatList.length}}筆/待處理{{notEatList.length}}筆</div>
        </div>
        <div class="w-[100%] py-2 text-sm md:text-lg text-[#808080] flex flex-col items-center justify-center">
            <div class="line-style w-[100%] text-[#D3D3D3] text-base md:text-xl flex">待處理</div>
            <div
                @click="detail(item)"
                v-for="(item, index) in notEatList" :key="index" 
                class="w-[95%] md:w-[40%] h-[auto] rounded-lg bg-slate-50 px-1 py-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-start">
                <div class="w-full py-1 flex flex-wrap items-center justify-start">
                    <div class="px-1">{{item.medicationTime.substr(0, 5)}}</div>
                    <div class="px-1">{{item.studentUserName}}</div>
                    <div class="px-1">{{item.studentNunber}}號</div>
                    <div class="w-[auto] bg-[#4169E1] text-sm md:text-xl text-white py-[1px] px-[2px] rounded">
                        {{item.isAfterMeal ? '飯後' : '飯前'}}
                    </div>
                </div>
                <div class="w-full pl-[20px] pr-1 py-1 flex flex-wrap items-center justify-start">
                    {{item.medicationRemindRemark}}
                </div>
            </div>
        </div>
        <div class="w-[100%] py-2 text-sm md:text-lg text-[#808080] flex flex-col items-center justify-center">
            <div class="line-style w-[100%] flex text-[#D3D3D3]">已完成</div>
            <div
                v-for="(item, index) in isEatList" :key="index" 
                class="w-[95%] md:w-[40%] h-[auto] rounded-lg bg-slate-50 px-1 py-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-start">
                <div class="w-full py-1 flex flex-wrap items-center justify-start">
                    <div class="px-1">{{item.medicationTime.substr(0, 5)}}</div>
                    <div class="px-1">{{item.studentUserName}}</div>
                    <div class="w-[auto] bg-[#4169E1] text-sm md:text-xl text-white py-[1px] px-[2px] rounded">
                        {{item.isAfterMeal ? '飯後' : '飯前'}}
                    </div>
                </div>
                <div class="w-full pl-[20px] pr-1 py-1 flex flex-wrap items-center justify-start">
                    {{item.medicationRemindRemark}}
                </div>
                <div class="w-full pl-[20px] pr-1 py-1 flex flex-wrap items-center justify-between">
                    <div>{{item.reply}}</div>
                    <div>{{item.teacherUserName}} {{item.teacherRoleName}}</div>
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
                        <div class="w-auto flex flex-col items-center justify-center">
                            待處理
                        </div>
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <div class="px-1 text-black">{{modifyData.medicationTime.substr(0, 5)}}</div>
                        <div class="w-[auto] bg-[#4169E1] text-sm md:text-xl text-white py-[1px] px-[2px] rounded">
                            {{modifyData.isAfterMeal ? '飯後' : '飯前'}}
                        </div>
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <div class="px-1">{{modifyData.medicationRemindRemark}}</div>
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
                        <div>餵藥狀態:</div>
                        <el-select 
                            v-model="modifyData.state"
                            placeholder="請選擇狀態"
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
                </template>
                <template v-slot:control>
                    <div class="absolute w-full bottom-1 md:bottom-2 flex flex-wrap justify-start items-center">
                        <input type="file" id="fileInput" @change="upload" accept="image/*" style="display: none">
                        <button
                            @click="triggerUpload"
                            class="min-w-[20%] bg-white  mx-2 py-[1px] px-[2px] md:py-1 md:px-2 rounded-sm border-[1px] text-[#808080] border-[#808080]">
                            點擊選擇相片
                        </button>
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
import { getMedicationRemindRecordListByClass, editMedicationRemindRecord, uploadFile } from '@/api/api'
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

const classId = computed(() => {
    return localStorage.getItem('classId')
})

const className = computed(() => {
    return localStorage.getItem('className')
})

const stateOptions = ref([
    {value: 0, label: '尚未餵藥'},
    {value: 1, label: '已餵藥'}
])

const apiLoading = ref(false)
const list = ref([
    {
        contactBookRecordId:'',
        medicationRemindId:'',
        state:0,
        reply:'',
        photo:'',
        medicationTime:'00:00:00',
        studentUserName:'',
        isAfterMeal:true,
        medicationRemindRemark:'',
        medicationRemindPhoto:'',
        className:'',
        studentNunber:0
    },
])

const fontData = ref([
    '已完成',
    '帶錯藥',
    '已服用'
])

const modifyData = ref({})

const notEatList = computed(() => {
    return list.value.filter((item)=>!(item.state == 1))
})

const isEatList = computed(() => {
    return list.value.filter((item)=>item.state == 1)
})

const getList = async() => {
  const formData = new FormData()
  formData.append("classId", classId.value)
  formData.append("date", dayData.value.toDateString())

  await getMedicationRemindRecordListByClass(formData).then((res) => {
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
    // if(apiLoading.value) return false

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

const modalStatus = ref(false)
const detail = (item) => {
    modifyData.value = JSON.parse(JSON.stringify(item))
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
const triggerUpload = async() => {
    fileInput.click();
}
const upload = async(event) => {
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append("file", file)
    formData.append("type", "medicationRemindRecord")
    console.log(file)
    await uploadFile(formData).then((res) => {
        if(res.data.status){
            modifyData.value.photo = res.data.data
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
const edit = async() => {
    var formData = new FormData();
    for (var key in modifyData.value) {
        if (modifyData.value.hasOwnProperty(key)) {
            formData.append(key, modifyData.value[key])
        }
    }    
    await editMedicationRemindRecord(formData).then((res) => {
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