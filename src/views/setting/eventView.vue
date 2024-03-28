<template>
    <div class="w-auto h-auto md:h-[80%] p-2 flex flex-col justify-start items-center ">
        <dateSelect :apiLoading="apiLoading" 
        :date="dayData" @changeDate="changeDate"></dateSelect>
        <div class="w-[95%] md:w-[40%] h-[auto] text-base md:text-xl rounded-lg bg-slate-50 p-1 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-start">
            <div>To:</div>
            <div class="px-2">{{className}}班</div>
        </div>
        <template v-if="!apiLoading" >
            <div 
                v-for="(item, index) in list" :key="index"
                @click="detail(item)"
                :class="(index % 2 == 0) ? 'bg-slate-50' : 'bg-slate-200'"
                class="w-[95%] md:w-[40%] h-[auto] text-sm md:text-lg rounded-lg my-1 px-1 py-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-end">
                <div class="w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-indigo-500 rounded-full ">
                    <img v-if="item.pictureUrl" :src="item.pictureUrl" class="rounded-full " alt="">
                </div>
                <div class="w-auto px-2 h-full grow flex flex-col items-start justify-center">
                    <div class="w-auto flex flex-wrap items-start justify-center">
                        <div class="px-1">{{item.title}}</div>
                    </div>
                    <div class="w-auto flex flex-wrap items-center justify-center">
                        <div class="px-1">{{item.remark}}</div>
                    </div>
                </div>
            </div>
        </template>
        <Teleport to="body">
            <conversationView type="xlarge" v-if="modalStatus">
                <template v-slot:header>
                    <div class="w-full py-1 px-2 md:py-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-center">
                        <div class="w-[40px] h-[40px] md:w-[70px] md:h-[70px] bg-indigo-500 rounded-full "></div>
                        <div class="w-auto px-2 grow flex flex-col items-start justify-center">
                            <div class="text-black">{{modifyData.title}}</div>
                        </div>
                    </div>
                </template>
                <template v-slot:content>
                    <div class="line-style w-full text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-center">
                        活動寫真
                    </div>
                    <div class="relative w-full h-auto px-2 md:px-4 text-sm md:text-lg">
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <div>
                            標題
                        </div>
                    </div>
                    <div class="relative w-full h-auto px-2 md:px-4 text-sm md:text-lg items-center">
                        <el-input 
                            v-model="modifyData.title" 
                            class="w-full"
                            size="large"  />
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <div>
                            簡介
                        </div>
                    </div>
                    <div class="relative w-full h-auto px-2 md:px-4 text-sm md:text-lg items-center">
                        <el-input
                            v-model="modifyData.remark" 
                            size="large"
                            class="w-full"
                            maxlength="500"
                            :rows="2"
                            type="textarea"
                            :autosize="{ minRows: 3, maxRows: 5 }"
                        />
                    </div>
                </template>
                <template v-slot:control>
                    <div class="absolute w-full bottom-1 md:bottom-2 flex flex-wrap justify-center items-center">
                        <button
                            @click="edit"
                            class="min-w-[20%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            完成
                        </button>
                        <button
                            @click="cancel"
                            class="min-w-[20%] bg-gray-500 hover:bg-[#999999] text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            取消
                        </button>
                    </div>
                </template>
            </conversationView>
        </Teleport>
        <!-- <Teleport to="body">
            <conversationView type="xlarge" v-if="modalStatus">
                <template v-slot:header>
                    <div class="w-full py-1 px-2 md:py-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-center">
                        <div class="w-[40px] h-[40px] md:w-[70px] md:h-[70px] bg-indigo-500 rounded-full "></div>
                        <div class="w-auto px-2 grow flex flex-col items-start justify-center">
                            <div class="text-black">{{modifyData.title}}</div>
                        </div>
                    </div>
                </template>
                <template v-slot:content>
                    <div class="line-style w-full text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-center">
                        活動寫真
                    </div>
                    <div class="relative w-full h-auto px-2 text-sm md:text-lg">
                    </div>                
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <div>
                            標題
                        </div>
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <input 
                            v-model="modifyData.temperature"
                            required
                            style="width:100%;"
                            type="number" >
                    </div>
                    <div class="w-full px-2 md:px-4 text-sm md:text-lg text-[#808080] flex flex-wrap items-center justify-start">
                        <div>
                            簡介
                        </div>
                    </div>
                    <div class="relative w-full h-auto px-2 text-sm md:text-lg">
                        <textarea 
                            v-model="modifyData.remark"
                            class="w-full h-[60px] md:h-[100px] px-[2px] border-[1px] border-black"
                            style="resize:none;"
                            maxlength="500"
                            >
                        </textarea>
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
        </Teleport> -->
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
        title: '活動',
        remark: '簡介',
        pictureUrl: '',
    }
])


const albumList = ref([
    {
        title: '活動',
        remark: '簡介',
        pictureUrl: '',
    }
])

const apiLoading = ref(false)

const getList = async() => {
  const formData = new FormData()
  formData.append("classId", classId.value)
  formData.append("date", dayData.value.toDateString())

//   await getBodyTemperatureRecordListByClass(formData).then((res) => {
//     if(res.data.status){
//         list.value = res.data.data
//       }else{
//         console.log(res.data.message)
//       }
//   }).catch((err) => { })
}

const init = async() => {
    apiLoading.value = true
    // await getList()
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
    }).catch((err) => { })
}
</script>

<style>

</style>