<template>
    <div 
        class="w-auto h-auto p-2 flex flex-col justify-start items-center"
    >
        <dateSelect :apiLoading="apiLoading" 
        :date="dayData" @changeDate="changeDate"></dateSelect>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div class="px-2">To:</div>
            <div class="px-2">{{className}}班</div>
        </div>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-end">
            <button
                @click="removeAll"
                class="w-[auto] text-sm md:text-xl text-[#FF4500] mx-[2px] py-[1px] px-[2px] border-[#FF4500] border-[1px] rounded">
                全部清除
            </button>
            <button
                @click="writeAll"
                class="w-[auto] text-sm md:text-xl text-[#1E90FF] mx-[2px] py-[1px] px-[2px] border-[#1E90FF] border-[1px] rounded">
                全部填寫
            </button>
        </div>
        <div 
            v-for="(item, index) in list" :key="index"
            :class="(index % 2 == 0) ? 'bg-slate-50' : 'bg-slate-200'"
            class="w-[95%] md:w-[40%] h-[auto] text-sm md:text-lg text-[#808080] rounded-lg px-1 py-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-end">
            <div class="w-full flex flex-wrap items-center justify-center">
                <div class="w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-indigo-500 rounded-full "></div>
                <div class="w-auto px-2 grow flex flex-col items-start justify-center">
                    <div class="w-auto flex flex-wrap items-start justify-center">
                        <div class="px-1">{{item.studentUserName}}</div>
                        <div class="px-1">{{item.studentNumber + '號'}}</div>
                    </div>
                </div>
                <div
                    class="w-auto flex flex-row items-start justify-center">
                    <button
                        v-if="item.isFill"
                        @click="remove(item)"
                        class="w-[auto] text-sm md:text-xl text-[#FF4500] mx-[2px] py-[1px] px-[2px] border-[#FF4500] border-[1px] rounded">
                        清除
                    </button>
                    <button
                        @click="write(item)"
                        class="w-[auto] text-sm md:text-xl text-[#1E90FF] mx-[2px] py-[1px] px-[2px] border-[#1E90FF] border-[1px] rounded">
                        填寫
                    </button>
                </div>
                <div v-if="item.isFill" class="line-style w-full py-2 flex flex-wrap items-center justify-center"></div>
                <div v-if="item.isFill" class="w-full px-1 text-xs md:text-lg flex flex-col items-start justify-start">
                    <div v-for="(group, groupIndex) in item.studentStateGroupList" :key="groupIndex">
                        {{group.value + ': ' + group.itemValue}}
                    </div>
                </div>
            </div>
        </div>
        <Teleport to="body">
            <dialogView type="large" v-if="modalAllStatus">
                <template v-slot:message>
                    <div class="w-full h-full py-1 px-2 md:py-2 md:px-4 text-xs md:text-xl  flex flex-col items-center justify-center">
                        <div class=" text-base md:text-2xl font-bold my-1 md:my-3 px-3">全班學習狀況</div>
                        <div class="w-full my-[2px] md:my-2 flex flex-wrap items-center justify-between"
                            v-for="(group, groupIndex) in inputAllData.studentStateGroupList" :key="groupIndex">
                            <div class="flex flex-wrap items-center justify-center" >
                                <label class="px-[2px]">{{group.value}}</label>
                                <template 
                                    v-for="(item, index) in inputAllData.studentStateRecordList" :key="index">
                                    <div class="px-[1px] flex flex-wrap items-center justify-center"
                                        v-if="item.studentStateGroupId == group.id">
                                        <input class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" 
                                            v-model="item.isCheck"/>
                                        <label>{{item.studentStateItemValue}}</label>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:control>
                    <div class="absolute w-full bottom-0 md:bottom-1 text-sm md:text-xl flex flex-wrap justify-end items-center">
                        <button
                            @click="sendAll"
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
        <Teleport to="body">
            <dialogView type="large" v-if="modalStatus">
                <template v-slot:header>
                    <div class="w-full py-1 px-2 md:py-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-center">
                        <div class="w-[40px] h-[40px] md:w-[70px] md:h-[70px] bg-indigo-500 rounded-full "></div>
                        <div class="w-auto px-2 grow flex flex-col items-start justify-center">
                            <div class="text-black">{{inputData.studentUserName}}</div>
                            <div>{{inputData.className + ' ' + inputData.studentNumber + '號'}}</div>
                        </div>
                    </div>
                </template>
                <template v-slot:message>
                    <div class="w-full h-full py-1 px-2 md:py-2 md:px-4 text-xs md:text-xl  flex flex-col items-center justify-center">
                        <div class=" text-base md:text-2xl font-bold my-1 md:my-3 px-3">{{inputData.studentUserName}}的學習狀況</div>
                        <div class="w-full my-[2px] md:my-2 flex flex-wrap items-center justify-between"
                            v-for="(group, groupIndex) in inputData.studentStateGroupList" :key="groupIndex">
                            <div class="flex flex-wrap items-center justify-center" >
                                <label class="px-[2px]">{{group.value}}</label>
                                <template 
                                    v-for="(item, index) in inputData.studentStateRecordList" :key="index">
                                    <div class="px-[1px] flex flex-wrap items-center justify-center"
                                        v-if="item.studentStateGroupId == group.id">
                                        <input class="w-[15px] h-[15px] md:w-[20px] md:h-[20px]" type="checkbox" 
                                            v-model="item.isCheck"/>
                                        <label>{{item.studentStateItemValue}}</label>
                                    </div>
                                </template>
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
import { getContactBookRecordByClassId, 
    getStudentStateRecordByClassId,
    editStudentStateRecord,
    editAllStudentStateRecord } from '@/api/api'
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

