<template>
    <div class="w-auto h-auto md:h-[80%] p-2 text-sm md:text-xl flex flex-col justify-start items-center ">
        <dateSelect :apiLoading="apiLoading" :date="dayData" @changeDate="changeDate"></dateSelect>
        <div class="w-full max-w-[800px] rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-center">
            <div class="w-full text-2xl md:text-4xl font-semibold">{{className + '班'}}</div>
            <div class="w-full py-1 md:py-3 px-3 flex flex-wrap items-center justify-center">
                <div class="w-auto text-[16px] md:text-2xl">選擇班級: </div>
                <div class="w-auto px-[1px] flex flex-wrap items-center justify-center">
                    <el-select v-model="classId" placeholder="Select" @change="changeClass"
                        :style="{ 'width': isMobile ? '150px' : '400px' }">
                        <el-option
                            v-for="item in classOptions"
                            :key="item.value"
                            :label="item.label + '班'"
                            :value="item.value"
                        />
                    </el-select>
                </div>
            </div>
        </div>
        <template v-if="!apiLoading" >
            <div
                v-for="(item,index) in list" :key="index"
                @click="detail(item)" 
                :class="(index % 2 == 0) ? 'bg-slate-50' : 'bg-slate-200'"
                class="w-[95%] md:w-[40%] h-[auto] text-sm md:text-lg rounded-lg bg-slate-50 my-1 px-1 py-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-end">
                <div class="w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-indigo-500 rounded-full ">
                    <img v-if="item.studentUserPictureUrl" :src="item.studentUserPictureUrl" class="rounded-full " alt="">
                </div>
                <div 
                    class="w-auto px-1 h-full grow flex flex-col items-start justify-center">
                    <div class="max-w-[50vw] md:max-w-[18vw] px-1 truncate">{{item.studentUserName + ' ' + item.studentNumber + '號'}}</div>
                    <div class="max-w-[50vw] md:max-w-[18vw] px-1 truncate">{{'備註：' + item.remark}}</div>
                </div>
                <div class="w-[62px] md:w-[100px] px-1 h-full flex flex-col items-start justify-center">
                    <div
                        :class="(item.state <= 1) ? 'bg-[#808080]' : ((item.state <= 3 || item.state == (stateOptions.length - 1) ? 'bg-[#4169E1]' : 'bg-[#DC143C]'))"
                        class="w-[auto] mx-[2px] md:mx-1 text-sm md:text-xl text-white py-[2px] px-[4px] md:py-1 md:px-2 rounded">
                        {{item.stateName}}
                    </div>
                    <div class="w-auto px-1 truncate">{{(item.time) && (item.state >= 2) && (item.state <= 4) ? item.time.substr(0, 5) : '&nbsp;'}}</div>
                </div>
                <div class="w-[62px] md:w-[100px] px-1 h-full flex flex-col items-start justify-center">
                    <div
                        :class="(item.leaveState <= 1) ? 'bg-[#808080]' : ((item.leaveState == (leaveStateOptions.length - 1)) ? 'bg-[#4169E1]' : 'bg-[#DC143C]')"
                        class="w-[auto] mx-[2px] md:mx-1 text-sm md:text-xl text-white py-[2px] px-[4px] md:py-1 md:px-2 rounded">
                        {{item.leaveStateName}}
                    </div>
                    <div class="w-auto px-1 truncate">{{(item.leaveTime) && (item.leaveState > 0) ? item.leaveTime.substr(0, 5) : '&nbsp;'}}</div>
                </div>
            </div>
        </template>
        <Teleport to="body">
            <conversationView type="xlarge" v-if="modalStatus">
                <template v-slot:header>
                    <div class="w-full py-1 px-2 md:py-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-center">
                        <div class="w-[40px] h-[40px] md:w-[70px] md:h-[70px] bg-indigo-500 rounded-full "></div>
                        <div class="w-auto px-2 grow flex flex-col items-start justify-center">
                            <div class="text-black">{{modifyData.studentUserName}}</div>
                            <div>{{modifyData.className + ' ' + modifyData.studentNumber + '號'}}</div>
                        </div>
                    </div>
                </template>
                <template v-slot:content>
                    <div class="line-style w-full text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-center">
                        簽到記錄
                    </div>
                    <div class="relative w-full h-auto px-2 text-sm md:text-lg">
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <div>簽到</div>
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
                        <div>簽到時間</div>
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <el-time-picker 
                            v-model="modifyData.time"
                            size="large"
                            required
                            style="width:100%;"
                            format="HH:mm"
                            value-format="HH:mm" />
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <div>離校</div>
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <el-select 
                            v-model="modifyData.leaveState"
                            placeholder="請選擇類型"
                            size="large"
                            style="width:100%;">
                            <el-option
                              v-for="item in leaveStateOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                        </el-select>
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <div>離校時間</div>
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <el-time-picker 
                            v-model="modifyData.leaveTime"
                            size="large"
                            required
                            style="width:100%;"
                            format="HH:mm"
                            value-format="HH:mm" />
                    </div>
                    <div class="line-style w-full text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-center">
                        備註
                    </div>
                    <div class="relative w-full h-auto px-2 text-sm md:text-lg">
                        <textarea 
                            v-model="modifyData.remark"
                            class="w-full h-[60px] md:h-[100px] px-[2px] border-[1px] border-black"
                            style="resize:none;"
                            maxlength="50"
                            >
                        </textarea>
                        <!-- <div class="absolute right-3 bottom-1">字數</div> -->
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
import { getClassSelect, getRollCallStateSelect, getRollCallLeaveStateSelect, getRollCallListByClassId, editRollCall } from '@/api/api'
import { useStore } from "vuex";
import { ref,computed,provide  } from 'vue'
import { useRouter } from "vue-router";
import conversationView from "@/components/conversationView.vue"
import dateSelect from '@/components/dateSelect.vue'