const classId = computed(() => {
    return store.state.classId
})

const className = computed(() => {
    return store.state.className
})

const apiLoading = ref(false)


const classData = ref([
])

const contactBookRecordData = ref([{}])

const list = ref([{
        className: '',
        classCode: '',
        studentUserName: '',
        studentNumber: 0,
        studentStateRecordList: [],
        studentStateGroupList: [],
        isFill: false
}])

const inputAllData = ref({
    studentStateRecordList: [],
    studentStateGroupList: []
})

const inputData = ref({
    className: '',
    classCode: '',
    studentUserName: '',
    studentNumber: 0,
    studentStateRecordList: [],
    studentStateGroupList: [],
    isFill: false
})

const getList = async() => {
  const formData = new FormData()
  formData.append("classId", classId.value)
  formData.append("date", dayData.value.toDateString())

  await getContactBookRecordByClassId(formData).then((res) => {
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
    formData.append("classId", classId.value)
    formData.append("date", dayData.value.toDateString())
    await getStudentStateRecordByClassId(formData).then((res) => {
        if(res.data.status){
            let studentStateRecordList = res.data.data
            for (let key in contactBookRecordData.value) {
                let contactBookRecord = contactBookRecordData.value[key]
                let subStudentStateRecordList = []
                let studentStateGroupList = []
                for (let index in studentStateRecordList) {
                    let studentStateRecord = studentStateRecordList[index]
                    if (studentStateRecord.contactBookRecordId == contactBookRecord.id) {
                        subStudentStateRecordList.push(studentStateRecord)
                    }
                }
                let isFill = false
                for (let index in subStudentStateRecordList) {
                    if (subStudentStateRecordList[index].isCheck) {
                        isFill = true
                    }                    
                    let isHave = false
                    for (let groupIndex in studentStateGroupList) {
                        if (studentStateGroupList[groupIndex].id == subStudentStateRecordList[index].studentStateGroupId) {
                            isHave = true
                        }
                    }
                    if (!isHave) {
                        let studentStateGroup = {
                            id: subStudentStateRecordList[index].studentStateGroupId,
                            key: subStudentStateRecordList[index].studentStateGroupKey,
                            value: subStudentStateRecordList[index].studentStateGroupValue
                        }
                        studentStateGroupList.push(studentStateGroup)
                    }
                }
                
                let studentStateGroupList1 = []
                for (let groupIndex in studentStateGroupList) {
                    let itemValue = ''
                    for (let index in subStudentStateRecordList) {
                        if ((studentStateGroupList[groupIndex].id == subStudentStateRecordList[index].studentStateGroupId) &&
                            (subStudentStateRecordList[index].isCheck)) {
                            itemValue = itemValue + subStudentStateRecordList[index].studentStateItemValue + '、'
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
                let data = {
                    className: contactBookRecord.className,
                    classCode: contactBookRecord.classCode,
                    studentUserName: contactBookRecord.studentUserName,
                    studentNumber: contactBookRecord.studentNumber,
                    studentStateRecordList: subStudentStateRecordList,
                    studentStateGroupList: studentStateGroupList1,
                    isFill: isFill
                }
                dataList.push(data)
                if (inputAllData.value.studentStateRecordList.length < subStudentStateRecordList.length) {
                    inputAllData.value.studentStateRecordList = subStudentStateRecordList
                    inputAllData.value.studentStateGroupList = studentStateGroupList1
                }
            }
            list.value = dataList
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

// watch(inputData.body, (newVal,oldval) => {
//     console.log()
// },{ deep: true,immediate: false });

const init = async() => {
    if(apiLoading.value) return false

    apiLoading.value = true
    getList()
    apiLoading.value = false
}

const dayData = ref(new Date())
init()
const changeDate = (value) => {
    dayData.value = value
    init()
}

const modalAllStatus = ref(false)
const modalStatus = ref(false)
const cancel = () => {
    modalStatus.value = false
    modalAllStatus.value = false
}
provide('cancel', cancel)

const write = (item) => {
    inputData.value = JSON.parse(JSON.stringify(item))
    modalStatus.value = true
}

const writeAll = () => {
    for (let index in inputAllData.value.studentStateRecordList) {
        inputAllData.value.studentStateRecordList[index].contactBookRecordId = '00000000-0000-0000-0000-000000000000'
        inputAllData.value.studentStateRecordList[index].isCheck = false
    }
    modalAllStatus.value = true
}

const send = async() => {
    const formData = new FormData()
    formData.append("studentStateRecordList", JSON.stringify(inputData.value.studentStateRecordList))

    await editStudentStateRecord(formData).then((res) => {
        if(res.data.status){
            cancel()
            apiLoading.value = true
            getList()
            apiLoading.value = false
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

const sendAll = async() => {
    const formData = new FormData()
    formData.append("classId", classId.value)
    formData.append("date", dayData.value.toDateString())
    formData.append("studentStateRecordList", JSON.stringify(inputAllData.value.studentStateRecordList))

    await editAllStudentStateRecord(formData).then((res) => {
        if(res.data.status){
            cancel()
            apiLoading.value = true
            getList()
            apiLoading.value = false
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

const remove = async(item) => {
    inputData.value = JSON.parse(JSON.stringify(item))
    for (let index in inputData.value.studentStateRecordList) {
        inputData.value.studentStateRecordList[index].isCheck = false
    }
    const formData = new FormData()
    formData.append("studentStateRecordList", JSON.stringify(inputData.value.studentStateRecordList))

    await editStudentStateRecord(formData).then((res) => {
        if(res.data.status){
            apiLoading.value = true
            getList()
            apiLoading.value = false
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

const removeAll = async() => {
    for (let index in inputAllData.value.studentStateRecordList) {
        inputAllData.value.studentStateRecordList[index].isCheck = false
    }
    const formData = new FormData()
    formData.append("classId", classId.value)
    formData.append("date", dayData.value.toDateString())
    formData.append("studentStateRecordList", JSON.stringify(inputAllData.value.studentStateRecordList))

    await editAllStudentStateRecord(formData).then((res) => {
        if(res.data.status){
            apiLoading.value = true
            getList()
            apiLoading.value = false
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