const router = useRouter()
const store = useStore()

const list = ref([
])


const className = ref('')
const classId =  ref('')
classId.value = localStorage.getItem('classId')
className.value = localStorage.getItem('className')

const classOptions = ref([
        {
            value: '',
            label: '',
        }
    ])
    
const getClassOptions= async() => {
  await getClassSelect().then((res) => {
    if(res.data.status){
        classOptions.value = res.data.data.optionList
      }else{
        console.log(res.data.message)
      }
  }).catch((err) => { })
}

const stateOptions = ref([
        {
            value: '',
            label: '',
        }
    ])
    
const leaveStateOptions = ref([
        {
            value: '',
            label: '',
        }
    ])

const getRollCallOptions= async() => {
  await getRollCallStateSelect().then((res) => {
    if(res.data.status){
        stateOptions.value = res.data.data.optionList
      }else{
        console.log(res.data.message)
      }
  }).catch((err) => { })
}

const getLeaveRollCallOptions= async() => {
  await getRollCallLeaveStateSelect().then((res) => {
    if(res.data.status){
        leaveStateOptions.value = res.data.data.optionList
      }else{
        console.log(res.data.message)
      }
  }).catch((err) => { })
}

const changeClass= async() => {
  store.commit('setClassId',classId.value)
  let name = ''
  for (let key in classOptions.value) {
    if(classOptions.value[key].value == classId.value) {
        name = classOptions.value[key].label
        break
    }
  }
  className.value = name
  store.commit('setClassName',name)
  await getList()
}

const getList = async() => {
  const formData = new FormData()
  formData.append("classId", classId.value)
  formData.append("date", dayData.value.toDateString())

  await getRollCallListByClassId(formData).then((res) => {
    if(res.data.status){
        list.value = res.data.data
      }else{
        console.log(res.data.message)
      }
  }).catch((err) => { })
}

const apiLoading = ref(false)
const init = async() => {
    apiLoading.value = true
    await getClassOptions()
    await getRollCallOptions()
    await getLeaveRollCallOptions()
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

const edit = async() => {
    var formData = new FormData();
    for (var key in modifyData.value) {
        if (modifyData.value.hasOwnProperty(key)) {
            formData.append(key, modifyData.value[key])
        }
    }    
    await editRollCall(formData).then((res) => {
        if(res.data.status){
            modalStatus.value = false
            getList()
        }else{
            console.log(res.data.message)
        }
    }).catch((err) => { })
}

provide('cancel', cancel)

const isMobile = computed(() => {
    return store.state.isMobile
})


</script>

<style>

</style>